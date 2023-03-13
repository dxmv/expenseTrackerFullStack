import { IFormError } from "../types";

export const setFormError = (
	setError: React.Dispatch<React.SetStateAction<any>>,
	value: string,
	key: string
): void => {
	setError((prev: any) => ({ ...prev, [key]: value }));
};
