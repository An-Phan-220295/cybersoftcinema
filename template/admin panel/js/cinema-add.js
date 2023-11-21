let accessToken = getCookie("access-token");

$(document).ready(function () {
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
  });
});

$(document).on("click", "#btn-add", function (e) {
  e.preventDefault();
  var newShowing = document.getElementById("existing-tab");
  var movieId = $("#movie").val();
  var theaterId = $("#theater").val();
  var showingId = $("#existing-show").val();
  if (newShowing.classList.contains("active")) {
    var data = {
      idMovie: movieId,
      idTheater: theaterId,
      idShowing: showingId,
    };
    console.log(data);
    $.ajax({
      url: "http://localhost:8080/admin/cinema/insert",
      headers: { Authorization: "Bearer " + accessToken },
      method: "post",
      contentType: "application/json",
      data: JSON.stringify(data),
    }).done(function (data) {
      console.log(data);
      if (data.message == "Successfully") {
        alert("Thêm thành công!");
        location.reload();
      } else if (data.message == "Existing") {
        alert("Dữ liệu đã tồn tại!");
      } else {
        alert("Thêm thất bại!");
      }
    });
  } else {
    var showingDate = $("#new-showingDate").val();
    var time = $("#new-startTime").val();
    var startTime = formatTimeToSeconds(time);
    var newShowingId;

    $.ajax({
      url: "http://localhost:8080/admin/cinema/showing/insert",
      headers: { Authorization: "Bearer " + accessToken },
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({
        showingDate: showingDate,
        startTime: startTime,
      }),
    }).done(function (data) {
      if (data.message == "Successfully") {
        $.ajax({
          url: `http://localhost:8080/admin/cinema/showing/id?showingDate=${showingDate}&startTime=${startTime}`,
          headers: { Authorization: "Bearer " + accessToken },
          method: "get",
          contentType: "application/json",
        }).done(function (data) {
          console.log(data.data);
          newShowingId = data.data;
          console.log(newShowingId);
          var data1 = {
            idMovie: movieId,
            idTheater: theaterId,
            idShowing: newShowingId,
          };
          // console.log(data);
          $.ajax({
            url: "http://localhost:8080/admin/cinema/insert",
            headers: { Authorization: "Bearer " + accessToken },
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(data1),
          }).done(function (data1) {
            if (data1.message == "Successfully") {
              alert("Thêm thành công!");
              // location.reload();
            } else if (data1.message == "Existing") {
              alert("Dữ liệu đã tồn tại!");
              // location.reload();
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
