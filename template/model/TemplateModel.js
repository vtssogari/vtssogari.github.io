///<reference path="../util/Constants.ts"/>
///<reference path="../rule/Action.ts"/>
///<reference path="Tab.ts"/>
///<reference path="OutlineNode.ts"/>
///<reference path="Question.ts"/>
///<reference path="../util/Util.ts"/>
///<reference path="OrgOptionList.ts"/>
var model;
(function (model) {
    (function (template) {
        template.EVENT_TAB_ADD_NODE = "template:add:node";

        // Class
        var Template = (function () {
            function Template() {
            }
            // member functions ---------------------------------------------------
            Template.prototype.parseJson = function (templateJson) {
                this.json = templateJson;
                this.templatePropertyList = new TemplatePropertyList();
                this.templatePropertyList.parseJson(templateJson.reportTemplate.templatePropertyList);
                this.reportLayout = new ReportLayout();
                this.reportLayout.parseJson(templateJson.reportTemplate.reportLayout);
            };

            Template.prototype.getXML = function () {
                if (this.templatePropertyList && this.templatePropertyList.templateXMLName) {
                    var parentDom = document.createElement(this.templatePropertyList.templateXMLName);
                    var childDoms;
                    for (var i = 0; i < this.reportLayout.tab.length; i++) {
                        childDoms = this.reportLayout.tab[i].getDom();
                        if (childDoms != null) {
                            for (var j = 0; j < childDoms.length; j++) {
                                parentDom.appendChild(childDoms[j]);
                            }
                        }
                    }
                    return parentDom;
                } else {
                    return null;
                }
            };

            Template.prototype.setXML = function (xml) {
                if (util.Util.tagEqual(xml.nodeName, this.templatePropertyList.templateXMLName)) {
                    for (var i = 0; i < this.reportLayout.tab.length; i++) {
                        this.reportLayout.tab[i].setDom(xml.children);
                    }
                }
            };

            Template.prototype.getTabNodes = function (key) {
                return this.reportLayout.getTabNodes(key);
            };

            Template.prototype.getOutlineNodes = function (key) {
                return this.reportLayout.getOutlineNodes(key);
            };

            Template.prototype.getQuestions = function (key) {
                return this.reportLayout.getQuestions(key);
            };
            return Template;
        })();
        template.Template = Template;

        var TemplatePropertyList = (function () {
            function TemplatePropertyList() {
            }
            // member functions ---------------------------------------------------
            TemplatePropertyList.prototype.parseJson = function (json) {
                if (json) {
                    this.templateCode = json.templateCode;
                    this.templateName = json.templateName;
                    this.templateStatus = parseInt(json.templateStatus);
                    this.templateReportType = json.templateReportType;
                    this.templateDocumentNumber = json.templateDocumentNumber;
                    this.templateStatusCreateDate = json.templateStatusCreateDate;
                    this.templateXMLName = json.templateXMLName;
                    this.templateVersion = json.templateVersion;
                    this.templateXMLItemName = json.templateXMLItemName;
                    this.templateStatusSubmitDate = json.templateStatusSubmitDate;
                    this.templateType = parseInt(json.templateType);
                    this.templateDate = json.templateDate;
                    this.templateDescription = json.templateDescription;
                    this.titleFieldKey = json.titleFieldKey;
                    this.subTitleFieldKey = json.subTitleFieldKey;
                    this.dateFieldKey = json.dateFieldKey;
                    this.templateDataName = json.templateDataName;
                }
            };
            return TemplatePropertyList;
        })();
        template.TemplatePropertyList = TemplatePropertyList;

        var ReportLayout = (function () {
            function ReportLayout() {
                // member variables ---------------------------------------------------
                this.tab = [];
            }
            // member functions ---------------------------------------------------
            ReportLayout.prototype.parseJson = function (json) {
                if (json) {
                    var ts = [];
                    if (typeof (json.tab) == 'array') {
                        ts = json.tab;
                    } else {
                        ts.push(json.tab);
                    }
                    for (var i = 0; i < ts.length; i++) {
                        var t = ts[i];
                        var tab = new model.template.Tab();
                        tab.parseJson(t);
                        this.tab.push(tab);
                    }
                    ;
                }
            };

            ReportLayout.prototype.getTabNodes = function (key) {
                var tabs = [];
                for (var i = 0; i < this.tab.length; i++) {
                    var t = this.tab[i];
                    if (t.key == key) {
                        tabs.push(t);
                    }
                }
                return tabs;
            };

            ReportLayout.prototype.getOutlineNodes = function (key) {
                var outlineNodes = [];
                for (var i = 0; i < this.tab.length; i++) {
                    var nodes = this.tab[i].getOutlineNodes(key);
                    outlineNodes = outlineNodes.concat(nodes);
                }
                return outlineNodes;
            };

            ReportLayout.prototype.getQuestions = function (key) {
                var questions = [];
                for (var i = 0; i < this.tab.length; i++) {
                    var nodes = this.tab[i].getQuestions(key);
                    questions = questions.concat(nodes);
                }
                return questions;
            };
            return ReportLayout;
        })();
        template.ReportLayout = ReportLayout;

        // Helper functions ---------------------------------------------------------
        function isArray(o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        }
        template.isArray = isArray;

        function S4() {
            return Math.floor(Math.random() * 0x10000).toString(16);
        }

        function GUID() {
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }
        template.GUID = GUID;

        function parseOutlineNodeList(json) {
            var result = new Array();
            if (json.outlineNodeList && json.outlineNodeList.outlineNode) {
                var outlineNodes = [];
                var nodes = json.outlineNodeList.outlineNode;
                if (isArray(nodes)) {
                    outlineNodes = nodes;
                } else {
                    outlineNodes.push(nodes);
                }
                for (var i = 0; i < outlineNodes.length; i++) {
                    var on = outlineNodes[i];
                    var outlineNode = new model.template.OutlineNode();
                    outlineNode.praseJson(on);
                    result.push(outlineNode);
                }
            }
            return result;
        }
        template.parseOutlineNodeList = parseOutlineNodeList;

        function paraseQuestionList(json) {
            var result = new Array();
            var questionList = [];
            if (json.questionList && json.questionList.question) {
                if (isArray(json.questionList.question)) {
                    questionList = json.questionList.question;
                } else {
                    questionList.push(json.questionList.question);
                }
            }
            for (var i = 0; i < questionList.length; i++) {
                var json = questionList[i];
                var q = model.template.QuestionFactory.getQuestion(json);
                if (q) {
                    result.push(q);
                }
            }
            return result;
        }
        template.paraseQuestionList = paraseQuestionList;

        function addNewOutlineNode(sourceNode2Copy, outlineNodeList) {
            var addedAt = -1;
            var copyNode = sourceNode2Copy.clone();
            for (var i = 0; i < outlineNodeList.length; i++) {
                var targetNode = outlineNodeList[i];
                if (sourceNode2Copy.id === targetNode.id) {
                    addedAt = i + 1;
                    outlineNodeList.splice(addedAt, 0, copyNode);
                    break;
                }
            }
            return addedAt;
        }
        template.addNewOutlineNode = addNewOutlineNode;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=TemplateModel.js.map
