let movieIdGlobal, theaterIdGlobal, timeIdGlobal;
$(document).ready(function () {
  var select = document.getElementById("movie-list-movie");
  var selectTheater = document.getElementById("theater-list-movie");
  var selectDate = document.getElementById("date-list-movie");
  var selectTime = document.getElementById("time-list-movie");

  selectTheater.disabled = true;
  selectDate.disabled = true;
  selectTime.disabled = true;
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/quickbuy/movies",
  }).done(function (result) {
    let data = result.data;
    data.forEach((item) => {
      var newOption = document.createElement("option");
      newOption.value = item.movieId;
      newOption.text = item.movieName;
      select.appendChild(newOption);
    });
  });
});

$(document).on("change", "#movie-list-movie", function () {
  var movieId = $(this).val();
  movieIdGlobal = movieId;
  var selectTheater = document.getElementById("theater-list-movie");
  var selectDate = document.getElementById("date-list-movie");
  var selectTime = document.getElementById("time-list-movie");
  theaterIdGlobal = 0;
  timeIdGlobal = 0;

  selectTheater.disabled = false;
  selectTheater.value = 0;
  selectDate.value = 0;
  selectTime.value = 0;
  if (selectTheater.options.length !== 1) {
    for (var k = selectTheater.options.length - 1; k >= 0; k--) {
      if (parseInt(selectTheater.options[k].value) !== 0) {
        selectTheater.remove(k);
      }
    }
    for (var i = selectTime.options.length - 1; i >= 0; i--) {
      if (parseInt(selectTime.options[i].value) !== 0) {
        selectTime.remove(i);
      }
    }
    for (var j = selectDate.options.length - 1; j >= 0; j--) {
      if (parseInt(selectDate.options[j].value) !== 0) {
        selectDate.remove(j);
      }
    }
  }
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/quickbuy/movie/theater?movieId=${movieId}`,
  }).done(function (result) {
    let data = result.data;
    data.forEach((item) => {
      var Option = document.createElement("option");
      Option.value = item.theaterId;
      Option.text = item.theaterName;
      selectTheater.appendChild(Option);
    });
  });
});

$(document).on("change", "#theater-list-movie", function () {
  var theaterId = $(this).val();
  theaterIdGlobal = theaterId;
  var movieId = $("#movie-list-movie").val();
  var selectDate = document.getElementById("date-list-movie");
  var selectTime = document.getElementById("time-list-movie");
  selectDate.disabled = false;
  selectDate.value = 0;
  selectTime.value = 0;
  timeIdGlobal = 0;
  if (selectDate.options.length !== 1) {
    for (var i = selectTime.options.length - 1; i >= 0; i--) {
      if (parseInt(selectTime.options[i].value) !== 0) {
        selectTime.remove(i);
      }
    }
    for (var j = selectDate.options.length - 1; j >= 0; j--) {
      if (parseInt(selectDate.options[j].value) !== 0) {
        selectDate.remove(j);
      }
    }
  }

  $.ajax({
    method: "GET",
    url: `http://localhost:8080/quickbuy/movie/date?movieId=${movieId}&theaterId=${theaterId}`,
  }).done(function (result) {
    let data = result.data;
    data.forEach((item) => {
      var Option = document.createElement("option");
      Option.value = item.showingDate;
      Option.text = `${getDayOfWeek(item.showingDate)}, ${formatDate(
        item.showingDate
      )}`;
      selectDate.appendChild(Option);
    });
  });
});

$(document).on("change", "#date-list-movie", function () {
  var date = $(this).val();
  var theaterId = $("#theater-list-movie").val();
  var movieId = $("#movie-list-movie").val();
  var selectTime = document.getElementById("time-list-movie");
  selectTime.value = 0;
  timeIdGlobal = 0;
  if (selectTime.options.length !== 1) {
    for (var i = selectTime.options.length - 1; i >= 0; i--) {
      if (parseInt(selectTime.options[i].value) !== 0) {
        selectTime.remove(i);
      }
    }
  }
  selectTime.disabled = false;
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/quickbuy/time?movieId=${movieId}&theaterId=${theaterId}&showingDate=${date}`,
  }).done(function (result) {
    let data = result.data;
    data.forEach((item) => {
      var Option = document.createElement("option");
      Option.value = item.showingId;
      Option.text = item.showingTime;
      selectTime.appendChild(Option);
    });
  });
});

$(document).on("change", "#time-list-movie", function () {
  timeIdGlobal = $(this).val();
});
$(document).on("click", "#loginBuyticket", function () {
  if (!getCookie("userName")) {
    alert("Vui lòng đăng nhập để mua vé");
  } else {
    if (
      typeof timeIdGlobal != "undefined" &&
      typeof movieIdGlobal != "undefined" &&
      typeof theaterIdGlobal != "undefined" &&
      timeIdGlobal != 0 &&
      movieIdGlobal != 0 &&
      theaterIdGlobal != 0
    ) {
      const ticketdetail = {
        movieId: movieIdGlobal,
        theaterId: theaterIdGlobal,
        timeId: timeIdGlobal,
      };
      localStorage.setItem("Allow", "true");
      localStorage.setItem("ticketdetail", JSON.stringify(ticketdetail));
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

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0),
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
