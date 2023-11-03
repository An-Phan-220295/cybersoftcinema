$(document).ready(function () {
    $.ajax({
      method: "get",
      url: "http://localhost:8080/index/poster",
    }).done(function (result) {
        var div = document.createElement('div');
        let htmlAdd = "";
        let htmlData = result.data;
        htmlData.forEach((item) => {
            htmlAdd += `
            <div class="col-md-4 col-sm-4 col-xs-6 movie-item">
            <div class="article-movie-home">
              <img
                src="${item.image}"
                class="lazy"
              />
              <a href="movie.html?id=${item.id}">
                <div class="decription-hover overlay">
                  <div class="movies-content">
                    <span><span class="age-rating">T${item.requireAge}</span></span>
                    <div class="group">
                      <div class="btn secondary-white" id-movie="${item.id}" id="btn-movie">mua vé</div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="title-movie">
              <h4 class="upper-text">${item.name}</h4>
            </div>
          </div>
          `;
      });
      div.innerHTML = htmlAdd;
      document.getElementById("moviePosters").appendChild(div);
    });

    $.ajax({
      method: "get",
      url: "http://localhost:8080/index/upcomingmovie",
    }).done(function (result) {
        var div = document.createElement('div');
        let htmlAdd = "";
        let htmlData = result.data;
        htmlData.forEach((item) => {
            htmlAdd += `
            <div class="col-md-4 col-sm-4 col-xs-6 movie-item">
            <div class="article-movie-home">
              <img
                src="${item.image}"
                class="lazy"
              />
              <a href="dat-ve/the-creator.html">
                <div class="decription-hover overlay">
                  <div class="movies-content">
                    <span><span class="age-rating">T${item.requireAge}</span></span>
                    <div class="group">
                      <div class="btn secondary-white">mua vé</div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="title-movie">
              <h4 class="upper-text">${item.name}</h4>
            </div>
          </div>
          `;
      });
      div.innerHTML = htmlAdd;
      document.getElementById("upcomingMoviePoster").appendChild(div);
    });
});

$(document).on('click', '#btn-movie', function () {
  var id = $(this).attr("id-movie");
  console.log("sever tra ve ", id);
    $.ajax({
      method: "get",
      url: `http://localhost:8080/movie?idMovie=${id}`,
    }).done(function(result){
      console.log("sever tra ve ", result);
    })
});