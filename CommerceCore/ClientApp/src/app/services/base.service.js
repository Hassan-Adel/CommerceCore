"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    BaseService.prototype.handleError = function (error) {
        debugger;
        console.log("handleError : " + error);
        var applicationError = error.headers.get('Application-Error');
        // either applicationError in header or model error in body
        if (applicationError) {
            return Rx_1.Observable.throw(applicationError);
        }
        var modelStateErrors = '';
        var serverError = error.error.errors;
        if (!serverError.type) {
            for (var key in serverError[0]) {
                //if (serverError[key])
                modelStateErrors += key + '\n';
                //}
            }
            modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
            return Rx_1.Observable.throw(modelStateErrors || 'Server error');
        }
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map