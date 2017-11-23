### Make an AJAX request

The `Http` class in the `HttpModule` is responsible for making AJAX requests.

```ts
import { HttpModule } from '@angular/http';

@NgModule({
	imports: [..., HttpModule],
	declarations: [...],
	providers: [...],
	bootstrap: [...]
})
export class AppModule { }
```

---

### Make an AJAX request

* Inject `Http` in the constructor and send out a request

```ts
constructor(private http: Http) {
    this.http
        .get('api/people')
        .subscribe(response => {
            this.people = response.json();
        });
}
```

Notice the `subscribe()` here. We're dealing with so-called observables.