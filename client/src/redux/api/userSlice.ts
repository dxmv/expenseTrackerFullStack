// import { IUser } from "../../types";
import { IUser } from "../../types";
import { apiSlice } from "./apiSlice";

const MAIN_URL = "/users/";

export const userApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<
			{ data: { token: string; id: string }; success: boolean },
			{ username: string; password: string }
		>({
			query: user => ({
				url: "/login",
				method: "POST",
				body: user,
			}),
		}),
		register: build.mutation<
			{
				data: { username: string; password: string; email: string };
				success: boolean;
			},
			{ username: string; password: string; email: string }
		>({
			query: user => ({
				method: "POST",
				body: user,
				url: MAIN_URL,
			}),
		}),
		getCurrentUser: build.query<
			{
				data: IUser;
				success: boolean;
			},
			void
		>({
			query: () => ({
				url: `${MAIN_URL}/current`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLazyGetCurrentUserQuery,
} = userApi;
