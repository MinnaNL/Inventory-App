//src/app/utils/helpers > AuthHelpers

import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET; // Secret key from environment variables
const JWT_AUTH_EXP = "1y"; // Token expiration time set to 1 year

// Encodes the JWT secret using TextEncoder
function encodedSecret() {
  return new TextEncoder().encode(JWT_SECRET);
}

// Signs the JWT with a payload, header, issued time, and expiration time
export async function signJWT(payload) {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Set algorithm and type
    .setIssuedAt() // Sets the issued time
    .setExpirationTime(JWT_AUTH_EXP) // Sets expiration time
    .sign(encodedSecret()); // Sign with the encoded secret

  return token; // Return the generated token
}

// Verifies the JWT token and returns the decoded payload or null if verification fails
export async function verifyJWT(token) {
  try {
    const verified = await jose.jwtVerify(token, encodedSecret()); // Verify the token
    return verified.payload; // Return the decoded payload if successful
  } catch (error) {
    return null; // Return null if verification fails
  }
}
