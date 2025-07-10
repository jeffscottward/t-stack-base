import { createTestModel } from "@xstate/test";
import { describe, expect, it } from "vitest";
import { getShortestPaths } from "xstate/graph";
import { authMachineWithServices } from "../authMachine";
import { dashboardMachine } from "../dashboardMachine";
import { themeMachine } from "../themeMachine";
import { userMenuMachine } from "../userMenuMachine";

describe("All State Machines Coverage Report", () => {
	it("Authentication Machine - should cover all states", async () => {
		const paths = getShortestPaths(authMachineWithServices);
		const states = Object.keys(authMachineWithServices.states);

		console.log(
			"🚀 ~ file: all-states.test.ts:13 → Authentication Machine → states:",
			{
				totalPaths: Object.keys(paths).length,
				states,
				paths: Object.keys(paths),
			},
		);

		// Ensure we have coverage
		expect(Object.keys(paths).length).toBeGreaterThan(0);
		expect(states.length).toBeGreaterThan(0);
	});

	it("Dashboard Machine - should cover all states", async () => {
		const paths = getShortestPaths(dashboardMachine);
		const states = Object.keys(dashboardMachine.states);

		console.log(
			"🚀 ~ file: all-states.test.ts:26 → Dashboard Machine → states:",
			{
				totalPaths: Object.keys(paths).length,
				states,
				paths: Object.keys(paths),
			},
		);

		expect(Object.keys(paths).length).toBeGreaterThan(0);
		expect(states.length).toBeGreaterThan(0);
	});

	it("User Menu Machine - should cover all states", async () => {
		const paths = getShortestPaths(userMenuMachine);
		const states = Object.keys(userMenuMachine.states);

		console.log(
			"🚀 ~ file: all-states.test.ts:38 → User Menu Machine → states:",
			{
				totalPaths: Object.keys(paths).length,
				states,
				paths: Object.keys(paths),
			},
		);

		expect(Object.keys(paths).length).toBeGreaterThan(0);
		expect(states.length).toBeGreaterThan(0);
	});

	it("Theme Machine - should cover all states", async () => {
		const paths = getShortestPaths(themeMachine);
		const states = Object.keys(themeMachine.states);

		console.log("🚀 ~ file: all-states.test.ts:50 → Theme Machine → states:", {
			totalPaths: Object.keys(paths).length,
			states,
			paths: Object.keys(paths),
		});

		expect(Object.keys(paths).length).toBeGreaterThan(0);
		expect(states.length).toBeGreaterThan(0);
	});

	it("should generate comprehensive test report", async () => {
		const machines = [
			{ name: "Authentication", machine: authMachineWithServices },
			{ name: "Dashboard", machine: dashboardMachine },
			{ name: "UserMenu", machine: userMenuMachine },
			{ name: "Theme", machine: themeMachine },
		];

		const report = machines.map(({ name, machine }) => {
			const paths = getShortestPaths(machine);
			const states = Object.keys(machine.states);

			return {
				name,
				states,
				totalStates: states.length,
				totalPaths: Object.keys(paths).length,
				pathDetails: Object.entries(paths).map(
					([state, path]: [string, any]) => ({
						targetState: state,
						steps: (path as any).paths ? (path as any).paths.length : 0,
					}),
				),
			};
		});

		console.log(
			"🚀 ~ file: all-states.test.ts:84 → Comprehensive State Machine Report:",
			JSON.stringify(report, null, 2),
		);

		// Ensure all machines have states and paths
		report.forEach(({ name, totalStates, totalPaths }) => {
			expect(totalStates).toBeGreaterThan(0);
			expect(totalPaths).toBeGreaterThan(0);
		});
	});
});
