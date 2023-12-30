import { RULES } from '@constants/commonConstants'
import React, { FC } from 'react'

export const Rules: FC = () => {
	return (
		<div className='rules'>
			<h2>Правила</h2>
			<ul className='rulesList'>
				{RULES.map((rule, index) => (
					<li key={index} className='listItem'>
						{rule}
					</li>
				))}
			</ul>
		</div>
	)
}
