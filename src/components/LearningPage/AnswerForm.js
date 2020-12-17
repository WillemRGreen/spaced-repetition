import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'
import ApiService from '../../services/api-service'
import LanguageContext from '../../contexts/LanguageContext'
import './AnswerForm.css'

class AnswerForm extends Component {

    state = {
        error:null
    }

    static contextType = LanguageContext

    componentDidMount(){
        ApiService.getHeadWord()
            .then(response => {
                const headWord = response
                this.context.addHeadWord(headWord)
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    handleGuessSubmit = e => {
        e.preventDefault()
        const guess = {
            guess: e.target['guess'].value
        }
        console.log(guess.guess)
    }

  render() {
      const nextWord = this.context.headWord
    return (
      <section>
        <div>
            <h3>
                {nextWord.nextWord}
            </h3>
            <ul className='score-list'>
                <li>Total Score: {nextWord.totalScore}</li>
                <li>Correct Guesses: {nextWord.wordCorrectCount}</li>
                <li>Incorrect Guesses: {nextWord.wordIncorrectCount}</li>
            </ul>
        </div>
        <form 
            className='answer-form'
            onSubmit={this.handleGuessSubmit}
        >
            <Label htmlFor='answer-input'>
                Translate this word
            </Label>
            <Input 
                id='guess-input'
                name='guess'
                placeholder='your best guess'
                required
            />
            <Button type='submit'>
                Submit
            </Button>
        </form>
      </section>
    );
  }
}

export default AnswerForm
