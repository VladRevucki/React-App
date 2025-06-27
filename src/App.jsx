import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
} from "react-router"
import { MainLayout } from "./components/MainLayout"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { QuestionPage } from "./pages/QuestionPage"
import { AddQuestionsPageLazy } from "./pages/AddQuestionsPage"
import { AuthProvider } from "./auth/AuthProvider"
import { useAuth } from "./hooks/useAuth"
import { ForbiddenPage } from "./pages/ForbiddenPage"
import EditQuestionPageLazy from "./pages/EditQuestionPage/EditQuestionPage.lazy"

const ProtectedRoutes = () => {
	const { isAuth } = useAuth()
	const location = useLocation()

	return isAuth ? (
		<Outlet />
	) : (
		<Navigate
			to="/forbidden"
			state={{ from: location.pathname }}
			replace={true}
		/>
	)
}

function App() {
	// return <MainLayout />
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/forbidden" element={<ForbiddenPage />} />
						<Route path="/question/:id" element={<QuestionPage />} />
						{/* защищенный роутер */}
						<Route element={<ProtectedRoutes />}>
							<Route path="/addquestion" element={<AddQuestionsPageLazy />} />
							<Route
								path="/editquestion/:id"
								element={<EditQuestionPageLazy />}
							/>
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
