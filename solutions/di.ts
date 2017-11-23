import { ReflectiveInjector, Provider } from '@angular/core'

abstract class ALogger {
    log(line:string){}
}

class ConsoleLogger extends ALogger {
    log(line:string){
        console.log("LOG: " + line);
    }
}
class SuperLogger extends ALogger {
    log(line:string){
        console.log("SUPERLOG: " + line);
    }
}

let injector = ReflectiveInjector.resolveAndCreate([
    { provide:ALogger, useClass:ConsoleLogger}
])

class Program{
    constructor(logger:ALogger){
        logger.log("testing");
    }
}

new Program(injector.get(ALogger));

