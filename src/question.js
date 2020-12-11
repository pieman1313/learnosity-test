import { register } from './vendor/lrn';

/*global LearnosityAmd*/
LearnosityAmd.define([
    'underscore',
    'jquery-v1.10.2'
], function (
    _,
    $
) {
    // Register Learnosity exposed libraries into LRN util object of vendor/lrn
    register({
        $,
        _
    });

    // Use require instead of import to ensure by the time we resolve the module "scorer",
    // Learnosity dependencies have been attached to LRN utils in vendor/lrn
    const bundle = require('./views/question');

    return {
        Question: bundle.default
    };
});