class MovieDetail {
  $dialog = document.createElement("dialog");

  constructor($target, movie) {
    this.init(movie);

    this.render($target, movie);
  }

  init(movie) {
    this.$dialog.classList = "";
    // this.$dialog.innerHTML = this.getTemplate(movie);
    this.$dialog.innerHTML = "<div>나 아이템</div>";
  }

  render($target) {
    // $target === $app
    $target.insertAdjacentHTML("afterbegin", this.$dialog);
  }

  getTemplate() {
    const template = ``;

    return template;
  }
}

export default MovieDetail;
