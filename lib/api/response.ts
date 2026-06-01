import { NextResponse } from "next/server";
import { AppError, isAppError } from "@/lib/shared/errors";

export function jsonError(error: unknown) {
  if (isAppError(error)) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode },
    );
  }

  if (error instanceof Error && error.message === "SESSION_NOT_FOUND") {
    return NextResponse.json(
      { error: "Sesión no encontrada.", code: "SESSION_NOT_FOUND" },
      { status: 404 },
    );
  }

  console.error(error);
  return NextResponse.json(
    { error: "Error interno del servidor.", code: "INTERNAL_ERROR" },
    { status: 500 },
  );
}
