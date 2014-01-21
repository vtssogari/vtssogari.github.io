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
            var QuestionCheckBoxGroup = (function (_super) {
                __extends(QuestionCheckBoxGroup, _super);
                function QuestionCheckBoxGroup() {
                    _super.apply(this, arguments);
                    // member variables ---------------------------------------------------
                    this.optionSet = null;
                    this.optionValueArray = [];
                }
                // member functions ---------------------------------------------------
                QuestionCheckBoxGroup.prototype.parseJson = function (json) {
                    _super.prototype.parseJson.call(this, json);
                    this.questionValue = new model.template.QStringType(this.xmlName);
                    this.optionSet = model.ModelLocator.getOptionListInstance().getOptionSet(this.optionSetKey, this.optionGroupKey);
                    if (this.optionSet && this.optionSet.itemList) {
                        for (var i = 0; i < this.optionSet.itemList.length; i++) {
                            this.optionValueArray.push(this.optionSet.itemList[i].code);
                        }
                    }
                };
                return QuestionCheckBoxGroup;
            })(model.template.Question);
            questions.QuestionCheckBoxGroup = QuestionCheckBoxGroup;
        })(template.questions || (template.questions = {}));
        var questions = template.questions;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=QuestionCheckBoxGroup.js.map
