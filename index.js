$(document).ready(() => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    var item = JSON.parse(localStorage.getItem(key));

    let newMovies = `
        <div class="row my-3 t-3 card-movie" style="width: 18rem">
        <div class="col-md-12 mb-4">
            <div class="card border-0 shadow">
                <img src="${item.Poster}" class="card-img-top" alt="...">
            </div>
        </div>
        <div class="col-md-8">
          <h2>${item.Title}</h2>
        </div>
      </div>
        `;

    $("#results").append(newMovies);
    console.log("the title", newMovies);
  }
});
