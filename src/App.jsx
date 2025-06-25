import { BrowserRouter, Route, Routes } from "react-router"
import { MainLayout } from "./components/MainLayout"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { QuestionPage } from "./pages/QuestionPage"

function App() {
	// return <MainLayout />
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/forbidden" element={<div>forbidden</div>} />
					<Route path="/addquestion" element={<div>add question</div>} />
					<Route path="/question/:id" element={<QuestionPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
