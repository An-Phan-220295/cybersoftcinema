let accessToken = getCookie("access-token");

$(document).ready(function () {
  //Call API to get all movie
  $.ajax({
    method: "get",
    headers: { Authorization: "Bearer " + accessToken },
    url: "http://localhost:8080/admin/movie",
  }).done(function (result) {
    var table = $("#example").DataTable();
    let htmlData = result.data;

    htmlData.forEach((item, index) => {
      table.row
        .add([
          index + 1,
          item.movieStatus,
          `<img style="height:150px; width: 225px; object-fit:fill;" src="` +
            item.image +
            `" />`,
          item.name,
          formattedDate(item.releaseDate),
          item.trailer,
          item.country,
          item.rating,
          item.requireAge,
          item.duration,
          item.movieType,
          item.director,
          item.cast,
          item.producer,
          formatContent(item.content),
          '<div class="btn-group row">' +
            '<a href="#" class="btn btn-sm btn-primary btn-edit" data-id="' +
            item.id +
            '" >Sửa</a>' +
            '<a href="#" class="btn btn-sm btn-danger btn-delete" data-id="' +
            item.id +
            '">Xóa</a>' +
            "</div>",
        ])
        .draw();
    });
  });
});

//Leads to movie-add page when click "Thêm mới" button
$(document).on("click", "#btn-add", function () {
  document.location = `movie-add.html`;
});

//Leads to movie-edit page when click "Sửa" button
$(document).on("click", ".btn-edit", function () {
  var id = $(this).attr("data-id");
  document.location = `movie-edit.html?id=${id}`;
});

//Edit the text format to shorten the content to 50 characters
function formatContent(content) {
  if (content.length > 50) {
    content = content.substring(0, 50) + "...";
  }
  return content;
}

//Change format date between yyyy-mm-dd and dd-mm-yyyy
function formattedDate(d) {
  var initial = String(d).split("-");
  return [initial[2], initial[1], initial[0]].join("-");
}

//Delete movie when click "Xóa" button
$(document).on("click", ".btn-delete", function () {
  var id = $(this).attr("data-id");
  $.ajax({
    method: "delete",
    headers: { Authorization: "Bearer " + accessToken },
    url: `http://localhost:8080/admin/movie/delete?movieId=${id}`,
  }).done(function (result) {
    location.reload();
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
