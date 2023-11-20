let accessToken = getCookie("access-token");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/cinema`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var table = $("#example").DataTable();
    let data = result.data;

    for (var i = 0; i < data.length; i++) {
      var htmlString = `
    <div class="btn-group row" role="group">
      <a href="#" class="btn btn-sm btn-primary edit-btn" style="margin-right:4px" movieId="${data[i].movieId}" theaterId="${data[i].theaterId}" showingId="${data[i].showingId}">Sửa</a>
      <a href="#" class="btn btn-sm btn-danger delete-btn" style="margin-right:4px" movieId="${data[i].movieId}" theaterId="${data[i].theaterId}" showingId="${data[i].showingId}">Xóa</a>
    </div>
  `;
      var movieDetail = `<a href="../dat-ve.html?id=${data[i].movieId}&name=${data[i].movieName}" target="_blank" rel="noopener noreferrer">${data[i].movieName}</a>`;
      table.row
        .add([
          movieDetail,
          data[i].theaterName,
          getDayOfWeek(data[i].showingDate),
          formatDate(data[i].showingDate),
          formatTime(data[i].startTime),
          htmlString,
        ])
        .draw();
    }
  });
});

$(document).on("click", ".delete-btn", function () {
  var movieId = $(this).attr("movieId");
  var theaterId = $(this).attr("theaterId");
  var showingId = $(this).attr("showingId");

  var data = {
    idMovie: movieId,
    idTheater: theaterId,
    idShowing: showingId,
  };
  console.log(data);
  $.ajax({
    url: "http://localhost:8080/admin/cinema/delete",
    headers: { Authorization: "Bearer " + accessToken },
    method: "delete",
    contentType: "application/json",
    data: JSON.stringify(data),
  }).done(function (data) {
    console.log(data);
    if (data.message == "Successfully") {
      alert("Xóa thành công!");
      location.reload();
    } else {
      alert("Xóa thất bại!");
    }
  });
});
$(document).on("click", ".edit-btn", function () {
  var movieId = $(this).attr("movieId");
  var theaterId = $(this).attr("theaterId");
  var showingId = $(this).attr("showingId");

  window.location = `cinema-edit.html?movieId=${movieId}&theaterId=${theaterId}&showingId=${showingId}`;
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
