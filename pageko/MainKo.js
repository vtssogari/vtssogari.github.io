///<reference path="../Scripts/typings/jquery/jquery.d.ts"/>
///<reference path="../Scripts/typings/jqueryui/jqueryui.d.ts"/>
///<reference path="../Scripts/typings/knockout/knockout.d.ts"/>
///<reference path="../Scripts/typings/knockout.validation/knockout.validation.d.ts"/>
///<reference path="../Scripts/typings/custom/jquery.extend.d.ts"/>
///<reference path="../template/util/Constants.ts"/>
///<reference path="../template/util/Util.ts"/>
///<reference path="../template/rule/Action.ts"/>
///<reference path="../template/rule/RuleEngine.ts"/>
///<reference path="../template/model/ModelLocator.ts"/>
///<reference path="../template/model/OutlineNode.ts"/>
///<reference path="../template/model/Question.ts"/>
///<reference path="../template/model/QuestionTypes.ts"/>
///<reference path="../template/model/Tab.ts"/>
///<reference path="../template/model/TemplateModel.ts"/>
///<reference path="../template/viewModel/TemplateViewModel.ts"/>
///<reference path="../template/model/questions/QuestionTextfield.ts"/>
///<reference path="../template/model/questions/QuestionLabel.ts"/>
///<reference path="../template/model/questions/QuestionHTML.ts"/>
///<reference path="../template/model/questions/QuestionComboBox.ts"/>
///<reference path="../template/model/questions/QuestionCheckBoxGroup.ts"/>
///<reference path="../template/model/questions/QuestionRadioGroup.ts"/>
///<reference path="../template/util/Constants.ts"/>
///<reference path="../template/util/Util.ts"/>
///<reference path="../template/rule/Action.ts"/>
///<reference path="../template/rule/RuleEngine.ts"/>
///<reference path="../template/model/ModelLocator.ts"/>
///<reference path="../template/model/OutlineNode.ts"/>
///<reference path="../template/model/Question.ts"/>
///<reference path="../template/model/QuestionTypes.ts"/>
///<reference path="../template/model/Tab.ts"/>
///<reference path="../template/model/TemplateModel.ts"/>
///<reference path="../template/viewModel/TemplateViewModel.ts"/>
///<reference path="../template/model/questions/QuestionTextfield.ts"/>
///<reference path="../template/model/questions/QuestionLabel.ts"/>
///<reference path="../template/model/questions/QuestionHTML.ts"/>
///<reference path="../template/model/questions/QuestionComboBox.ts"/>
///<reference path="../template/model/questions/QuestionCheckBoxGroup.ts"/>
///<reference path="../template/model/questions/QuestionRadioGroup.ts"/>
///<reference path="../template/model/questions/QuestionContact.ts"/>
ko.extenders.logChange = function (target, q) {
    target.subscribe(function (newValue) {
        if (newValue) {
            console.log(q.model.key + " " + q.questionTypeCode + ": " + q.answer());
            templateLoader.ruleEngine.fireRules(q, templateLoader.templateViewModel);
        }
    });
    return target;
};

/*
ko.bindingHandlers.datepicker = {
init: function (element, valueAccessor, allBindingsAccessor) {
//initialize datepicker with some optional options
var options = allBindingsAccessor().datepickerOptions || {};
$(element).datepicker(options);
//handle the field changing
ko.utils.registerEventHandler(element, "change", function () {
var observable = valueAccessor();
observable($(element).datepicker("getDate"));
});
//handle disposal (if KO removes by the template binding)
ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
$(element).datepicker("destroy");
});
},
update: function (element, valueAccessor) {
var value = ko.utils.unwrapObservable(valueAccessor());
//handle date data coming via json from Microsoft
if (String(value).indexOf('/Date(') == 0) {
value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")));
}
var current = $(element).datepicker("getDate");
if (value - current !== 0) {
$(element).datepicker("setDate", value);
}
}
};
*/
ko.bindingHandlers.numericWidget = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var maxResponseLength = viewModel.view.maxResponseLength() || 5;
        var maskFormat = "9?";
        for (var i = 1; i < maxResponseLength; i++) {
            maskFormat += "9";
        }
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).mask(maskFormat).val(value);
    }
};

ko.bindingHandlers.spinner = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var maxResponseLength = viewModel.view.maxResponseLength() || 5;
        var maskFormat = "";
        for (var i = 0; i < maxResponseLength; i++) {
            maskFormat += "9";
        }
        $(element).spinner();
    }
};

ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        $(element).datepicker();
    }
};

ko.bindingHandlers.datepickerFormat = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var maskFormat = "99/99/9999";
        $(element).mask(maskFormat);
    }
};

var MainKo;
(function (MainKo) {
    var TemplateLoader = (function () {
        function TemplateLoader(templateName) {
            this.template = null;
            this.templateViewModel = null;
            this.templateName = null;
            this.ruleEngine = new rule.RuleEngine();
            this.templateName = templateName;
            this.load();
        }
        TemplateLoader.prototype.load = function () {
            var self = this;
            var optionRequest = $.ajax("../template/forms/option_org.html", { type: "GET", dataType: "json" });
            var templateRequest = $.ajax(this.templateName, { type: "GET", dataType: "json" });
            $.when(optionRequest, templateRequest).done(function (optionResponse, templateResponse) {
                var templateJson = templateResponse[0];

                var optionGroup = model.ModelLocator.getOptionListInstance();
                optionGroup.parseExternalJson(optionResponse[0]); // external option list

                var optionGroup = model.ModelLocator.getOptionListInstance();
                optionGroup.parseTemplateJson(templateJson);

                var template = model.ModelLocator.getInstance();
                template.parseJson(templateJson);
                self.ruleEngine.parseJson(templateJson);
                self.templateViewModel = new model.template.TemplateViewModel(template, "new submission", null, null);
                ko.applyBindings(self.templateViewModel);
            });
        };
        return TemplateLoader;
    })();
    MainKo.TemplateLoader = TemplateLoader;
})(MainKo || (MainKo = {}));

var formFile = "../template/forms/PIDS.html";
var templateLoader = new MainKo.TemplateLoader(formFile);

function submitData(viewModel) {
    console.info(viewModel.getData());
}
//# sourceMappingURL=MainKo.js.map
