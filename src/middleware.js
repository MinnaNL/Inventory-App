//src/app/ middleware

import { NextResponse } from "next/server"; // Import NextResponse for handling server responses
import { verifyJWT } from "./utils/helpers/authHelpers"; // Import a helper function to verify JWT tokens

// Define unsafe HTTP methods that need authorization checks
const unsafeMethods = ["POST", "PUT", "DELETE"];

export async function middleware(req) {
  console.log("Middleware is running"); // Log that the middleware is executing

  // Check if the incoming request method is unsafe (i.e., POST, PUT, or DELETE)
  if (unsafeMethods.includes(req.method)) {
    console.log("VERIFY"); // Log that authorization is being verified

    try {
      // Get the Authorization header (if present), or use an empty string
      const bearer = req.headers.get("Authorization") || "";

      // Extract the token from the Authorization header (assumes format "Bearer <token>")
      const token = bearer.split(" ")?.[1]; // Optional chaining is used to avoid errors if splitting fails
      if (!token) {
        throw new Error("no token submitted"); // If no token is provided, throw an error
      }

      // Verify the JWT token using the helper function
      const jwtPayload = await verifyJWT(token);

      // Clone the request headers and add the userId from the JWT payload to the headers
      const headers = new Headers(req.headers);
      headers.set("userId", JSON.stringify(jwtPayload.userId)); // Set the userId header with the extracted user ID

      // Continue with the request, passing along the modified headers
      return NextResponse.next({ headers: headers });
    } catch (error) {
      // If token verification fails, return a 401 Unauthorized response
      return NextResponse.json(
        {
          error: "Unauthorized request", // Provide an error message in the response
        },
        { status: 401 } // Set the HTTP status to 401 (Unauthorized)
      );
    }
  }
}

// Config object defines which routes the middleware should apply to
export const config = {
  matcher: [
    "/api/items/",          // Middleware will be applied to these routes
    "/api/items/:path*",    // Matches all paths under /api/items
    "/api/users",           // Matches the /api/users route
    "/api/users/:path*",    // Matches all paths under /api/users
    "/api/users/me",        // Specifically matches /api/users/me
  ],
};
