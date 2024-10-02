//app/api/auth/register > route
// Register a new user
import { NextResponse } from "next/server";
import { validateUserData } from "@/utils/helpers/apiHelpers"; // Import helper to validate user data
import { signJWT } from "@/utils/helpers/authHelpers"; // Import JWT helper to generate tokens
import { PrismaClient } from "@prisma/client"; // Import Prisma to interact with the database
import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords

const prisma = new PrismaClient(); // Initialize Prisma client

// POST request handler for user registration
export async function POST(req) {
  let body;
  try {
    body = await req.json(); // Parse the request body
  } catch (error) {
    // Return error if body is not a valid JSON object
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  // Validate user data using a helper function
  try {
    const { hasErrors, errors } = validateUserData(body);
    if (hasErrors) {
      // If validation fails, return the errors
      return NextResponse.json(
        {
          message: errors,
        },
        {
          status: 400,
        }
      );
    }

    // Check if a user with the same email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // If user exists, return an error message
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Hash the user's password securely using bcrypt
    const hashed = await bcrypt.hash(body.password, 10);

    // Create the new user in the database with the hashed password
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashed,
        name: body.name,
      },
    });

    // Generate a JWT token for the new user
    const token = await signJWT({
      userId: user.id,
    });

    // Return the created user and the token
    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    // Handle errors that occur during the process
    return NextResponse.json(
      {
        error: error.message || "Something went wrong, try again",
      },
      {
        status: 400,
      }
    );
  }
}
