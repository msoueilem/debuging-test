import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesDataService } from '../movies-data.service';
import { Movie } from '../movies/movies.component'; 

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie:Movie= new Movie({_id: "", genres: [], runtime: 0, cast: [], title: "", fullplot: "", language: [], release: Date.now(), year: 0});
  constructor(private movieService: MoviesDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const movieId: string= this.route.snapshot.params["movieId"];
    this.movieService.getMovie(movieId).then(response => this.fillMovieFromService(response));
  }

  private fillMovieFromService(movie: Movie): void {
    this.movie= movie;
  }

  onDelete(movieId: string) {
    this.movieService.deleteMovie(movieId);
    this.router.navigate([""]);
  }

}
