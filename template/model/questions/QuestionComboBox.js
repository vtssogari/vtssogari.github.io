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
        ///<reference path="../ModelLocator.ts"/>
        // Module
        (function (questions) {
            // Class
            var QuestionComboBox = (function (_super) {
                __extends(QuestionComboBox, _super);
                // Constructor
                function QuestionComboBox() {
                    _super.call(this);
                    // member variables ---------------------------------------------------
                    this.optionSet = null;
                }
                // member functions ---------------------------------------------------
                QuestionComboBox.prototype.parseJson = function (json) {
                    _super.prototype.parseJson.call(this, json);
                    this.questionValue = new model.template.QStringType(this.xmlName);
                    this.optionSet = model.ModelLocator.getOptionListInstance().getOptionSet(this.optionSetKey, this.optionGroupKey);
                };
                return QuestionComboBox;
            })(model.template.Question);
            questions.QuestionComboBox = QuestionComboBox;
        })(template.questions || (template.questions = {}));
        var questions = template.questions;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=QuestionComboBox.js.map
