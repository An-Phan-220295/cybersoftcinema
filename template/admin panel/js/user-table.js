let accessToken = getCookie("access-token");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/user/info-list`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var table = $("#example").DataTable();
    let data = result.data;

    for (var i = 0; i < data.length; i++) {
      table.row
        .add([
          data[i].id,
          data[i].fullName,
          data[i].phoneNumber,
          data[i].gender,
          data[i].email,
          formatDate(data[i].dob),
          data[i].role,
          '<div class="btn-group row" role="group">' +
            '<a href="#" class="btn btn-sm btn-info detail-btn" style = "margin-right:4px" value="' +
            data[i].id +
            '">Xem</a>' +
            '<a href="#" class="btn btn-sm btn-primary edit-btn" style = "margin-right:4px" value="' +
            data[i].id +
            '">Sửa</a>' +
            '<a href="#" class="btn btn-sm btn-danger delete-btn" style = "margin-right:4px" value="' +
            data[i].id +
            '">Xóa</a>' +
            "</div>",
        ])
        .draw();
    }
  });
});

$(document).on("click", ".detail-btn", function () {
  var id = $(this).attr("value");
  window.location = `user-details.html?userId=${id}`;
});

$(document).on("click", ".edit-btn", function () {
  var id = $(this).attr("value");
  window.location = `user-edit.html?userId=${id}`;
});

$(document).on("click", ".delete-btn", function () {
  var id = $(this).attr("value");

  $.ajax({
    url: `http://localhost:8080/admin/user/delete?userId=${id}`,
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
