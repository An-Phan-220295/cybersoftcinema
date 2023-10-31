$(document).ready(function () {
    $.ajax({
      method: "get",
      url: "http://localhost:8080/index/poster",
    }).done(function (result) {
        console.log("sever tra ve ", result);
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
              <h4 class="upper-text">The Creator</h4>
              <h4 class="vn upper-text">${item.name}</h4>
            </div>
          </div>
          `;
      });
      div.innerHTML = htmlAdd;
      document.getElementById("moviePosters").appendChild(div);
    });
  });