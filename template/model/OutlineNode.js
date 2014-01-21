var model;
(function (model) {
    (function (template) {
        var OutlineNode = (function () {
            function OutlineNode() {
                // member variables ---------------------------------------------------
                this.id = model.template.GUID();
                this.questionList = null;
                this.outlineNodeList = null;
            }
            // member functions ---------------------------------------------------
            OutlineNode.prototype.praseJson = function (json) {
                if (json && json != '') {
                    this.json = json;
                    this.key = json.key;
                    this.outlineNodePropertyList = new OutlineNodePropertyList();
                    this.outlineNodePropertyList.praseJson(json.outlineNodePropertyList);
                    this.questionList = model.template.paraseQuestionList(json);
                    this.outlineNodeList = model.template.parseOutlineNodeList(json);
                }
            };

            OutlineNode.prototype.clone = function () {
                var outlineNode = new OutlineNode();
                outlineNode.praseJson(this.json);
                return outlineNode;
            };

            OutlineNode.prototype.getJson = function () {
                if (this.outlineNodePropertyList.xmlName) {
                    var result = null;
                    var json = null;
                    for (var i = 0; i < this.questionList.length; i++) {
                        json = this.questionList[i].getValue().getJson();
                        if (json != null) {
                            if (result === null) {
                                result = {};
                            }
                            result[this.outlineNodePropertyList.xmlName] = json;
                        }
                    }
                    for (var i = 0; i < this.outlineNodeList.length; i++) {
                        var node = this.outlineNodeList[i];
                        json = node.getJson();
                        if (json != null) {
                            if (result === null) {
                                result = {};
                            }
                            result[this.outlineNodePropertyList.xmlName] = json;
                        }
                    }
                    return result;
                } else {
                    return null;
                }
            };

            OutlineNode.prototype.getDom = function () {
                if (this.outlineNodePropertyList.xmlName) {
                    var parentDom = document.createElement(this.outlineNodePropertyList.xmlName);
                    var childDom = null;
                    var result = null;
                    for (var i = 0; i < this.questionList.length; i++) {
                        if (this.questionList[i].getValue() != null) {
                            childDom = this.questionList[i].getDom();
                            if (childDom != null) {
                                parentDom.appendChild(childDom);
                            }
                        }
                    }
                    for (var i = 0; i < this.outlineNodeList.length; i++) {
                        var node = this.outlineNodeList[i];
                        childDom = node.getDom();
                        if (childDom != null) {
                            parentDom.appendChild(childDom);
                        }
                    }
                    return parentDom;
                } else {
                    return null;
                }
            };

            OutlineNode.prototype.setDom = function (el) {
                if (util.Util.tagEqual(el.nodeName, this.outlineNodePropertyList.xmlName)) {
                    for (var i = 0; i < this.questionList.length; i++) {
                        for (var j = 0; j < el.childNodes.length; j++) {
                            this.questionList[i].setDom(el.childNodes[j]);
                        }
                    }
                    for (var i = 0; i < this.outlineNodeList.length; i++) {
                        var node = this.outlineNodeList[i];
                        for (var j = 0; j < el.childNodes.length; j++) {
                            node.setDom(el.childNodes[j]);
                        }
                    }
                }
            };

            OutlineNode.prototype.addNewOutlineNode = function (sourceNode2Copy) {
                var addedAt = -1;
                if (this.canAddNode(sourceNode2Copy.key)) {
                    var addedAt = model.template.addNewOutlineNode(sourceNode2Copy, this.outlineNodeList);
                    if (addedAt != -1) {
                        var newNode = this.outlineNodeList[addedAt];
                        this.onNewNodeAdd(model.template.EVENT_TAB_ADD_NODE, newNode, addedAt);
                    }
                }
                return addedAt;
            };

            OutlineNode.prototype.canAddNode = function (nodeKey) {
                var result = false;
                if (this.outlineNodePropertyList.maxAllowed !== 0) {
                    var numNodes = getNumberOfNodes(nodeKey, this.outlineNodeList);
                    if (numNodes < this.outlineNodePropertyList.maxAllowed) {
                        result = true;
                    }
                }
                return result;
            };

            OutlineNode.prototype.getOutlineNodes = function (key) {
                var outlineNodes = [];
                if (this.key = key) {
                    outlineNodes.push(this);
                }
                for (var i = 0; i < this.outlineNodeList.length; i++) {
                    var nodes = this.outlineNodeList[i].getOutlineNodes(key);
                    if (nodes.length > 0) {
                        outlineNodes.concat(nodes);
                    }
                }
                return outlineNodes;
            };

            OutlineNode.prototype.getQuestions = function (key) {
                var questions = [];
                for (var i = 0; i < this.questionList.length; i++) {
                    var q = this.questionList[i];
                    if (q.key === key) {
                        questions.push(q);
                    }
                }
                for (var i = 0; i < this.outlineNodeList.length; i++) {
                    var node = this.outlineNodeList[i];
                    questions.concat(node.getQuestions(key));
                }
                return questions;
            };
            return OutlineNode;
        })();
        template.OutlineNode = OutlineNode;

        var OutlineNodePropertyList = (function () {
            function OutlineNodePropertyList() {
            }
            // member functions ---------------------------------------------------
            OutlineNodePropertyList.prototype.praseJson = function (json) {
                if (json) {
                    this.nodeText = json.nodeText;
                    this.nodeName = json.nodeName;
                    this.maxAllowed = parseInt(json.maxAllowed);
                    this.minRequired = parseInt(json.minRequired);
                    this.screenLayout = parseInt(json.screenLayout);
                    this.sectionText = json.sectionText;
                    this.screenTitle = json.screenTitle;
                    this.descName = json.descName;
                    this.detailsTitle = json.detailsTitle;
                    this.tableTitle = json.tableTitle;
                    this.linesPerRow = parseInt(json.linesPerRow);
                    this.headerItemsDisplayed = parseInt(json.headerItemsDisplayed);
                    this.numColumnsDisplayed = parseInt(json.numColumnsDisplayed);
                    this.relateStatus = json.relateStatus === 'Y' ? true : false;
                    this.infoText = json.infoText;
                    this.enabledStatus = json.enabledStatus === 'Y' ? true : false;
                    this.visibleStatus = json.visibleStatus === 'Y' ? true : false;
                    this.printStatus = parseInt(json.printStatus);
                    this.printSectionBreakType = parseInt(json.printSectionBreakType);

                    this.xmlName = json.xmlName;
                    this.xmlParentName = json.xmlParentName;
                    this.dataImportStatus = json.dataImportStatus === 'Y' ? true : false;
                    this.dataName = json.dataName;
                }
            };
            return OutlineNodePropertyList;
        })();
        template.OutlineNodePropertyList = OutlineNodePropertyList;

        function getNumberOfNodes(nodeKey, outlineNodeList) {
            var numberOfNodes = 0;
            for (var i = 0; i < outlineNodeList.length; i++) {
                if (nodeKey === outlineNodeList[i].key) {
                    numberOfNodes++;
                }
            }
            return numberOfNodes;
        }
        template.getNumberOfNodes = getNumberOfNodes;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=OutlineNode.js.map
