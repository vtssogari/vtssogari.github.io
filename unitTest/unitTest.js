///<reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="qunit-1.10.0.d.ts"/>
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
var delay = 800;

test("Template Loading test", function () {
    stop();
    load();
    setTimeout(function () {
        start();
    }, delay);
});

function load() {
    $.ajax("/template/forms/option_org.html", {
        type: "GET",
        success: function (data) {
            notEqual(data, null, "org option loading failed");
            var optionGroup = model.ModelLocator.getOptionListInstance();
            optionGroup.parseExternalJson($.parseJSON(data)); // external option list
            loadTemplate();
        },
        error: function (xhr, status, error) {
            ok(false, "Error loading /template/forms/PIDS.json - " + error);
        }
    });
}

function loadTemplate() {
    $.ajax("/template/forms/PIDS.html", {
        type: "GET",
        success: function (data) {
            notEqual(data, null, "Template loading failed");
            var optionGroup = model.ModelLocator.getOptionListInstance();
            optionGroup.parseTemplateJson($.parseJSON(data));
            var template = model.ModelLocator.getInstance();
            template.parseJson($.parseJSON(data));
            notEqual(template, null, "Template parsing failed");
        },
        error: function (xhr, status, error) {
            ok(false, "Error loading /template/forms/PIDS.json - " + error);
        }
    });
}

test("Template parsing test", function () {
    var template = model.ModelLocator.getInstance();
    ok(template.templatePropertyList.templateStatus === 0, "templateStatus");
    ok(template.templatePropertyList.templateCode === "PIDS", "templateCode");
    ok(template.templatePropertyList.templateReportType === "RHA", "templateReportType");
    ok(template.templatePropertyList.templateDocumentNumber === "", "templateDocumentNumber");
    ok(template.templatePropertyList.templateStatusCreateDate === "", "templateStatusCreateDate");
    ok(template.templatePropertyList.templateXMLName === "pids", "templateXMLName");
    ok(template.templatePropertyList.templateVersion === "1.0", "templateVersion");
    ok(template.templatePropertyList.templateXMLItemName === "", "templateXMLItemName");
    ok(template.templatePropertyList.templateStatusSubmitDate === "", "templateStatusSubmitDate");
    ok(template.templatePropertyList.templateName === "Pivotal IDE Description Summary Form", "templateName");
    ok(template.templatePropertyList.templateType === 0, "templateType");
    ok(template.templatePropertyList.templateDate === "20110426172502", "templateDate");
    ok(template.templatePropertyList.templateDescription === "", "templateDescription");
    ok(template.templatePropertyList.titleFieldKey === "PIDS.0", "titleFieldKey");
    ok(template.templatePropertyList.subTitleFieldKey === "PIDS.1", "subTitleFieldKey");
    ok(template.templatePropertyList.dateFieldKey === "", "dateFieldKey");
    ok(template.templatePropertyList.templateDataName === "", "templateDataName");

    ok(template.reportLayout.tab[0].outlineNodeList.length === 7, "Outline nodes are not parsed correctly");
    ok(template.reportLayout.tab[0].outlineNodeList[0].questionList.length === 12, "Question nodes are not parsed correctly");
    var question = template.reportLayout.tab[0].outlineNodeList[0].questionList[0];
    ok(question.questionTypeCode === Constants.QUESTION_TYPE_HTML, "Question type is incorrect.");
});

test("Tab parsing test", function () {
    var template = model.ModelLocator.getInstance();
    var tab = template.reportLayout.tab[0];
    ok(tab.key === "PIDS.1", "tab.key");
    ok(tab.tabPropertyList.text === 'Report', "tab.tabPropertyList.text");
    ok(tab.tabPropertyList.visibleStatus === true, "tab.tabPropertyList.visibleStatus");
});

test("Outline Node parsing test", function () {
    var template = model.ModelLocator.getInstance();
    var tab = template.reportLayout.tab[0];
    ok(tab.outlineNodeList.length === 7, "tab.outlineNodeList.length expects 7");
    var outlineNode = tab.outlineNodeList[0];
    ok(outlineNode.key === "PIDS.2", "outlineNode.key");
    ok(outlineNode.outlineNodeList.length === 0, "outlineNode.outlineNodeList");
    ok(outlineNode.outlineNodePropertyList.printStatus === 0, "printStatus");
    ok(outlineNode.outlineNodePropertyList.screenLayout === 0, "screenLayout");
    ok(outlineNode.outlineNodePropertyList.descName === "", "descName");
    ok(outlineNode.outlineNodePropertyList.xmlName === "administrative", "xmlName");
    ok(outlineNode.outlineNodePropertyList.screenTitle === "", "screenTitle");
    ok(outlineNode.outlineNodePropertyList.dataImportStatus === false, "dataImportStatus");
    ok(outlineNode.outlineNodePropertyList.detailsTitle === "", "detailsTitle");
    ok(outlineNode.outlineNodePropertyList.tableTitle === "", "tableTitle");
    ok(outlineNode.outlineNodePropertyList.maxAllowed === 0, "maxAllowed");
    ok(outlineNode.outlineNodePropertyList.relateStatus === false, "relateStatus");
    ok(outlineNode.outlineNodePropertyList.headerItemsDisplayed === 0, "headerItemsDisplayed");
    ok(outlineNode.outlineNodePropertyList.infoText === "", "infoText");
    ok(outlineNode.outlineNodePropertyList.printSectionBreakType === 0, "printSectionBreakType");
    ok(outlineNode.outlineNodePropertyList.nodeText === "ADMINISTRATIVE", "nodeText");
    ok(outlineNode.outlineNodePropertyList.numColumnsDisplayed === 0, "numColumnsDisplayed");
    ok(outlineNode.outlineNodePropertyList.minRequired === 0, "minRequired");
    ok(outlineNode.outlineNodePropertyList.nodeName === "", "nodeName");
    ok(outlineNode.outlineNodePropertyList.sectionText === "I.", "sectionText");
    ok(outlineNode.outlineNodePropertyList.xmlParentName === "pids", "xmlParentName");
    ok(outlineNode.outlineNodePropertyList.enabledStatus === true, "enabledStatus");
    ok(outlineNode.outlineNodePropertyList.visibleStatus === true, "visibleStatus");
    ok(outlineNode.outlineNodePropertyList.dataName === "", "dataName");
});

