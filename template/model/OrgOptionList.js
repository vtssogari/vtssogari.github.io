///<reference path="../util/Util.ts"/>
var model;
(function (model) {
    (function (template) {
        var OptionGroup = (function () {
            function OptionGroup() {
                this.optionSetList = [];
            }
            OptionGroup.prototype.parseExternalJson = function (json) {
                if (json.optionGroup) {
                    this.json = json;
                    this.groupPropertyList = new GroupPropertyList();
                    this.groupPropertyList.parseJson(json.optionGroup.groupPropertyList);
                    if (json.optionGroup.optionSetList && json.optionGroup.optionSetList.optionSet) {
                        this.parseOptionSet(json.optionGroup.optionSetList);
                    }
                }
            };

            OptionGroup.prototype.parseTemplateJson = function (json) {
                if (json.reportTemplate && json.reportTemplate.optionSetList) {
                    this.parseOptionSet(json.reportTemplate.optionSetList);
                }
            };

            OptionGroup.prototype.parseOptionSet = function (json) {
                for (var i = 0; i < json.optionSet.length; i++) {
                    var optionSetJson = json.optionSet[i];
                    var optionSet = new OptionSet();
                    optionSet.parseJson(optionSetJson);
                    this.optionSetList.push(optionSet);
                }
            };

            OptionGroup.prototype.getOptionSet = function (key, optionGropuKey) {
                if (typeof optionGropuKey === "undefined") { optionGropuKey = null; }
                var optionSet = null;
                for (var i = 0; i < this.optionSetList.length; i++) {
                    if (this.optionSetList[i].key + "" === key) {
                        optionSet = this.optionSetList[i];
                        break;
                    }
                }
                return optionSet;
            };
            return OptionGroup;
        })();
        template.OptionGroup = OptionGroup;

        var GroupPropertyList = (function () {
            function GroupPropertyList() {
                this.optionSetList = [];
            }
            GroupPropertyList.prototype.parseJson = function (json) {
                if (json) {
                    this.autoSort = util.Util.getBool(json.autoSort);
                    this.groupName = json.groupName;
                }
            };
            return GroupPropertyList;
        })();
        template.GroupPropertyList = GroupPropertyList;

        var OptionSet = (function () {
            function OptionSet() {
                this.itemList = [];
            }
            OptionSet.prototype.parseJson = function (json) {
                if (json) {
                    this.key = json.key;
                    this.setPropertyList = new SetPropertyList();
                    this.setPropertyList.parseJson(json.setPropertyList);
                    if (json.itemList && json.itemList.item) {
                        for (var i = 0; i < json.itemList.item.length; i++) {
                            var itemJson = json.itemList.item[i];
                            var item = new Item();
                            item.parseJson(itemJson);
                            this.itemList.push(item);
                        }
                    }
                }
            };

            OptionSet.prototype.addEmptySet = function () {
                this.itemList.unshift(new Item());
            };

            OptionSet.prototype.getItem = function (code) {
                var result = null;
                for (var i = 0; this.itemList.length; i++) {
                    if (this.itemList[i].code === code) {
                        result = this.itemList[i];
                        break;
                    }
                }
                return result;
            };
            return OptionSet;
        })();
        template.OptionSet = OptionSet;

        var SetPropertyList = (function () {
            function SetPropertyList() {
            }
            SetPropertyList.prototype.parseJson = function (json) {
                if (json) {
                    this.autoSort = util.Util.getBool(json.autoSort);
                    this.setName = json.setName;
                }
            };
            return SetPropertyList;
        })();
        template.SetPropertyList = SetPropertyList;

        var Item = (function () {
            function Item() {
            }
            Item.prototype.parseJson = function (json) {
                if (json) {
                    this.code = json.code;
                    this.text = json.text;
                }
            };
            return Item;
        })();
        template.Item = Item;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=OrgOptionList.js.map
