import { useEffect, useRef, useState } from "react"
import cls from "./HomePage.module.css"
import { QuestionCard } from "../../components/QuestionCard"
import { API_URL } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList"
import { Loader } from "../../components/Loader"
import { useFetch } from "../../hooks/useFetch"
import { SearchInput } from "../../components/SearchInput"

export const HomePage = () => {
	const [questions, setQuestions] = useState([])
	/**добавление события для лоадера */
	// const [isLoading, setIsLoading] = useState(false)

	const [searchValue, setSearchValue] = useState("")

	const [sortSelectValue, setSortSelectValue] = useState("")

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
	const cards = questions.filter(d =>
		d.question.toLowerCase().includes(searchValue.trim().toLowerCase())
	)

	useEffect(() => {
		getQuestions(`react?${sortSelectValue}`)
	}, [
		sortSelectValue,
	]) /**если пустой массив, отработает один раз, когда отработает компонент */

	/**	getQuestions() если так вызывать функцию, чтобы элементы отображались при загрузке страницы, то будет бесконечный рендеринг */

	const onSortSelectChangeHandler = e => {
		setSortSelectValue(e.target.value)
	}
	const onSearchChangeHandler = e => {
		setSearchValue(e.target.value)
	}

	return (
		<>
			<div className={cls.controlsContainer}>
				<SearchInput value={searchValue} onChange={onSearchChangeHandler} />
				<select
					value={sortSelectValue}
					onChange={onSortSelectChangeHandler}
					className={cls.select}
				>
					<option value="">sort by</option>
					<hr />
					<option value="_sort=level">level ASC</option>
					<option value="_sort=-level">level DESC</option>
					<option value="_sort=completed">completed ASC</option>
					<option value="_sort=-completed">completed DESC</option>
				</select>
			</div>
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<QuestionCardList cards={cards} />
			{cards.length === 0 && <p className={cls.noCardsInfo}>Не найдено...</p>}
		</>
	)
}
