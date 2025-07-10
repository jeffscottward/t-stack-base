import { assign, setup } from "xstate";

export interface AuthContext {
	mode: "signin" | "signup";
	formData: {
		email: string;
		password: string;
		name?: string;
	};
	error: string | null;
}

export type AuthEvent =
	| { type: "TOGGLE_MODE" }
	| { type: "INPUT_EMAIL"; value: string }
	| { type: "INPUT_PASSWORD"; value: string }
	| { type: "INPUT_NAME"; value: string }
	| { type: "SUBMIT" }
	| { type: "VALIDATION_ERROR"; error: string }
	| { type: "SUBMIT_SUCCESS" }
	| { type: "SUBMIT_ERROR"; error: string }
	| { type: "RESET" };

export const authMachine = setup({
	types: {
		context: {} as AuthContext,
		events: {} as AuthEvent,
	},
	guards: {
		isFormValid: ({ context }) => {
			const { email, password, name } = context.formData;
			const { mode } = context;

			if (!email || !password) return false;
			if (mode === "signup" && !name) return false;
			if (password.length < 8) return false;
			if (!email.includes("@")) return false;

			return true;
		},
	},
}).createMachine({
	id: "auth",
	initial: "idle",
	context: {
		mode: "signin",
		formData: {
			email: "",
			password: "",
			name: "",
		},
		error: null,
	},
	states: {
		idle: {
			on: {
				TOGGLE_MODE: {
					target: "idle",
					actions: assign({
						mode: ({ context }) =>
							context.mode === "signin" ? "signup" : "signin",
						error: () => null,
						formData: () => ({
							email: "",
							password: "",
							name: "",
						}),
					}),
				},
				INPUT_EMAIL: {
					actions: assign({
						formData: ({ context, event }) => ({
							...context.formData,
							email: event.value,
						}),
						error: () => null,
					}),
				},
				INPUT_PASSWORD: {
					actions: assign({
						formData: ({ context, event }) => ({
							...context.formData,
							password: event.value,
						}),
						error: () => null,
					}),
				},
				INPUT_NAME: {
					actions: assign({
						formData: ({ context, event }) => ({
							...context.formData,
							name: event.value,
						}),
						error: () => null,
					}),
				},
				SUBMIT: "validating",
			},
		},
		validating: {
			always: [
				{
					target: "submitting",
					guard: "isFormValid",
				},
				{
					target: "idle",
					actions: assign({
						error: ({ context }) => {
							if (!context.formData.email) return "Email is required";
							if (!context.formData.password) return "Password is required";
							if (context.mode === "signup" && !context.formData.name)
								return "Name is required";
							if (context.formData.password.length < 8)
								return "Password must be at least 8 characters";
							if (!context.formData.email.includes("@"))
								return "Invalid email format";
							return "Invalid form data";
						},
					}),
				},
			],
		},
		submitting: {
			on: {
				SUBMIT_SUCCESS: "success",
				SUBMIT_ERROR: {
					target: "idle",
					actions: assign({
						error: ({ event }) => event.error,
					}),
				},
			},
		},
		success: {
			type: "final",
		},
	},
});

export const authMachineWithServices = authMachine;
