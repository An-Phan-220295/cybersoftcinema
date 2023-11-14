var a = window.location.pathname;
var idurl = window.location.search;
const urlParams = new URLSearchParams(idurl);
var name = urlParams.get("name");
var id = urlParams.get("id");
const allCurDate = new Date();
const curDate = allCurDate.getDate();
const curMonth = allCurDate.getMonth() + 1;
const curYear = allCurDate.getFullYear();
const dateGlobal = [curYear, curMonth, curDate].join("-");
$(document).ready(function () {
  //Call API to get movie information from movie name
  $.ajax({
    method: "get",
    url: `http://localhost:8080/ticketbooking/${name}`,
  }).done(function (result) {
    var div = document.createElement("div");
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
              <h2 class="detail-title upper-text" id="movieName">${
                item.name
              }</h2>
              <div class="detail-rating">
                <div ng-controller="ratingController" ng-init='itemId ="da092419-c4d6-47cb-8fde-1ff8197ae64d"'
                  class="rating-wrap detail">
                  <div class="rating-movie detail">
                    <div class="rating-value detail">
                      <strong>${item.rating}</strong><span>/10</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="detail-rating">
                <span><span class="age-rating">T${
                  item.requireAge
                }</span></span><span><i
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
                  <div class="detail-info-right">${formattedDate(
                    item.releaseDate
                  )}</div>
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
                          ${formattedDate(
                            item.releaseDate
                          )} tại rạp chiếu phim toàn quốc.
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
  }).done(function (result) {
    var div = document.createElement("div");
    let count = 0;
    let htmlAdd = "";
    let htmlData = result.data;
    for (let index = 0; index < htmlData.length; index++) {
      if (count == 3) {
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
  });

  //Funcion to get show date list from now to next 7 days
  getTodayAndNext7Days();

  //Call API to get theater and show in current day
  $.ajax({
    method: "get",
    url: `http://localhost:8080/ticketbooking/show?idMovie=${id}&showingDate=${dateGlobal}`,
  }).done(function (result) {
    var htmlData = result.data;
    //Check is data null
    if (htmlData.length == 0) {
      document.getElementById("showingList").innerHTML = `<div class="d-flex flex-column align-items-center pt-3 fs-4">Phim không có lịch chiếu trong ngày này</div>`;
    } else {
      var htmlTheaterAdd = ``;
      var htmlShowAdd = ``;
      htmlData.forEach(item => {
        htmlTheaterAdd += `
          <div class="showtime__cinema md:py-8 py-4 px-3 odd:bg-white even:bg-[#FDFBFA] even:border-t even:border-b">
            <h3 class="text-base font-bold mb-4">${item.theaterName}</h3>
                <div class="time__show flex flex-1 flex-row gap-x-3 gap-y-1 flex-wrap" 
                id="${item.theaterName}">
                </div>
          </div>
          `;
        document.getElementById("showingList").innerHTML = htmlTheaterAdd;
        item.showings.forEach(show => {
          var displayShow = show.startTime.substring(0, 5);
          htmlShowAdd += `
              <button class="py-2 md:px-8 px-6 border rounded text-sm font-normal 
                    text-black-10 hover:bg-blue-10 active:bg-blue-10 transition-all 
                    duration-500 ease-in-out hover:text-white loginBuyticket" 
                    timeIdGlobal="${show.id}" theaterIdGlobal="${item.theaterId}">${displayShow}
              </button>
            `;
        })
        document.getElementById(`${item.theaterName}`).innerHTML = htmlShowAdd;
        htmlShowAdd = "";
        htmlTheaterAdd = document.getElementById("showingList").innerHTML;
      });
    }
  });
});

//Display information which doesn't have detail url
function arrayDisplay(array) {
  var d = "";
  if (array.length === 0) {
    return (d = "Đang cập nhật");
  } else {
    array.forEach((item) => {
      if (array[array.length - 1] == item) {
        d += `<span>${item}</span>`;
      } else {
        d += `<span>${item}</span>, `;
      }
    });
  }
  return d;
}

//Display information which have detail url (actor, director)
function arrayDisplayWithUrl(array) {
  var d = "";
  if (array.length === 0) {
    return (d = "Đang cập nhật");
  } else {
    array.forEach((item) => {
      if (array[array.length - 1] == item) {
        d += `<a href="../dao-dien/gareth-edwards.html" style="text-decoration:none">${item}</a>`;
      } else {
        d += `<a href="../dao-dien/gareth-edwards.html" style="text-decoration:none">${item}</a>, `;
      }
    });
  }
  return d;
}

//Change format date between yyyy-mm-dd and dd-mm-yyyy
function formattedDate(d) {
  var initial = String(d).split('-');
  return [initial[2], initial[1], initial[0],].join('-');
}

// Display 7 button for next 7 days from today
function getTodayAndNext7Days() {
  var displayCurDay = allCurDate.getDay();
  var displayVieDay = "";
  var displayCurDate = curDate;
  var displayCurMonth = curMonth;
  var displayCurYear = curYear;
  var dateInMonth = new Date(curYear, curMonth, 0);
  let htmlAdd = ``;
  for (let index = 0; index < 7; index++) {
    switch (displayCurDay) {
      case 0:
        displayVieDay = "Chủ nhật";
        break;
      case 1:
        displayVieDay = "Thứ hai";
        break;
      case 2:
        displayVieDay = "Thứ ba";
        break;
      case 3:
        displayVieDay = "Thứ tư";
        break;
      case 4:
        displayVieDay = "Thứ năm";
        break;
      case 5:
        displayVieDay = "Thứ sáu";
        break;
      case 6:
        displayVieDay = "Thứ bảy";
        break;
      default:
        break;
    }
    //add 0 number for curdate <10 (9 to 09)
    if (displayCurDate < 10) {
      displayCurDate = "0" + displayCurDate;
    }
    if (index == 0) {
      htmlAdd += `
        <button type="button" class="d-flex flex-column align-items-center btn btn-outline-secondary p-2 mx-1 btn-showingdate active"
        id="${displayCurYear}-${displayCurMonth}-${displayCurDate}"
                style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .75rem; --bs-btn-font-size: 1rem; height: 4rem; width: 5rem;">
          <span>${displayVieDay}</span>
          <span>${displayCurDate + "/" + displayCurMonth}</span>
        </button>
      `;
    } else {
      htmlAdd += `
      <button type="button" class="d-flex flex-column align-items-center btn btn-outline-secondary p-2 mx-1 btn-showingdate" 
      id="${displayCurYear}-${displayCurMonth}-${displayCurDate}"
              style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .75rem; --bs-btn-font-size: 1rem; height: 4rem; width: 5rem;">
        <span>${displayVieDay}</span>
        <span>${displayCurDate + "/" + displayCurMonth}</span>
      </button>
    `;
    }
    displayCurDay++;
    if (displayCurDay > 6) {
      displayCurDay = 0;
    }
    displayCurDate++;
    if (displayCurDate > dateInMonth.getDate()) {
      displayCurDate = 1;
      displayCurMonth++;
    }
    if (displayCurMonth > 12) {
      displayCurMonth = 1;
      displayCurYear++;
    }
  }
  return (document.getElementById("showingDate").innerHTML = htmlAdd);
}

// Leads to "dat-ve" page when when click "mua vé" button
$(document).on('click', '#btn-movie', function () {
  var name = $(this).attr("movieName");
  var id = $(this).attr("idMovie");
  window.location=`dat-ve.html?id=${id}&name=${name}`;
});

//Get id showing date when click showing date
$(document).on('click', '.btn-showingdate', function () {
  var date = this.id;

  //Active showing date button when click
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace("active", "");
  this.className += " active";

  $.ajax({
    method: "get",
    url: `http://localhost:8080/ticketbooking/show?idMovie=${id}&showingDate=${date}`,
  }).done(function (result) {
    var htmlData = result.data;
    //Check is data null
    if (htmlData.length == 0) {
      document.getElementById("showingList").innerHTML = `<div class="d-flex flex-column align-items-center pt-3 fs-4">Phim không có lịch chiếu trong ngày này</div>`;
    } else {
      var htmlTheaterAdd = ``;
      var htmlShowAdd = ``;
      htmlData.forEach(item => {
        htmlTheaterAdd += `
          <div class="showtime__cinema md:py-8 py-4 px-3 odd:bg-white even:bg-[#FDFBFA] even:border-t even:border-b">
            <h3 class="text-base font-bold mb-4">${item.theaterName}</h3>
                <div class="time__show flex flex-1 flex-row gap-x-3 gap-y-1 flex-wrap" 
                id="${item.theaterName}">
                </div>
          </div>
          `;
        document.getElementById("showingList").innerHTML = htmlTheaterAdd;
        item.showings.forEach(show => {
          var displayShow = show.startTime.substring(0, 5);
          htmlShowAdd += `
              <button class="py-2 md:px-8 px-6 border rounded text-sm font-normal 
                    text-black-10 hover:bg-blue-10 active:bg-blue-10  transition-all 
                    duration-500 ease-in-out hover:text-white loginBuyticket"
                    timeIdGlobal="${show.id}" theaterIdGlobal="${item.theaterId}">${displayShow}
              </button>
            `;
        })
        document.getElementById(`${item.theaterName}`).innerHTML = htmlShowAdd;
        htmlShowAdd = "";
        htmlTheaterAdd = document.getElementById("showingList").innerHTML;
      });
    }
  });
});

//Leads to "seat.html" page when show is selected
$(document).on("click", ".loginBuyticket", function () {
  var movieIdGlobal = id;
  var theaterIdGlobal = $(this).attr("theaterIdGlobal");
  var timeIdGlobal = $(this).attr("timeIdGlobal");
  console.log(movieIdGlobal);
  console.log(theaterIdGlobal);
  console.log(timeIdGlobal);
  if (!getCookie("userName")) {
    alert("Vui lòng đăng nhập để mua vé");
  } else {
    if (
      typeof timeIdGlobal != "undefined" &&
      typeof movieIdGlobal != "undefined" &&
      typeof theaterIdGlobal != "undefined"
    ) {
      const ticketdetail = {
        movieId: movieIdGlobal,
        theaterId: theaterIdGlobal,
        timeId: timeIdGlobal,
      };
      localStorage.setItem("ticketdetail", JSON.stringify(ticketdetail));
      localStorage.setItem("Allow", "true");
      window.location.replace("seat.html");
    } else {
      alert("Vui lòng chọn xuát chiếu");
    }
  }
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}