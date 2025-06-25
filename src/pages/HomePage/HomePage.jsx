import { useEffect, useMemo, useRef, useState } from "react"
import cls from "./HomePage.module.css"
import { QuestionCard } from "../../components/QuestionCard"
import { API_URL } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList"
import { Loader } from "../../components/Loader"
import { useFetch } from "../../hooks/useFetch"
import { SearchInput } from "../../components/SearchInput"
import { Button } from "../../components/Button"

const DEFAULT_PER_PAGE = 10

export const HomePage = () => {
	const [questions, setQuestions] = useState({})

	const [searchParams, setSearchParams] = useState(
		`?_page=1&_per_page=${DEFAULT_PER_PAGE}`
	)
	/**добавление события для лоадера */
	// const [isLoading, setIsLoading] = useState(false)

	const [searchValue, setSearchValue] = useState("")

	const [sortSelectValue, setSortSelectValue] = useState("")

	const controlsContainerRef = useRef()

	/**функция для выделения кнопки пагинации */
	const getActivePageNumber = () =>
		questions.next === null ? questions.last : questions.next - 1
	///

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

	/**поиск элементов по инпуту */
	const cards = useMemo(() => {
		if (questions?.data) {
			if (searchValue.trim()) {
				return questions.data.filter(d =>
					d.question.toLowerCase().includes(searchValue.trim().toLowerCase())
				)
			} else {
				return questions.data
			}
		}
		/**если же data нет, то возвращаем пустой массив */
		return []
	}, [questions, searchValue])

	/**отображение количества карточек на странице */
	const pagination = useMemo(() => {
		const totalCardsCount = questions?.pages || 0

		/**формируем массив из полученного количества страниц */
		return Array(totalCardsCount)
			.fill(0)
			.map((_, i) => i + 1)
	}, [questions])

	useEffect(() => {
		getQuestions(`react${searchParams}`)
	}, [
		searchParams,
	]) /**если пустой массив, отработает один раз, когда отработает компонент */

	/**	getQuestions() если так вызывать функцию, чтобы элементы отображались при загрузке страницы, то будет бесконечный рендеринг */

	const onSortSelectChangeHandler = e => {
		setSortSelectValue(e.target.value)

		setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`)
	}

	const onSearchChangeHandler = e => {
		setSearchValue(e.target.value)
	}

	const paginationHandler = e => {
		if (e.target.tagName === "BUTTON") {
			setSearchParams(
				`?_page=${e.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`
			)
			/**для скролла вверх при клике на кнопку пагинации */
			controlsContainerRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<>
			<div className={cls.controlsContainer} ref={controlsContainerRef}>
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

			{cards.length === 0 ? (
				<p className={cls.noCardsInfo}>Не найдено...</p>
			) : (
				<div className={cls.paginationContainer} onClick={paginationHandler}>
					{pagination.map(value => {
						return (
							<Button key={value} isActive={value === getActivePageNumber()}>
								{value}
							</Button>
						)
					})}
				</div>
			)}
		</>
	)
}
