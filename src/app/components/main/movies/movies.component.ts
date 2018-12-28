import { ModalAddComponent } from './../../modal-add/modal-add.component';

import { Movie } from './../../../Shared/Models/movie.model';
import { Component, OnInit, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';

@Component({
  selector: 'app-movies',
  providers: [ModalAddComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies: Movie[];
  windowHeight;
  private templete: ElementRef;
  loading: Boolean = true;
  constructor(private store: Store<AppState>,
    private modalAddComponent: ModalAddComponent) {
    this.movies = [];
    this.windowHeight = null;
  }

  ngOnInit() {
    this.store.select('movies').subscribe((movies) => {
      if (movies) {
        this.loading = false;
        this.templete =  movies.templete;
        this.movies = movies.movies;
      }
    });
  }

  editMovie(id: Number) {
    this.movies.forEach(movie => {
      if (movie.id === id) {
        this.modalAddComponent.open(this.templete, id, movie);
      }
    });
  }
}
