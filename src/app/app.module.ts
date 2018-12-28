import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitlePipe } from './Shared/Pipes/Title/title.pipe';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MoviesComponent } from './components/main/movies/movies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddComponent } from './components/modal-add/modal-add.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    TitlePipe,
    HeaderComponent,
    MoviesComponent,
    ModalDeleteComponent,
    ModalAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      movies: reducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalDeleteComponent]
})
export class AppModule { }
