import { useEffect, useState } from "react"
import cls from "./HomePage.module.css"
import { QuestionCard } from "../../components/QuestionCard"
import { API_URL } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList"
import { Loader } from "../../components/Loader"
import { delayFn } from "../../helpers/delayFn"
import { useFetch } from "../../hooks/useFetch"

export const HomePage = () => {
	const [questions, setQuestions] = useState([])
	/**добавление события для лоадера */
	// const [isLoading, setIsLoading] = useState(false)

	const [getQuestions, isLoading, error] = useFetch(async url => {
		const response = await fetch(`${API_URL}/${url}`)
		const questions = await response.json()

		setQuestions(questions)
		return questions
	})

	// const _getQuestions = async () => {
	// 	try {
	// 		setIsLoading(true) /**запуск лоадера */
	// 		await delayFn() /**отображение асинхр.функции запуска лоадера */

	// 		const response = await fetch(`${API_URL}/react`)
	// 		const questions = await response.json()

	// 		setQuestions(questions)

	// 		console.log("questions", questions)
	// 	} catch (error) {
	// 		console.error(error)
	// 	} finally {
	// 		setIsLoading(false)
	// 	}
	// }

	useEffect(() => {
		getQuestions("react")
	}, []) /**если пустой массив, отработает один раз, когда отработает компонент */

	/**	getQuestions() если так вызывать функцию, чтобы элементы отображались при загрузке страницы, то будет бесконечный рендеринг */

	return (
		<>
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<QuestionCardList cards={questions} />
		</>
	)
}
