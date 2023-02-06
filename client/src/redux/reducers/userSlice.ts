import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUser } from "../../types";

// Define a type for the slice state
interface UserState {
	value: IUser | null;
}

// Define the initial state using that type
const initialState: UserState = {
	value: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.value = action.payload;
		},
		logoutUser: state => {
			state.value = null;
		},
	},
});

export const { setUser, logoutUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
