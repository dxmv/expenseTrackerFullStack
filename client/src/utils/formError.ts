import { IFormError } from "../types";

export const setFormError = (
	setError: React.Dispatch<React.SetStateAction<IFormError>>,
	value: string,
	key: string
): void => {
	setError(prev => ({ ...prev, [key]: value }));
};
