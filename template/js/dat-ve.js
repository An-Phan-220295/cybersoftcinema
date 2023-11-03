$(document).ready(function () {
    var idurl = window.location.search;
    const urlParams = new URLSearchParams(idurl);
    var id = urlParams.get('id');    
    
    $.ajax({
      method: "get",
      url: `http://localhost:8080/movie?idMovie=${id}`,
    }).done(function (result) {
        console.log("sever tra ve ", result);
        var div = document.createElement('div');
        let htmlAdd = "";
        let htmlData = result.data;
        htmlData.forEach((item) => {
            htmlAdd += `
            <img
                          src="${item.image}"
                          style="height: 380px; object-fit: fill;"
                        />
                        <div class="play-bt">
                          <galaxy-watch-trailer
                            data-title='"The Creator"'
                            ng-trailer='"https://www.youtube.com/watch?v=MLUcZfI6dbU"'
                          ></galaxy-watch-trailer>
                        </div>
          `;
          console.log(item.image);
      });
      div.innerHTML = htmlAdd;
      document.getElementById("moviePosters").appendChild(div);
        // data.forEach((item) => {
        //     console.log("sever tra ve ", item.name);
        //     document.getElementById("movieName").textContent = item.name;
        // });
      });
    });