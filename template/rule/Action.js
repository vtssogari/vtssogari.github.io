///<reference path="../util/Constants.ts"/>
///<reference path="../util/Util.ts"/>
// Module
var rule;
(function (rule) {
    var Action = (function () {
        function Action() {
        }
        // member functions ---------------------------------------------------
        Action.prototype.parseJson = function (json) {
            this.active = json.active === 'Y' ? true : false;
            this.objectType = json.objectType;
            this.objectKey = json.objectKey;
            this.actionType = json.actionType;
        };

        Action.prototype.execAction = function () {
            var objectType = this.objectType;
            switch (this.objectType) {
                case Constants.OBJECT_TYPE_QUESTION:
                    this.execQuestionAction();
                    break;
                case Constants.OBJECT_TYPE_OUTLINE_NODE:
                    this.execNodeAction();
                    break;
                case Constants.OBJECT_TYPE_OUTLINE_TAB:
                    this.execTabAction();
                    break;
                case Constants.OBJECT_TYPE_TEMPLATE:
                    util.Log.info('OBJECT_TYPE_TEMPLATE');
                    break;
                case Constants.OBJECT_TYPE_EXTERNAL_PROCESS:
                    util.Log.info('OBJECT_TYPE_EXTERNAL_PROCESS');
                    break;
            }
        };

        Action.prototype.execTabAction = function () {
            util.Log.info('OBJECT_TYPE_OUTLINE_TAB');
            // 1. get all the question that apply to
            // 2. invoke action onto question.
        };

        Action.prototype.execNodeAction = function () {
            util.Log.info('OBJECT_TYPE_OUTLINE_NODE');
            // 1. get all the question that apply to
            // 2. invoke action onto question.
        };

        Action.prototype.execQuestionAction = function () {
            util.Log.info('OBJECT_TYPE_QUESTION');
            // 1. get all the question that apply to
            // 2. invoke action onto question.
        };
        return Action;
    })();
    rule.Action = Action;
})(rule || (rule = {}));
//# sourceMappingURL=Action.js.map
