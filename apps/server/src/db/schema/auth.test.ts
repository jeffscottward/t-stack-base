import { pgTable } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";
import { account, session, user, verification } from "./auth";

describe("Auth Schema", () => {
	it("should have users table defined", () => {
		expect(user).toBeDefined();
		expect(user.id).toBeDefined();
		expect(user.email).toBeDefined();
		expect(user.emailVerified).toBeDefined();
		expect(user.name).toBeDefined();
		expect(user.createdAt).toBeDefined();
		expect(user.updatedAt).toBeDefined();
		expect(user.image).toBeDefined();
	});

	it("should have sessions table defined", () => {
		expect(session).toBeDefined();
		expect(session.id).toBeDefined();
		expect(session.expiresAt).toBeDefined();
		expect(session.token).toBeDefined();
		expect(session.createdAt).toBeDefined();
		expect(session.updatedAt).toBeDefined();
		expect(session.ipAddress).toBeDefined();
		expect(session.userAgent).toBeDefined();
		expect(session.userId).toBeDefined();
	});

	it("should have accounts table defined", () => {
		expect(account).toBeDefined();
		expect(account.id).toBeDefined();
		expect(account.accountId).toBeDefined();
		expect(account.providerId).toBeDefined();
		expect(account.userId).toBeDefined();
		expect(account.accessToken).toBeDefined();
		expect(account.refreshToken).toBeDefined();
		expect(account.idToken).toBeDefined();
		expect(account.accessTokenExpiresAt).toBeDefined();
		expect(account.refreshTokenExpiresAt).toBeDefined();
		expect(account.scope).toBeDefined();
		expect(account.password).toBeDefined();
		expect(account.createdAt).toBeDefined();
		expect(account.updatedAt).toBeDefined();
	});

	it("should have verifications table defined", () => {
		expect(verification).toBeDefined();
		expect(verification.id).toBeDefined();
		expect(verification.identifier).toBeDefined();
		expect(verification.value).toBeDefined();
		expect(verification.expiresAt).toBeDefined();
		expect(verification.createdAt).toBeDefined();
		expect(verification.updatedAt).toBeDefined();
	});
});
