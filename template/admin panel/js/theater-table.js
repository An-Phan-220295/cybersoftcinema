let accessToken = getCookie("access-token");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/cinema/theater/findall`,
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
          data[i].name,
          data[i].address,
          data[i].content,
          '<div class="btn-group row" role="group">' +
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

$(document).on("click", ".delete-btn", function () {
  var id = $(this).attr("value");

  $.ajax({
    url: `http://localhost:8080/admin/cinema/theater/delete?theaterId=${id}`,
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
  window.location = `theater-edit.html?theaterId=${id}`;
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
