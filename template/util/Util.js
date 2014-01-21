// Module
var util;
(function (util) {
    // Class
    var Log = (function () {
        function Log() {
        }
        Log.error = function (message) {
            console.log(message);
        };
        Log.info = function (message) {
            console.log(message);
        };
        return Log;
    })();
    util.Log = Log;

    var Util = (function () {
        function Util() {
        }
        Util.getLeftOf = function (aOverallText, aBoundaryText) {
            var values = aOverallText.split(aBoundaryText);
            if (values != null && values.length > 0) {
                return values[0];
            } else {
                return "";
            }
        };

        Util.getRightOf = function (aOverallText, aBoundaryText) {
            var values = aOverallText.split(aBoundaryText);
            if (values != null && values.length > 1) {
                return values[1];
            } else {
                return "";
            }
        };

        Util.getBool = function (value) {
            if (value !== undefined && value !== null) {
                return (value === 'Y');
            } else {
                return false;
            }
        };

        Util.getNumber = function (value) {
            if (value !== undefined && value !== null) {
                return parseInt(value);
            } else {
                return 0;
            }
        };

        Util.tagEqual = function (tag1, tag2) {
            if (tag1 && tag2) {
                return tag1.toLowerCase() === tag2.toLowerCase();
            }
            return false;
        };
        return Util;
    })();
    util.Util = Util;
})(util || (util = {}));
//# sourceMappingURL=Util.js.map
