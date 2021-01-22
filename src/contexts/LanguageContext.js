import React, { Component } from 'react'

const LanguageContext = React.createContext({
    language: {},
    words: [],
    headWord: {},
    nextWord: {},
    response: {},
    guess: {},
    submitted: {},
    setGuess: () => {},
    setResponse: () => {},
    setNextWord: () => {},
    setTotalScore: () => {},
    addLanguage: () => {},
    addWords: () => {},
    addHeadWord: () => {},
    setClicked: () => {},
})

export default LanguageContext

export class LanguageProvider extends Component {

    state = { 
        language:{},
        words:[],
        headWord:{},
        nextWord: {},
        totalScore: {},
        currWord: {},
        guess: {},
        response: {},
        submitted: false,
        currentWord: "",
        error: null 
    }
    
    addLanguage = language => {
        this.setState({ language: language })
    }

    addHeadWord = headWord => {
      this.setState({ headWord: headWord })
  }

    addWords = words => {
        this.setState({
            words: words
         })
    }

    setCurrentWord = (word) => {
      this.setState({
        currentWord: word,
      });
    };
  
    setNextWord = (word) => {
      this.setState({
        nextWord: word,
      });
    };
  
    setResponse = (response) => {
      this.setState({
        response: response,
      });
    };
  
    setGuess = (guess) => {
      this.setState({
        guess: guess,
      });
    };
  
    setTotalScore = (totalScore) => {
      this.setState({
        totalScore: totalScore,
      });
    };

    setClicked = (t) => {
      this.setState({
        submitted: t,
      });
    };

    setError = error => {
        console.error(error)
        this.setState({ error })
      }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const value = {
          language: this.state.language,
          words: this.state.words,
          headWord: this.state.headWord,
          totalScore: this.state.totalScore,
          submitted: this.state.submitted,
          guess: this.state.guess,
          nextWord: this.state.nextWord,
          setCurrWord: this.setCurrWord,
          response: this.state.response,
          currentWord: this.state.currentWord,
          setClicked: this.setClicked,
          setNextWord: this.setNextWord,
          setTotalScore: this.setTotalScore,
          setGuess: this.setGuess,
          setResponse: this.setResponse,
          setCurrentWord: this.setCurrentWord,
          error: this.state.error,
          addLanguage: this.addLanguage,
          addWords: this.addWords,
          addHeadWord: this.addHeadWord,
          setError: this.setError,
          clearError: this.clearError
        }
        return (
          <LanguageContext.Provider value={value}>
            {this.props.children}
          </LanguageContext.Provider>
        )
      }

}