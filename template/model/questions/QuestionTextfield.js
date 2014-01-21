///<reference path="../Question.ts"/>
///<reference path="../QuestionTypes.ts"/>
///<reference path="text/DocumentBasic.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var model;
(function (model) {
    (function (template) {
        // Module
        (function (questions) {
            // Class
            var QuestionTextfield = (function (_super) {
                __extends(QuestionTextfield, _super);
                // Constructor
                function QuestionTextfield() {
                    _super.call(this);
                    this.responseValidEntryCheck = model.template.questions.DocumentBasic.CHAR_VALID_NONE;
                    this.responseCaseConversion = model.template.questions.DocumentBasic.CONV_NONE;
                    this.illegalCharList = "";
                }
                // member functions ---------------------------------------------------
                QuestionTextfield.prototype.parseJson = function (json) {
                    _super.prototype.parseJson.call(this, json);
                    this.questionValue = new model.template.QStringType(this.xmlName);
                    this.minResponseLength = parseInt(json.minResponseLength);
                    this.maxResponseLength = parseInt(json.maxResponseLength);
                    this.responseValidEntryCheck = parseInt(json.responseValidEntryCheck == undefined ? model.template.questions.DocumentBasic.CHAR_VALID_NONE : json.responseValidEntryCheck);
                    this.responseCaseConversion = parseInt(json.responseCaseConversion == undefined ? model.template.questions.DocumentBasic.CONV_NONE : json.responseCaseConversion);
                    this.illegalCharList = json.illegalCharList;
                    this.illegalCharListMessage = json.illegalCharListMessage;
                    this.enableSymbols = this.getBool(json.enableSymbols);
                    this.defaultOutput = json.defaultOutput;
                    this.validRegExp = json.validRegExp;
                    this.invalidApproach = json.invalidApproach;
                    this.invalidRegExpMessage = json.invalidRegExpMessage;
                };
                return QuestionTextfield;
            })(model.template.Question);
            questions.QuestionTextfield = QuestionTextfield;
        })(template.questions || (template.questions = {}));
        var questions = template.questions;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=QuestionTextfield.js.map
