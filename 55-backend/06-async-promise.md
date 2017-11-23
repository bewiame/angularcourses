### AsyncPipe

* A pipe that deals with observables/promises
* Expose the promise

```ts
peoplePromise: Promise<string[]>;
constructor(private http: Http) {
    this.peoplePromise = this.http
        .get('api/people')
        .toPromise()
        .then(resp => resp.json().data)
        .then(people => people.map(p => p.name));
}
```
* Use in your HTML:

```html
<p>Names: {{peoplePromise | async | greetAll}}</p>
```