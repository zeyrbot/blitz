import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		code: 200,
		context: null,
		message: "image microservice for zeyr (aka: blitz)",
	});
}
