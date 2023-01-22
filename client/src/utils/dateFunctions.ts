export const getMonthNameFromNumber = (num: number): string => {
	const MONTHS = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	if (num < 0 || num > 11) {
		throw Error("Invalid month number");
	}
	return MONTHS[num];
};
