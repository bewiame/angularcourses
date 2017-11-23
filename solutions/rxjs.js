// let Rx = require('rxjs');

// var observable = Rx.Observable.create(function (observer) {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     setTimeout(() => {
//       observer.next(4);
//       observer.complete();
//     }, 1000);
//   });
  
//   console.log('just before subscribe');
// //   observable.subscribe({
// //     next: x => console.log('got value ' + x),
// //     error: err => console.error('something wrong occurred: ' + err),
// //     complete: () => console.log('done'),
// //   });

//   observable.subscribe(x => console.log('got value ' + x));

//   console.log('just after subscribe');



  var test = new Promise((res, rej) => {
      console.log("I am working on it..");
      setTimeout(() => {
          console.log("I am done working on it..");  
          res("done")
      }, 5000); 
  });

  test.then(() => { console.log("Ok he is done...")});
  test.then(() => { console.log("Ok he is done...")});

