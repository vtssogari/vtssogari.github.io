///<reference path="../util/Constants.ts"/>
///<reference path="../rule/Action.ts"/>
///<reference path="TemplateModel.ts"/>
///<reference path="../util/Util.ts"/>
var model;
(function (model) {
    ///<reference path="questions/QuestionTextfield.ts"/>
    ///<reference path="questions/QuestionLabel.ts"/>
    ///<reference path="questions/QuestionHTML.ts"/>
    ///<reference path="questions/QuestionComboBox.ts"/>
    ///<reference path="questions/QuestionRadioGroup.ts"/>
    ///<reference path="questions/QuestionCheckBoxGroup.ts"/>
    ///<reference path="questions/QuestionContact.ts"/>
    (function (template) {
        var QuestionFactory = (function () {
            function QuestionFactory() {
            }
            QuestionFactory.getQuestion = function (json) {
                var questionType = json.questionTypeCode;
                var question = null;
                switch (questionType) {
                    case Constants.QUESTION_TYPE_TEXTFIELD:
                    case Constants.QUESTION_TYPE_TEXTMASK:
                    case Constants.QUESTION_TYPE_TEXTAREA:
                        question = new model.template.questions.QuestionTextfield();
                        break;
                    case Constants.QUESTION_TYPE_LABEL:
                        question = new model.template.questions.QuestionLabel();
                        break;
                    case Constants.QUESTION_TYPE_HEADER:
                    case Constants.QUESTION_TYPE_HTML:
                    case Constants.QUESTION_TYPE_MEMO:
                    case Constants.QUESTION_TYPE_MESSAGE:
                        // Read only
                        question = new model.template.questions.QuestionHTML();
                        break;
                    case Constants.QUESTION_TYPE_NUMERIC:
                    case Constants.QUESTION_TYPE_SPINNER:
                        question = new model.template.questions.QuestionTextfield();
                        break;
                    case Constants.QUESTION_TYPE_COMBOBOX:
                        question = new model.template.questions.QuestionComboBox();
                        break;
                    case Constants.QUESTION_TYPE_RADIO_GROUP:
                        question = new model.template.questions.QuestionRadioGroup();
                        break;
                    case Constants.QUESTION_TYPE_CHECKBOX_GROUP:
                        question = new model.template.questions.QuestionCheckBoxGroup();
                        break;
                    case Constants.QUESTION_TYPE_CONTACT:
                        question = new model.template.questions.QuestionContact();
                        break;
                    case Constants.QUESTION_TYPE_DATE:

                    case Constants.QUESTION_TYPE_MONTH_YEAR:

                    case Constants.QUESTION_TYPE_CHECKBOX:

                    case Constants.QUESTION_TYPE_IMAGE:

                    case Constants.QUESTION_TYPE_CAMERA:

                    case Constants.QUESTION_TYPE_VIDEO:

                    case Constants.QUESTION_TYPE_SOUND:

                    case Constants.QUESTION_TYPE_VOICE_RECORDER:

                    case Constants.QUESTION_TYPE_CAMCORDER:

                    case Constants.QUESTION_TYPE_FILE_MULTI:
                        // file path
                        question = new model.template.Question();
                        break;
                    default:
                        question = new model.template.Question();
                }
                question.parseJson(json);
                return question;
            };
            return QuestionFactory;
        })();
        template.QuestionFactory = QuestionFactory;

        var QStringType = (function () {
            function QStringType(xmlName) {
                this.xmlName = null;
                this.value = null;
                this.xmlName = xmlName;
            }
            QStringType.prototype.parseJson = function (json) {
                this.value = json;
            };
            QStringType.prototype.blank = function () {
                return (this.value === null || this.value === undefined || this.value === '');
            };
            QStringType.prototype.equal = function (value) {
                return this.value === value;
            };
            QStringType.prototype.contains = function (value) {
                return this.equal(value);
            };
            QStringType.prototype.setValue = function (json) {
                this.value = json;
            };
            QStringType.prototype.getJson = function () {
                if (this.xmlName) {
                    var result = {};
                    result[this.xmlName] = this.value;
                    return result;
                } else {
                    return null;
                }
            };
            QStringType.prototype.getDom = function () {
                var el = document.createElement(this.xmlName);
                if (this.value != null) {
                    el.innerText = this.value;
                }
                return el;
            };

            QStringType.prototype.setDom = function (el) {
                if (util.Util.tagEqual(el.nodeName, this.xmlName)) {
                    this.value = el.innerText;
                }
            };
            return QStringType;
        })();
        template.QStringType = QStringType;

        var QNumberType = (function () {
            function QNumberType(xmlName) {
                this.xmlName = null;
                this.value = null;
                this.xmlName = xmlName;
            }
            QNumberType.prototype.parseJson = function (json) {
                this.value = json;
            };
            QNumberType.prototype.blank = function () {
                return (this.value === null || this.value === undefined);
            };
            QNumberType.prototype.equal = function (value) {
                return this.value === value;
            };
            QNumberType.prototype.contains = function (value) {
                return this.equal(value);
            };
            QNumberType.prototype.setValue = function (json) {
                this.value = json;
            };
            QNumberType.prototype.getJson = function () {
                if (this.xmlName) {
                    var result = {};
                    result[this.xmlName] = this.value;
                    return result;
                } else {
                    return null;
                }
            };
            QNumberType.prototype.getDom = function () {
                var el = document.createElement(this.xmlName);
                if (this.value != null) {
                    el.innerText = this.value + "";
                }
                return el;
            };

            QNumberType.prototype.setDom = function (el) {
                if (util.Util.tagEqual(el.nodeName, this.xmlName)) {
                    var myVal = parseInt(el.innerText) === NaN ? 0 : parseInt(el.innerText);
                    this.value = myVal;
                }
            };
            return QNumberType;
        })();
        template.QNumberType = QNumberType;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=QuestionTypes.js.map
