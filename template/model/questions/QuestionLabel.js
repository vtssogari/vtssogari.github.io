///<reference path="../Question.ts"/>
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
            var QuestionLabel = (function (_super) {
                __extends(QuestionLabel, _super);
                // Constructor
                function QuestionLabel() {
                    _super.call(this);
                }
                // member variables ---------------------------------------------------
                // member functions ---------------------------------------------------
                QuestionLabel.prototype.parseJson = function (json) {
                    _super.prototype.parseJson.call(this, json);
                };
                return QuestionLabel;
            })(model.template.Question);
            questions.QuestionLabel = QuestionLabel;
        })(template.questions || (template.questions = {}));
        var questions = template.questions;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=QuestionLabel.js.map