test("Parsing external Option Set test", function () {
    var optionGroup = model.ModelLocator.getOptionListInstance();
    ok(optionGroup.groupPropertyList.autoSort === true, "autoSort");
    ok(optionGroup.groupPropertyList.groupName === "Organization", "groupName");
    ok(optionGroup.optionSetList.length === 17, "optionSetList.length");

    var optionSet = optionGroup.getOptionSet("6");
    ok(optionSet.setPropertyList.autoSort == false, "autoSort");
    ok(optionSet.setPropertyList.setName == "Classification Panel", "setName");

    var item = optionSet.getItem("AN");
    ok(item.text === "ANESTHESIOLOGY", "item.text");
});

test("Parsing template Option Set test", function () {
    var optionGroup = model.ModelLocator.getOptionListInstance();
    ok(optionGroup.optionSetList.length === 17, "templateOptionGroup.optionSetList.length");
    var optionSet = optionGroup.getOptionSet("PIDS.9");

    ok(optionSet.setPropertyList.autoSort == false, "autoSort");
    ok(optionSet.setPropertyList.setName == "IDE_COMPARISON", "setName");

    var item = optionSet.getItem("TWO_SIDED");
    ok(item.text === "Two-Sided", "item.text");
});

// Question Type Testing ------------------------------------------------------
function getQuestionByKey(key) {
    var template = model.ModelLocator.getInstance();
    var questions = template.getQuestions(key);
    ok(questions.length === 1, "question is not found " + key);
    return questions[0];
}

test("Question HTML parsing test", function () {
    var key = "PIDS.85";
    var question = getQuestionByKey(key);

    // Parsing test
    ok(question.borderInclude === true, "borderInclude");
    ok(question.html === "<html>\r\n<H1 style=\"text-align:left\">\r\nPivotal<BR>\r\nIDE<BR>\r\nDescriptive<BR>\r\nSummary<H3><CENTER>Department of Health and Human Services<BR>Food and Drug Administration<BR>Center for devices and Radiologial Health<BR><H2><EM>Office of Device Evaluation & Office of In-Vitro Diagnostics<\/H2><BR><CENTER><EM>The following information is not intended to serve as a comprehensive review<\/EM><CENTER><BODY><HTML>", "html");

    // Json output test
    ok(question.questionValue == null, "Json output");
});

test("Question TEXTFIELD parsing test", function () {
    var key = "PIDS.0";
    var question = getQuestionByKey(key);
    ok(question.xmlName === "subjectId", "xmlName");

    ok(question.minResponseLength === 0, "minResponseLength");
    ok(question.maxResponseLength === 7, "maxResponseLength");
    ok(question.responseValidEntryCheck === 3, "responseValidEntryCheck");
    ok(question.responseCaseConversion === 1, "responseCaseConversion");
    ok(question.illegalCharList === undefined, "illegalCharList");
    ok(question.illegalCharListMessage === undefined, "illegalCharListMessage");
    ok(question.enableSymbols === false, "enableSymbols");
    ok(question.defaultOutput === "", "defaultOutput");
    ok(question.validRegExp === undefined, "validRegExp");

    ok(question.invalidApproach === undefined, "invalidApproach");
    ok(question.invalidRegExpMessage === undefined, "invalidRegExpMessage");

    ok(question.alignment === 0, "alignment");
    ok(question.displayLength === 10, "displayLength");
    ok(question.defaultStandard === "G", "defaultStandard");

    // Json output test
    question.questionValue.setValue("abc 123");
    var json = question.questionValue.getJson();
    var value = { subjectId: "abc 123" };
    ok(json.subjectId === value.subjectId, "Json output");
});

test("Question ComboBox parsing test", function () {
    var key = "PIDS.3";
    var question = getQuestionByKey(key);
    ok(question.xmlName === "division", "xmlName");

    ok(question.questionTypeCode === Constants.QUESTION_TYPE_COMBOBOX, "ComboBox");
    ok(question.optionSet.setPropertyList.setName === "IDE_REVIEWER_DIVISION", "optionSet.setPropertyList.setName");
    ok(question.optionSet.itemList[0].code === "DAGID", "code");
    ok(question.optionSet.itemList[0].text === "DAGID", "text");

    // Json output test
    question.questionValue.setValue("DAGID");
    var json = question.questionValue.getJson();
    var value = { division: "DAGID" };
    ok(json.division === value.division, "Json output");
});

test("Saving template test", function () {
    var template2 = model.ModelLocator.getInstance();

    // console.info(template2);
    ok(true, "Saved");
});

test("Serialize data test", function () {
    var template2 = model.ModelLocator.getInstance();
    var el = template2.getXML();
    ok(el !== null, "Dom creation");

    //console.info(XMLToString(el));
    var els = el.getElementsByTagName("subjectId");
    var subjectIdElement = els[0];
    ok(subjectIdElement.innerHTML === "abc 123", "Serialize subjectId");
    els = el.getElementsByTagName("division");
    var divisionElement = els[0];
    ok(divisionElement.innerHTML === "DAGID", "Serialize divisionElement");
});
//# sourceMappingURL=unitTest.js.map
