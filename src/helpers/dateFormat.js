export const dateFormat = date => {
	return Intl.DateTimeFormat("ru-RU", {
		day: "numeric",
		month: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
	}).format(date)
}
