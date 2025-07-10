import { render, screen, waitFor } from "@testing-library/react";
import { createTestModel } from "@xstate/test";
import { vi } from "vitest";
import DashboardPage from "../../app/dashboard/page";
import { dashboardMachine } from "../dashboardMachine";

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
	redirect: (path: string) => {
		mockPush(path);
	},
}));

// Mock TRPC
vi.mock("../../utils/trpc", () => ({
	trpc: {
		private: {
			getSecretData: {
				useQuery: vi.fn(() => ({
					data: { message: "Secret data" },
					isLoading: false,
					error: null,
				})),
			},
		},
	},
}));

// Create the test model
const testModel = createTestModel(dashboardMachine).withEvents({
	AUTH_SUCCESS: async () => {
		mockSession.mockReturnValue({
			data: {
				session: { user: { id: "1", email: "test@example.com" } },
				user: { id: "1", email: "test@example.com" },
			},
			error: null,
			isPending: false,
		});
	},
	AUTH_FAILURE: async () => {
		mockSession.mockReturnValue({
			data: null,
			error: { message: "Unauthorized" },
			isPending: false,
		});
	},
	FETCH_DATA: async () => {
		// This would trigger a data fetch
		await waitFor(() => {
			expect(screen.getByText(/secret data/i)).toBeInTheDocument();
		});
	},
	SIGN_OUT: async () => {
		await mockSignOut();
	},
});

describe("Dashboard Access Control - Model Based Tests", () => {
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

					const { container } = render(<DashboardPage />);

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
describe("Dashboard Specific Behaviors", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockPush.mockClear();
	});

	it("should show loading state initially", () => {
		mockSession.mockReturnValue({
			data: null,
			error: null,
			isPending: true,
		});

		render(<DashboardPage />);

		expect(screen.getByText(/loading session/i)).toBeInTheDocument();
	});

	it("should redirect to login when unauthenticated", async () => {
		mockSession.mockReturnValue({
			data: null,
			error: { message: "Unauthorized" },
			isPending: false,
		});

		render(<DashboardPage />);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/login");
		});
	});

	it("should display user data when authenticated", async () => {
		mockSession.mockReturnValue({
			data: {
				session: { user: { id: "1", email: "test@example.com" } },
				user: { id: "1", email: "test@example.com" },
			},
			error: null,
			isPending: false,
		});

		render(<DashboardPage />);

		await waitFor(() => {
			expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
			expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
		});
	});
});
