"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("zone.js");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
////////////////////////////////////////////// data object //////////////////////////////////////////
var FeedBackItem = (function () {
    function FeedBackItem(user, feedback, rating) {
        this.user = user;
        this.feedback = feedback;
        this.rating = rating;
    }
    return FeedBackItem;
}());
exports.FeedBackItem = FeedBackItem;
////////////////////////////////////////////// service  //////////////////////////////////////////
var FeedbackService = (function () {
    function FeedbackService(http) {
        this.http = http;
    }
    FeedbackService.prototype.getAllFeedbackItems = function () {
        var _this = this;
        return new Promise(function (res) {
            _this.http.get('/items').subscribe(function (response) {
                _this.items = response.json();
                res(_this.items);
            });
        });
    };
    FeedbackService.prototype.getFeedbackItemById = function (id) {
        return this.items.filter(function (i) { return i.user == id; })[0];
    };
    FeedbackService.prototype.addFeedbackItem = function (item) {
        this.http.post('/item', item).subscribe(function (res) { return res.json().data; });
        this.getAllFeedbackItems();
    };
    FeedbackService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], FeedbackService);
    return FeedbackService;
}());
exports.FeedbackService = FeedbackService;
////////////////////////////////////////////// components  //////////////////////////////////////////
var FeedbackList = (function () {
    function FeedbackList(fbs) {
        this.fbs = fbs;
        fbs.getAllFeedbackItems();
    }
    FeedbackList = __decorate([
        core_1.Component({
            selector: 'feedback-list',
            styles: ["\n        .feedbackitem { border:1px solid black;margin:5px;border-radius:2px;padding:5px;}\n    "],
            template: "\n        List of Feedback:\n        <div *ngIf=\"!feedbackitems\"> - no feedback yet - </div>\n        <div class=\"feedbackitem\" *ngFor=\"let item of fbs.items\">\n         <a [routerLink]=\"['/feedback',item.user]\">{{ item.user }} </a>\n         </div>\n\n        <a [routerLink]=\"['/newFeedback']\"> Add feedback </a>\n    "
        }),
        __metadata("design:paramtypes", [FeedbackService])
    ], FeedbackList);
    return FeedbackList;
}());
exports.FeedbackList = FeedbackList;
var FeedbackDetail = (function () {
    function FeedbackDetail(fbs, route) {
        this.fbs = fbs;
        this.route = route;
        this.item = new FeedBackItem("", "", 0);
    }
    FeedbackDetail.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params["id"];
        this.item = this.fbs.getFeedbackItemById(id);
    };
    FeedbackDetail = __decorate([
        core_1.Component({
            selector: 'feedback-detail',
            template: "\n        Details for item: <br/>\n        <i> {{ item.user }} Said about the course: </i>\n        <hr>\n        {{ item.feedback }}\n        <hr>\n        <small>Rating: {{ item.rating }}</small>\n        <a [routerLink]=\"['/home']\">Go back to the list</a>\n    "
        }),
        __metadata("design:paramtypes", [FeedbackService, router_1.ActivatedRoute])
    ], FeedbackDetail);
    return FeedbackDetail;
}());
exports.FeedbackDetail = FeedbackDetail;
var FeedbackEntry = (function () {
    function FeedbackEntry(fbs, http, router) {
        this.fbs = fbs;
        this.http = http;
        this.router = router;
    }
    FeedbackEntry.prototype.saveFeedBack = function (item) {
        this.fbs.addFeedbackItem(item);
        this.router.navigate(['/home']);
    };
    FeedbackEntry = __decorate([
        core_1.Component({
            selector: 'feedback-entry',
            template: "\n        <form #f=\"ngForm\" (ngSubmit)=\"saveFeedBack(f.value)\">\n            <dl>\n                <dt>Username</dt><dd><input type=\"text\" name=\"user\" ngModel/></dd>\n                <dt>Your feedback</dt><dd><input type=\"text\" name=\"feedback\" ngModel/></dd>\n                <dt>Overall rating</dt><dd><input type=\"number\" name=\"rating\" ngModel/></dd>\n            </dl>\n            <input type=\"submit\" value=\"save\" />\n        </form>\n    "
        }),
        __metadata("design:paramtypes", [FeedbackService, http_1.Http, router_1.Router])
    ], FeedbackEntry);
    return FeedbackEntry;
}());
exports.FeedbackEntry = FeedbackEntry;
var MainApplication = (function () {
    function MainApplication() {
    }
    MainApplication = __decorate([
        core_1.Component({
            selector: 'app-root',
            styles: ["\n        .shippingterms {\n            border:2px solid black;\n            position:fixed;\n            right:5px;bottom:5px;\n            margin:5px;padding:5px;border-radius:5px;\n            background-color:silver;\n        }\n    "],
            template: "\n        <h1>Leave your feedback</h1>\n        <a [routerLink]=\"[{outlets:{'terms': ['ship']}}]\">Show ShippingInfo</a> \n        <a [routerLink]=\"[{outlets:{'terms': null}}]\">Hide ShippingInfo</a> \n\n        <hr>\n\n        <router-outlet></router-outlet>\n        <div class=\"shippingterms\">\n            <router-outlet name=\"terms\"></router-outlet>\n        </div>\n        "
        })
    ], MainApplication);
    return MainApplication;
}());
exports.MainApplication = MainApplication;
var ShippingComponent = (function () {
    function ShippingComponent() {
    }
    ShippingComponent = __decorate([
        core_1.Component({
            selector: 'shipping-info',
            template: "\n        <h1>Terms of Shipping</h1>\n        "
        })
    ], ShippingComponent);
    return ShippingComponent;
}());
exports.ShippingComponent = ShippingComponent;
var routes = [
    { path: '', component: FeedbackList },
    { path: 'home', component: FeedbackList },
    { path: 'newFeedback', component: FeedbackEntry },
    { path: 'feedback/:id', component: FeedbackDetail },
    { path: 'ship', component: ShippingComponent, outlet: "terms" },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(routes)],
            declarations: [ShippingComponent, FeedbackDetail, MainApplication, FeedbackEntry, FeedbackList],
            providers: [FeedbackService],
            bootstrap: [MainApplication]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=index.js.map