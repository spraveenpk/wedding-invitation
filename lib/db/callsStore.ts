import fs from "fs";
import path from "path";
import { Contact } from "@/lib/telephony/types";
import { generatePersonalizedScript } from "@/lib/telephony/scriptGenerator";

interface DatabaseSchema {
  contacts: Contact[];
  settings: {
    testMode: boolean;
    testPhoneNumber: string;
    scriptTemplate: string;
    activeProvider: "mock" | "twilio";
  };
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "calls_data.json");

const DEFAULT_SETTINGS = {
  testMode: true,
  testPhoneNumber: process.env.TEST_PHONE_NUMBER || "+919876543210",
  scriptTemplate: "",
  activeProvider: (process.env.TELEPHONY_PROVIDER as "mock" | "twilio") || "mock",
};

const SEED_CONTACTS: Omit<Contact, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Karthik Raja",
    phoneNumber: "+919842100001",
    status: "Pending",
    notes: "Family friend from Coimbatore",
  },
  {
    name: "Ananya Sundaram",
    phoneNumber: "+919842100002",
    status: "Answered",
    lastCalledAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    durationSeconds: 42,
    callSid: "MOCK_CALL_INIT_101",
    notes: "Confirmed attending reception and muhurtham",
  },
  {
    name: "Vigneshwaran M",
    phoneNumber: "+919842100003",
    status: "Busy",
    lastCalledAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    durationSeconds: 12,
    callSid: "MOCK_CALL_INIT_102",
    notes: "Call busy, retry scheduled",
  },
  {
    name: "Meenakshi Raman",
    phoneNumber: "+919842100004",
    status: "No Answer",
    lastCalledAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    durationSeconds: 28,
    callSid: "MOCK_CALL_INIT_103",
    notes: "No answer after 5 rings",
  },
  {
    name: "Dr. Senthil Kumar",
    phoneNumber: "+919842100005",
    status: "Pending",
    notes: "College Professor",
  },
];

function ensureDbExists(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const now = new Date().toISOString();
    const seeded: Contact[] = SEED_CONTACTS.map((c, idx) => ({
      ...c,
      id: `contact_${Date.now()}_${idx + 1}`,
      personalizedScript: generatePersonalizedScript(c.name),
      createdAt: now,
      updatedAt: now,
    }));

    const initialData: DatabaseSchema = {
      contacts: seeded,
      settings: DEFAULT_SETTINGS,
    };

    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const data = JSON.parse(raw);
    if (!data.contacts) data.contacts = [];
    if (!data.settings) data.settings = DEFAULT_SETTINGS;
    return data;
  } catch (err) {
    console.error("Error reading calls_data.json, recreating defaults:", err);
    const initialData: DatabaseSchema = {
      contacts: [],
      settings: DEFAULT_SETTINGS,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
}

function saveDb(data: DatabaseSchema) {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export const callsDb = {
  getContacts(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): {
    contacts: Contact[];
    total: number;
    page: number;
    totalPages: number;
    metrics: Record<string, number>;
  } {
    const db = ensureDbExists();
    let list = [...db.contacts];

    // Filter by status
    if (params?.status && params.status !== "All") {
      list = list.filter((c) => c.status === params.status);
    }

    // Search by name or phone
    if (params?.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phoneNumber.includes(q) ||
          (c.notes && c.notes.toLowerCase().includes(q))
      );
    }

    const total = list.length;
    const page = Math.max(1, params?.page || 1);
    const limit = Math.max(1, params?.limit || 50);
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    // Compute metrics across entire database
    const metrics: Record<string, number> = {
      Total: db.contacts.length,
      Pending: 0,
      Called: 0,
      Answered: 0,
      Busy: 0,
      "No Answer": 0,
      Failed: 0,
    };

    db.contacts.forEach((c) => {
      if (metrics[c.status] !== undefined) {
        metrics[c.status]++;
      }
    });

    return {
      contacts: paginated,
      total,
      page,
      totalPages,
      metrics,
    };
  },

  getContactById(id: string): Contact | null {
    const db = ensureDbExists();
    return db.contacts.find((c) => c.id === id) || null;
  },

  updateContact(id: string, updates: Partial<Contact>): Contact | null {
    const db = ensureDbExists();
    const idx = db.contacts.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    db.contacts[idx] = {
      ...db.contacts[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    saveDb(db);
    return db.contacts[idx];
  },

  updateByCallSid(
    callSid: string,
    updates: Partial<Contact>
  ): Contact | null {
    const db = ensureDbExists();
    const idx = db.contacts.findIndex((c) => c.callSid === callSid);
    if (idx === -1) return null;

    db.contacts[idx] = {
      ...db.contacts[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    saveDb(db);
    return db.contacts[idx];
  },

  addBulkContacts(
    items: Array<{ name: string; phoneNumber: string; notes?: string }>
  ): { addedCount: number; duplicateCount: number } {
    const db = ensureDbExists();
    const now = new Date().toISOString();
    let addedCount = 0;
    let duplicateCount = 0;

    const existingPhones = new Set(db.contacts.map((c) => c.phoneNumber.replace(/\s+/g, "")));

    items.forEach((item, index) => {
      const cleanPhone = item.phoneNumber.trim().replace(/\s+/g, "");
      const cleanName = item.name.trim();

      if (!cleanPhone || !cleanName) return;

      if (existingPhones.has(cleanPhone)) {
        duplicateCount++;
        return;
      }

      existingPhones.add(cleanPhone);
      const newContact: Contact = {
        id: `contact_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 6)}`,
        name: cleanName,
        phoneNumber: cleanPhone,
        status: "Pending",
        notes: item.notes || "",
        personalizedScript: generatePersonalizedScript(
          cleanName,
          db.settings.scriptTemplate
        ),
        createdAt: now,
        updatedAt: now,
      };

      db.contacts.push(newContact);
      addedCount++;
    });

    saveDb(db);
    return { addedCount, duplicateCount };
  },

  resetAllCallStatuses(): { updated: number } {
    const db = ensureDbExists();
    const now = new Date().toISOString();
    let count = 0;
    db.contacts.forEach((c) => {
      c.status = "Pending";
      c.callSid = undefined;
      c.durationSeconds = undefined;
      c.lastCalledAt = undefined;
      c.updatedAt = now;
      count++;
    });
    saveDb(db);
    return { updated: count };
  },

  clearContacts(): void {
    const db = ensureDbExists();
    db.contacts = [];
    saveDb(db);
  },

  getSettings() {
    const db = ensureDbExists();
    return {
      ...db.settings,
      envTestMode: process.env.TEST_MODE === "true" || process.env.TEST_MODE === undefined,
      envTestPhoneNumber: process.env.TEST_PHONE_NUMBER || "",
      activeProvider: process.env.TELEPHONY_PROVIDER || db.settings.activeProvider || "mock",
      hasTwilioConfig: Boolean(
        process.env.TWILIO_ACCOUNT_SID &&
        process.env.TWILIO_AUTH_TOKEN &&
        process.env.TWILIO_FROM_NUMBER
      ),
    };
  },

  updateSettings(partial: Partial<DatabaseSchema["settings"]>) {
    const db = ensureDbExists();
    db.settings = { ...db.settings, ...partial };
    saveDb(db);
    return db.settings;
  },
};
