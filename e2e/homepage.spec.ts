import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
	test("should load the homepage", async ({ page }) => {
		await page.goto("/");

		// Check if the page loaded successfully
		await expect(page).toHaveTitle(/t-stack-base/i);

		// Check for main navigation or header
		const header = page.locator("header");
		await expect(header).toBeVisible();
	});

	test("should navigate to login page", async ({ page }) => {
		await page.goto("/");

		// Look for a login link/button
		const loginLink = page.getByRole("link", { name: /log in/i });
		await expect(loginLink).toBeVisible();

		// Click the login link
		await loginLink.click();

		// Verify we're on the login page
		await expect(page).toHaveURL(/\/login/);
	});

	test("should display sign up option", async ({ page }) => {
		await page.goto("/");

		// Look for sign up link/button
		const signUpLink = page.getByRole("link", { name: /sign up/i });
		await expect(signUpLink).toBeVisible();
	});
});
