///<reference path="../model/TemplateModel.ts"/>
///<reference path="../model/ModelLocator.ts"/>
///<reference path="../util/Util.ts"/>
///<reference path="../util/Constants.ts"/>
///<reference path="../viewModel/TemplateViewModel.ts"/>
var rule;
(function (rule) {
    // Class
    var RuleEngine = (function () {
        function RuleEngine() {
        }
        // member functions ---------------------------------------------------
        RuleEngine.prototype.parseJson = function (jsonTemplate) {
            this.businessRules = new BusinessRules();
            this.businessRules.parseJson(jsonTemplate);
        };

        RuleEngine.prototype.fireRules = function (question, templateViewModel) {
            this.businessRules.fireRules(question, templateViewModel);
        };
        return RuleEngine;
    })();
    rule.RuleEngine = RuleEngine;

    var BusinessRules = (function () {
        function BusinessRules() {
            // member variables ---------------------------------------------------
            this.businessRuleList = [];
        }
        // member functions ---------------------------------------------------
        BusinessRules.prototype.parseJson = function (json) {
            if (json.reportTemplate.businessRules) {
                var jsonRules = json.reportTemplate.businessRules;
                var rules = [];
                if (jsonRules.businessRuleList && jsonRules.businessRuleList.businessRuleItem) {
                    rules = jsonRules.businessRuleList.businessRuleItem;
                    for (var ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
                        var rule = rules[ruleIndex];
                        var businessRuleItem = new BusinessRuleItem();
                        businessRuleItem.parseJson(rule);
                        this.businessRuleList.push(businessRuleItem);
                    }
                }
            }
        };

        BusinessRules.prototype.fireRules = function (question, templateViewModel) {
            for (var i = 0; i < this.businessRuleList.length; i++) {
                this.businessRuleList[i].fireRules(question, templateViewModel);
            }
        };
        return BusinessRules;
    })();
    rule.BusinessRules = BusinessRules;

    var BusinessRuleItem = (function () {
        function BusinessRuleItem() {
            this.expression = [];
        }
        // member functions ---------------------------------------------------
        BusinessRuleItem.prototype.parseJson = function (json) {
            if (json) {
                this.key = json.key;
                this.name = json.name;
                this.active = (json.active === 'Y' ? true : false);
                if (json.expression) {
                    for (var expIndex = 0; expIndex < json.expression.length; expIndex++) {
                        var expJson = json.expression[expIndex];
                        if (expJson.active === 'Y') {
                            var exp = new Expression();
                            exp.parseJson(expJson);
                            this.expression.push(exp);
                        }
                    }
                }
            }
        };

        BusinessRuleItem.prototype.fireRules = function (question, templateViewModel) {
            for (var expIndex in this.expression) {
                var exp = this.expression[expIndex];
                if (exp.evalExp(question)) {
                    exp.processExp(question, templateViewModel);
                    if (exp.isBreak) {
                        break;
                    }
                }
            }
        };
        return BusinessRuleItem;
    })();
    rule.BusinessRuleItem = BusinessRuleItem;

    var Expression = (function () {
        function Expression() {
            this.action = null;
            this.expression = null;
        }
        // member functions ---------------------------------------------------
        Expression.prototype.parseJson = function (json) {
            if (json) {
                this.active = (json.active === 'Y' ? true : false);
                this.value = json.value;
                this.questionKey = json.questionKey;
                this.isBreak = (json["break"] === 'Y' ? true : false);
                this.condition = json.condition;
                if (json.expression) {
                    this.expression = new Expression();
                    this.expression.parseJson(json.expression);
                }
                if (json.action) {
                    this.action = new rule.Action();
                    this.action.parseJson(json.action);
                }
            }
        };

        Expression.prototype.processExp = function (question, templateViewModel) {
            if (this.evalExp(question)) {
                util.Log.info("evaluation is true for " + this.condition);
                if (this.action) {
                    if (this.action.active) {
                        templateViewModel.executeAction(this.action);
                    }
                } else if (this.expression) {
                    this.expression.processExp(question, templateViewModel);
                }
            }
        };

        Expression.prototype.evalExp = function (question) {
            var result = false;

            if (this.questionKey !== question.model.key) {
                return false;
            }

            switch (this.condition) {
                case Constants.CONDITION_BLANK:
                case Constants.CONDITION_EMPTY:
                    result = question.blank();
                    break;
                case Constants.CONDITION_NOT_BLANK:
                case Constants.CONDITION_NOT_EMPTY:
                    result = !question.blank();
                    break;
                case Constants.CONDITION_CONTAINS:
                    result = question.contains(this.value);
                    util.Log.info('CONDITION_CONTAINS questionValue =' + question.answerValue() + ' expression.value = ' + this.value + ' result = ' + (result ? "Yes" : "No"));
                    break;
                case Constants.CONDITION_NOT_CONTAIN:
                    result = !question.contains(this.value);
                    util.Log.info('CONDITION_NOT_CONTAIN questionValue =' + question.answerValue() + ' expression.value = ' + this.value + ' result = ' + (result ? "Yes" : "No"));
                    break;
                case Constants.CONDITION_EQUAL:
                    result = question.equal(this.value);
                    util.Log.info('CONDITION_EQUAL questionValue =' + question.answerValue() + ' expression.value = ' + this.value + ' result = ' + (result ? "Yes" : "No"));
                    break;
                case Constants.CONDITION_NOT_EQUAL:
                    result = !question.equal(this.value);
                    util.Log.info('CONDITION_NOT_EQUAL questionValue =' + question.answerValue() + ' expression.value = ' + this.value + ' result = ' + (result ? "Yes" : "No"));
                    break;
                case Constants.CONDITION_ENABLED:
                    result = (question.view.enabledStatus());
                    break;
                case Constants.CONDITION_NOT_ENABLED:
                    result = (!question.view.enabledStatus());
                    break;
                case Constants.CONDITION_REQUIRED:
                    result = (question.view.responseRequired());
                    break;
                case Constants.CONDITION_NOT_REQUIRED:
                    result = (!question.view.responseRequired());
                    break;
                case Constants.CONDITION_VISIBLE:
                    result = (question.view.visibleStatus());
                    break;
                case Constants.CONDITION_NOT_VISIBLE:
                    result = (!question.view.visibleStatus());
                    break;
                case Constants.CONDITION_VALUE_CHANGED:
                    util.Log.info('CONDITION_VALUE_CHANGED');
                    break;
            }
            return result;
        };
        return Expression;
    })();
    rule.Expression = Expression;
})(rule || (rule = {}));
//# sourceMappingURL=RuleEngine.js.map
