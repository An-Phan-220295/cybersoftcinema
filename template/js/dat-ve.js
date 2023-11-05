$(document).ready(function () {
  var a = window.location.pathname;
  var idurl = window.location.search;
  const urlParams = new URLSearchParams(idurl);
  var name = urlParams.get('name');
  $.ajax({
    method: "get",
    url: `http://localhost:8080/datve/${name}`,
  }).done(function (result) {
    console.log("sever tra ve ", result);
    var div = document.createElement('div');
    let htmlAdd = "";
    let htmlData = result.data;
    htmlData.forEach((item) => {
      htmlAdd += `
        <article>
          <div class="row">
            <div class="col-md-4 col-sm-4 col-xs-8 col-xs-offset-2 col-md-offset-0">
              <div class="detail-feat-img">
                <img style="height:380px; object-fit:fill;"
                  src="${item.image}" />
                  <a href="https://www.youtube.com/watch?v=MLUcZfI6dbU" target="_blank">
                    <div type="button" class="play-bt">
                        <galaxy-watch-trailer 
                          data-title='"The Creator"' 
                          ng-trailer='"https://www.youtube.com/watch?v=MLUcZfI6dbU"'>
                        </galaxy-watch-trailer>
                    </div>  
                  </a>         
              </div>
            </div>
            <div class="details col-md-8 col-sm-8 col-xs-12">
              <h2 class="detail-title upper-text" id="movieName">${item.name}</h2>
              <div class="detail-rating">
                <div ng-controller="ratingController"
                  ng-init='itemId ="da092419-c4d6-47cb-8fde-1ff8197ae64d"'
                  class="rating-wrap detail">
                  <div class="rating-movie detail">
                    <div class="rating-value detail" style="padding-top:10px">
                      <strong>${item.rating}</strong><span>/10</span>
                    </div>
                    <div class="rating-bt">
                      <button id="rating-click" type="submit" ng-click="showRaiting()"
                        class="btn btn-primary btn-sm">
                        Đánh giá
                      </button>
                    </div>
                    <div ng-show="activeRating" class="rating-user">
                      <galaxy-rating ng-value="7.697671413421631"
                        ng-select="submit"></galaxy-rating>
                    </div>
                  </div>
                </div>
              </div>
              <div class="detail-rating">
                <span><span class="age-rating">T${item.requireAge}</span></span><span><i
                  class="icon-time-left">&nbsp</i>${item.duration} phút</span>
                <span class="like">
                  <div data-href="https://www.galaxycine.vn/dat-ve/the-creator"
                    data-layout="button_count" data-action="like" data-size="small"
                    data-show-faces="false" data-share="true" class="fb-like"></div>
                </span>
              </div>
              <div class="detail-info">
                <div class="detail-info-row">
                  <label>Thể loại:&nbsp;</label>
                  <div class="detail-info-right">
                    ${arrayDisplay(item.movieType)}
                  </div>
                </div>
                <div class="detail-info-row">
                  <label>Đạo diễn:&nbsp;</label>
                  <div class="detail-info-right">
                    ${arrayDisplayWithUrl(item.director)}
                  </div>
                </div>
                <div class="detail-info-row">
                  <label>Diễn viên:&nbsp;</label>
                  <div class="detail-info-right">
                    ${arrayDisplayWithUrl(item.cast)}
                  </div>
                </div>
                <div class="detail-info-row">
                  <label>Nhà sản xuất:&nbsp;</label>
                  <div class="detail-info-right">
                    ${arrayDisplay(item.producer)}
                  </div>
                </div>
                <div class="detail-info-row">
                  <label>Quốc gia:&nbsp;</label>
                  <div class="detail-info-right">
                    <span>${item.country}</span>
                  </div>
                </div>
                <div class="detail-info-row">
                  <label>Ngày khởi chiếu:&nbsp</label>
                  <div class="detail-info-right">${formattedDate(item.releaseDate)}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row detail-description">
            <div class="col-md-12 col sm-12 col-xs-12">
              <div class="content-text">
                <section id="info">
                  <h3>Nội dung phim</h3>
                  <div class="content-text-actors-info content-text">
                    <br />
               
                      <p>
                        <span style="font-size: 14px">
                          <span style="font-family: Arial, Helvetica, sans-serif;">
                              <span style="font-weight: 400">
                                <span style="font-style: normal">
                                  <span style="text-decoration: none">
                                    ${item.content}
                                  </span>
                                </span>
                              </span>
                          </span>
                        </span>
                      </p>
                      <p>
                        <span style="font-size: 14px">
                          <a style="text-decoration:none" href="../phim-dang-chieu.html">Phim mới</a>
                          <strong>${item.name}</strong> khởi chi&ecirc;́u
                          ${formattedDate(item.releaseDate)} tại rạp chiếu phim toàn quốc.
                        </span>
                      </p>
              
                  </div>
                </section>
              </div>
            </div>
          </div>
        </article>
       `;
    });
    div.innerHTML = htmlAdd;
    document.getElementById("movieInfo").appendChild(div);
  });

  $.ajax({
    method: "get",
    url: `http://localhost:8080/index/poster`,
  }).done(function(result){
    var div = document.createElement('div');
    let count = 0;
    let htmlAdd = "";
    let htmlData = result.data;
    for (let index = 0; index < htmlData.length; index++) {
      if(count==3) {
        break;
      }
      if (htmlData[index].name === name) {
        continue;
      } else {
        const element = htmlData[index];
        htmlAdd += `
        <div class="col-md-13 col-sm-12 col-xs-12 movie-item">
          <div class="article-movie-home">
            <img src="${element.image}" />
                <div class="decription-hover overlay">
                    <div class="movies-content">
                        <span><span class="age-rating">T${element.requireAge}</span></span>
                        <div class="group">
                            <div class="btn secondary-white" movieName="${element.name}" id="btn-movie">mua vé</div>
                        </div>
                    </div>
                </div>
          </div>
          <div class="title-movie">
            <h4 class="upper-text">${element.name}</h4>
          </div>
        </div>
         `;
        count++;
      }
    }
    // htmlData.forEach((item, index) => {
    //   htmlAdd += `
    //   <div class="col-md-13 col-sm-12 col-xs-12 movie-item">
    //     <div class="article-movie-home">
    //       <img src="${item.image}" />
    //           <div class="decription-hover overlay">
    //               <div class="movies-content">
    //                   <span><span class="age-rating">T${item.requireAge}</span></span>
    //                   <div class="group">
    //                       <div class="btn secondary-white" movieName="${item.name}" id="btn-movie">mua vé</div>
    //                   </div>
    //               </div>
    //           </div>
    //     </div>
    //     <div class="title-movie">
    //       <h4 class="upper-text">${item.name}</h4>
    //     </div>
    //   </div>
    //    `;
    // });
    div.innerHTML = htmlAdd;
    document.getElementById("showingMovie").appendChild(div);
  })
});

function arrayDisplay(array) {
  var d = "";
  if (array.length === 0) {
    return d = "Đang cập nhật"
  } else {
    array.forEach(item => {
      if (array[array.length - 1] == item) {
        d += `<span>${item}</span>`;
      } else {
        d += `<span>${item}</span>, `;
      }
    });
  }
  return d;
};

function arrayDisplayWithUrl(array) {
  var d = "";
  if (array.length === 0) {
    return d = "Đang cập nhật"
  } else {
    array.forEach(item => {
      if (array[array.length - 1] == item) {
        d += `<a href="../dao-dien/gareth-edwards.html" style="text-decoration:none">${item}</a>`;
      } else {
        d += `<a href="../dao-dien/gareth-edwards.html" style="text-decoration:none">${item}</a>, `;
      }
    });
  }
  return d;
};

function formattedDate(d) {
  var initial = String(d).split('-');
  return [ initial[2], initial[1], initial[0],  ].join('-');
}

$(document).on('click', '#btn-movie', function () {
  var name = $(this).attr("movieName");
  window.location=`dat-ve.html?name=${name}`;
});