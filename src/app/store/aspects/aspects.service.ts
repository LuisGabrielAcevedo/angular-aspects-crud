import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { Base } from 'src/app/models/abstract-model/base';


@Injectable({
    providedIn: 'root'
})
export class AspectsService {
    loadAspects(loadRequest: any): Observable<any> {
        const Observable = defer(async () => {
            const modelClass: Base = new loadRequest();
            return await modelClass.builder();
        });
        return Observable;
    }
}