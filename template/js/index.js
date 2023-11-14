$(document).ready(function () {
  // Call API to get 6 showing movie posters
  $.ajax({
    method: "get",
    url: "http://localhost:8080/index/poster",
  }).done(function (result) {
    var div = document.createElement('div');
    let htmlAdd = "";
    let htmlData = result.data;
    htmlData.forEach((item, index) => {
      if (index < 6) {
        htmlAdd += `
          <div class="col-md-4 col-sm-4 col-xs-6 movie-item">
          <div class="article-movie-home">
            <img
              src="${item.image}" style="height: 250px; width: 350px; object-fit: contain" 
              class="lazy"
            />

              <div class="decription-hover overlay">
                <div class="movies-content">
                  <span><span class="age-rating">T${item.requireAge}</span></span>
                  <div class="group">
                    <div class="btn secondary-white" movieName="${item.name}" idMovie="${item.id}" 
                    id="btn-movie">mua vé</div>
                  </div>
                </div>
              </div>

          </div>
          <div class="title-movie">
            <h4 class="upper-text">${item.name}</h4>
          </div>
        </div>
        `;
      }
    });
    div.innerHTML = htmlAdd;
    document.getElementById("moviePosters").appendChild(div);
  });
  // Call API to get 6 upcoming movie posters
  $.ajax({
    method: "get",
    url: "http://localhost:8080/index/upcomingmovie",
  }).done(function (result) {
    var div = document.createElement('div');
    let htmlAdd = "";
    let htmlData = result.data;
    htmlData.forEach((item, index) => {
      if (index < 6) {
        htmlAdd += `
            <div class="col-md-4 col-sm-6 col-xs-6 movie-item">
            <div class="article-movie-home">
              <img
                src="${item.image}" style="height: 250px; width: 350px; object-fit: contain" 
                class="lazy"
              />

                <div class="decription-hover overlay">
                  <div class="movies-content">
                    <span><span class="age-rating">T${item.requireAge}</span></span>
                    <div class="group">
                      <div class="btn secondary-white" movieName="${item.name}" idMovie="${item.id}" 
                      id="btn-movie">mua vé</div>
                    </div>
                  </div>
                </div>

            </div>
            <div class="title-movie">
              <h4 class="upper-text">${item.name}</h4>
            </div>
          </div>
          `;
      }
    });
    div.innerHTML = htmlAdd;
    document.getElementById("upcomingMoviePoster").appendChild(div);
  });
});
// Leads to "dat-ve" page when when click "mua vé" button
$(document).on('click', '#btn-movie', function () {
  var name = $(this).attr("movieName");
  var id = $(this).attr("idMovie");
  window.location = `dat-ve.html?id=${id}&name=${name}`;
});