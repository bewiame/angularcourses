### Internationalization

Some pipes (`date`, `currency`, `decimal` and `percent`) use the Intl API, which is not supported by older browsers. 

You can configure this API in your module

```ts
import { NgModule, LOCALE_ID } from '@angular/core';

@NgModule({
	imports: [...],
	declarations: [...],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'nl-NL'
		},
		...
	],
	bootstrap: []
})
export class AppModule { }
```