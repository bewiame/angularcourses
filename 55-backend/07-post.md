### Posting data

* Same as GET, but we need to configure the headers:

```ts
private save(person: Person): Observable<Person> {
    let headers = new Headers({
        'Content-Type': 'application/json'
    });

    return this.http
        .post('app/people', person, { headers: headers })
        .catch(this.handleError)
        .subscribe(res => res.json().data);
}
```