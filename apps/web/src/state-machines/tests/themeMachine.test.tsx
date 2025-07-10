import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTestModel } from "@xstate/test";
import { vi } from "vitest";
import { ModeToggle } from "../../components/mode-toggle";
import { ThemeProvider } from "../../components/theme-provider";
import { themeMachine } from "../themeMachine";

// Mock next-themes
const mockSetTheme = vi.fn();
vi.mock("next-themes", () => ({
	useTheme: () => ({
		theme: "system",
		setTheme: mockSetTheme,
	}),
}));

// Create the test model
const testModel = createTestModel(themeMachine).withEvents({
	TOGGLE_DROPDOWN: async () => {
		const button = screen.getByRole("button", { name: /toggle theme/i });
		await userEvent.click(button);
	},
	OPEN_DROPDOWN: async () => {
		const button = screen.getByRole("button", { name: /toggle theme/i });
		await userEvent.click(button);
	},
	CLOSE_DROPDOWN: async () => {
		// Click outside the dropdown
		const body = document.body;
		await userEvent.click(body);
	},
	SET_LIGHT: async () => {
		const lightOption = screen.queryByText(/light/i);
		if (lightOption) {
			await userEvent.click(lightOption);
		}
	},
	SET_DARK: async () => {
		const darkOption = screen.queryByText(/dark/i);
		if (darkOption) {
			await userEvent.click(darkOption);
		}
	},
	SET_SYSTEM: async () => {
		const systemOption = screen.queryByText(/system/i);
		if (systemOption) {
			await userEvent.click(systemOption);
		}
	},
});

describe("Theme Toggle - Model Based Tests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const testPlans = testModel.getSimplePathPlans();

	testPlans.forEach((plan) => {
		describe(plan.description, () => {
			plan.paths.forEach((path) => {
				it(path.description, async () => {
					const { container } = render(
						<ThemeProvider attribute="class" defaultTheme="system">
							<ModeToggle />
						</ThemeProvider>,
					);

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
describe("Theme Toggle Specific Behaviors", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should show theme toggle button", () => {
		render(
			<ThemeProvider attribute="class" defaultTheme="system">
				<ModeToggle />
			</ThemeProvider>,
		);

		expect(
			screen.getByRole("button", { name: /toggle theme/i }),
		).toBeInTheDocument();
	});

	it("should open dropdown on click", async () => {
		render(
			<ThemeProvider attribute="class" defaultTheme="system">
				<ModeToggle />
			</ThemeProvider>,
		);

		const button = screen.getByRole("button", { name: /toggle theme/i });
		await userEvent.click(button);

		expect(screen.getByText(/light/i)).toBeInTheDocument();
		expect(screen.getByText(/dark/i)).toBeInTheDocument();
		expect(screen.getByText(/system/i)).toBeInTheDocument();
	});

	it("should change theme to light", async () => {
		render(
			<ThemeProvider attribute="class" defaultTheme="system">
				<ModeToggle />
			</ThemeProvider>,
		);

		const button = screen.getByRole("button", { name: /toggle theme/i });
		await userEvent.click(button);

		const lightOption = screen.getByText(/light/i);
		await userEvent.click(lightOption);

		expect(mockSetTheme).toHaveBeenCalledWith("light");
	});

	it("should change theme to dark", async () => {
		render(
			<ThemeProvider attribute="class" defaultTheme="system">
				<ModeToggle />
			</ThemeProvider>,
		);

		const button = screen.getByRole("button", { name: /toggle theme/i });
		await userEvent.click(button);

		const darkOption = screen.getByText(/dark/i);
		await userEvent.click(darkOption);

		expect(mockSetTheme).toHaveBeenCalledWith("dark");
	});

	it("should close dropdown after selection", async () => {
		render(
			<ThemeProvider attribute="class" defaultTheme="system">
				<ModeToggle />
			</ThemeProvider>,
		);

		const button = screen.getByRole("button", { name: /toggle theme/i });
		await userEvent.click(button);

		const lightOption = screen.getByText(/light/i);
		await userEvent.click(lightOption);

		// Dropdown should be closed
		expect(screen.queryByText(/dark/i)).not.toBeInTheDocument();
	});
});
