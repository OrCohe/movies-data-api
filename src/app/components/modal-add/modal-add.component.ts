import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddMovie, ModalTemplete, UpdateMovies, CorrectEditing, DismissModal } from '../../store/actions';
import { Movie } from '../../Shared/Models/movie.model';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {
  @ViewChild('content') myModal: ElementRef;
  title: string;
  submitButton: string;
  closeResult: string;
  movieForm: FormGroup;
  private movies: Movie[];
  private lastId: number;
  correctEdit: any;
  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    this.title = 'Add new Movie';
    this.submitButton = 'Add';
    this.lastId = 0;
    this.movieForm = new FormGroup({
      title: new FormControl(''),
      year: new FormControl(''),
      runtime: new FormControl(''),
      genre: new FormControl(''),
      director: new FormControl(''),
      image: new FormControl('')
    });
    this.correctEdit = {
      id: null,
      title: null,
      year: null,
      runtime: null,
      genre: null,
      director: null,
      image: null
    };
  }

  ngOnInit() {
    this.store.dispatch(new ModalTemplete(this.myModal));
    this.getLastID();
  }

  get f() { return this.movieForm.controls; }

  getLastID() {
    this.store.select('movies').subscribe((movies) => {
      if (movies.correct) {
        this.correctEdit.id = movies.correct.id;
        this.correctEdit.title = movies.correct.title;
        this.correctEdit.year = movies.correct.year;
        this.correctEdit.runtime = movies.correct.runtime;
        this.correctEdit.genre = movies.correct.genre;
        this.correctEdit.director = movies.correct.director;
        this.correctEdit.image = movies.correct.image;
        this.movieForm.setValue({
          title: movies.correct.title,
          year: movies.correct.year,
          runtime: movies.correct.runtime,
          genre: movies.correct.genre,
          director: movies.correct.director,
          image: movies.correct.image});
      } else {
        this.resetModal();
      }
      this.movies = movies.movies;
      this.lastId = movies.count;
      this.title = movies.title;
      this.submitButton = movies.submitButton;
     });
  }

  resetModal() {
    this.correctEdit.id = null;
    this.correctEdit.title = null;
    this.correctEdit.year = null;
    this.correctEdit.runtime = null;
    this.correctEdit.genre = null;
    this.correctEdit.director = null;
    this.correctEdit.image = null;
  }

  open(content: any , reason: Number = null, movie: Movie = null) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.finally(() => {
      this.store.dispatch(new DismissModal());
    });
    if (reason || reason === 0) {
      this.store.dispatch(new CorrectEditing(movie));
    }
  }

  onSubmit() {
    let allGood: Boolean = true;
    if (!this.f.title.value || this.f.title.value.trim().length < 2) {
      this.f.title.setErrors({err: true});
      allGood = false;
    }
    if (!this.f.year.value || this.f.year.value.toString().length !== 4) {
      this.f.year.setErrors({err: true});
      allGood = false;
    }
    if (!this.f.runtime.value || this.f.runtime.value.trim().length < 2) {
      this.f.runtime.setErrors({err: true});
      allGood = false;
    }
    if (!this.f.genre.value || this.f.genre.value.trim().length < 2) {
      this.f.genre.setErrors({err: true});
      allGood = false;
    }
    if (!this.f.director.value || this.f.director.value.trim().length < 2) {
      this.f.director.setErrors({err: true});
      allGood = false;
    }
    if (!this.f.image.value ||
        !this.f.image.value.toLowerCase().includes('png') &&
        !this.f.image.value.toLowerCase().includes('jpeg') &&
        !this.f.image.value.toLowerCase().includes('jpg')) {
      this.f.image.setErrors({err: true});
      allGood = false;
    }
    if (allGood) {
      const newMovie: Movie = {
        id: this.lastId,
        title: this.f.title.value,
        year: this.f.year.value,
        runtime: this.f.year.value,
        genre: this.f.genre.value,
        director: this.f.genre.value,
        image: this.f.image.value
      };
      if (!this.correctEdit.id && this.correctEdit.id !== 0) {
        this.store.dispatch(new AddMovie(newMovie));
      } else {
        const newMovies: Movie[] = [];
        newMovie.id = this.correctEdit.id;
        this.movies.forEach(movie => {
          if (movie.id === this.correctEdit.id) {
            newMovies.push(newMovie);
          } else {
            newMovies.push(movie);
          }
        });
        this.store.dispatch(new UpdateMovies(newMovies));
      }
      this.movieForm.reset();
      this.modalService.dismissAll();
      }
  }
}
