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
  var selectTheater = document.getElementById("theater-list-movie");
  var selectDate = document.getElementById("date-list-movie");
  var selectTime = document.getElementById("time-list-movie");

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
  var movieId = $("#movie-list-movie").val();
  var selectDate = document.getElementById("date-list-movie");
  var selectTime = document.getElementById("time-list-movie");
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
      Option.text = formatDate(item.showingDate);
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

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}
