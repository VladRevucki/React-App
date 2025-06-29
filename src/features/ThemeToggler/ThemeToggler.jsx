import { THEME_STORAGE } from "../../constants"
import { useTheme } from "../../hooks/useTheme"
import cls from "./ThemeToggler.module.css"

export const ThemeToggler = () => {
	const { theme, setTheme } = useTheme()

	const onChangeHandler = e => {
		const isChecked = e.target.checked === true
		const updatedTheme = isChecked ? "dark" : "light"
		setTheme(updatedTheme)

		isChecked
			? document.body.classList.add("darkLayout")
			: document.body.classList.remove("darkLayout")

		localStorage.setItem(THEME_STORAGE, updatedTheme)
	}

	return (
		<label className={cls.switch}>
			<input
				type="checkbox"
				onChange={onChangeHandler}
				checked={theme === "dark"}
			/>
			<span className={cls.slider}></span>
			<span className={cls.decoration}></span>
		</label>
	)
}
