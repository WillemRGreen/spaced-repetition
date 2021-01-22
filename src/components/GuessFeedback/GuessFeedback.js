import React, { Component } from "react";
import Button from '../Button/Button'
import LanguageContext from "../../contexts/LanguageContext";



export default class GuessFeedback extends Component {
    static contextType = LanguageContext;

    handleClick = () => {
        window.location.reload();
    }

    render() {
        return (
            <>

                <Button type='button' onClick={() => this.handleClick()}>Try Another Word</Button>
                <div className="feedback-display">
                    <p>
                        The correct answer was {' '}
                        {this.context.response.answer}{' '}
                        and you chose {' '}{this.context.guess}!
                    </p>
                </div>
            </>
        );
    }
}