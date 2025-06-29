import { Suspense } from "react"
import cls from "./MainLayout.module.css"
import { Outlet } from "react-router"
import { Header } from "../Header"
import { ToastContainer } from "react-toastify"
import { Loader } from "../Loader"

export const MainLayout = () => {
	const currentYear = new Date().getFullYear()

	return (
		<>
			<div className={cls.mainLayout}>
				<Header />
				<div className={cls.mainWrapper}>
					<main className={cls.main}>
						<Suspense fallback={<Loader />}>
							<Outlet />
						</Suspense>
					</main>
					<footer className={cls.footer}>
						React Question Card Application | {currentYear} <br />
						by Vladislav Revutski
					</footer>
				</div>
			</div>
			<ToastContainer />
		</>
	)
}
