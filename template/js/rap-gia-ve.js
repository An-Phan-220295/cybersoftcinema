const allCurDate = new Date();
const curDate = allCurDate.getDate();
const curMonth = allCurDate.getMonth() + 1;
const curYear = allCurDate.getFullYear();
const date = [curYear, curMonth, curDate].join("-");
var selectedDate;

$(document).ready(function () {
  // Display 7 button for next 7 days from today
  getTodayAndNext7Days();
  // Call API get all theater
  $.ajax({
    method: "get",
    url: "http://localhost:8080/theater",
  }).done(function (result) {
    let htmlData = result.data;
    let htmlAdd = ``;
    htmlData.forEach((item, index) => {
      //Load infomation for first theater
      if (index == 0) {
        htmlAdd += `
                    <option value="${item.id}" selected>${item.name}</option>
                `;
        document.querySelector('.address').textContent = item.address;
        document.querySelector('#theaterDescription').textContent = item.content;
        // Call API to get all movie of current theater in current date
        $.ajax({
          method: "get",
          url: `http://localhost:8080/theater/poster?date=${date}&theaterId=${item.id}`,
        }).done(function (result2) {
          let htmlData2 = result2.data;
          let htmlMovieAdd = ``;
          //Check if there is a movie or not
          if (htmlData2.length == 0) {
            htmlMovieAdd = `<h4 class="text-center">Ngày hiện tại không có phim đang chiếu</h4>`;
          } else {
            htmlData2.forEach((item2, index2) => {
              htmlMovieAdd += `
                    <div class="col-md-4 col-sm-4 col-xs-6 movie-item btn-poster" id="${item2.id}">
                      <div class="article-movie-home">
                        <img src="${item2.image}"
                          class="lazy"/>
                        <div class="decription-hover overlay btn"></div>
                      </div>
                      <div class="title-movie">
                        <h4 class="upper-text">${item2.name}</h4>
                      </div>
                    </div>
              `;
            });
          }
          document.getElementById("moviePosters").innerHTML = htmlMovieAdd
        });
      } else {
        htmlAdd += `
                <option value="${item.id}">${item.name}</option>
                `;
      }
    });
    document.getElementById("theaterList").innerHTML = htmlAdd;
  });
});

//Call API load page when change theater
$(document).on('change', '#theaterList', function () {
  var idTheaeter = this.value;
  $.ajax({
    method: "get",
    url: `http://localhost:8080/theater/${idTheaeter}`
  }).done(function (result) {
    let htmlData = result.data;
    document.querySelector('.address').textContent = htmlData.address;
    document.querySelector('#theaterDescription').textContent = htmlData.content;
    // Call API to get all movie of current theater in current date
    $.ajax({
      method: "get",
      url: `http://localhost:8080/theater/poster?date=${date}&theaterId=${idTheaeter}`,
    }).done(function (result2) {
      let htmlData2 = result2.data;
      let htmlMovieAdd = ``;
      let htmlShowAdd = ``;

      //Check if there is a movie or not
      if (htmlData2.length == 0) {
        htmlMovieAdd = `<h4 class="text-center">Ngày hiện tại không có phim đang chiếu</h4>`;
        document.getElementById("showingTime").innerHTML = htmlShowAdd;
      } else {
        htmlData2.forEach((item2, index2) => {
          htmlMovieAdd += `
                <div class="col-md-4 col-sm-4 col-xs-6 movie-item btn-poster" id="${item2.id}">
                  <div class="article-movie-home">
                    <img src="${item2.image}"
                      class="lazy"/>
                    <div class="decription-hover overlay btn "></div>
                  </div>
                  <div class="title-movie">
                    <h4 class="upper-text">${item2.name}</h4>
                  </div>
                </div>
          `;
        });
      }
      document.getElementById("moviePosters").innerHTML = htmlMovieAdd;
    });
  })
})

//Call API load movie poster when choose showing date
$(document).on('click', '.btn-showingdate', function () {
  var date = this.id;
  selectedDate = this.id;
  var idTheaeter = document.getElementById("theaterList").value;
  
  $.ajax({
    method: "get",
    url: `http://localhost:8080/theater/poster?date=${date}&theaterId=${idTheaeter}`,
  }).done(function (result) {
    let htmlData = result.data;
    let htmlMovieAdd = ``;
    let htmlShowAdd = ``;
    if (htmlData.length == 0) {
      htmlMovieAdd = `<h4 class="text-center">Ngày hiện tại không có phim đang chiếu</h4>`;
      document.getElementById("showingTime").innerHTML = htmlShowAdd;
    } else {
      htmlData.forEach(item2 => {
        htmlMovieAdd += `
                    <div class="col-md-4 col-sm-4 col-xs-6 movie-item btn-poster" id="${item2.id}">
                      <div class="article-movie-home">
                        <img src="${item2.image}"
                          class="lazy"/>
                        <div class="decription-hover overlay btn "></div>
                      </div>
                      <div class="title-movie">
                        <h4 class="upper-text">${item2.name}</h4>
                      </div>
                    </div>
            `;
      });
    }
    document.getElementById("moviePosters").innerHTML = htmlMovieAdd
  });
})

//Call API to get show when choose movie
$(document).on('click', '.btn-poster', function() {
  var idMovie = this.id;
  var idTheaeter = document.getElementById("theaterList").value;
  this.classList.add("active");
  $.ajax({
    method: "get",
    url: `http://localhost:8080/quickbuy/time?movieId=${idMovie}&theaterId=${idTheaeter}&showingDate=${selectedDate}`,
  }).done(function (result) {
    let htmlData = result.data;
    let htmlShowAdd = ``;
    htmlData.forEach(item => {
      let displayShow = item.showingTime.substring(0,5);
      htmlShowAdd += `
        <button class="py-2 md:px-8 px-6 border rounded text-sm font-normal 
                    text-black-10 hover:bg-blue-10 active:bg-blue-10 transition-all 
                    duration-500 ease-in-out hover:text-white loginBuyticket">${displayShow}
        </button>
      `;
    });
    document.getElementById("showingTime").innerHTML = htmlShowAdd;
  });
})


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
    htmlAdd += `
        <button type="button" class="d-flex flex-column align-items-center btn btn-outline-secondary p-2 mx-1 btn-showingdate" 
                id="${displayCurYear}-${displayCurMonth}-${displayCurDate}" 
                style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .75rem; --bs-btn-font-size: 1rem; height: 4rem; width: 5rem;">
          <span>${displayVieDay}</span>
          <span>${displayCurDate + "/" + displayCurMonth}</span>
        </button>
      `;
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
  return document.getElementById("showingDate").innerHTML = htmlAdd;
}