import { useState } from 'react'
import { Button } from './components/Button/Button'

// export const Counter = () => {
// 	let count = 1

// 	return <button onClick={() => ++count}>count is {count}</button>
// }

/**с использованием хуков */
export const Counter = () => {
	const [count, setCounter] = useState(0)

	const setCounterHandler = () => {
		// setCounter(count + 1) - асинхронный вариант
		setCounter(prev => prev + 1) /**синхронный */
	}
	return <Button onClick={setCounterHandler}>count is {count}</Button>
	// return <button onClick={setCounterHandler}>count is {count}</button>
	// или реализовать через написание функции прямо в onClick: return <button onClick={() => setCounter(count + 1)}>count is {count}</button>
}
