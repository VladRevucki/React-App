import { BrowserRouter, Route, Routes } from "react-router"
import { MainLayout } from "./components/MainLayout"

function App() {
	// return <MainLayout />
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<div>HOME Router</div>} />
					<Route path="/forbidden" element={<div>forbidden</div>} />
					<Route path="/addquestion" element={<div>add question</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
