import { Button } from "../../components/Button"
import cls from "./AddQuestionsPage.module.css"

export const AddQuestionsPage = () => {
	return (
		<>
			<h1 className={cls.formTitle}>Добавить новый вопрос</h1>
			<div className={cls.formContainer}>
				<form action="" className={cls.form}>
					<div className={cls.formControl}>
						<label htmlFor="questionField">Вопрос:</label>
						<textarea
							defaultValue={"defaultValue"}
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
							defaultValue={"defaultValue"}
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
							defaultValue={"defaultValue"}
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
							defaultValue={"defaultValue"}
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
							name="level"
							id="levelField"
							defaultValue={"defaultValue"}
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
							defaultValue={true}
							className={cls.checkbox}
						/>
						<span>очистить форму</span>
					</label>

					<Button>Добавить вопрос</Button>
				</form>
			</div>
		</>
	)
}
