// import { IUser } from "../../types";
import { apiSlice } from "./apiSlice";

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
	}),
	overrideExisting: false,
});

export const { useLoginMutation } = userApi;
