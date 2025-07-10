import { pgTable } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";
import { accounts, sessions, users, verifications } from "./auth";

describe("Auth Schema", () => {
	it("should have users table defined", () => {
		expect(users).toBeDefined();
		expect(users.id).toBeDefined();
		expect(users.email).toBeDefined();
		expect(users.emailVerified).toBeDefined();
		expect(users.name).toBeDefined();
		expect(users.createdAt).toBeDefined();
		expect(users.updatedAt).toBeDefined();
		expect(users.image).toBeDefined();
	});

	it("should have sessions table defined", () => {
		expect(sessions).toBeDefined();
		expect(sessions.id).toBeDefined();
		expect(sessions.expiresAt).toBeDefined();
		expect(sessions.token).toBeDefined();
		expect(sessions.createdAt).toBeDefined();
		expect(sessions.updatedAt).toBeDefined();
		expect(sessions.ipAddress).toBeDefined();
		expect(sessions.userAgent).toBeDefined();
		expect(sessions.userId).toBeDefined();
	});

	it("should have accounts table defined", () => {
		expect(accounts).toBeDefined();
		expect(accounts.id).toBeDefined();
		expect(accounts.accountId).toBeDefined();
		expect(accounts.providerId).toBeDefined();
		expect(accounts.userId).toBeDefined();
		expect(accounts.accessToken).toBeDefined();
		expect(accounts.refreshToken).toBeDefined();
		expect(accounts.idToken).toBeDefined();
		expect(accounts.accessTokenExpiresAt).toBeDefined();
		expect(accounts.refreshTokenExpiresAt).toBeDefined();
		expect(accounts.scope).toBeDefined();
		expect(accounts.password).toBeDefined();
		expect(accounts.createdAt).toBeDefined();
		expect(accounts.updatedAt).toBeDefined();
	});

	it("should have verifications table defined", () => {
		expect(verifications).toBeDefined();
		expect(verifications.id).toBeDefined();
		expect(verifications.identifier).toBeDefined();
		expect(verifications.value).toBeDefined();
		expect(verifications.expiresAt).toBeDefined();
		expect(verifications.createdAt).toBeDefined();
		expect(verifications.updatedAt).toBeDefined();
	});
});
