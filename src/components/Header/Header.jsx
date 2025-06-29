import {} from "react"
import { Button } from "../Button"
import cls from "./Header.module.css"
import ReactLogo from "../../assets/react.svg"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { AUTH_STORAGE } from "../../constants"
import { ThemeToggler } from "../../features/ThemeToggler"

export const Header = () => {
	const navigate = useNavigate()

	const { isAuth, setIsAuth } = useAuth()

	const loginHandler = () => {
		localStorage.setItem(AUTH_STORAGE, !isAuth)
		setIsAuth(!isAuth)
	}

	return (
		<header className={cls.header}>
			<p onClick={() => navigate("/")}>
				<img src={ReactLogo} alt="react logo" />
				<span>ReactCards</span>
			</p>

			<div className={cls.headerButton}>
				<ThemeToggler />
				{isAuth && (
					<Button onClick={() => navigate("/addquestion")}>Добавить</Button>
				)}
				<Button onClick={loginHandler} isActive={!isAuth}>
					{isAuth ? "Выход" : "Вход"}
				</Button>
			</div>
		</header>
	)
}
