import { useEffect, useState } from "react"
import cls from "./HomePage.module.css"
import { QuestionCard } from "../../components/QuestionCard"
import { API_URL } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList"
import { Loader } from "../../components/Loader"

export const HomePage = () => {
	const [questions, setQuestions] = useState([])

	const getQuestions = async () => {
		try {
			const response = await fetch(`${API_URL}/react`)
			const questions = await response.json()

			setQuestions(questions)

			console.log("questions", questions)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getQuestions()
	}, []) /**если пустой массив, отработает один раз, когда отработает компонент */

	/**	getQuestions() если так вызывать функцию, чтобы элементы отображались при загрузке страницы, то будет бесконечный рендеринг */

	return (
		<>
			<Loader />
			<QuestionCardList cards={questions} />
		</>
	)
}
