import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTestModel } from "@xstate/test";
import { vi } from "vitest";
import LoginPage from "../../app/login/page";
import { SignInForm } from "../../components/sign-in-form";
import { SignUpForm } from "../../components/sign-up-form";
import { authMachineWithServices } from "../authMachine";

// Mock the auth client
vi.mock("../../lib/auth-client", () => ({
	authClient: {
		useSession: vi.fn(() => ({ data: null, error: null, isPending: false })),
		signIn: {
			email: vi.fn(),
		},
		signUp: {
			email: vi.fn(),
		},
	},
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		refresh: vi.fn(),
	}),
}));

// Create the test model
const testModel = createTestModel(authMachineWithServices).withEvents({
	TOGGLE_MODE: async ({ getByText }) => {
		const toggleButton = getByText(/sign up|sign in/i);
		await userEvent.click(toggleButton);
	},
	INPUT_EMAIL: async ({ getByLabelText }, event: any) => {
		const emailInput = getByLabelText(/email/i);
		await userEvent.clear(emailInput);
		await userEvent.type(emailInput, event.value || "test@example.com");
	},
	INPUT_PASSWORD: async ({ getByLabelText }, event: any) => {
		const passwordInput = getByLabelText(/password/i);
		await userEvent.clear(passwordInput);
		await userEvent.type(passwordInput, event.value || "password123");
	},
	INPUT_NAME: async ({ getByLabelText }, event: any) => {
		const nameInput = getByLabelText(/name/i);
		if (nameInput) {
			await userEvent.clear(nameInput);
			await userEvent.type(nameInput, event.value || "Test User");
		}
	},
	SUBMIT: async ({ getByRole }) => {
		const submitButton = getByRole("button", { name: /sign in|sign up/i });
		await userEvent.click(submitButton);
	},
	SUBMIT_SUCCESS: async () => {
		// This would be triggered by a successful API response
		await waitFor(() => {
			expect(
				screen.queryByRole("button", { name: /sign in|sign up/i }),
			).not.toBeInTheDocument();
		});
	},
	SUBMIT_ERROR: async () => {
		// This would be triggered by an API error
		await waitFor(() => {
			expect(screen.getByRole("alert")).toBeInTheDocument();
		});
	},
});

describe("Authentication Flow - Model Based Tests", () => {
	const testPlans = testModel.getSimplePathPlans();

	testPlans.forEach((plan) => {
		describe(plan.description, () => {
			plan.paths.forEach((path) => {
				it(path.description, async () => {
					// Render the login page
					const { container } = render(<LoginPage />);

					// Execute the path
					await path.test(container);
				});
			});
		});
	});

	it("should have full coverage", () => {
		testModel.testCoverage();
	});
});

// Additional specific test cases for edge cases
describe("Authentication Edge Cases", () => {
	it("should validate email format", async () => {
		const { getByLabelText, getByRole } = render(<SignInForm />);

		const emailInput = getByLabelText(/email/i);
		const submitButton = getByRole("button", { name: /sign in/i });

		// Invalid email
		await userEvent.type(emailInput, "invalid-email");
		await userEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
		});
	});

	it("should validate password length", async () => {
		const { getByLabelText, getByRole } = render(<SignInForm />);

		const emailInput = getByLabelText(/email/i);
		const passwordInput = getByLabelText(/password/i);
		const submitButton = getByRole("button", { name: /sign in/i });

		// Valid email, short password
		await userEvent.type(emailInput, "test@example.com");
		await userEvent.type(passwordInput, "short");
		await userEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
		});
	});

	it("should clear form when switching modes", async () => {
		const { getByLabelText, getByText } = render(<LoginPage />);

		// Type in sign in form
		const emailInput = getByLabelText(/email/i);
		await userEvent.type(emailInput, "test@example.com");

		// Switch to sign up
		const toggleButton = getByText(/sign up/i);
		await userEvent.click(toggleButton);

		// Check that form is cleared
		const newEmailInput = getByLabelText(/email/i);
		expect(newEmailInput).toHaveValue("");
	});
});
