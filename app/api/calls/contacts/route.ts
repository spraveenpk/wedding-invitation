import { NextResponse } from "next/server";
import { callsDb } from "@/lib/db/callsStore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "All";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const result = callsDb.getContacts({ status, search, page, limit });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load contacts";
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contacts } = body;

    if (!Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid contacts list provided." },
        { status: 400 }
      );
    }

    const { addedCount, duplicateCount } = callsDb.addBulkContacts(contacts);

    return NextResponse.json({
      success: true,
      addedCount,
      duplicateCount,
      totalContacts: callsDb.getContacts().total,
      message: `Successfully imported ${addedCount} contacts (${duplicateCount} duplicates skipped).`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Import failed.";
    console.error("Failed to import contacts:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "reset-statuses") {
      const { updated } = callsDb.resetAllCallStatuses();
      return NextResponse.json({
        success: true,
        message: `Reset status for ${updated} contacts back to Pending.`,
      });
    }

    if (action === "clear-all") {
      callsDb.clearContacts();
      return NextResponse.json({
        success: true,
        message: "All contacts cleared.",
      });
    }

    return NextResponse.json(
      { success: false, error: "Valid action parameter is required." },
      { status: 400 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Operation failed.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
