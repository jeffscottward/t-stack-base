import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// Handle OPTIONS request for CORS preflight
	if (request.method === "OPTIONS") {
		const response = new NextResponse(null, { status: 200 });
		response.headers.append("Access-Control-Allow-Credentials", "true");
		response.headers.append(
			"Access-Control-Allow-Origin",
			process.env.CORS_ORIGIN || "http://localhost:3001",
		);
		response.headers.append("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
		response.headers.append(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization",
		);
		return response;
	}

	const res = NextResponse.next();

	res.headers.append("Access-Control-Allow-Credentials", "true");
	res.headers.append(
		"Access-Control-Allow-Origin",
		process.env.CORS_ORIGIN || "http://localhost:3001",
	);
	res.headers.append("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
	res.headers.append(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization",
	);

	return res;
}

export const config = {
	matcher: "/:path*",
};
