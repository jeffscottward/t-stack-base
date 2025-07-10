import type { inferProcedureInput } from "@trpc/server";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createContext } from "../lib/context";
import { appRouter } from "./index";

describe("tRPC Router", () => {
	let caller: ReturnType<typeof appRouter.createCaller>;

	beforeEach(async () => {
		// Create a mock NextRequest
		const mockRequest = new NextRequest("http://localhost:3000", {
			headers: new Headers({
				"content-type": "application/json",
			}),
		});
		const ctx = await createContext(mockRequest);
		caller = appRouter.createCaller(ctx);
	});

	it("should have the router defined", () => {
		expect(appRouter).toBeDefined();
		expect(appRouter._def).toBeDefined();
	});

	it("should have procedures defined", () => {
		// Check if the router has any procedures
		const procedures = appRouter._def.procedures;
		expect(procedures).toBeDefined();
	});

	// Example test for a hypothetical hello procedure
	// Uncomment and adjust when you have actual procedures
	/*
  it('should call hello procedure', async () => {
    const result = await caller.hello({ name: 'World' })
    expect(result).toEqual({ greeting: 'Hello World' })
  })
  */
});
