import { Movie } from './../../Models/movie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { AddMovies} from '../../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private apiOne: string;
  private apiTwo: string;
  constructor(private http: HttpClient, private store: Store<AppState>) {
    // tslint:disable-next-line:max-line-length
    this.apiOne = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a6537ae887155f02d3a0a508c195dd27&language=en-US&page=1&region=israel';
    this.apiTwo = 'https://www.omdbapi.com/?apikey=40dc7be8&t=';
  }

  getMovies() {
    const movieArray: Movie[] = [];
    let counter: any = 0;
    this.http.get(this.apiOne).subscribe((res: any) => {
      counter = res.results.length;
      res.results.forEach((movie, key) => {
        this.http.get(this.apiTwo + movie.title).subscribe((data: any) => {
          const newMovie: Movie = {
            id: key,
            title: data.Title,
            year: data.Year,
            runtime: data.Runtime,
            genre: data.Genre,
            director: data.Director,
            image: data.Poster
          };
          movieArray.push(newMovie);
        });
      });
      this.store.dispatch(new AddMovies(movieArray, counter));
    });
  }
}
