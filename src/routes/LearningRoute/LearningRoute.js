import React, { Component } from "react";
import Button from '../../components/Button/Button'
import TokenService from "../../services/token-service";
import LanguageContext from "../../contexts/LanguageContext";
import GuessFeedback from "../../components/GuessFeedback/GuessFeedback";
import config from "../../config";
import './LearningRoute.css';


class LearningRoute extends Component {
  static contextType = LanguageContext;

  state = {
    answer: null,
    score: null,
    correct: "",
    incorrect: "",
    total: 0,
  };

  async componentDidMount() {
    try {
      const response = await fetch(`${config.API_ENDPOINT}/api/language/head`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      });
      const json = await response.json();
      this.context.setNextWord(json);
      this.context.setTotalScore(json.totalScore);
      this.setState({
        correct: json.wordCorrectCount,
        incorrect: json.wordIncorrectCount,
        total: json.totalScore,
        submitted: false,
        score: null,
      });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async submitForm(e) {
    e.preventDefault();
    const guessWord = e.target.guess.value.toLowerCase().trim();
    this.context.setGuess(guessWord);
    console.log(guessWord)
    try {
      const response = await fetch(`${config.API_ENDPOINT}/api/language/guess`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({ guess: guessWord }),
      });
      const json = await response.json();
      this.context.setResponse(json);
      this.setState({
        total: json.totalScore,
      });
    } catch (e) {
      this.setState({ error: e });
    }

    this.context.setTotalScore(this.context.response.totalScore);
    this.context.setClicked(true);

    if (this.context.response.isCorrect) {
      this.setState({
        answer: "correct",
        correct: this.state.correct + 1,
      });
    } else {
      this.setState({
        answer: "incorrect",
        incorrect: this.state.incorrect + 1,
      });
    }
  }

  render() {
    return (
      <main className="learning-page-main">
        <form onSubmit={(e) => this.submitForm(e, this.context)}>
          {this.state.answer === null && <h2>Translate the word:</h2>}
          {this.state.answer === "correct" && (
            <h2 className="feedback">Correct!</h2>
          )}
          {this.state.answer === "incorrect" && (
            <h2 className="feedback">Incorrect, try again! </h2>
          )}
          <span className="word-to-guess">
            {this.context.nextWord ? this.context.nextWord.nextWord : null}
          </span>
          <div>
            {this.context.submitted === false && (
              <label htmlFor="input">
                What's your guess?
              </label>)}
            {this.context.submitted === false && (
              <p>
                <input
                  autoFocus
                  name="guess"
                  id="input"
                  type="text"
                  required
                ></input>
              </p>)}

            {this.context.submitted === false && (
              <Button type="submit">Submit your answer</Button>
            )}
            {this.context.submitted === true && <GuessFeedback />}
          </div>
          <p>Correct Answers: {this.state.correct}</p>
          <p>Incorrect Answers: {this.state.incorrect}</p>
          <p>Your total score is: {this.state.total}</p>
        </form>
      </main>
    );
  }
}

export default LearningRoute;