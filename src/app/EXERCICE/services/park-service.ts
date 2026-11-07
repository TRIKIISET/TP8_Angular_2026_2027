import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Park } from '../models/park';
import { Observable, tap } from 'rxjs';

const URL = "http://localhost:3000/parks";
@Service()
export class ParkService {
    private readonly _http = inject(HttpClient);
    private _parks= signal<Park[]>([]);

    parks = this._parks.asReadonly();
    getParks(): Observable<Park[]>{
        return this._http.get<Park[]>(URL).pipe(
            tap(parks=> this._parks.set(parks))
        );
    }
    getParkById(id:string):Observable<Park>{
        return this._http.get<Park>(`${URL}/${id}`)
    }
    updatePark(p:Park):Observable<Park>{
        return this._http.put<Park>(`${URL}/${p.id}`, p).pipe(
            tap(park =>this._parks.update(
                parcs=> parcs.map(p=>
                    (p.id==park.id)?park:p)
            ))
        )
    }
    deletePark(id:string){
        return this._http.delete<void>(`${URL}/${id}`).pipe(
            tap(()=>this._parks.update(
                parcs => parcs.filter(p=>p.id!=id)
            ))
        )
    }
    

}
