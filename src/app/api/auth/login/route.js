//src/app/api/auth/login > route
//Login user

import { NextResponse } from "next/server";
import { signJWT } from "@/utils/helpers/authHelpers"; // Import helper to sign JWT
import { PrismaClient } from "@prisma/client"; // Prisma client to interact with the database
import bcrypt from "bcrypt"; // bcrypt for secure password hashing

const prisma = new PrismaClient(); // Initialize Prisma client

// POST request handler for user login
export async function POST(req) {
	let body;
	try {
		body = await req.json(); // Parse the request body
		console.log(body);

		// Validate if email and password are provided
		if (!body.email || !body.password) {
			throw new Error("Email and password has to be provided");
		}
	} catch (error) {
		// Return error if body is invalid
		return NextResponse.json(
			{
				message:
					"A valid new user object with email and password has to be provided",
			},
			{ status: 400 }
		);
	}

	try {
		// Fetch user from the database based on the provided email
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		// Compare the provided password with the hashed password in the database
		const isPasswordValid = await bcrypt.compare(body.password, user.password);

		// If user does not exist or password is invalid, return an error
		if (!user || !isPasswordValid) {
			return NextResponse.json(
				{
					message: "Invalid login credentials",
				},
				{ status: 400 }
			);
		}

		// Generate a JWT token for the authenticated user
		const token = await signJWT({
			userId: user.id,
		});

		// Return the user object and JWT token upon successful login
		return NextResponse.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);

		// Return error response in case of exceptions
		return NextResponse.json(
			{
				error: error.message || "Something went wrong, try again",
			},
			{ status: 400 }
		);
	}
}
