///<reference path="../util/Constants.ts"/>
///<reference path="../rule/Action.ts"/>
///<reference path="TemplateModel.ts"/>
var model;
(function (model) {
    (function (template) {
        var Question = (function () {
            function Question() {
                // Notification callback ----------------------------------------------
                // member variables ---------------------------------------------------
                this.id = model.template.GUID();
                this.questionValue = null;
            }
            // member functions ---------------------------------------------------
            Question.prototype.parseJson = function (json) {
                this.json = json;
                this.key = json.key;
                this.xmlName = json.xmlName;
                this.xmlParentName = json.xmlParentName;
                this.questionTypeCode = json.questionTypeCode;
                this.questionText = json.questionText;
                this.databaseId = json.databaseId;
                this.tableShortName = json.tableShortName;
                this.tableColumnWidth = this.getNumber(json.tableColumnWidth);

                this.optionList = json.optionList;
                this.optionGroupKey = json.optionGroupKey;
                this.optionSetKey = json.optionSetKey;

                this.alignment = this.getNumber(json.alignment);
                this.displayLength = this.getNumber(json.displayLength);
                this.colorForeground = json.colorForeground;
                this.colorBackgroundStart = json.colorBackgroundStart;
                this.colorBackgroundEnd = json.colorBackgroundEnd;

                this.visibleStatus = this.getBool(json.visibleStatus);
                this.reportPrintStatus = json.reportPrintStatus;
                this.defaultReset = this.getBool(json.defaultReset);
                this.defaultValue = json.defaultValue;
                this.disabledClear = this.getBool(json.disabledClear);
                this.defaultStandard = json.defaultStandard;
                this.enabledStatus = this.getBool(json.enabledStatus);
                this.responseRequired = this.getBool(json.responseRequired);

                this.indentInclude = this.getBool(json.indentInclude);
                this.indentText = json.indentText;
                this.indentType = this.getNumber(json.indentType);
                this.indentImage = this.getNumber(json.indentImage);
                this.indentLevel = this.getNumber(json.indentLevel);

                this.hintInclude = json.hintInclude;
                this.hintText = json.hintText;
                this.hintTextStyle = this.getNumber(json.hintTextStyle);
                this.hintDialogSize = this.getNumber(json.hintDialogSize);
                this.answer = null;
            };

            // override this value
            Question.prototype.getValue = function () {
                return this.questionValue;
            };
            Question.prototype.setValue = function (json) {
                this.questionValue.setValue(json);
            };

            Question.prototype.getDom = function () {
                if (this.questionValue) {
                    return this.questionValue.getDom();
                } else {
                    return null;
                }
            };

            Question.prototype.setDom = function (el) {
                if (this.questionValue && el) {
                    this.questionValue.setDom(el);
                }
            };

            Question.prototype.executeAction = function (action) {
                if (this.key === action.objectKey) {
                    this.execQuestionAction(action);
                }
            };

            Question.prototype.execQuestionAction = function (action) {
                util.Log.info('OBJECT_TYPE_QUESTION');

                switch (action.actionType) {
                    case Constants.ACTION_ENABLE_QUESTION:
                        util.Log.info('ACTION_ENABLE_QUESTION');
                        break;
                    case Constants.ACTION_DISABLE_QUESTION:
                        util.Log.info('ACTION_DISABLE_QUESTION');
                        break;
                    case Constants.ACTION_REQUIRE_QUESTION:
                        util.Log.info('ACTION_REQUIRE_QUESTION');
                        break;
                    case Constants.ACTION_NOT_REQUIRE_QUESTION:
                        util.Log.info('ACTION_NOT_REQUIRE_QUESTION');
                        break;
                    case Constants.ACTION_ENABLE_REQUIRE_QUESTION:
                        util.Log.info('ACTION_ENABLE_REQUIRE_QUESTION');
                        break;
                    case Constants.ACTION_DISABLE_AND_NOT_REQUIRE_QUESTION:
                        util.Log.info('ACTION_DISABLE_AND_NOT_REQUIRE_QUESTION');
                        break;
                    case Constants.ACTION_CHANGE_REPONSE_LIST_QUESTION:
                        util.Log.info('ACTION_CHANGE_REPONSE_LIST_QUESTION');
                        break;
                    case Constants.ACTION_SHOW_QUESTION:
                        util.Log.info('ACTION_SHOW_QUESTION');
                        break;
                    case Constants.ACTION_HIDE_QUESTION:
                        util.Log.info('ACTION_HIDE_QUESTION');
                        break;
                    case Constants.ACTION_CHANGE_PROPERTY_QUESTION:
                        util.Log.info('ACTION_CHANGE_PROPERTY_QUESTION');
                        break;
                }
                //this.onQuestionChange(action, this);    // callback
            };

            Question.prototype.getBool = function (value) {
                return util.Util.getBool(value);
            };

            Question.prototype.getNumber = function (value) {
                return util.Util.getNumber(value);
            };

            /**
            * Method: getQuestionOptionGroupKey()
            *
            * Retrieves the Option Group key, if one has been set. The Option Group Key is maintained in
            * the configuration properties.
            *
            * To simplify the setting of properties within rules the option list settings were combined
            * into a single delimited string instead of the previous two individual settings. However,
            * many other uses of the option list (e.g., templates) must still be able to support the older
            * storage approach. Therefore, a single method is provided here to support the retrieval of the
            * Option Group Key regardless of how it is stored.
            */
            Question.prototype.getQuestionOptionGroupKey = function () {
                var mResult;

                // first check if the new strorage approach is used
                var mOptionListSetting = this.optionList;
                if (mOptionListSetting != undefined || mOptionListSetting != null) {
                    // new storage approach, pick the group key out of the single delimited property
                    mResult = this.getNumber(util.Util.getLeftOf(mOptionListSetting, "|"));
                } else {
                    // try old storage approach, get group key from independent proeprty
                    mResult = this.getNumber(this.optionGroupKey);
                }

                return mResult;
            };

            /**
            * Method: getQuestionOptionSetKey()
            *
            * Retrieves the Option Set key, if one has been set. The Option Set Key is maintained in the
            * configuration properties.
            *
            * To simplify the setting of properties within rules the option list settings were combined
            * into a single delimited string instead of the previous two individual settings. However,
            * many other uses of the option list (e.g., templates) must still be able to support the older
            * storage approach. Therefore, a single method is provided here to support the retrieval of the
            * Option Set Key regardless of how it is stored.
            */
            Question.prototype.getQuestionOptionSetKey = function () {
                var mResult;

                // first check if the new strorage approach is used
                var mOptionListSetting = this.optionList;
                if (mOptionListSetting != undefined || mOptionListSetting != null) {
                    // new storage approach, pick the set key out of the single delimited property
                    mResult = util.Util.getRightOf(mOptionListSetting, "|");
                } else {
                    // try old storage approach, get set key from independent proeprty
                    mResult = this.optionSetKey;
                }
                return mResult;
            };
            return Question;
        })();
        template.Question = Question;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=Question.js.map
