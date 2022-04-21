import { Component, OnInit } from '@angular/core';
import { MoviesDataService } from '../movies-data.service';
import { Movie } from '../movies/movies.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title: string= "";
  movies: Movie[]= [];

  constructor(private movieService:MoviesDataService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.movieService.searchMovies(this.title).then(response => this.fillMoviesFromService(response));
    // location.reload();
  }

  private fillMoviesFromService(movies: Movie[]) {
    this.movies= movies;
    // location.reload();
  }

}
