let accessToken = getCookie("access-token");
var movieIdGlobal, theaterIdGlobal, showingIdGlobal;
$(document).ready(function () {
  var selectMovie = document.getElementById("movie");
  $.ajax({
    url: `http://localhost:8080/admin/cinema/movie`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var newOption = document.createElement("option");
    newOption.value = "0";
    newOption.text = "Vui lòng chọn phim";
    selectMovie.appendChild(newOption);
    let data = result.data;
    data.forEach((item) => {
      newOption = document.createElement("option");
      newOption.value = item.movieId;
      newOption.text = item.movieName;
      selectMovie.appendChild(newOption);
    });
  });
});

$(document).on("change", "#movie", function () {
  var movieId = $(this).val();
  movieIdGlobal = movieId;
  var selectTheater = document.getElementById("theater");
  selectTheater.innerHTML = "";
  var newOption = document.createElement("option");
  newOption.value = "0";
  newOption.text = "Vui lòng chọn rạp";
  selectTheater.appendChild(newOption);
  console.log();
  $.ajax({
    url: `http://localhost:8080/admin/cinema/theater/findbymovie?movieId=${movieId}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    let data = result.data;
    data.forEach((item) => {
      newOption = document.createElement("option");
      newOption.value = item.theaterId;
      newOption.text = item.theaterName;
      selectTheater.appendChild(newOption);
    });
  });
});
$(document).on("change", "#theater", function () {
  var theaterId = $(this).val();
  theaterIdGlobal = theaterId;
  var selectShowing = document.getElementById("existing-show");
  selectShowing.innerHTML = "";
  var newOption = document.createElement("option");
  newOption.value = "0";
  newOption.text = "Vui lòng suất chiếu";
  selectShowing.appendChild(newOption);
  var selectMovie = document.getElementById("existing-show");
  $.ajax({
    url: `http://localhost:8080/admin/cinema/showing/findbymovieandtheater?movieId=${movieIdGlobal}&theaterId=${theaterIdGlobal}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    // console.log(result.data);

    let data = result.data;
    data.forEach((item) => {
      newOption = document.createElement("option");
      newOption.value = item.showingId;
      newOption.text = `${formatTime(item.showingTime)} - ${getDayOfWeek(
        item.showingDate
      )}, ${formatDate(item.showingDate)}`;
      selectMovie.appendChild(newOption);
    });
  });
});

$(document).on("change", "#existing-show", function () {
  var showingId = $(this).val();
  showingIdGlobal = showingId;
});

$(document).on("click", "#btn-detail", function (e) {
  e.preventDefault();
  var singleSeatPriceElement = document.getElementById("single-seat-price");
  var coupleSeatPriceElement = document.getElementById("couple-seat-price");
  singleSeatPriceElement.innerHTML = "Giá vé ghế single:";
  coupleSeatPriceElement.innerHTML = "Giá vé ghế double:";
  var singleSoldElement = document.getElementById("single-sold");
  var coupleSoldElement = document.getElementById("couple-sold");
  singleSoldElement.innerHTML = "Số ghế single đã bán:";
  coupleSoldElement.innerHTML = "Số ghế couple đã bán:";

  document.getElementById("seat-content").classList.remove("hidden");
  var movieId = $("#movie").val();
  var theaterId = $("#theater").val();
  var showingId = $("#existing-show").val();
  var seat = document.querySelectorAll(".seat-btn");
  seat.forEach((item) => {
    seat.forEach((data) => {
      data.disabled = true;
      data.style.borderColor = "#ddd";
      data.style.color = "#ddd";
    });
  });

  $.ajax({
    url: `http://localhost:8080/admin/seat/getunavalableseat?movieId=${movieIdGlobal}&theaterId=${theaterIdGlobal}&showingId=${showingIdGlobal}`,
    method: "get",
    headers: { Authorization: "Bearer " + accessToken },
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    let unAvalableSeat = result.data;

    unAvalableSeat.forEach((item) => {
      seat.forEach((data) => {
        data.disabled = true;
        if (Number(data.value) === item.seatNumber) {
          data.style.borderColor = " orange";
          data.style.color = " orange";
        }
      });
    });
  });
  const getPriceData = {
    idMovie: movieIdGlobal,
    idTheater: theaterIdGlobal,
    idShowing: showingIdGlobal,
  };
  console.log(getPriceData);
  $.ajax({
    url: "http://localhost:8080/admin/seat/getprice",
    method: "post",
    headers: { Authorization: "Bearer " + accessToken },
    data: JSON.stringify(getPriceData),
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var data = result.data;

    singleSeatPriceElement.innerHTML += `${data.priceNomal}`;
    coupleSeatPriceElement.innerHTML += `${data.priceDouble}`;
  });
  $.ajax({
    url: `http://localhost:8080/admin/seat/countseatsold?movieId=${movieIdGlobal}&theaterId=${theaterIdGlobal}&showingId=${showingIdGlobal}&seatTypeId=1`,
    method: "get",
    headers: { Authorization: "Bearer " + accessToken },
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var data = result.data;
    singleSoldElement.innerHTML += `${data}`;
  });
  $.ajax({
    url: `http://localhost:8080/admin/seat/countseatsold?movieId=${movieIdGlobal}&theaterId=${theaterIdGlobal}&showingId=${showingIdGlobal}&seatTypeId=2`,
    method: "get",
    headers: { Authorization: "Bearer " + accessToken },
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var data = result.data;
    coupleSoldElement.innerHTML += `${data}`;
  });
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

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}
function getDayOfWeek(date) {
  const weekday = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const d = new Date(date);
  return weekday[d.getDay()];
}

function formatTime(input) {
  return moment(input, "HH:mm:ss").format("HH:mm");
}

function formatTimeToSeconds(input) {
  var timeArray = input.split(":");
  if (timeArray.length === 2) {
    return timeArray[0] + ":" + timeArray[1] + ":00";
  } else {
    return input;
  }
}
function selectOptionByValue(selectId, itemValue) {
  var options = document.getElementById(selectId).options;

  for (var i = 0; i < options.length; i++) {
    if (options[i].value == itemValue) {
      document.getElementById(selectId).selectedIndex = i;
      break;
    }
  }
}
