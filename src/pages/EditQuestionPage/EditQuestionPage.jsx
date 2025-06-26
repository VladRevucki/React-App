import { useParams } from "react-router-dom"
import cls from "./EditQuestionPage.module.css"
import { useFetch } from "../../hooks/useFetch"
import { API_URL } from "../../constants"
import { useEffect, useState } from "react"
import { Loader } from "../../components/Loader"
import { EditQuestion } from "./EditQuestion"

export const EditQuestionPage = () => {
	const { id } = useParams()
	const [question, setQuestion] = useState(null)
	const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
		const response = await fetch(`${API_URL}/react/${id}`)
		const data = await response.json()

		setQuestion(data)
	})

	useEffect(() => {
		fetchQuestion()
	}, [])

	return (
		<>
			{isQuestionLoading && <Loader />}
			{question && <EditQuestion initialState={question} />}
		</>
	)
}
