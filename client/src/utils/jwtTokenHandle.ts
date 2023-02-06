const TOKEN_KEY = "EXPENSE_TOKEN";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const deleteToken = () => localStorage.removeItem(TOKEN_KEY);
export const setToken = (value: string) =>
	localStorage.setItem(TOKEN_KEY, value);
