import { NextResponse } from "next/server";

export function notImplementedResponse(module: string, endpoint: string) {
  return NextResponse.json(
    {
      error: "Not implemented",
      module,
      endpoint,
    },
    { status: 501 },
  );
}
