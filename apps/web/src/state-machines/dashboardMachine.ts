import { assign, createMachine } from "xstate";

export interface DashboardContext {
	isAuthenticated: boolean;
	userData: any | null;
	error: string | null;
}

export type DashboardEvent =
	| { type: "CHECK_AUTH" }
	| { type: "AUTH_SUCCESS"; userData: any }
	| { type: "AUTH_FAILURE" }
	| { type: "FETCH_DATA" }
	| { type: "DATA_SUCCESS"; data: any }
	| { type: "DATA_ERROR"; error: string }
	| { type: "SIGN_OUT" };

export const dashboardMachine = createMachine<DashboardContext, DashboardEvent>(
	{
		id: "dashboard",
		initial: "checkingAuth",
		context: {
			isAuthenticated: false,
			userData: null,
			error: null,
		},
		states: {
			checkingAuth: {
				on: {
					AUTH_SUCCESS: {
						target: "authenticated",
						actions: assign({
							isAuthenticated: true,
							userData: (_, event) => event.userData,
						}),
					},
					AUTH_FAILURE: "unauthenticated",
				},
			},
			authenticated: {
				initial: "idle",
				states: {
					idle: {
						on: {
							FETCH_DATA: "fetchingData",
						},
					},
					fetchingData: {
						on: {
							DATA_SUCCESS: {
								target: "idle",
								actions: assign({
									userData: (context, event) => ({
										...context.userData,
										...event.data,
									}),
								}),
							},
							DATA_ERROR: {
								target: "idle",
								actions: assign({
									error: (_, event) => event.error,
								}),
							},
						},
					},
				},
				on: {
					SIGN_OUT: "signingOut",
				},
			},
			unauthenticated: {
				type: "final",
			},
			signingOut: {
				on: {
					AUTH_FAILURE: "unauthenticated",
				},
			},
		},
	},
);
