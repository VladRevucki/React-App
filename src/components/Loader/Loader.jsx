import {} from "react"
import cls from "./Loader.module.css"

export const Loader = () => {
	return (
		<div className={cls.backdrop}>
			<span class={cls.loader}></span>
		</div>
	)
}
