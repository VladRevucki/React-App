import {} from 'react'

const items = [
	{
		task: 'Выучить Реакт',
		icon: '**',
		isCompleted: true,
	},
	{
		task: 'Закрепить JS',
		icon: '**',
		isCompleted: true,
	},
	{
		task: 'Выучить английский',
		icon: '**',
		isCompleted: false,
	},
]

export const List = () => {
	return (
		<div>
			{items.map((item, index) => {
				return (
					/**!!!НЕ ЗАБЫВАЕМ ДОБАВЛЯТЬ КЛЮЧ для уникальности каждого элемента */
					<section key={index} className={item.isCompleted ? 'completed' : ''}>
						<span>{item.icon}</span>
						<h4>{item.task}</h4>
					</section>
				)
			})}
		</div>
	)
}
