let accessToken = getCookie("access-token");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/cinema/showing/findall`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var table = $("#example").DataTable();
    let data = result.data;

    for (var i = 0; i < data.length; i++) {
      table.row
        .add([
          formatTime(data[i].startTime),
          getDayOfWeek(data[i].showingDate),
          formatDate(data[i].showingDate),
          '<div class="btn-group row" role="group">' +
            '<a href="#" class="btn btn-sm btn-danger delete-btn" style = "margin-right:4px" value="' +
            data[i].id +
            '">Xóa</a>' +
            "</div>",
        ])
        .draw();
    }
  });
});

$(document).on("click", "#btn-add", function (e) {
  e.preventDefault();
  var showingDate = $("#showingDate").val();
  var time = $("#startTime").val();
  var startTime = formatTimeToSeconds(time);

  if (!Boolean(showingDate) || !Boolean(startTime)) {
    alert("Vui lòng điền thông tin");
  } else {
    console.log(showingDate);
    console.log(startTime);

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
      console.log(data);
      if (data.message == "Successfully") {
        alert("Thêm thành công");
        location.reload();
      } else {
        alert("Dữ liệu đã tồn tại, vui lòng thử lại!");
      }
    });
  }
});

$(document).on("click", ".delete-btn", function () {
  var id = $(this).attr("value");

  $.ajax({
    url: `http://localhost:8080/admin/cinema/showing/delete?showingId=${id}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "delete",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    if (result.message == "Successfully") {
      alert("Xóa thành công");
      location.reload();
    } else {
      alert("Xóa thất bại");
    }
  });
});

$(document).on("click", ".edit-btn", function () {
  var id = $(this).attr("value");
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

function formatTimeToSeconds(input) {
  var timeArray = input.split(":");
  if (timeArray.length === 2) {
    return timeArray[0] + ":" + timeArray[1] + ":00";
  } else {
    return input;
  }
}

function formatTime(input) {
  return moment(input, "HH:mm:ss").format("HH:mm");
}
