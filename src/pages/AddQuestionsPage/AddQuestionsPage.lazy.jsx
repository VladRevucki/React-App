import { lazy } from "react"

/**для загрузки страницы AddQuestionsPage, он должен быть default*/
const AddQuestionsPageLazy = lazy(() => import("./AddQuestionsPage"))

export default AddQuestionsPageLazy
