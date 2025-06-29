import { useActionState } from "react"
import { Button } from "../../components/Button"
import cls from "./AddQuestionsPage.module.css"
import { delayFn } from "../../helpers/delayFn"
import { toast } from "react-toastify"
import { API_URL } from "../../constants"
import { Loader } from "../../components/Loader"
import { QuestionForm } from "../../components/QuestionForm"

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

		if (response.status === 404) {
			throw new Error(response.statusText)
		}
		const question = await response.json()
		toast.success("Новый вопрос успешно создан")
		return isClearForm ? {} : question
	} catch (error) {
		toast(error.message)
		return {}
	}
}

const AddQuestionsPage = () => {
	const [formState, formAction, isPending] = useActionState(createCardAction, {
		clearForm: true,
	})

	return (
		<>
			{isPending && <Loader />}

			<h1 className={cls.formTitle}>Добавить новый вопрос</h1>
			<div className={cls.formContainer}>
				<QuestionForm
					state={formState}
					formAction={formAction}
					isPending={isPending}
					submitBtnText={"Добавить вопрос"}
				/>
			</div>
		</>
	)
}

export default AddQuestionsPage
