import star_filled from "../../templates/star_filled.png";

class MovieDetail {
  $modal = document.createElement("div");

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$modal.classList = "movie-detail-modal hidden";
  }

  render($target) {
    $target.insertAdjacentElement("afterbegin", this.$modal);
  }

  open(movie) {
    this.$modal.id = movie.id;
    this.$modal.classList.remove("hidden");

    this.$modal.innerHTML = this.getTemplate(movie);
  }

  getTemplate({ genres, title, overview, poster_path, vote_average }) {
    const template = `
      <div class="movie-detail">
        <div class="movie-detail-top">
          <h2 class="movie-detail-top-title">${title}</h2>
          <button class="movie-detail-close-button">X</button>
        </div>
        <div class="movie-detail-content-box">
        ${
          poster_path
            ? `<img
              class="movie-detail-thumbnail skeleton"
              src="https://image.tmdb.org/t/p/w500/${poster_path}"
              loading="lazy"
              alt="${title}"
            />`
            : `<div class="movie-detail-thumbnail no-image">
              <span>No Image</span>
            </div>`
        }
          <div class="movie-detail-content">
            <div>
              <div class="movie-detail-genres-vote">
                <div class="movie-detail-genres">${genres
                  .map((genres) => genres.name)
                  .join(", ")}</div>
                <div class="movie-detail-vote">
                  <img src=${star_filled} alt=${star_filled}/>
                  <span>${vote_average.toFixed(1)}</span>
                </div>
              </div>
              <p class="movie-detail-overview">${overview}</p>
            </div>
            <div>별점</div>
          </div>
        </div>
      </div>`;

    return template;
  }
}

export default MovieDetail;
