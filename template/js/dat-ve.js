
$(document).ready(function () {
  var a = window.location.pathname;
  var idurl = window.location.search;
  const urlParams = new URLSearchParams(idurl);
  var name = urlParams.get('name');
  var id = urlParams.get('id');

  //Call API to get movie information from movie name
  $.ajax({
    method: "get",
    url: `http://localhost:8080/datve/${name}`,
  }).done(function (result) {
    var div = document.createElement('div');
    let htmlAdd = "";
    let htmlData = result.data;
    htmlData.forEach((item) => {
      htmlAdd += `
        <article id="movieInfo">
          <div class="row">
            <div class="col-md-4 col-sm-4 col-xs-8 col-xs-offset-2 col-md-offset-0">
              <div class="detail-feat-img">
                <img style="height:380px; object-fit:fill;"
                  src="${item.image}" />
                  <a href="${item.trailer}" target="_blank">
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
                      <button id="rating-click" value=${item.id} type="submit" ng-click="showRaiting()"
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

  //Call API to get 3 showing movie list (not include this movie)
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
                            <div class="btn secondary-white" movieName="${element.name}" idMovie="${element.id}" 
                            id="btn-movie">mua vé</div>
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
    div.innerHTML = htmlAdd;
    document.getElementById("showingMovie").appendChild(div);
  })

  //Call API to get theater list from the movie id
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/quickbuy/movie/theater?movieId=${id}`,
  }).done(function (result) {
    var ul = document.getElementById("list-theater");
    let htmlData = result.data;
    var htmlAdd = ``;

    //Iterate through an htmlData(result.data) array to add HTML code to show theater list in website
    htmlData.forEach((item) => {
      var divTheater = document.createElement("div");
      htmlAdd += `
      <div class="showtime__cinema md:py-8 py-4 px-3 odd:bg-white even:bg-[#FDFBFA] even:border-t even:border-b">
        <h3 class="text-base font-bold mb-4">${item.theaterName}</h3>
            
      </div>
      `;
    
      //Call API to get showing list (date and time) from the movie id and theater id
      $.ajax({
        method: "GET",
        url: `http://localhost:8080/quickbuy/movie/date?movieId=${id}&theaterId=${item.theaterId}`,
      }).done(function (result) {
        let htmlDataShowing = result.data;
        var htmlAddShowingDate = ``;

        //Iterate through an htmlData(result.data) array to add HTML code to show showing date list in website
        htmlDataShowing.forEach((item2) => {
          var divDate = document.createElement("div");
          htmlAddShowingDate += `
            <div class="p-2">${item2.showingDate}</div>
            <div class="time__show flex flex-1 flex-row gap-x-3 gap-y-1 flex-wrap showingTimeList">
    
            </div>
          `;

          //Iterate through an htmlData(result.data) array to add HTML code to show showing time list in website
          $.ajax({
            method: "GET",
            url: `http://localhost:8080/quickbuy/time?movieId=${id}&theaterId=${item.theaterId}&showingDate=${item2.showingDate}`,
          }).done(function (result) {
            var ulShowingTime = document.getElementById(formatDate(item.showingDate));
            let htmlDataTime = result.data;
            var htmlAddShowingTime = ``;

            //Iterate through an htmlData(result.data) array to add HTML code to show showing time list in website
            htmlDataTime.forEach((item3) => {
              var divTime = document.createElement("div");
              htmlAddShowingTime += `
                <button class="py-2 md:px-8 px-6 border rounded text-sm font-normal 
                  text-black-10 hover:bg-blue-10 active:bg-blue-10  transition-all 
                  duration-500 ease-in-out hover:text-white">${item3.showingTime}
                </button>
              `;

              divTime.innerHTML = htmlAddShowingTime;
              document.getElementsByClassName("showingTimeList").appendChild(divTime);
            });
          });

          divDate.innerHTML = htmlAddShowingDate;
        });
      });

    //   var htmlAdd = `
    //   <div class="showtime__cinema md:py-8 py-4 px-3 odd:bg-white even:bg-[#FDFBFA] even:border-t even:border-b">
    //     <h3 class="text-base font-bold mb-4">${item.theaterName}</h3>
    //         <div class="time__show flex flex-1 flex-row gap-x-3 gap-y-1 flex-wrap" id="showingTimeList">
    //           <button class="py-2 md:px-8 px-6 border rounded text-sm font-normal 
    //             text-black-10 hover:bg-blue-10 active:bg-blue-10  transition-all 
    //             duration-500 ease-in-out hover:text-white">22:45
    //           </button>
    //           <button class="py-2 md:px-8 px-6 border rounded text-sm font-normal 
    //             text-black-10 hover:bg-blue-10 active:bg-blue-10 
    //             transition-all duration-500 ease-in-out hover:text-white">23:00
    //           </button>
    //         </div>
    //   </div>
    // `;

    divTheater.innerHTML = htmlAdd;
    document.getElementById("showingList").appendChild(divTheater);
    });
  });

  getTodayAndNext7Days();

});

//Display information which doesn't have detail url
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

//Display information which have detail url (actor, director)
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

//format date from yyyy-mm-dd to dd-mm-yyyy
function formattedDate(d) {
  var initial = String(d).split('-');
  return [ initial[2], initial[1], initial[0],  ].join('-');
}

//Get today and next 7 days
function getTodayAndNext7Days () {
  var allCurDate = new Date();
  var curDay = allCurDate.getDay();
  var VieDay = "";
  var curDate = allCurDate.getDate();
  var curMonth = allCurDate.getMonth()+1;
  var curYear = allCurDate.getFullYear();
  var dateInMonth = new Date(curYear, curMonth, 0);
  let htmlAdd =``;
  for (let index = 0; index < 7; index++) {
    switch (curDay) {
      case 0:
        VieDay = "Chủ nhật";
        break;
      case 1:
        VieDay = "Thứ hai";
        break;
      case 2:
        VieDay = "Thứ ba";
        break;
      case 3:
        VieDay = "Thứ tư";
        break;
      case 4:
        VieDay = "Thứ năm";
        break;
      case 5:
        VieDay = "Thứ sáu";
        break;
      case 6:
        VieDay = "Thứ bảy";
        break;    
      default:
        break;
    }
    if (curDate < 10) {
      curDate= "0" + curDate;     
    }
    htmlAdd += `
      <button type="button" class="d-flex flex-column align-items-center btn btn-outline-secondary p-2 mx-1 btn-showingdate" 
              id="${curDate}/${curMonth}" 
              style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .75rem; --bs-btn-font-size: 1rem; height: 4rem; width: 5rem;">
        <span>${VieDay}</span>
        <span>${curDate + "/" + curMonth}</span>
      </button>
    `;
    curDay++;
    if (curDay > 6) {
      curDay =0;
    }
    curDate++;
    if (curDate > dateInMonth.getDate()) {
      curDate=1;
      curMonth++;
    }
    if (curMonth > 12) {
      curMonth=1;
    }
  }
  return document.getElementById("showingDate").innerHTML = htmlAdd;
}

// Leads to "dat-ve" page when when click "mua vé" button
$(document).on('click', '#btn-movie', function () {
  var name = $(this).attr("movieName");
  var id = $(this).attr("idMovie");
  window.location=`dat-ve.html?id=${id}&name=${name}`;
});

//Get id showing date when click
$(document).on('click', '.btn-showingdate', function() {
  var id = this.id;
  console.log("id day " + id);
})