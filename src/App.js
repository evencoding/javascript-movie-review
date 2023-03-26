import Movie from "./domain/Movie";

import Header from "./components/Header";
import MovieView from "./components/MovieView";

const pageCounter = (firstPage) => {
  let page = firstPage;
  return () => (page += 1);
};

class App {
  $main = document.createElement("main");

  movie;

  header;

  movieView;

  page;

  isLoading;

  constructor($target) {
    this.init($target);

    this.render($target);

    this.bindEvent($target);
  }

  init($target) {
    this.movie = new Movie();

    this.header = new Header($target);
    this.movieView = new MovieView(this.$main);

    this.page = pageCounter(0);

    this.renderPopularMovies(this.page());
  }

  render($target) {
    $target.insertAdjacentElement("beforeend", this.$main);
  }

  bindEvent($target) {
    $target.addEventListener("click", this.onClickHandler.bind(this));
    $target.addEventListener("submit", this.onSubmitHandler.bind(this));

    window.addEventListener("scroll", this.onScrollHandler.bind(this));
  }

  onScrollHandler() {
    if (this.isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight < Math.round(scrollHeight - scrollTop)) return;

    const query = this.header.getQuery();
    if (query) {
      this.renderFoundMovies(query, this.page());

      return;
    }

    this.renderPopularMovies(this.page());
  }

  onClickHandler({ target }) {
    if (target.id !== "logo" || this.isLoading) return;

    this.header.clearQuery();

    this.page = pageCounter(0);

    this.renderPopularMovies(this.page());
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (this.isLoading) return;

    const query = e.target[0].value;
    if (!query) return alert("검색어를 입력 하세요");

    this.page = pageCounter(0);

    this.renderFoundMovies(query, this.page());
  }

  async renderPopularMovies(page) {
    this.isLoading = true;
    this.movieView.appearSkeleton();

    const { isError, data } = await this.movie.getPopularMovies(page);
    if (!isError) {
      this.movieView.updateMovieListTitle();
      this.movieView.addMovies(data);
    }

    this.movieView.hideSkeleton();
    this.isLoading = false;
  }

  async renderFoundMovies(query, page) {
    this.isLoading = true;
    this.movieView.appearSkeleton();

    const { isError, data } = await this.movie.getFoundMovies(query, page);
    if (!isError) {
      this.movieView.updateMovieListTitle(query);
      this.movieView.addMovies(data);
    }

    this.movieView.hideSkeleton();
    this.isLoading = false;
  }
}

export default App;
