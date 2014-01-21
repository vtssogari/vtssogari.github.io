///<reference path="../Scripts/typings/jquery/jquery.d.ts"/>
///<reference path="../Scripts/typings/knockout/knockout.d.ts"/>
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
///<reference path="../template/model/questions/QuestionTextfield.ts"/>
///<reference path="../template/model/questions/QuestionLabel.ts"/>
///<reference path="../template/model/questions/QuestionHTML.ts"/>
///<reference path="../template/model/questions/QuestionComboBox.ts"/>
///<reference path="../template/model/questions/QuestionCheckBoxGroup.ts"/>
///<reference path="../template/model/questions/QuestionRadioGroup.ts"/>
var Main;
(function (Main) {
    var TemplateLoader = (function () {
        function TemplateLoader() {
            this.load();
        }
        TemplateLoader.prototype.load = function () {
            var self = this;
            $.ajax("/template/forms/option_org.html", {
                type: "GET",
                success: function (data) {
                    var optionGroup = model.ModelLocator.getOptionListInstance();
                    optionGroup.parseExternalJson($.parseJSON(data)); // external option list
                    self.loadTemplate();
                },
                error: function (xhr, status, error) {
                    alert("Error loading /template/forms/option_org.html - " + error);
                }
            });
        };

        TemplateLoader.prototype.loadTemplate = function () {
            var formFile = "/template/forms/PIDS.html";
            $.ajax(formFile, {
                type: "GET",
                success: function (data) {
                    var optionGroup = model.ModelLocator.getOptionListInstance();
                    optionGroup.parseTemplateJson($.parseJSON(data));
                    var template = model.ModelLocator.getInstance();
                    template.parseJson($.parseJSON(data));
                    var bstring = $("#mainTemplate").render(template);
                    $('#content').html(bstring);
                },
                error: function (xhr, status, error) {
                    alert("Error loading " + formFile + " - " + error);
                }
            });
        };
        return TemplateLoader;
    })();
    Main.TemplateLoader = TemplateLoader;
})(Main || (Main = {}));
//# sourceMappingURL=main.js.map
