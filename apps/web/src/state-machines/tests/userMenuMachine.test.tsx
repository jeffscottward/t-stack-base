import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTestModel } from "@xstate/test";
import { vi } from "vitest";
import { UserMenu } from "../../components/user-menu";
import { userMenuMachine } from "../userMenuMachine";

// Mock the auth client
const mockSession = vi.fn();
const mockSignOut = vi.fn();

vi.mock("../../lib/auth-client", () => ({
	authClient: {
		useSession: () => mockSession(),
		signOut: mockSignOut,
	},
}));

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

// Create the test model
const testModel = createTestModel(userMenuMachine).withEvents({
	USER_LOADED: async () => {
		mockSession.mockReturnValue({
			data: {
				session: {
					user: { id: "1", email: "test@example.com", name: "Test User" },
				},
				user: { id: "1", email: "test@example.com", name: "Test User" },
			},
			error: null,
			isPending: false,
		});
	},
	USER_NOT_FOUND: async () => {
		mockSession.mockReturnValue({
			data: null,
			error: null,
			isPending: false,
		});
	},
	TOGGLE: async () => {
		// Find either the avatar button or sign in button
		const button =
			screen.queryByRole("button", { name: /tu/i }) ||
			screen.queryByRole("button", { name: /sign in/i });
		if (button) {
			await userEvent.click(button);
		}
	},
	OPEN: async () => {
		const button = screen.queryByRole("button", { name: /tu/i });
		if (button) {
			await userEvent.click(button);
		}
	},
	CLOSE: async () => {
		// Click outside the menu
		const body = document.body;
		await userEvent.click(body);
	},
	SIGN_OUT: async () => {
		const signOutButton = screen.queryByText(/sign out/i);
		if (signOutButton) {
			await userEvent.click(signOutButton);
		}
	},
	SIGN_OUT_SUCCESS: async () => {
		await mockSignOut();
		mockSession.mockReturnValue({
			data: null,
			error: null,
			isPending: false,
		});
	},
});

describe("User Menu - Model Based Tests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockPush.mockClear();
	});

	const testPlans = testModel.getSimplePathPlans();

	testPlans.forEach((plan) => {
		describe(plan.description, () => {
			plan.paths.forEach((path) => {
				it(path.description, async () => {
					// Start with loading state
					mockSession.mockReturnValue({
						data: null,
						error: null,
						isPending: true,
					});

					const { container } = render(<UserMenu />);

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

// Additional specific test cases
describe("User Menu Specific Behaviors", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockPush.mockClear();
	});

	it("should show skeleton while loading", () => {
		mockSession.mockReturnValue({
			data: null,
			error: null,
			isPending: true,
		});

		render(<UserMenu />);

		expect(screen.getByTestId("user-menu-skeleton")).toBeInTheDocument();
	});

	it("should show sign in button when unauthenticated", async () => {
		mockSession.mockReturnValue({
			data: null,
			error: null,
			isPending: false,
		});

		render(<UserMenu />);

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: /sign in/i }),
			).toBeInTheDocument();
		});
	});

	it("should show user avatar when authenticated", async () => {
		mockSession.mockReturnValue({
			data: {
				session: {
					user: { id: "1", email: "test@example.com", name: "Test User" },
				},
				user: { id: "1", email: "test@example.com", name: "Test User" },
			},
			error: null,
			isPending: false,
		});

		render(<UserMenu />);

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /tu/i })).toBeInTheDocument();
		});
	});

	it("should open dropdown menu on click", async () => {
		mockSession.mockReturnValue({
			data: {
				session: {
					user: { id: "1", email: "test@example.com", name: "Test User" },
				},
				user: { id: "1", email: "test@example.com", name: "Test User" },
			},
			error: null,
			isPending: false,
		});

		render(<UserMenu />);

		const avatarButton = await screen.findByRole("button", { name: /tu/i });
		await userEvent.click(avatarButton);

		expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
		expect(screen.getByText(/sign out/i)).toBeInTheDocument();
	});

	it("should handle sign out", async () => {
		mockSession.mockReturnValue({
			data: {
				session: {
					user: { id: "1", email: "test@example.com", name: "Test User" },
				},
				user: { id: "1", email: "test@example.com", name: "Test User" },
			},
			error: null,
			isPending: false,
		});

		render(<UserMenu />);

		const avatarButton = await screen.findByRole("button", { name: /tu/i });
		await userEvent.click(avatarButton);

		const signOutButton = screen.getByText(/sign out/i);
		await userEvent.click(signOutButton);

		expect(mockSignOut).toHaveBeenCalled();
	});
});
