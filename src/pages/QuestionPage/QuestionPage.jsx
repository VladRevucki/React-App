import { useEffect, useId, useState } from "react"
import cls from "./QuestionPage.module.css"
import { Badge } from "../../components/Badge"
import { Button } from "../../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { API_URL } from "../../constants"
import { Loader, SmallLoader } from "../../components/Loader"

export const QuestionPage = () => {
	const checkboxId = useId()
	const navigate = useNavigate()
	const [isChecked, setIsChecked] = useState(true)
	/**для получения карточек с сервера */
	const [card, setCard] = useState(null)

	const { id } = useParams()

	const onCheckboxChangeHandler = () => {
		setIsChecked(!isChecked)
		updateCard(!isChecked)
	}

	const levelVariant = () =>
		card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert"

	const completedVariant = () => (card.completed ? "success" : "primary")

	const [fetchCard, isCardLoading] = useFetch(async () => {
		const response = await fetch(`${API_URL}/react/${id}`)
		const data = await response.json()

		setCard(data)
	})

	const [updateCard, isCardUpdating] = useFetch(async isChecked => {
		const response = await fetch(`${API_URL}/react/${id}`, {
			method: "PATCH",
			body: JSON.stringify({ completed: isChecked }),
		})
		const data = await response.json()

		setCard(data)
	})

	useEffect(() => {
		fetchCard()
	}, [])

	useEffect(() => {
		card !== null && setIsChecked(card.completed)
	}, [card])

	return (
		<>
			{isCardLoading && <Loader />}

			{card !== null && (
				<div className={cls.container}>
					<div className={cls.cardLabels}>
						<Badge variant={levelVariant()}>Level: {card.level}</Badge>
						<Badge variant={completedVariant()}>
							{card.completed ? "Выполнен" : "Не выполнен"}
						</Badge>
						{card?.editDate && (
							<p className={cls.editDate}>Изменено: {card.editDate}</p>
						)}
					</div>
					<h5 className={cls.cardTitle}>{card.question}</h5>
					<p className={cls.description}>{card.description}</p>

					<div className={cls.cardAnswers}>
						<label>короткий ответ:</label>
						<p className={cls.cardAnswer}>{card.answer}</p>
					</div>

					<ul className={cls.cardLinks}>
						Ресурсы:
						{card.resources.map((link, index) => {
							return (
								<li key={index}>
									<a href={link.trim()} target="_blank">
										{link.trim()}
									</a>
								</li>
							)
						})}
					</ul>

					<label htmlFor={checkboxId} className={cls.cardCheckbox}>
						<input
							type="checkbox"
							id={checkboxId}
							className={cls.checkbox}
							checked={isChecked}
							onChange={onCheckboxChangeHandler}
							disabled={isCardUpdating}
						/>
						<span>отметить вопрос как завершенный</span>
						{isCardUpdating && <SmallLoader />}
					</label>

					<Button
						onClick={() => {
							navigate(`/editquestion/${card.id}`)
						}}
						isDisabled={isCardUpdating}
					>
						Изменить вопрос
					</Button>
					<Button
						onClick={() => {
							navigate("/")
						}}
						isDisabled={isCardUpdating}
					>
						Назад
					</Button>
				</div>
			)}
		</>
	)
}
