import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Info} from "./info";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private readonly http:HttpClient) { }
  getInfoOfQuantite(quantite: number, product: string) {
    return quantite >= 10
      ? quantite + " " + product
      : "commander des " + product;
  }
  getInfos(): Observable<{} | Info[]>{
    return this.http.get<Info[]>("https://api-privee/info").pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      }));
  }

  // valider la commande
  command(info: Info): Observable<{} | Info[]>{
    return this.http.post("https://api-privee/envoyer-commande", info).pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      }));
  }
  // annuler la commande
  cancel(info: Info) : Observable<{} | Info[]>{
    return this.http.post("https://api-privee/cancel-commande", info).pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      }));
  }

  // permet de faire une relance
  revival(info: Info) : Observable<{} | Info[]>{
    return this.http.post("https://api-privee/relance", info).pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      }));
  }

}
