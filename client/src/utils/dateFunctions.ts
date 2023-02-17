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

export const getDayWeekFromNumber = (num: number): string => {
	const map = new Map<number, string>();
	map.set(0, "Sunday");
	map.set(1, "Monday");
	map.set(2, "Tuesday");
	map.set(3, "Wednesday");
	map.set(4, "Thursday");
	map.set(5, "Friday");
	map.set(6, "Saturday");
	const res = map.get(num);
	return res ? res : "";
};

export const ISOstringToPrettier = (date?: string): string =>
	date ? date.split("-").reverse().join("/") : "";
