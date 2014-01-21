var model;
(function (model) {
    (function (template) {
        // Module
        (function (questions) {
            // Class
            var DocumentBasic = (function () {
                function DocumentBasic() {
                }
                DocumentBasic.CHAR_VALID_NONE = 0;
                DocumentBasic.CHAR_VALID_NUMERIC_ONLY = 1;
                DocumentBasic.CHAR_VALID_LETTER_ONLY = 2;
                DocumentBasic.CHAR_VALID_LETTER_NUMERIC_ONLY = 3;

                DocumentBasic.CONV_NONE = 0;
                DocumentBasic.CONV_UPPER_CASE = 1;
                DocumentBasic.CONV_LOWER_CASE = 2;
                return DocumentBasic;
            })();
            questions.DocumentBasic = DocumentBasic;
        })(template.questions || (template.questions = {}));
        var questions = template.questions;
    })(model.template || (model.template = {}));
    var template = model.template;
})(model || (model = {}));
//# sourceMappingURL=DocumentBasic.js.map
