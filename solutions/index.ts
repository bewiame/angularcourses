
import 'reflect-metadata'
import 'zone.js'

import { Inject, SkipSelf, Optional, OnInit, Injectable, EventEmitter, Input, Output, NgModule, Component } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { FormsModule } from '@angular/forms'
import { HttpModule, Http } from '@angular/http'
import { ActivatedRoute, RouterLink, Router, RouterOutlet, RouterModule } from '@angular/router'

////////////////////////////////////////////// data object //////////////////////////////////////////
export class FeedBackItem{
    constructor (public user:string, public feedback:string, public rating:number){}
}

////////////////////////////////////////////// service  //////////////////////////////////////////
@Injectable()
export class DummyService {
    static counter:number = 0;
    id:string;
    constructor(){
        DummyService.counter++;
        this.id = "Dummy " + DummyService.counter;
        console.log(this.id + "inside the constructor: " + DummyService.counter);
    }

    showLog(){
        console.log(this.id + "Hi I am ready for use...");
    }
}

@Injectable()
export class FeedbackService {
    constructor(private http:Http){}
    public items:FeedBackItem[];

    getAllFeedbackItems(){
        return new Promise((res) => {
            this.http.get('/items').subscribe((response) =>{
                this.items = response.json();
                res(this.items);
            });
        });
    }

    getFeedbackItemById(id:string): FeedBackItem{
        return this.items.filter((i) => i.user == id)[0];
    }

    addFeedbackItem(item:FeedBackItem){
        this.http.post('/item', item).subscribe(res => res.json().data);
        this.getAllFeedbackItems();
    }
}

////////////////////////////////////////////// components  //////////////////////////////////////////
@Component({
    selector:'feedback-list',
    providers:[DummyService],
    styles:[`
        .feedbackitem { border:1px solid black;margin:5px;border-radius:2px;padding:5px;}
    `],
    template:`
        List of Feedback:
        <div *ngIf="!feedbackitems"> - no feedback yet - </div>
        <div class="feedbackitem" *ngFor="let item of fbs.items">
         <a [routerLink]="['/feedback',item.user]">{{ item.user }} </a>
         </div>

        <a [routerLink]="['/newFeedback']"> Add feedback </a>
    `
})
export class FeedbackList {
    constructor(@SkipSelf() private dummy:DummyService, private fbs:FeedbackService){
        fbs.getAllFeedbackItems();
        dummy.showLog();
    }
}

@Component({
    selector:'feedback-detail',
    template:`
        Details for item: <br/>
        <i> {{ item.user }} Said about the course: </i>
        <hr>
        {{ item.feedback }}
        <hr>
        <small>Rating: {{ item.rating }}</small>
        <a [routerLink]="['/home']">Go back to the list</a>
    `
})
export class FeedbackDetail implements OnInit
{
    item:FeedBackItem = new FeedBackItem("","",0);
    constructor(private fbs:FeedbackService, private route:ActivatedRoute){}

    ngOnInit(){
        let id = this.route.snapshot.params["id"];
        this.item = this.fbs.getFeedbackItemById(id);
    }
}


@Component({
    selector:'feedback-entry',
    template:`
        <form #f="ngForm" (ngSubmit)="saveFeedBack(f.value)">
            <dl>
                <dt>Username</dt><dd><input type="text" name="user" ngModel/></dd>
                <dt>Your feedback</dt><dd><input type="text" name="feedback" ngModel/></dd>
                <dt>Overall rating</dt><dd><input type="number" name="rating" ngModel/></dd>
            </dl>
            <input type="submit" value="save" />
        </form>
    `
})
export class FeedbackEntry {
    constructor(private fbs:FeedbackService, private http:Http, private router:Router){}
    saveFeedBack(item:FeedBackItem){
        this.fbs.addFeedbackItem(item);
        this.router.navigate(['/home']);
    }
}

@Component({
    selector:'app-root',
    styles:[`
        .shippingterms {
            border:2px solid black;
            position:fixed;
            right:5px;bottom:5px;
            margin:5px;padding:5px;border-radius:5px;
            background-color:silver;
        }
    `],
    template:`
        <h1>Leave your feedback</h1>
        <a [routerLink]="[{outlets:{'terms': ['ship']}}]">Show ShippingInfo</a> 
        <a [routerLink]="[{outlets:{'terms': null}}]">Hide ShippingInfo</a> 

        <hr>

        <router-outlet></router-outlet>
        <div class="shippingterms">
            <router-outlet name="terms"></router-outlet>
        </div>
        `
})
export class MainApplication {
    constructor(dummy:DummyService, @Inject('CONFIG') settings:any){
        console.log("url: " + settings.service_url); 
        dummy.showLog();
    }
}

@Component({
    selector:'shipping-info',
    template:`
        <h1>Terms of Shipping</h1>
        `
})
export class ShippingComponent {
    // addFeedbackItem(item:FeedBackItem){
    //     this.feedbackItems.push(item);
    //     this.http.post('/item', item).subscribe(res => res.json().data);
    // }
}

let settings = {service_url:'http://prod..'};

let routes = [
    { path:'', component:FeedbackList},
    { path:'home', component:FeedbackList},
    { path:'newFeedback', component:FeedbackEntry},
    { path:'feedback/:id', component:FeedbackDetail},
    { path:'ship', component:ShippingComponent, outlet:"terms"},
];

@NgModule({
    imports:[BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes)],
    declarations:[ShippingComponent,FeedbackDetail, MainApplication, FeedbackEntry, FeedbackList],
    providers:[
        {provide:FeedbackService, useClass:FeedbackService},
        {provide:'CONFIG', useValue:settings},
        DummyService
    ],
    bootstrap:[MainApplication]
})
export class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);