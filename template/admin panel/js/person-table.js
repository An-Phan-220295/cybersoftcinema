let accessToken = getCookie("access-token");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/person`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var table = $("#example").DataTable();
    let data = result.data;

    for (var i = 0; i < data.length; i++) {
      var htmlString = `
    <div class="btn-group row" role="group">
      <a href="#" class="btn btn-sm btn-primary edit-btn" style="margin-right:4px" value="${data[i].personId}">Sửa</a>
      <a href="#" class="btn btn-sm btn-danger delete-btn" style="margin-right:4px" value="${data[i].personId}">Xóa</a>
    </div>
  `;
      var picture = `<img src="${data[i].picture}" width="150px">`;
      table.row
        .add([
          data[i].personId,
          data[i].personName,
          picture,
          formatDate(data[i].birthday),
          data[i].personTypeName,
          data[i].countryName,
          data[i].story,
          htmlString,
        ])
        .draw();
    }
  });
});

$(document).on("click", ".delete-btn", function () {
  var id = $(this).attr("value");

  $.ajax({
    url: `http://localhost:8080/admin/person?personId=${id}`,
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
  window.location = `person-edit.html?personId=${id}`;
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
