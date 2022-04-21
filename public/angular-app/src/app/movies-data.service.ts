import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Movie } from './movies/movies.component';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {
  private apiBaseUrl: string = environment.REST_BASE_API;

  constructor(private http: HttpClient) { }

  public getMovies(offset: number, count: number): Promise<Movie[]> {
    const url: string = this.apiBaseUrl + "/movies?offset=" + offset + "&count=" + count;

    return this.http.get(url).toPromise()
      // .then(response => {console.log(response); response as Theater[]})
      .catch(this.handleError);
  }

  public searchMovies(title: string): Promise<Movie[]> {
    console.log("Search Service");
    
    const url: string = this.apiBaseUrl + "/movies?saerch=" + title;
    console.log(url);

    return this.http.get(url).toPromise()
      // .then(response => {console.log(response); response as Theater[]})
      .catch(this.handleError);
  }

  public getMovie(movieId: string): Promise<Movie> {
    const url: string = this.apiBaseUrl + "/movie/" + movieId;

    return this.http.get(url).toPromise()
      // .then(response => {console.log(response); response as Theater})
      .catch(this.handleError);
  }

  public deleteMovie(movieId: string): Promise<Movie> {
    const url: string = this.apiBaseUrl + "/movie/" + movieId;

    return this.http.delete(url).toPromise()
      // .then(response => {console.log(response); response as Theater})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
