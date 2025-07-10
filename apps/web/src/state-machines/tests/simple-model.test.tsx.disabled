import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTestModel } from "@xstate/test";
import { describe, expect, it, vi } from "vitest";
import { assign, createMachine } from "xstate";
import { ModeToggle } from "../../components/mode-toggle";
import { ThemeProvider } from "../../components/theme-provider";

// Mock next-themes
const mockSetTheme = vi.fn();
vi.mock("next-themes", () => ({
	useTheme: () => ({
		theme: "system",
		setTheme: mockSetTheme,
	}),
	ThemeProvider: ({ children }: any) => children,
}));

// Simple theme machine for testing
const simpleThemeMachine = createMachine({
	id: "theme",
	initial: "closed",
	context: {
		theme: "system" as "light" | "dark" | "system",
	},
	states: {
		closed: {
			on: {
				TOGGLE: "open",
			},
		},
		open: {
			on: {
				TOGGLE: "closed",
				SELECT_LIGHT: {
					target: "closed",
					actions: assign({
						theme: "light",
					}),
				},
				SELECT_DARK: {
					target: "closed",
					actions: assign({
						theme: "dark",
					}),
				},
				SELECT_SYSTEM: {
					target: "closed",
					actions: assign({
						theme: "system",
					}),
				},
			},
		},
	},
});

describe("Model-Based Testing Example - Theme Toggle", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should test all possible paths through the theme toggle state machine", async () => {
		// Create the test model with the new API
		const testModel = createTestModel(simpleThemeMachine, {
			states: {
				closed: async ({ expect }) => {
					// Verify dropdown is closed
					expect(screen.queryByText(/light/i)).not.toBeInTheDocument();
				},
				open: async ({ expect }) => {
					// Verify dropdown is open
					expect(screen.getByText(/light/i)).toBeInTheDocument();
					expect(screen.getByText(/dark/i)).toBeInTheDocument();
					expect(screen.getByText(/system/i)).toBeInTheDocument();
				},
			},
			events: {
				TOGGLE: {
					exec: async () => {
						const button = screen.getByRole("button", {
							name: /toggle theme/i,
						});
						await userEvent.click(button);
					},
				},
				SELECT_LIGHT: {
					exec: async () => {
						const lightOption = screen.getByText(/light/i);
						await userEvent.click(lightOption);
					},
				},
				SELECT_DARK: {
					exec: async () => {
						const darkOption = screen.getByText(/dark/i);
						await userEvent.click(darkOption);
					},
				},
				SELECT_SYSTEM: {
					exec: async () => {
						const systemOption = screen.getByText(/system/i);
						await userEvent.click(systemOption);
					},
				},
			},
		});

		// Generate all possible test paths
		const paths = testModel.getPaths();

		console.log(
			"🚀 ~ file: simple-model-test.tsx:107 → Total test paths generated:",
			paths.length,
		);

		// Execute each path
		for (const path of paths) {
			// Setup - render component fresh for each path
			const { unmount } = render(
				<ThemeProvider attribute="class" defaultTheme="system">
					<ModeToggle />
				</ThemeProvider>,
			);

			try {
				// Execute the path
				await path.test({ expect });

				console.log("✅ Path completed:", path.description);
			} finally {
				// Cleanup
				unmount();
			}
		}

		// Verify we have good coverage
		expect(paths.length).toBeGreaterThan(0);
		console.log(
			"🚀 ~ file: simple-model-test.tsx:128 → All paths tested successfully!",
		);
	});

	it("should verify specific scenarios work correctly", async () => {
		render(
			<ThemeProvider attribute="class" defaultTheme="system">
				<ModeToggle />
			</ThemeProvider>,
		);

		// Scenario 1: Open dropdown and select light theme
		const toggleButton = screen.getByRole("button", { name: /toggle theme/i });
		await userEvent.click(toggleButton);

		const lightOption = screen.getByText(/light/i);
		await userEvent.click(lightOption);

		expect(mockSetTheme).toHaveBeenCalledWith("light");

		// Dropdown should be closed
		expect(screen.queryByText(/dark/i)).not.toBeInTheDocument();

		// Scenario 2: Open again and select dark
		await userEvent.click(toggleButton);
		const darkOption = screen.getByText(/dark/i);
		await userEvent.click(darkOption);

		expect(mockSetTheme).toHaveBeenCalledWith("dark");
	});
});
