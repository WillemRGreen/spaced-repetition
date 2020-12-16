import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Button from '../Button/Button'
import ApiService from '../../services/api-service'
import LanguageContext from '../../contexts/LanguageContext'
import './DashboardDisplay.css'

export default class DashboardDisplay extends Component {
    
    state = {
        error: null
    }

    static contextType = LanguageContext

    componentDidMount(){
        ApiService.getLanguage()
            .then(response => {
                const language = response.language
                const words = response.words
                this.context.addLanguage(language)
                this.context.addWords(words)

            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    render() {
        const language = this.context.language.name
        const words = this.context.words.map(word => {
        return <li className= 'ind-words' key={word.id} >{word.original}- correct guesses:{word.correct_count} incorrect guesses:{word.incorrect_count}</li>
        })
        return (
            <div className='dash-display'>
                <h3 className='language'>{language}</h3>
                <ul className='word-list'>{words}</ul>
                <Button>
                    <Link to='/learn'>
                        Start Learning!
                    </Link>
                </Button>
            </div>
        )
    }
}