import { Component } from '@angular/core';
import { ServerService } from './Shared/Services/server/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie';
  constructor(private serverService: ServerService) {
    this.serverService.getMovies();
  }
}
