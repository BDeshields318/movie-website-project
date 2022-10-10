$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  var apikey = "b8b07606";
  var url = "http://www.omdbapi.com/?apikey=" + apikey;

  $.ajax({
    method: "GET",
    url: url + "&t=" + searchText,
    success: function (data) {
      console.log(data);

      var html = $("#movieTemplate").html();
      var clone = $(html).clone();

      // addMovies(data);
      clone.find(".card-img-top").attr("src", data.Poster);
      clone.find(".card-title").text(data.Title);
      clone.find(".card-year").text(data.Year);
      clone.find(".card-genre").text(data.Genre);
      clone
        .find(".btn-primary")
        .attr("onClick", "movieSelected(" + " '" + data.imdbID + "'" + ")");

      $("#result").append(clone);
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}

function movieSelected(id) {
  console.log("the id", id);
  sessionStorage.setItem("movieId", id);
  window.location = "movieRank.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  var apikey = "b8b07606";
  var url = "http://www.omdbapi.com/?apikey=" + apikey;

  $.ajax({
    method: "GET",
    url: url + "&i=" + movieId,
    success: function (data) {
      addMovies(data);
      let output = `
      <div class="row my-3 t-3 card-movie" style="width: 18rem">
      <div class="col-md-12 mb-4">
          <div class="card border-0 shadow">
              <img src="${data.Poster}" class="card-img-top" alt="...">
          </div>
      </div>
      <div class="col-md-8">
        <h2>${data.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Genre:</strong> ${data.Genre}</li>
          <li class="list-group-item"><strong>Date:</strong> ${data.Released}</li>
          <li class="list-group-item"><strong>Rated:</strong> ${data.Rated}</li>
          <li class="list-group-item"><strong>Director:</strong> ${data.Director}</li>
          <li class="list-group-item"><strong>Rating:</strong> ${data.imdbRating}</li>
        </ul>
      </div>
      <form>
        <label for="rate">Rate</label><br>
        <input type="text" id="rate" name="rate" placeholder="enter number"><br>
        <input type="submit" value="Submit">
      </form>
    </div>

    <div class="row">
      <div class="well">
        <h5>Plot<h5>
        ${data.Plot}
    </div>
      `;

      $("#movie").html(output);
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}

// let movies = [];

function addMovies(data) {
  var id = data.imdbID;

  let movies = {
    Title: data.Title,
    Year: data.Year,
    Poster: data.Poster,
    Rated: data.Rated,
    Genre: data.Genre,
    Rating: data.imdbRating,
    Id: id,
  };

  // movies.push(title, year, genre, id, rated, image, rating);
  // console.log(movies);

  localStorage.setItem(id, JSON.stringify(movies));
}
