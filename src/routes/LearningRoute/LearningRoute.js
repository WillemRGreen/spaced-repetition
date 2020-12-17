import React, { Component } from 'react'
import AnswerForm from '../../components/LearningPage/AnswerForm'
import './LearningRoute.css'

class LearningRoute extends Component {
  render() {
    return (
      <section className='learning-page'>
        <AnswerForm />
      </section>
    );
  }
}

export default LearningRoute
