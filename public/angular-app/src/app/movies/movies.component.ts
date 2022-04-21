import { Component, OnInit } from '@angular/core';
import { MoviesDataService } from '../movies-data.service';

export class Movie {
  #_id!: string;
  // #plot!: string;
  #genres!: string[];
  #runtime!: number;
  #cast!: string[];
  #title!: string;
  #fullplot!: string;
  #languages!: string[];
  #released!: Date;
  #year!: number;

  get _id() { return this.#_id; }
  // get plot() {return this.#plot;}
  get genres() { return this.#genres; }
  get runtime() { return this.#runtime; }
  get cast() { return this.#cast; }
  get title() { return this.#title; }
  get fullplot() { return this.#fullplot; }
  get languages() { return this.#languages; }
  get released() { return this.#released; }
  get year() { return this.#year; }

  set _id(_id: string) { this.#_id = _id; }
  // set plot(plot: string) {this.#plot= plot;}
  set genres(genres: string[]) { this.#genres = genres; }
  set runtime(runtime: number) { this.#runtime = runtime; }
  set cast(cast: string[]) { this.#cast = cast; }
  set title(title: string) { this.#title = title; }
  set fullplot(fullplot: string) { this.#fullplot = fullplot; }
  set languages(languages: string[]) { this.#languages = languages; }
  set released(released: Date) { this.#released = released; }
  set year(year: number) { this.#year = year; }

  constructor(movie: any) {
    this.#_id = movie._id;
    //this.#plot= movie.plot;
    this.#genres = movie.genres;
    this.#runtime = movie.runtime;
    this.#cast = movie.cast;
    this.#title = movie.title;
    this.#fullplot = movie.fullplot;
    this.#languages = movie.languages;
    this.#released = movie.released;
    this.#year = movie.year;
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies!: Movie[];
  offset: number = 0;
  #count: number = 5;
  set count(count: string) {
    this.#count = parseInt(count, 10);
  }
  get count(): string { return this.#count + ""; }
  isOffsetZero: boolean = true;
  counts: number[] = [5, 10, 20];
  state: string = "";
  states: string[] = [];

  constructor(private moviesService: MoviesDataService) { }

  ngOnInit(): void {
    this.moviesService.getMovies(this.offset, this.#count).then(response => this.fillMoviesFromService(response));
    // this.moviesService.getStates().then(response => this.fillStates(response));
  }

  private fillMoviesFromService(movies: Movie[]) {
    this.movies = movies;
  }

  previous(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.#count;
    }
    if (this.offset <= 0) {
      this.offset = 0;
      this.isOffsetZero = true;
    }
    this.ngOnInit();
  }

  next(): void {
    this.offset = this.offset + this.#count;
    this.isOffsetZero = false;
    this.ngOnInit();
  }

}
