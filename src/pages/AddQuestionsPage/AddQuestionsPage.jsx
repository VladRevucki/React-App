import { useActionState } from "react"
import { Button } from "../../components/Button"
import cls from "./AddQuestionsPage.module.css"
import { delayFn } from "../../helpers/delayFn"
import { toast } from "react-toastify"
import { API_URL } from "../../constants"

const createCardAction = async (_prevState, formData) => {
	try {
		await delayFn()

		const newQuestion = Object.fromEntries(formData)
		const resourses = newQuestion.resources.trim()
		const isClearForm =
			newQuestion.clearForm /**или =formData.get("clearForm") */

		const response = await fetch(`${API_URL}/react`, {
			method: "POST",
			body: JSON.stringify({
				question: newQuestion.question,
				answer: newQuestion.answer,
				description: newQuestion.description,
				resources: resourses.length ? resourses.split(",") : [],
				level: +newQuestion.level,
				completed: false,
				editDate: undefined,
			}),
		})
		const question = await response.json()
		toast.success("Новый вопрос успешно создан")
		return isClearForm ? {} : question
	} catch (error) {
		toast(error.message)
	}
}

export const AddQuestionsPage = () => {
	const [formState, formAction, isPending] = useActionState(createCardAction, {
		clearForm: true,
	})

	return (
		<>
			<h1 className={cls.formTitle}>Добавить новый вопрос</h1>
			<div className={cls.formContainer}>
				<form action={formAction} className={cls.form}>
					<div className={cls.formControl}>
						<label htmlFor="questionField">Вопрос:</label>
						<textarea
							defaultValue={formState.question}
							name="question"
							id="questionField"
							cols="30"
							rows="2"
							required
							placeholder="пожалуйста введите вопрос"
						></textarea>
					</div>

					<div className={cls.formControl}>
						<label htmlFor="answerField">Короткий ответ:</label>
						<textarea
							defaultValue={formState.answer}
							name="answer"
							id="answerField"
							cols="30"
							rows="2"
							required
							placeholder="пожалуйста введите короткий ответ"
						></textarea>
					</div>

					<div className={cls.formControl}>
						<label htmlFor="descriptionField">Описание:</label>
						<textarea
							defaultValue={formState.description}
							name="description"
							id="descriptionField"
							cols="30"
							rows="5"
							required
							placeholder="пожалуйста введите полное описание"
						></textarea>
					</div>

					<div className={cls.formControl}>
						<label htmlFor="resourcesField">Ресурсы:</label>
						<textarea
							defaultValue={formState.resources}
							name="resources"
							id="resourcesField"
							cols="30"
							rows="5"
							required
							placeholder="пожалуйста введите ресурсы, разделенные запятыми"
						></textarea>
					</div>

					<div className={cls.formControl}>
						<label htmlFor="levelField">Уровень:</label>
						<select
							defaultValue={formState.level}
							name="level"
							id="levelField"
							className={cls.select}
						>
							<option disabled>Уровень вопроса</option>
							<hr />
							<option value="1">1 - легкий</option>
							<option value="2">2 - средний</option>
							<option value="3">3 - сложный</option>
						</select>
					</div>

					<label htmlFor="clearFormControl" className={cls.clearFormControl}>
						<input
							type="checkbox"
							name="clearForm"
							id="clearFormControl"
							defaultChecked={formState.clearForm}
							className={cls.checkbox}
						/>
						<span>очистить форму</span>
					</label>

					<Button isDisabled={isPending}>Добавить вопрос</Button>
				</form>
			</div>
		</>
	)
}
