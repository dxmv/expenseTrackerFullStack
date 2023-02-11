import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/jwtTokenHandle";

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8080/",
		mode: "cors",
		prepareHeaders: (headers, api) => {
			const token = getToken();
			if (token) {
				headers.set("Authorization", `Bearer ${JSON.parse(token).jwt}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});
