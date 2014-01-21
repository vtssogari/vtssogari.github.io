///<reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
///<reference path="../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var model;
(function (model) {
    ///<reference path="../util/Constants.ts"/>
    ///<reference path="../util/Util.ts"/>
    ///<reference path="../rule/Action.ts"/>
    ///<reference path="../rule/RuleEngine.ts"/>
    ///<reference path="../model/ModelLocator.ts"/>
    ///<reference path="../model/OutlineNode.ts"/>
    ///<reference path="../model/Question.ts"/>
    ///<reference path="../model/QuestionTypes.ts"/>
    ///<reference path="../model/Tab.ts"/>
    ///<reference path="../model/TemplateModel.ts"/>
    ///<reference path="../model/questions/QuestionTextfield.ts"/>
    ///<reference path="../model/questions/QuestionLabel.ts"/>
    ///<reference path="../model/questions/QuestionHTML.ts"/>
    ///<reference path="../model/questions/QuestionComboBox.ts"/>
    ///<reference path="../model/questions/QuestionCheckBoxGroup.ts"/>
    ///<reference path="../model/questions/QuestionRadioGroup.ts"/>
    (function (template) {
        // Class
        var TemplateViewModel = (function () {
            function TemplateViewModel(template, submissionName, lastModified, datePackaged) {
                //this.viewModel = ko.mapping.fromJS(template);
                this.template = template;
                this.submissionName = ko.observable(submissionName);
                this.lastModified = ko.observable(lastModified);
                this.datePackaged = ko.observable(datePackaged);
                this.templatePropertyList = ko.mapping.fromJS(template.templatePropertyList);
                this.reportLayout = new ReportLayoutViewModel(template.reportLayout);
                this.selectedTab = this.reportLayout.firstTab;
                this.selectedNode = ko.observable(this.reportLayout.firstTab.firstNode);
                this.resultData = ko.observable('');
            }
            TemplateViewModel.prototype.submitForm = function (data, event) {
                var dataResult = data.getData();
                var dataString = ko.toJSON(dataResult, null, 2);
                console.info(dataString);
                this.resultData(dataString);
            };
            TemplateViewModel.prototype.getData = function () {
                var result = {};
                result[this.template.templatePropertyList.templateXMLName] = this.reportLayout.getData();
                return result;
            };

            TemplateViewModel.prototype.selectNode = function (selectedNodeView) {
                //TODO: search and select node view mode
                var tabView = this.selectedTab;
                for (var i = 0; i < tabView.outlineNodeList().length; i++) {
                    var nodeView = tabView.outlineNodeList()[i];
                    if (nodeView.node.id == selectedNodeView.node.id) {
                        this.selectedNode(nodeView);
                        break;
                    }
                }
            };

            TemplateViewModel.prototype.executeAction = function (action) {
                if (action.objectType === Constants.OBJECT_TYPE_TEMPLATE) {
                    this.execTemplateAction(action);
                } else {
                    this.reportLayout.executeAction(action);
                }
            };

            TemplateViewModel.prototype.execTemplateAction = function (action) {
                util.Log.info('OBJECT_TYPE_TEMPLATE');
                switch (action.actionType) {
                    case Constants.ACTION_LOAD_TEMPLATE:
                        util.Log.info('ACTION_LOAD_TEMPLATE');
                        break;
                    case Constants.ACTION_UNLOAD_TEMPLATE:
                        util.Log.info('ACTION_UNLOAD_TEMPLATE');
                        break;
                    case Constants.ACTION_UNLOAD_CHILDREN_FOR_TEMPLATE:
                        util.Log.info('ACTION_UNLOAD_CHILDREN_FOR_TEMPLATE');
                        break;
                }
            };

            TemplateViewModel.prototype.isSelectedTab = function (tabView) {
                return (this.selectedTab != null && this.selectedTab.tab.id === tabView.tab.id);
            };

            TemplateViewModel.prototype.isSelectedNode = function (nodeView) {
                return (this.selectedNode() != null && this.selectedNode().node.id === nodeView.node.id);
            };
            return TemplateViewModel;
        })();
        template.TemplateViewModel = TemplateViewModel;

        var ReportLayoutViewModel = (function () {
            function ReportLayoutViewModel(reportLayout) {
                this.reportLayout = reportLayout;
                this.tabs = ko.observableArray();
                for (var i = 0; i < reportLayout.tab.length; i++) {
                    var tbView = new TabViewModel(reportLayout.tab[i]);
                    if (i == 0) {
                        this.firstTab = tbView;
                    }
                    this.tabs.push(tbView);
                }
            }
            ReportLayoutViewModel.prototype.getData = function () {
                var result = [];
                for (var i = 0; i < this.tabs().length; i++) {
                    var childTab = this.tabs()[i];
                    for (var i = 0; i < childTab.outlineNodeList().length; i++) {
                        var nview = childTab.outlineNodeList()[i];
                        result.push(nview.getData());
                    }
                }
                return result;
            };

            ReportLayoutViewModel.prototype.executeAction = function (action) {
                for (var i = 0; i < this.tabs().length; i++) {
                    this.tabs()[i].executeAction(action);
                }
            };
            return ReportLayoutViewModel;
        })();
        template.ReportLayoutViewModel = ReportLayoutViewModel;

        var TabViewModel = (function () {
            function TabViewModel(tab) {
                this.outlineNodeList = ko.observableArray();
                this.key = tab.key;
                this.tab = tab;
                this.tabPropertyList = ko.mapping.fromJS(tab.tabPropertyList);
                for (var i = 0; i < tab.outlineNodeList.length; i++) {
                    var nview = new NodeViewModel(tab.outlineNodeList[i]);
                    if (i == 0) {
                        this.firstNode = nview;
                    }
                    this.outlineNodeList.push(nview);
                }
            }
            TabViewModel.prototype.executeAction = function (action) {
                if (action.objectType === Constants.OBJECT_TYPE_OUTLINE_TAB && this.key == action.objectKey) {
                    this.execTabAction(action);
                } else {
                    for (var i = 0; i < this.outlineNodeList().length; i++) {
                        this.outlineNodeList()[i].executeAction(action);
                    }
                }
            };

            TabViewModel.prototype.execTabAction = function (action) {
                util.Log.info('OBJECT_TYPE_OUTLINE_TAB');
                switch (action.actionType) {
                    case Constants.ACTION_SHOW_TAB:
                        util.Log.info('ACTION_SHOW_TAB');
                        break;
                    case Constants.ACTION_HIDE_TAB:
                        util.Log.info('ACTION_HIDE_TAB');
                        break;
                    case Constants.ACTION_CHANGE_PROPERTY_FOR_TAB:
                        util.Log.info('ACTION_CHANGE_PROPERTY_FOR_TAB');
                        break;
                }
            };
            return TabViewModel;
        })();
        template.TabViewModel = TabViewModel;

        var NodeViewModel = (function () {
            function NodeViewModel(node) {
                this.questionList = ko.observableArray();
                this.outlineNodeList = ko.observableArray();
                this.key = node.key;
                this.node = node;
                this.nodeTitle = node.outlineNodePropertyList.sectionText + " " + node.outlineNodePropertyList.nodeText;
                this.outlineNodePropertyList = ko.mapping.fromJS(node.outlineNodePropertyList);
                this.isArrayNode = this.node.outlineNodePropertyList.maxAllowed > 1;

                for (var i = 0; i < node.questionList.length; i++) {
                    var qView = QuestionViewModel.getQuestion(node.questionList[i]);
                    this.questionList.push(qView);
                }
                for (var i = 0; i < this.outlineNodeList.length; i++) {
                    this.outlineNodeList.push(new NodeViewModel(this.outlineNodeList[i]));
                }
            }
            NodeViewModel.prototype.getData = function () {
                if (this.isArrayNode) {
                    //TODO: add multi node support
                    alert('Multi nodes are not supported yet.');
                    return null;
                } else {
                    var qdata = {};
                    for (var i = 0; i < this.questionList().length; i++) {
                        var qView = this.questionList()[i];
                        qdata[qView.question.xmlName] = qView.answer;
                    }
                    var ndata = {};
                    for (var i = 0; i < this.outlineNodeList().length; i++) {
                        var nodeView = this.outlineNodeList()[i];
                        ndata[nodeView.outlineNodePropertyList.xmlName] = nodeView.getData();
                    }
                    var result = {};
                    result[this.node.outlineNodePropertyList.xmlName] = [qdata, ndata];
                    return result;
                }
            };

            NodeViewModel.prototype.executeAction = function (action) {
                if (action.objectType === Constants.OBJECT_TYPE_OUTLINE_NODE) {
                    if (this.key == action.objectKey) {
                        this.execNodeAction(action);
                    } else {
                        for (var i = 0; i < this.outlineNodeList().length; i++) {
                            this.outlineNodeList()[i].executeAction(action);
                        }
                    }
                } else if (action.objectType === Constants.OBJECT_TYPE_QUESTION) {
                    for (var i = 0; i < this.questionList().length; i++) {
                        this.questionList()[i].executeAction(action);
                    }
                }
            };

            NodeViewModel.prototype.execNodeAction = function (action) {
                util.Log.info('OBJECT_TYPE_OUTLINE_NODE');
                switch (action.actionType) {
                    case Constants.ACTION_ENABLE_ALL_QUESTIONS_ON_NODE:
                        util.Log.info('ACTION_ENABLE_ALL_QUESTIONS_ON_NODE');
                        break;
                    case Constants.ACTION_DISABLE_ALL_QUESTIONS_ON_NODE:
                        util.Log.info('ACTION_DISABLE_ALL_QUESTIONS_ON_NODE');
                        break;
                    case Constants.ACTION_REQUIRE_ALL_QUESTIONS_ON_NODE:
                        util.Log.info('ACTION_REQUIRE_ALL_QUESTIONS_ON_NODE');
                        break;
                    case Constants.ACTION_NOT_REQUIRE_ANY_QUESTION_ON_NODE:
                        util.Log.info('ACTION_NOT_REQUIRE_ANY_QUESTION_ON_NODE');
                        break;
                    case Constants.ACTION_ENABLE_REQUIRE_ALL_QUESTION_ON_NODE:
                        util.Log.info('ACTION_ENABLE_REQUIRE_ALL_QUESTION_ON_NODE');
                        break;
                    case Constants.ACTION_DISABLE_ALL_NOT_REQUIRE_ANY_QUESTION_ON_NODE:
                        util.Log.info('ACTION_DISABLE_ALL_NOT_REQUIRE_ANY_QUESTION_ON_NODE');
                        break;
                    case Constants.ACTION_SHOW_ALL_QUESTIONS_ON_NODE:
                        util.Log.info('ACTION_SHOW_ALL_QUESTIONS_ON_NODE');
                        break;
                    case Constants.ACTION_HIDE_ALL_QUESTIONS_ON_NODE:
                        util.Log.info('ACTION_HIDE_ALL_QUESTIONS_ON_NODE');
                        break;
                    case Constants.ACTION_ENABLE_NODE:
                        util.Log.info('ACTION_ENABLE_NODE');
                        break;
                    case Constants.ACTION_DISABLE_NODE:
                        util.Log.info('ACTION_DISABLE_NODE');
                        break;
                    case Constants.ACTION_CHANGE_PROPERTY_FOR_NODE:
                        util.Log.info('ACTION_CHANGE_PROPERTY_FOR_NODE');
                        break;
                }
            };
            return NodeViewModel;
        })();
        template.NodeViewModel = NodeViewModel;

        var QuestionViewModel = (function () {
            function QuestionViewModel(question) {
                this.question = question;
                this.questionTypeCode = question.questionTypeCode;
                this.view = ko.mapping.fromJS(question);
                this.model = question;
            }
            QuestionViewModel.getQuestion = function (question) {
                var qvm = null;
                switch (question.questionTypeCode) {
                    case Constants.QUESTION_TYPE_CHECKBOX_GROUP:
                        qvm = new QCheckBoxGroup(question);
                        break;
                    case Constants.QUESTION_TYPE_RADIO_GROUP:
                        qvm = new QRadioGroup(question);
                        break;
                    case Constants.QUESTION_TYPE_COMBOBOX:
                        qvm = new QComboboxView(question);
                        break;
                    case Constants.QUESTION_TYPE_CONTACT:
                        qvm = new QContact(question);
                        break;
                    default:
                        qvm = new QDefaultView(question);
                        break;
                }
                return qvm;
            };

            QuestionViewModel.prototype.executeAction = function (action) {
                if (this.model.key === action.objectKey) {
                    this.execQuestionAction(action);
                }
            };

            QuestionViewModel.prototype.execQuestionAction = function (action) {
                util.Log.info('OBJECT_TYPE_QUESTION');

                switch (action.actionType) {
                    case Constants.ACTION_ENABLE_QUESTION:
                        this.view.enabledStatus(true);
                        util.Log.info('ACTION_ENABLE_QUESTION');
                        break;
                    case Constants.ACTION_DISABLE_QUESTION:
                        this.view.enabledStatus(true);
                        util.Log.info('ACTION_DISABLE_QUESTION');
                        break;
                    case Constants.ACTION_REQUIRE_QUESTION:
                        this.view.responseRequired(true);
                        util.Log.info('ACTION_REQUIRE_QUESTION');
                        break;
                    case Constants.ACTION_NOT_REQUIRE_QUESTION:
                        this.view.responseRequired(false);
                        util.Log.info('ACTION_NOT_REQUIRE_QUESTION');
                        break;
                    case Constants.ACTION_ENABLE_REQUIRE_QUESTION:
                        this.view.enabledStatus(true);
                        this.view.responseRequired(true);
                        util.Log.info('ACTION_ENABLE_REQUIRE_QUESTION');
                        break;
                    case Constants.ACTION_DISABLE_AND_NOT_REQUIRE_QUESTION:
                        this.view.enabledStatus(false);
                        this.view.responseRequired(false);
                        util.Log.info('ACTION_DISABLE_AND_NOT_REQUIRE_QUESTION');
                        break;
                    case Constants.ACTION_CHANGE_REPONSE_LIST_QUESTION:
                        util.Log.info('ACTION_CHANGE_REPONSE_LIST_QUESTION');
                        break;
                    case Constants.ACTION_SHOW_QUESTION:
                        this.view.visibleStatus(true);
                        util.Log.info('ACTION_SHOW_QUESTION');
                        break;
                    case Constants.ACTION_HIDE_QUESTION:
                        this.view.visibleStatus(false);
                        util.Log.info('ACTION_HIDE_QUESTION');
                        break;
                    case Constants.ACTION_CHANGE_PROPERTY_QUESTION:
                        util.Log.info('ACTION_CHANGE_PROPERTY_QUESTION');
                        break;
                }
                //this.onQuestionChange(action, this);    // callback
            };

            QuestionViewModel.prototype.blank = function () {
                return (this.answer() === null || this.answer() === undefined || this.answer() === '');
            };
            QuestionViewModel.prototype.equal = function (value) {
                return this.answer() === value;
            };
            QuestionViewModel.prototype.contains = function (value) {
                return this.answer() === value;
            };
            QuestionViewModel.prototype.answerValue = function () {
                return this.answer();
            };
            return QuestionViewModel;
        })();
        template.QuestionViewModel = QuestionViewModel;

        var QDefaultView = (function (_super) {
            __extends(QDefaultView, _super);
            function QDefaultView(question) {
                _super.call(this, question);
                this.answer = ko.observable('');
                this.answer.extend({ logChange: this });
            }
            return QDefaultView;
        })(QuestionViewModel);
        template.QDefaultView = QDefaultView;

        var QRadioGroup = (function (_super) {
            __extends(QRadioGroup, _super);
            function QRadioGroup(question) {
                _super.call(this, question);
                this.answer = ko.observable('');
                this.answer.extend({ logChange: this });
            }
            return QRadioGroup;
        })(QuestionViewModel);
        template.QRadioGroup = QRadioGroup;

        var QComboboxView = (function (_super) {
            __extends(QComboboxView, _super);
            function QComboboxView(question) {
                _super.call(this, question);
                this.codeValue = null;
                this.answer = ko.observable();
                this.answer.extend({ logChange: this });
            }
            // ------------------------------------------------------------------------------
            QComboboxView.prototype.blank = function () {
                return (this.answer() === null || this.answer() === undefined || this.answer().code() === '');
            };
            QComboboxView.prototype.equal = function (value) {
                return this.answer().code() === value;
            };
            QComboboxView.prototype.contains = function (value) {
                return this.answer().code() === value;
            };
            QComboboxView.prototype.answerValue = function () {
                return this.answer().code();
            };
            return QComboboxView;
        })(QuestionViewModel);
        template.QComboboxView = QComboboxView;

        var QCheckBoxGroup = (function (_super) {
            __extends(QCheckBoxGroup, _super);
            function QCheckBoxGroup(question) {
                _super.call(this, question);
                this.answer = ko.observableArray([]);
                this.answer.extend({ logChange: this });
            }
            // ------------------------------------------------------------------------------
            QCheckBoxGroup.prototype.blank = function () {
                return (this.answer() === null || this.answer() === undefined || this.answer().length === 0);
            };
            QCheckBoxGroup.prototype.equal = function (value) {
                return this.answer() === value;
            };
            QCheckBoxGroup.prototype.contains = function (value) {
                if (this.answer()) {
                    for (var i = 0; i < this.answer().length; i++) {
                        if (this.answer()[i] === value) {
                            return true;
                        }
                    }
                }
                return false;
            };
            QCheckBoxGroup.prototype.answerValue = function () {
                if (this.answer()) {
                    return this.answer().join("|");
                }
                return null;
            };
            return QCheckBoxGroup;
        })(QuestionViewModel);
        template.QCheckBoxGroup = QCheckBoxGroup;

        var QContact = (function (_super) {
            __extends(QContact, _super);
            function QContact(question) {
                _super.call(this, question);
                this.answer = ko.observable();
                if (question.answer) {
                    this.answer({ title: ko.observable(question.answer.title), first: ko.observable(question.answer.first), middle: ko.observable(question.answer.middle), last: ko.observable(question.answer.last), email: ko.observable(question.answer.email), label: ko.observable(question.answer.label) });
                } else {
                    this.answer({ title: ko.observable(''), first: ko.observable(''), middle: ko.observable(''), last: ko.observable(''), email: ko.observable(''), label: ko.observable('') });
                }
                this.answer().title.extend({ logChange: this });
                this.answer().first.extend({ logChange: this });
                this.answer().middle.extend({ logChange: this });
                this.answer().last.extend({ logChange: this });
                this.answer().email.extend({ logChange: this });
                this.answer().label.extend({ logChange: this });
            }
            // ------------------------------------------------------------------------------
            QContact.prototype.blank = function () {
                return (this.answer === null || this.answer === undefined || (this.answer.title === '' && this.answer.first === '' && this.answer.middle === '' && this.answer.last === '' && this.answer.email === '' && this.answer.label === ''));
            };
            QContact.prototype.equal = function (value) {
                return false;
            };
            QContact.prototype.contains = function (value) {
                return false;
            };
            return QContact;
        })(QuestionViewModel);
        template.QContact = QContact;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=TemplateViewModel.js.map
