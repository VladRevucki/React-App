import { Button } from "../Button"
import cls from "./QuestionForm.module.css"

export const QuestionForm = ({
	formAction,
	state,
	isPending,
	submitBtnText,
}) => {
	return (
		<form action={formAction} className={cls.form}>
			<input type="text" name="questionId" defaultValue={state.id} hidden />

			<div className={cls.formControl}>
				<label htmlFor="questionField">Вопрос:</label>
				<textarea
					defaultValue={state.question}
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
					defaultValue={state.answer}
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
					defaultValue={state.description}
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
					defaultValue={state.resources}
					name="resources"
					id="resourcesField"
					cols="30"
					rows="5"
					placeholder="пожалуйста введите ресурсы, разделенные запятыми"
				></textarea>
			</div>

			<div className={cls.formControl}>
				<label htmlFor="levelField">Уровень:</label>
				<select
					defaultValue={state.level}
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
					defaultChecked={state.clearForm}
					className={cls.checkbox}
				/>
				<span>очистить форму</span>
			</label>

			<Button isDisabled={isPending}>{submitBtnText}</Button>
		</form>
	)
}
