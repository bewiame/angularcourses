# Lab Http

## Exercise 1: Retrieve contacts from a REST service

1. In the `resource/` folder, there's a `service.js` file to boot up a REST service.
1. Open a commandprompt in this folder and execute the following commands

    ```bash
    npm install restify@4.2.0 --save-dev
    node service.js
    ```
    This will boot up a REST server you can use during this lab.
1. Register the `HttpModule` with your module.
1. Inject `Http` using the constructor. You can find `Http` in `@angular/http`
    ```ts
      constructor(private http : Http) { }
    ```
1. Retrieve the contacts from the REST service

    ```ts
    constructor() {
          this.http
              .get('http://localhost:9688/contacts')
              .map(resp => resp.json())
              .subscribe(c => this.contacts = c);  
    }
    ```

## Exercise 2: More interaction with the REST service

Change the implementationi of adding, editing and deleting of contacts to work with the REST service.