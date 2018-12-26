import { Observable } from 'rxjs/Rx';


export abstract class BaseService {

  constructor() { }

  protected handleError(error: any) {
    debugger;
    console.log("handleError : " + error)
    var applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    var modelStateErrors: string = '';
    var serverError = error.error.errors;

    if (!serverError.type) {
      for (var key in serverError[0]) {
        //if (serverError[key])
        modelStateErrors += key + '\n';
        //}
      }

      modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
      return Observable.throw(modelStateErrors || 'Server error');
    }
  }
}
