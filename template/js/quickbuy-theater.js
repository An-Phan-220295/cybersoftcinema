$(document).ready(function () {
  var selectTheater = document.getElementById("theater-list-theater");

  var selectDate = document.getElementById("date-list-theater");
  var selectMovie = document.getElementById("movie-list-theater");
  var selectTime = document.getElementById("time-list-theater");
  selectDate.disabled = true;
  selectMovie.disabled = true;
  selectTime.disabled = true;
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/quickbuy/theater",
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

$(document).on("change", "#theater-list-theater", function () {
  var theaterId = $(this).val();
  theaterIdGlobal = theaterId;
  var selectMovie = document.getElementById("movie-list-theater");
  var selectTime = document.getElementById("time-list-theater");
  var selectDate = document.getElementById("date-list-theater");

  document.getElementById("date-list-movie").value = 0;
  document.getElementById("movie-list-movie").value = 0;
  document.getElementById("theater-list-movie").value = 0;
  document.getElementById("time-list-movie").value = 0;

  document.getElementById("date-list-date").value = 0;
  document.getElementById("movie-list-date").value = 0;
  document.getElementById("theater-list-date").value = 0;
  document.getElementById("time-list-date").value = 0;

  selectMovie.disabled = false;
  selectMovie.value = 0;
  selectTime.value = 0;
  selectDate.value = 0;

  if (selectMovie.options.length !== 1) {
    for (var k = selectMovie.options.length - 1; k >= 0; k--) {
      if (parseInt(selectMovie.options[k].value) !== 0) {
        selectMovie.remove(k);
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
    url: `http://localhost:8080/quickbuy/theater/movie?theaterId=${theaterId}`,
  }).done(function (result) {
    let data = result.data;
    data.forEach((item) => {
      var newOption = document.createElement("option");
      newOption.value = item.movieId;
      newOption.text = item.movieName;
      selectMovie.appendChild(newOption);
    });
  });
});

$(document).on("change", "#movie-list-theater", function () {
  var movieId = $(this).val();
  movieIdGlobal = movieId;
  var theaterId = $("#theater-list-theater").val();
  var selectDate = document.getElementById("date-list-theater");
  var selectTime = document.getElementById("time-list-theater");
  selectDate.disabled = false;
  selectDate.value = 0;
  selectTime.value = 0;
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

$(document).on("change", "#date-list-theater", function () {
  var date = $(this).val();
  var theaterId = $("#theater-list-theater").val();
  var movieId = $("#movie-list-theater").val();
  var selectTime = document.getElementById("time-list-theater");
  selectTime.value = 0;
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
      typeof theaterIdGlobal != "undefined"
    ) {
      const ticketdetail = {
        movieId: movieIdGlobal,
        theaterId: theaterIdGlobal,
        timeId: timeIdGlobal,
      };
      localStorage.setItem("ticketdetail", JSON.stringify(ticketdetail));
      window.location.replace("seat.html");
    } else {
      alert("Vui lòng chọn xuất chiếu");
    }
  }
});

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
