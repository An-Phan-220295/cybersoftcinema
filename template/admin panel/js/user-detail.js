let accessToken = getCookie("access-token");
var idurl = window.location.search;
const urlParams = new URLSearchParams(idurl);
var userId = urlParams.get("userId");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/user/detail?userId=${userId}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var userList = document.getElementById("user-list");
    let data = result.data;

    if (data != "") {
      data.forEach((item) => {
        var HTMLAdd = `<tr class= "user-info" value = "${item.id}">
      <td >${item.movieName}</td>
      <td>${item.theaterName}</td>
      <td>${formatDate(item.showingDate)}</td>
      <td>${item.showingTime}</td>
      <td>${item.seatNumber}</td>
      <td>${item.price}</td>
    </tr>`;

        userList.innerHTML += HTMLAdd;
      });
    } else {
      alert("Thành viên chưa mua vé nào!");
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
