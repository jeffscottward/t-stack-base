import { assign, createMachine } from "xstate";

export interface UserMenuContext {
	isOpen: boolean;
	user: { name: string; email: string } | null;
	isLoading: boolean;
}

export type UserMenuEvent =
	| { type: "TOGGLE" }
	| { type: "OPEN" }
	| { type: "CLOSE" }
	| { type: "LOAD_USER" }
	| { type: "USER_LOADED"; user: { name: string; email: string } }
	| { type: "USER_NOT_FOUND" }
	| { type: "SIGN_OUT" }
	| { type: "SIGN_OUT_SUCCESS" };

export const userMenuMachine = createMachine<UserMenuContext, UserMenuEvent>({
	id: "userMenu",
	initial: "loading",
	context: {
		isOpen: false,
		user: null,
		isLoading: true,
	},
	states: {
		loading: {
			on: {
				USER_LOADED: {
					target: "authenticated.closed",
					actions: assign({
						user: (_, event) => event.user,
						isLoading: false,
					}),
				},
				USER_NOT_FOUND: {
					target: "unauthenticated",
					actions: assign({
						isLoading: false,
					}),
				},
			},
		},
		authenticated: {
			initial: "closed",
			states: {
				closed: {
					on: {
						TOGGLE: "open",
						OPEN: "open",
					},
				},
				open: {
					on: {
						TOGGLE: "closed",
						CLOSE: "closed",
						SIGN_OUT: "#userMenu.signingOut",
					},
				},
			},
		},
		unauthenticated: {
			type: "final",
		},
		signingOut: {
			on: {
				SIGN_OUT_SUCCESS: "unauthenticated",
			},
		},
	},
});
