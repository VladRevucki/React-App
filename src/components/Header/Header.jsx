import {} from "react"
import { Button } from "../Button"
import cls from "./Header.module.css"
import ReactLogo from "../../assets/react.svg"

export const Header = () => {
	return (
		<header className={cls.header}>
			<p>
				<img src={ReactLogo} alt="react logo" />
				<span>ReactCards</span>
			</p>

			<div className={cls.headerButton}>
				<Button>Add</Button>
				<Button>Login</Button>
			</div>
		</header>
	)
}
