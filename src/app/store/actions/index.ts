import { Action } from '@ngrx/store';
import { Movie } from '../../Shared/Models/movie.model';

export const ADD_MOVIES = 'Add_Movies';
export const ADD_MOVIE = 'Add_Movie';
export const MODAL_TEMPLETE = 'Modal_Templete';
export const UPDATE_MOVIES = 'Update_Movies';
export const CORRECT_EDITING = 'Correct_Updating';
export const DISMISS_MODAL = 'Dismiss_Modal';

export class AddMovies implements Action {
    readonly type = ADD_MOVIES;
    constructor(public movies: Movie[], public counter: number) { }
}

export class AddMovie implements Action {
    readonly type = ADD_MOVIE;
    constructor(public movie: Movie) {  }
}

export class ModalTemplete implements Action {
    readonly type = MODAL_TEMPLETE;
    constructor(public templete: any) {  }
}

export class UpdateMovies implements Action {
    readonly type = UPDATE_MOVIES;
    constructor(public movies: Movie[]) {  }
}

export class CorrectEditing implements Action {
    readonly type = CORRECT_EDITING;
    constructor(public movie: Movie) { }
}

export class DismissModal implements Action {
    readonly type = DISMISS_MODAL;
    constructor() { }
}


export type Actions = AddMovies | AddMovie | ModalTemplete | UpdateMovies | CorrectEditing | DismissModal;
