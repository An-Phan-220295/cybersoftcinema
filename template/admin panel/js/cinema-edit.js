let accessToken = getCookie("access-token");
var idurl = window.location.search;
const urlParams = new URLSearchParams(idurl);
var movieId = urlParams.get("movieId");
var theaterId = urlParams.get("theaterId");
var showingId = urlParams.get("showingId");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/cinema/info?movieId=${movieId}&theaterId=${theaterId}&showingId=${showingId}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var list = document.getElementById("list");
    let item = result.data;

    var HTMLAdd = `<tr class= "info">
          <td style="background-color: white;">${item.movieName}</td>
          <td style="background-color: white;">${item.theaterName}</td>
          <td style="background-color: white;">${getDayOfWeek(
            item.showingDate
          )}, ${item.showingDate}</td>
          <td style="background-color: white;">${item.startTime}</td>
        </tr>`;

    list.innerHTML = HTMLAdd;
  });
  $.ajax({
    url: `http://localhost:8080/admin/cinema/movie`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var selectMovie = document.getElementById("movie");
    let data = result.data;
    data.forEach((item) => {
      var newOption = document.createElement("option");
      newOption.value = item.movieId;
      newOption.text = item.movieName;
      selectMovie.appendChild(newOption);
    });
    selectOptionByValue("movie", movieId);
  });

  $.ajax({
    url: `http://localhost:8080/admin/cinema/theater/findall`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var selectMovie = document.getElementById("theater");
    let data = result.data;
    data.forEach((item) => {
      var newOption = document.createElement("option");
      newOption.value = item.id;
      newOption.text = item.name;
      selectMovie.appendChild(newOption);
    });
    selectOptionByValue("theater", theaterId);
  });

  $.ajax({
    url: `http://localhost:8080/admin/cinema/showing/findall`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    // console.log(result.data);
    var selectMovie = document.getElementById("existing-show");
    let data = result.data;
    data.forEach((item) => {
      var newOption = document.createElement("option");
      newOption.value = item.id;
      newOption.text = `${formatTime(item.startTime)} - ${getDayOfWeek(
        item.showingDate
      )}, ${formatDate(item.showingDate)}`;
      selectMovie.appendChild(newOption);
    });
    selectOptionByValue("existing-show", showingId);
  });
});

$(document).on("click", "#btn-add", function (e) {
  e.preventDefault();
  var newShowing = document.getElementById("existing-tab");
  var newMovieId = $("#movie").val();
  var newTheaterId = $("#theater").val();
  var newExistShowingId = $("#existing-show").val();
  if (newShowing.classList.contains("active")) {
    var requestData = {
      existCinemaRequest: {
        idMovie: movieId,
        idTheater: theaterId,
        idShowing: showingId,
      },
      newCinemaRequest: {
        idMovie: newMovieId,
        idTheater: newTheaterId,
        idShowing: newExistShowingId,
      },
    };
    console.log(JSON.stringify(requestData));
    $.ajax({
      url: "http://localhost:8080/admin/cinema/update",
      headers: { Authorization: "Bearer " + accessToken },
      method: "put",
      contentType: "application/json",
      data: JSON.stringify(requestData),
    }).done(function (data) {
      console.log(data);
      if (data.message == "Successfully") {
        alert("Thêm thành công!");
        window.location = `cinema-edit.html?movieId=${newMovieId}&theaterId=${newTheaterId}&showingId=${newExistShowingId}`;
      } else if (data.message == "Existing") {
        alert("Dữ liệu đã tồn tại!");
      } else {
        alert("Thêm thất bại!");
      }
    });
  } else {
    var customShowingDate = $("#new-showingDate").val();
    var time = $("#new-startTime").val();
    var customStartTime = formatTimeToSeconds(time);
    var newCustomShowingId;

    $.ajax({
      url: "http://localhost:8080/admin/cinema/showing/insert",
      headers: { Authorization: "Bearer " + accessToken },
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({
        showingDate: customShowingDate,
        startTime: customStartTime,
      }),
    }).done(function (data) {
      if (data.message == "Successfully") {
        $.ajax({
          url: `http://localhost:8080/admin/cinema/showing/id?showingDate=${customShowingDate}&startTime=${customStartTime}`,
          headers: { Authorization: "Bearer " + accessToken },
          method: "get",
          contentType: "application/json",
        }).done(function (data) {
          newCustomShowingId = data.data;
          var customRequestData = {
            existCinemaRequest: {
              idMovie: movieId,
              idTheater: theaterId,
              idShowing: showingId,
            },
            newCinemaRequest: {
              idMovie: newMovieId,
              idTheater: newTheaterId,
              idShowing: newCustomShowingId,
            },
          };
          // console.log(data);
          $.ajax({
            url: "http://localhost:8080/admin/cinema/update",
            headers: { Authorization: "Bearer " + accessToken },
            method: "put",
            contentType: "application/json",
            data: JSON.stringify(customRequestData),
          }).done(function (data1) {
            if (data1.message == "Successfully") {
              alert("Cập nhật thành công!");
              window.location = `cinema-edit.html?movieId=${newMovieId}&theaterId=${newTheaterId}&showingId=${newCustomShowingId}`;
            } else if (data1.message == "Existing") {
              alert("Dữ liệu đã tồn tại!");
            } else {
              alert("Thêm thất bại!");
            }
          });
        });
      } else {
        alert("Dữ liệu suất chiếu đã tồn tại, vui lòng thử lại!");
      }
    });
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
