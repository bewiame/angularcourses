import { ReflectiveInjector } from '@angular/core'

abstract class Logger {
    log(line:String){}
}
class ConsoleLogger extends Logger {
    log(line:String){
        console.log("CONSOLE: " + line);
    }
}
class WindowsLogger extends Logger {
    log(line:String){
        console.log("WINDOWS: " + line);
    }
}

let injector = ReflectiveInjector.resolveAndCreate([
    { provide:Logger, useClass:WindowsLogger}
]);

class Program {
    logger:Logger;

    constructor(l:Logger){
        this.logger = l;
    }

    start(){
        this.logger.log("starting program..");
        // started
        this.logger.log("ending program..");
    }
}


let p = new Program(injector.get(Logger));
p.start(); 