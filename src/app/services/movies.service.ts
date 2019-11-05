import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType{
   all = "",
   movie = "movie",
   series = "series",
   episode = "episode",
}

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  url = "http://www.omdbapi.com/";
  apiKey = "3b0345c1";

  constructor(private http: HttpClient) { }
  
  searchData(title: string, type: SearchType) : Observable<any>{
      return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apiKey=${this.apiKey}`).pipe(
        map(results => {
          console.log("RAW: ", results);
          return results['Search'];
        })
      );
  }

  getDetails(id){
    return this.http.get(`${this.url}?i=${id}&plot=full&apiKey=${this.apiKey}`);
  }
}
