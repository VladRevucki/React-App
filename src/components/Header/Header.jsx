import {} from "react"
import { Button } from "../Button"
import cls from "./Header.module.css"
import ReactLogo from "../../assets/react.svg"
import { useNavigate } from "react-router-dom"

export const Header = () => {
	const navigate = useNavigate()

	return (
		<header className={cls.header}>
			<p onClick={() => navigate("/")}>
				<img src={ReactLogo} alt="react logo" />
				<span>ReactCards</span>
			</p>

			<div className={cls.headerButton}>
				<Button onClick={() => navigate("/addquestion")}>Add</Button>
				<Button>Login</Button>
			</div>
		</header>
	)
}
