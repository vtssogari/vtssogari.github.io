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
            var QuestionContact = (function (_super) {
                __extends(QuestionContact, _super);
                // Constructor
                function QuestionContact() {
                    _super.call(this);
                }
                // member functions ---------------------------------------------------
                QuestionContact.prototype.parseJson = function (json) {
                    _super.prototype.parseJson.call(this, json);
                    this.questionValue = new model.template.QStringType(this.xmlName);
                    this.contactHeaderInclude = this.getBool(json.contactHeaderInclude);

                    this.enableTitle = this.getBool(json.enableTitle);
                    this.labelTitle = json.labelTitle;
                    this.lengthTitleName = this.getNumber(json.lengthTitleName);
                    this.requireTitle = this.getBool(json.requireTitle);
                    this.lengthTitle = this.getNumber(json.lengthTitle);

                    this.enableEmail = this.getBool(json.enableEmail);
                    this.lengthEmail = this.getNumber(json.lengthEmail);
                    this.requireEmail = this.getBool(json.requireEmail);

                    this.enableEditorDialog = this.getBool(json.enableEditorDialog);

                    this.lengthFirstName = json.lengthFirstName;
                    this.lengthLastName = json.lengthLastName;
                    this.lengthMiddleName = json.lengthMiddleName;
                };
                return QuestionContact;
            })(model.template.Question);
            questions.QuestionContact = QuestionContact;
        })(template.questions || (template.questions = {}));
        var questions = template.questions;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=QuestionContact.js.map
