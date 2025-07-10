import { expect, test } from "@playwright/test";

test.describe("Authentication", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/login");
	});

	test("should display login form", async ({ page }) => {
		// Check for form elements
		await expect(page.getByLabel(/email/i)).toBeVisible();
		await expect(page.getByLabel(/password/i)).toBeVisible();
		await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
	});

	test("should show validation errors for empty form", async ({ page }) => {
		// Try to submit empty form
		await page.getByRole("button", { name: /sign in/i }).click();

		// Check for validation messages
		await expect(page.getByText(/email is required/i)).toBeVisible();
	});

	test("should show error for invalid email", async ({ page }) => {
		// Enter invalid email
		await page.getByLabel(/email/i).fill("invalid-email");
		await page.getByLabel(/password/i).fill("password123");
		await page.getByRole("button", { name: /sign in/i }).click();

		// Check for validation message
		await expect(page.getByText(/invalid email/i)).toBeVisible();
	});

	test("should accept valid form data", async ({ page }) => {
		// Fill in valid data
		await page.getByLabel(/email/i).fill("test@example.com");
		await page.getByLabel(/password/i).fill("password123");

		// Submit form
		await page.getByRole("button", { name: /sign in/i }).click();

		// Form should submit without client-side validation errors
		await expect(page.getByText(/email is required/i)).not.toBeVisible();
		await expect(page.getByText(/password is required/i)).not.toBeVisible();
	});

	test("should have link to sign up page", async ({ page }) => {
		// Look for sign up link
		const signUpLink = page.getByText(/don't have an account/i).locator("..");
		await expect(signUpLink).toBeVisible();
	});
});
