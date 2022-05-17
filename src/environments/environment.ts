// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//test1@gmail.com / abc123
// test2@gmail.com / abc123
import {IEnvironment} from "./environment.interface";

export const environment: IEnvironment = {
    production: false,
    backend: 'wss://testmain.captionworks.com:3000/socket',
    role: 'booking',
    viewerUrl: 'https://testweb.captionworks.com:9000/session',
    stripe: {
        pk: 'pk_test_51KPQdVBu2Bri9BWB90KzZlGYbCQJbyZBVg424UdvQqiU9Qf9IKLHxfnhtgX7U7ZoSH9ZCqjBpFZLAl3y4m96EiZt00v0gMVUQP',
        complete: 'https://testweb.captionworks.com:8083/account-settings'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
