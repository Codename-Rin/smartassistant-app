import React from 'react'

const advisor = (props) => {
	return (
		<div className={props.class}>
			<h1>{props.title}</h1>
			{props.children}
		</div>
	)
}

export default advisor;