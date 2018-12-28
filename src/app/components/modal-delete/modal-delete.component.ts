import { UpdateMovies } from './../../store/actions/index';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../../Shared/Models/movie.model';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
  @ViewChild('content') myModal: ElementRef;
  title: string;
  id: number;
  movies: Movie[];
  constructor(private store: Store<AppState>, private modalService: NgbModal) { }

  ngOnInit() {
    this.store.select('movies').subscribe((movies) => {
      this.movies = movies.movies;
    });
  }

  open(id: number, name: string) {
    this.modalService.open(this.myModal, {ariaLabelledBy: 'modal-basic-title'});
    this.id = id;
    this.title = name;
  }

  delete(id: number) {
    const newMovies: Movie[] = [];
    this.movies.forEach(movie => {
      if (movie.id !== id) {
        newMovies.push(movie);
      }
    });
    this.store.dispatch(new UpdateMovies(newMovies));
    this.modalService.dismissAll();
  }

}
