import { Actions, ADD_MOVIES, ADD_MOVIE, MODAL_TEMPLETE, UPDATE_MOVIES, CORRECT_EDITING, DISMISS_MODAL } from '../actions';

const initialState = {
    movies: [],
    count: 0,
    templete: '',
    correct: null,
    title: 'Add new Movie',
    submitButton: 'Add'
};

export function reducer(
    state = initialState,
    action: Actions) {

    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                movies: action.movies,
                count: action.counter
            };
        case ADD_MOVIE:
            return {
                ...state,
                movies: state.movies.concat(action.movie),
                count: state.count + 1,
                correct: null
            };
        case MODAL_TEMPLETE:
            return {
                ...state,
                templete: action.templete
            };
        case UPDATE_MOVIES:
            return {
                ...state,
                movies: action.movies,
                correct: null
            };
        case CORRECT_EDITING:
            return {
                ...state,
                correct: action.movie,
                title: `Edit Movie with id: ${action.movie.id}`,
                submitButton: 'Edit'
            };
        case DISMISS_MODAL:
            return {
                ...state,
                correct: null,
                title: 'Add new Movie',
                submitButton: 'Add'
            };
        default:
            return state;
    }
}
