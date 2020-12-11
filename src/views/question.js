import React from 'react';
import ReactDOM from 'react-dom';
import LRN from '../vendor/lrn';
import Test from './components/test';

// When this module is resolved you should be able to access all libraries provided by Learnosity through
// LRN util object in 'vendor/lrn'
console.log('LRN._.isString:',LRN._.isString('string'));

export default class Question {
    constructor(init) {
        const { state } = init;

        this.init = init;
        this.events = init.events;
        this.el = init.$el.get(0);

        this.state = {
            ...init.question,
            disabled: state === 'review' || state === 'preview',
            defaultValue: init.response,
            validationUIVisible: false,
            isValid: null,
        };

        this.render();

        // "validate" event can be triggered when Check Answer button is clicked or when public method .validate() is called
        // so developer needs to listen to this event to decide if he wants to display the correct answers to user or not
        // options.showCorrectAnswers will tell if correct answers for this question should be display or not.
        // The value showCorrectAnswers by default is the value of showCorrectAnswers inside initOptions object that is used
        // to initialize question app or the value of the options that is passed into public method validate (like question.validate({showCorrectAnswers: false}))
        init.events.on('validate', options => {
            const isValid = init.getFacade().isValid();

            this.state = {
                ...this.state,
                isValid,
                validationUIVisible: true,
                showCorrectAnswers: options.showCorrectAnswers
            };
            this.render();
        });
        init.events.trigger('ready');
    }

    render() {
        return ReactDOM.render(
            <Test
                {...this.state}
                onChange={this.onInputChange}
                requestToClearValidationUI={this.requestToClearValidationUI}
            />,
            this.el
        );
    }

    onInputChange = value => {
        this.events.trigger('changed', value);
    };

    requestToClearValidationUI = () => {
        this.state = {
            ...this.state,
            isValid: null,
            showCorrectAnswers: false,
            validationUIVisible: false,
        };

        this.render();
    };
}