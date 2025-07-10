import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SignInForm from "./sign-in-form";

// Mock next/navigation
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
	}),
}));

// Mock sonner
vi.mock("sonner", () => ({
	toast: {
		error: vi.fn(),
		success: vi.fn(),
	},
}));

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe("SignInForm", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders email and password fields", () => {
		render(<SignInForm onSwitchToSignUp={() => {}} />, {
			wrapper: createWrapper(),
		});

		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /sign in/i }),
		).toBeInTheDocument();
	});

	it("validates required fields", async () => {
		const user = userEvent.setup();
		render(<SignInForm onSwitchToSignUp={() => {}} />, {
			wrapper: createWrapper(),
		});

		// Try to submit without filling fields
		await user.click(screen.getByRole("button", { name: /sign in/i }));

		await waitFor(() => {
			expect(screen.getByText(/email is required/i)).toBeInTheDocument();
		});
	});

	it("validates email format", async () => {
		const user = userEvent.setup();
		render(<SignInForm onSwitchToSignUp={() => {}} />, {
			wrapper: createWrapper(),
		});

		await user.type(screen.getByLabelText(/email/i), "invalid-email");
		await user.type(screen.getByLabelText(/password/i), "password123");
		await user.click(screen.getByRole("button", { name: /sign in/i }));

		await waitFor(() => {
			expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
		});
	});

	it("submits form with valid data", async () => {
		const user = userEvent.setup();
		render(<SignInForm onSwitchToSignUp={() => {}} />, {
			wrapper: createWrapper(),
		});

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/password/i), "password123");
		await user.click(screen.getByRole("button", { name: /sign in/i }));

		// The form should be submitted without validation errors
		await waitFor(() => {
			expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
			expect(
				screen.queryByText(/password is required/i),
			).not.toBeInTheDocument();
		});
	});
});
