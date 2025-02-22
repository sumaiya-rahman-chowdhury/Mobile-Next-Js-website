import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";

export async function authenticatedUser() {
  const session = await getServerSession(authOptions);
  console.log("authenticatedUser reporting session: ",session)
  if (!session) {
    return {
      session: null,
      errorResponse: NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      ),
    };
  }
  return {session,errorResponse:null};
}
