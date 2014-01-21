///<reference path="../util/Constants.ts"/>
///<reference path="../rule/Action.ts"/>
///<reference path="TemplateModel.ts"/>
///<reference path="../util/Util.ts"/>
var model;
(function (model) {
    (function (template) {
        var Tab = (function () {
            function Tab() {
                // member variables ---------------------------------------------------
                this.id = model.template.GUID();
                this.outlineNodeList = [];
            }
            // member functions ---------------------------------------------------
            Tab.prototype.parseJson = function (json) {
                if (json) {
                    this.key = json.key;
                    this.tabPropertyList = new TabPropertyList();
                    this.tabPropertyList.parseJson(json.tabPropertyList);
                    this.outlineNodeList = model.template.parseOutlineNodeList(json);
                }
            };

            Tab.prototype.getDom = function () {
                var elements = [];
                for (var i = 0; i < this.outlineNodeList.length; i++) {
                    var childDom = this.outlineNodeList[i].getDom();
                    if (childDom != null) {
                        elements.push(childDom);
                    }
                }
                return elements;
            };

            Tab.prototype.setDom = function (children) {
                for (var i = 0; i < children.length; i++) {
                    var childEl = children[i];
                    for (var j = 0; j < this.outlineNodeList.length; j++) {
                        var oNode = this.outlineNodeList[j];
                        if (childEl.nodeName == oNode.outlineNodePropertyList.xmlName) {
                            //TODO:
                        }
                    }
                }
            };

            Tab.prototype.addNewOutlineNode = function (sourceNode2Copy) {
                var addedAt = model.template.addNewOutlineNode(sourceNode2Copy, this.outlineNodeList);
                if (addedAt != -1) {
                    var newNode = this.outlineNodeList[addedAt];
                    this.onNewNodeAdd(model.template.EVENT_TAB_ADD_NODE, newNode, addedAt);
                }
                return addedAt;
            };

            Tab.prototype.getOutlineNodes = function (key) {
                var outlineNodes = [];
                for (var i = 0; i < this.outlineNodeList.length; i++) {
                    var nodes = this.outlineNodeList[i].getOutlineNodes(key);
                    outlineNodes = outlineNodes.concat(nodes);
                }
                return outlineNodes;
            };

            Tab.prototype.getQuestions = function (key) {
                var questions = [];
                for (var i = 0; i < this.outlineNodeList.length; i++) {
                    var nodes = this.outlineNodeList[i].getQuestions(key);
                    questions = questions.concat(nodes);
                }
                return questions;
            };
            return Tab;
        })();
        template.Tab = Tab;

        var TabPropertyList = (function () {
            function TabPropertyList() {
            }
            // member functions ---------------------------------------------------
            TabPropertyList.prototype.parseJson = function (json) {
                if (json) {
                    this.text = json.text;
                    this.visibleStatus = (json.visibleStatus === 'Y' ? true : false);
                }
            };
            return TabPropertyList;
        })();
        template.TabPropertyList = TabPropertyList;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=Tab.js.map
