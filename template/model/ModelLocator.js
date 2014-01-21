///<reference path="TemplateModel.ts"/>
// Module
var model;
(function (model) {
    // Class
    var ModelLocator = (function () {
        function ModelLocator() {
        }
        // Instance member
        ModelLocator.getInstance = function () {
            if (ModelLocator.template == null) {
                ModelLocator.template = new model.template.Template();
            }
            return ModelLocator.template;
        };

        ModelLocator.getOptionListInstance = function () {
            if (ModelLocator.optionGroup == null) {
                ModelLocator.optionGroup = new model.template.OptionGroup();
            }
            return ModelLocator.optionGroup;
        };

        ModelLocator.reset = function () {
            ModelLocator.template = null;
            ModelLocator.optionGroup = null;
        };
        ModelLocator.template = null;
        ModelLocator.optionGroup = null;
        return ModelLocator;
    })();
    model.ModelLocator = ModelLocator;
})(model || (model = {}));
//# sourceMappingURL=ModelLocator.js.map
