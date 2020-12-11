import LRN from './vendor/lrn';

// When this module is resolved you should be able to access all libraries provided by Learnosity through
// LRN util object in 'vendor/lrn'
console.log('LRN._.isString:',LRN._.isString('string'));

function getValidResponse(question) {
    return (
        LRN._.isObject(question) &&
        LRN._.isObject(question.validation) &&
        question.validation.valid_response
    ) || {};
}

export default class Scorer {
    constructor(question, response) {
        this.question = question;
        this.response = response;
        this.validResponse = getValidResponse(question);
    }

    isValid() {
        return this.response && this.response.value === this.validResponse.value;
    }

    score() {
        return this.isValid() ? this.maxScore() : 0;
    }

    maxScore() {
        return this.validResponse.score || 1;
    }

    canValidateResponse() {
        return !!this.validResponse;
    }
}