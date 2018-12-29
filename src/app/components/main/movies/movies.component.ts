import { ModalAddComponent } from './../../modal-add/modal-add.component';

import { Movie } from './../../../Shared/Models/movie.model';
import { Component, OnInit, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(private store: Store<AppState>,
    private modalAddComponent: ModalAddComponent,
    private spinner: NgxSpinnerService) {
    this.movies = [];
    this.windowHeight = null;
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
  }, 5000);
    this.store.select('movies').subscribe((movies) => {
      if (movies.count > 0) {
        this.spinner.hide();
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
