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
            var QuestionHTML = (function (_super) {
                __extends(QuestionHTML, _super);
                // Constructor
                function QuestionHTML() {
                    _super.call(this);
                }
                // member functions ---------------------------------------------------
                QuestionHTML.prototype.parseJson = function (json) {
                    _super.prototype.parseJson.call(this, json);
                    this.borderInclude = this.getBool(json.borderInclude);
                    this.html = json.html;
                };
                return QuestionHTML;
            })(model.template.Question);
            questions.QuestionHTML = QuestionHTML;
        })(template.questions || (template.questions = {}));
        var questions = template.questions;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=QuestionHTML.js.map
