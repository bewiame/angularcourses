"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ALogger = (function () {
    function ALogger() {
    }
    ALogger.prototype.log = function (line) { };
    return ALogger;
}());
var ConsoleLogger = (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConsoleLogger.prototype.log = function (line) {
        console.log("LOG: " + line);
    };
    return ConsoleLogger;
}(ALogger));
var SuperLogger = (function (_super) {
    __extends(SuperLogger, _super);
    function SuperLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SuperLogger.prototype.log = function (line) {
        console.log("SUPERLOG: " + line);
    };
    return SuperLogger;
}(ALogger));
var injector = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: ALogger, useClass: ConsoleLogger }
]);
var Program = (function () {
    function Program(logger) {
        logger.log("testing");
    }
    return Program;
}());
new Program(injector.get(ALogger));
//# sourceMappingURL=di.js.map