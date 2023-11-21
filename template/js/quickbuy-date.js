$(document).ready(function () {
  var selectDate = document.getElementById("date-list-date");

  var selectMovie = document.getElementById("movie-list-date");
  var selectTheater = document.getElementById("theater-list-date");
  var selectTime = document.getElementById("time-list-date");
  selectTheater.disabled = true;
  selectMovie.disabled = true;
  selectTime.disabled = true;
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/quickbuy/date",
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

$(document).on("change", "#date-list-date", function () {
  var showingDate = $(this).val();
  var selectTheater = document.getElementById("theater-list-date");
  var selectMovie = document.getElementById("movie-list-date");
  var selectTime = document.getElementById("time-list-date");

  document.getElementById("date-list-movie").value = 0;
  document.getElementById("movie-list-movie").value = 0;
  document.getElementById("theater-list-movie").value = 0;
  document.getElementById("time-list-movie").value = 0;

  document.getElementById("date-list-theater").value = 0;
  document.getElementById("movie-list-theater").value = 0;
  document.getElementById("theater-list-theater").value = 0;
  document.getElementById("time-list-theater").value = 0;

  selectTheater.disabled = false;
  selectTheater.value = 0;
  selectMovie.value = 0;
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
    for (var j = selectMovie.options.length - 1; j >= 0; j--) {
      if (parseInt(selectMovie.options[j].value) !== 0) {
        selectMovie.remove(j);
      }
    }
  }
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/quickbuy/date/theater?showingDate=${showingDate}`,
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

$(document).on("change", "#theater-list-date", function () {
  var theaterId = $(this).val();
  theaterIdGlobal = theaterId;
  var showingDate = $("#date-list-date").val();
  var selectMovie = document.getElementById("movie-list-date");
  var selectTime = document.getElementById("time-list-date");
  selectMovie.disabled = false;
  selectMovie.value = 0;
  selectTime.value = 0;
  if (selectMovie.options.length !== 1) {
    for (var i = selectTime.options.length - 1; i >= 0; i--) {
      if (parseInt(selectTime.options[i].value) !== 0) {
        selectTime.remove(i);
      }
    }
    for (var j = selectMovie.options.length - 1; j >= 0; j--) {
      if (parseInt(selectMovie.options[j].value) !== 0) {
        selectMovie.remove(j);
      }
    }
  }

  $.ajax({
    method: "GET",
    url: `http://localhost:8080/quickbuy/date/movies?showingDate=${showingDate}&theaterId=${theaterId}`,
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

$(document).on("change", "#movie-list-date", function () {
  var movieId = $(this).val();
  movieIdGlobal = movieId;
  var theaterId = $("#theater-list-date").val();
  var showingDate = $("#date-list-date").val();
  var selectTime = document.getElementById("time-list-date");
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
    url: `http://localhost:8080/quickbuy/time?movieId=${movieId}&theaterId=${theaterId}&showingDate=${showingDate}`,
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
