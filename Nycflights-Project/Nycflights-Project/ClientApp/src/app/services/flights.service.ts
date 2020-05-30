import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FlightsService {
    private flightsUrl = 'api/nycflights'; // URL to web api

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };

    constructor(private http: HttpClient) {}

    getTotalFlightsPerMonth(): Observable<any[] | Map<string, number>> {
        return this.http
            .get<Map<string, number>>(
                `${this.flightsUrl}/flightspermonth`,
                this.httpOptions
            )
            .pipe(
                tap((_) => console.log(`Fetched flights!`)),
                catchError(this.handleError(`getFlightsPerMonth()`, []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
