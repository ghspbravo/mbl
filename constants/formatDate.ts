export function normalizeDate(date: string) {
	if (!date) return "";
	return date.replace(/\./g, "-");
}
