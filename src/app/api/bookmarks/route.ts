import { TablatureClient } from "@/clients/cms/tablature";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const ids = await request.json();
    const tablatures = await TablatureClient.findTablaturesById(ids);
    return NextResponse.json({ tablatures });
}
