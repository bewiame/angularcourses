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
var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.log = function (line) { };
    return Logger;
}());
var ConsoleLogger = (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConsoleLogger.prototype.log = function (line) {
        console.log("CONSOLE: " + line);
    };
    return ConsoleLogger;
}(Logger));
var WindowsLogger = (function (_super) {
    __extends(WindowsLogger, _super);
    function WindowsLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowsLogger.prototype.log = function (line) {
        console.log("WINDOWS: " + line);
    };
    return WindowsLogger;
}(Logger));
var injector = core_1.ReflectiveInjector.resolveAndCreate([
    { provide: Logger, useClass: WindowsLogger }
]);
var Program = (function () {
    function Program(l) {
        this.logger = l;
    }
    Program.prototype.start = function () {
        this.logger.log("starting program..");
        // started
        this.logger.log("ending program..");
    };
    return Program;
}());
var p = new Program(injector.get(Logger));
p.start();
//# sourceMappingURL=didemo.js.map