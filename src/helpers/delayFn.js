export const delayFn = async (delay = 1000) => {
	return await new Promise(res =>
		setTimeout(res, delay)
	) /**отображение лоадера через 1 сек */
}
