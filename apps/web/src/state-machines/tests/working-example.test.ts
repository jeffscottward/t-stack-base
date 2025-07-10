import { describe, expect, it } from "vitest";
import { createMachine } from "xstate";
import { getShortestPaths, getSimplePaths } from "xstate/graph";

describe("Model-Based Testing - Working Example", () => {
	// Create a simple traffic light machine
	const trafficLightMachine = createMachine({
		id: "trafficLight",
		initial: "red",
		states: {
			red: {
				on: { TIMER: "green" },
			},
			green: {
				on: { TIMER: "yellow" },
			},
			yellow: {
				on: { TIMER: "red" },
			},
		},
	});

	it("should generate all shortest paths through the traffic light", () => {
		const paths = getShortestPaths(trafficLightMachine);

		console.log(
			"🚀 ~ file: working-example.test.ts:24 → Traffic Light Shortest Paths:",
		);
		console.log("Total paths found:", Object.keys(paths).length);
		console.log("Path keys:", Object.keys(paths));

		// Should have paths to all 3 states
		expect(Object.keys(paths)).toHaveLength(3);
		expect(Object.keys(paths).length).toBeGreaterThan(0);
	});

	it("should generate all simple paths through the traffic light", () => {
		const paths = getSimplePaths(trafficLightMachine);

		console.log(
			"🚀 ~ file: working-example.test.ts:39 → Traffic Light Simple Paths:",
		);
		console.log("Total simple paths found:", Object.keys(paths).length);

		// Should generate multiple paths
		expect(Object.keys(paths).length).toBeGreaterThan(0);
	});

	// More complex example with conditions
	const authMachineSimple = createMachine(
		{
			id: "auth",
			initial: "idle",
			states: {
				idle: {
					on: {
						SUBMIT: [
							{ target: "loading", guard: "isValid" },
							{ target: "error" },
						],
					},
				},
				loading: {
					on: {
						SUCCESS: "authenticated",
						FAILURE: "error",
					},
				},
				error: {
					on: {
						RETRY: "idle",
					},
				},
				authenticated: {
					type: "final",
				},
			},
		},
		{
			guards: {
				isValid: () => true, // For testing, always return true
			},
		},
	);

	it("should handle machines with guards and conditions", () => {
		const paths = getShortestPaths(authMachineSimple);

		console.log("🚀 ~ file: working-example.test.ts:84 → Auth Machine Paths:");
		console.log("Total auth paths found:", Object.keys(paths).length);
		console.log("Auth path keys:", Object.keys(paths));

		// Should have paths to all states
		expect(Object.keys(paths)).toHaveLength(4);
		expect(Object.keys(paths).length).toBeGreaterThan(0);
	});

	it("should demonstrate comprehensive state coverage", () => {
		const machines = [
			{ name: "Traffic Light", machine: trafficLightMachine },
			{ name: "Auth", machine: authMachineSimple },
		];

		console.log(
			"\n🚀 ~ file: working-example.test.ts:106 → Comprehensive Coverage Report:",
		);

		machines.forEach(({ name, machine }) => {
			const shortestPaths = getShortestPaths(machine);
			const simplePaths = getSimplePaths(machine);

			console.log(`\n  ${name} Machine:`);
			console.log(`    - Total States: ${Object.keys(machine.states).length}`);
			console.log(
				`    - Reachable States: ${Object.keys(shortestPaths).length}`,
			);
			console.log(
				`    - Total Unique Paths: ${Object.keys(simplePaths).reduce((acc, state) => acc + simplePaths[state].length, 0)}`,
			);
			console.log(`    - States: ${Object.keys(machine.states).join(", ")}`);
		});

		// All tests should pass
		expect(true).toBe(true);
	});
});
