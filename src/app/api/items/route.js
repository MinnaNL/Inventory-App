import { NextResponse } from "next/server";
import { validateItemData } from "@/utils/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
	const url = new URL(req.url);
	let items;
	try {
		// Fetch all items without any filters
		items = await prisma.item.findMany();
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch items" },
			{ status: 500 }
		);
	}

	return NextResponse.json(items);
}

//post item
export async function POST(req) {
	let body;
	try {
		body = await req.json();
	} catch (error) {
		return NextResponse.json(
			{
				message: "A valid JSON object has to be sent",
			},
			{
				status: 400,
			}
		);
	}

	const [hasErrors, errors] = validateItemData(body);
	if (hasErrors) {
		return NextResponse.json(
			{
				message: errors,
			},
			{
				status: 400,
			}
		);
	}

	let newItem;
	try {
		newItem = await prisma.item.create({
			data: {
				name: body.name,
				description: body.description,
				quantity: body.quantity,
				category: body.category,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: "Invalid data sent for item creation",
			},
			{
				status: 400,
			}
		);
	}

	return NextResponse.json(newItem, {
		status: 201,
	});
}
