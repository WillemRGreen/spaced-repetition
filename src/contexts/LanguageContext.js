import React, { Component } from 'react'

const LanguageContext = React.createContext({
    language: {},
    words: [],
    addLanguage: () => {},
    addWords: () => {}
})

export default LanguageContext

export class LanguageProvider extends Component {

    state = { 
        language:{},
        words:[],
        error: null 
    }
    
    addLanguage = language => {
        this.setState({ language: language })
    }

    addWords = words => {
        this.setState({
            words: words
         })
    }

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
          error: this.state.error,
          addLanguage: this.addLanguage,
          addWords: this.addWords,
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