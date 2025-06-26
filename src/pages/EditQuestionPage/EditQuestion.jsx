import { useActionState } from "react"
import cls from "./EditQuestionPage.module.css"
import { QuestionForm } from "../../components/QuestionForm"
import { Loader } from "../../components/Loader"
import { delayFn } from "../../helpers/delayFn"
import { dateFormat } from "../../helpers/dateFormat"
import { API_URL } from "../../constants"
import { toast } from "react-toastify"

const editCardAction = async (_prevState, formData) => {
	try {
		await delayFn()

		const newQuestion = Object.fromEntries(formData)
		const resourses = newQuestion.resources.trim()
		const isClearForm = newQuestion.clearForm
		const questionId = newQuestion.questionId

		const response = await fetch(`${API_URL}/react/${questionId}`, {
			method: "PATCH",
			body: JSON.stringify({
				question: newQuestion.question,
				answer: newQuestion.answer,
				description: newQuestion.description,
				resources: resourses.length ? resourses.split(",") : [],
				level: +newQuestion.level,
				completed: false,
				editDate: dateFormat(new Date()),
			}),
		})

		if (response.status === 404) {
			throw new Error(response.statusText)
		}
		const question = await response.json()
		toast.success("Вопрос успешно изменен")
		return isClearForm ? {} : question
	} catch (error) {
		toast(error.message)
		return {}
	}
}

export const EditQuestion = ({ initialState = {} }) => {
	const [formState, formAction, isPending] = useActionState(editCardAction, {
		...initialState,
		clearForm: false,
	})

	return (
		<>
			{isPending && <Loader />}

			<h1 className={cls.formTitle}>Изменить вопрос</h1>
			<div className={cls.formContainer}>
				<QuestionForm
					state={formState}
					formAction={formAction}
					isPending={isPending}
					submitBtnText={"Изменить вопрос"}
				/>
			</div>
		</>
	)
}
