import React, { Component } from 'react';
import axios from 'axios';
import Advisor from './Advisor';


class App extends Component {
	state = {
		currentPage: 0,
		advisor: {
			title: 'My Advisor',
			scope: [],
			pages: []
		}
	}

	componentDidMount() {
		axios.get('./pages.json')
			.then(response => {
				const scope = [...this.state.advisor.scope, ...response.data];
				const advisor = {
					...this.state.advisor,
					scope,
					pages: scope
				}
				this.setState({advisor: advisor});
			});
	}

	switchPage(direction) {
		switch(direction) {
			case 'next': {
				let curPage = this.state.currentPage;
				curPage = curPage < this.state.advisor.pages.length - 1 ? curPage + 1 : curPage;
				this.setState({currentPage: curPage});
			}
			break;
			case 'prev': {
				let curPage = this.state.currentPage;
				curPage = curPage > 0 ? curPage - 1 : curPage;
				this.setState({currentPage: curPage});
			}
			break;
			default: {
				console.log('Error')
			}
		}
	}

	filterPages(every) {
		let filtered = JSON.parse(JSON.stringify(this.state.advisor.scope));
		filtered = filtered.filter(page => page.index % every == 0);
		const newAdvisor = {
			...this.state.advisor,
			pages: filtered
		}
		this.setState({
			currentPage: 0,
			advisor: newAdvisor
		});
	}

	render() {
		const pages = this.state.advisor.pages;
		const pageNumber = this.state.currentPage;
		const questions = [];
		const pageTitle = pages.length ? pages[pageNumber].title : '';
		const pageIndex = pages.length ? pages[pageNumber].index : '';
		const pageText = pages.length ? pages[pageNumber].text : '';
		const overThree = pageNumber > 2 ? <strong>bigger than 3 </strong> : '';
		const pageClass = ['smrt42-page'];

		if(pageNumber === 0) {
			pageClass.push('smrt42-first-page');
		}
		if(pageNumber === pages.length - 1) {
			pageClass.push('smrt42-last-page');
		}

		if(pages.length) {
			questions.push(
				pages[pageNumber].questions.map(question => {
					const questionClass = ['smrt42-question'];
					const isMandatory = question.isMandatory ? 'smrt42-mandatory-question' : '';
					questionClass.push(isMandatory);
					return (
						<li key={question.id} className={questionClass.join(' ')}>
							<em className="smrt42-question-text">Question: {question.question}? || </em>
							<span className="smrt42-question-type">Type of question: {question.type}</span>
						</li>
					)
				})
			)
		}

		return (
			<Advisor class={pageClass.join(' ')} title={this.state.advisor.title}>
				<h2>{pageTitle}</h2>
				<span>Page database index: {pageIndex}</span>
				<p className="smrt42-page-text">{pageText}</p>
				<ul>
					{questions}
				</ul>
				{overThree}
				<div>
					<button onClick={() => this.switchPage('prev')}>Previous Page</button>
					<button onClick={() => this.switchPage('next')}>Next Page</button>
					<button onClick={() => this.filterPages(2)}>Filter every 2</button>
				</div>
			</Advisor>
		)
	}
}

export default App;