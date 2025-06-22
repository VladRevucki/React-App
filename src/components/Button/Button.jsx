import {} from 'react'
/**cls - название всего файла css, а если нужен конкретный класс в нем, то дописать, например: ".btn" */
import cls from './Button.module.css'

// const inlineStyles = {
// 	color: 'lightsalmon',
// }

const isPrimary = true

/*
*export const Button = props => {
	const { onClick, children } = props 
	или же прописать деструктуризацию прямо в параметрах */
export const Button = ({ onClick, children }) => {
	return (
		// <button
		// 	className={isPrimary ? cls.primary : cls.btn}
		// 	// style={
		// 	// 	inlineStyles
		// 	// } /*
		// * или напрямую без переменной style={{ color: 'lightsalmon' }} */
		// >
		// 	Кнопка{' '}
		// </button>
		<button
			className={`${cls.btn} ${isPrimary ? cls.primary : ''} `}
			onClick={onClick}
			/*
			 *или так если без деструктуризации: onClick={props.onClick}*/
		>
			{children}
		</button>
	)
}
