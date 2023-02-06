import { IUser } from "../../types";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<
			{ token: string; id: string },
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
