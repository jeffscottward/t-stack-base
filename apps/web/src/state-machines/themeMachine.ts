import { assign, setup } from "xstate";

export interface ThemeContext {
	theme: "light" | "dark" | "system";
	isOpen: boolean;
}

export type ThemeEvent =
	| { type: "TOGGLE_DROPDOWN" }
	| { type: "OPEN_DROPDOWN" }
	| { type: "CLOSE_DROPDOWN" }
	| { type: "SET_LIGHT" }
	| { type: "SET_DARK" }
	| { type: "SET_SYSTEM" };

export const themeMachine = setup({
	types: {
		context: {} as ThemeContext,
		events: {} as ThemeEvent,
	},
}).createMachine({
	id: "theme",
	initial: "closed",
	context: {
		theme: "system",
		isOpen: false,
	},
	states: {
		closed: {
			on: {
				TOGGLE_DROPDOWN: "open",
				OPEN_DROPDOWN: "open",
			},
		},
		open: {
			on: {
				TOGGLE_DROPDOWN: "closed",
				CLOSE_DROPDOWN: "closed",
				SET_LIGHT: {
					target: "closed",
					actions: assign({
						theme: () => "light",
						isOpen: () => false,
					}),
				},
				SET_DARK: {
					target: "closed",
					actions: assign({
						theme: () => "dark",
						isOpen: () => false,
					}),
				},
				SET_SYSTEM: {
					target: "closed",
					actions: assign({
						theme: () => "system",
						isOpen: () => false,
					}),
				},
			},
		},
	},
});
