let accessToken = getCookie("access-token");
var idurl = window.location.search;
const urlParams = new URLSearchParams(idurl);
var theaterId = urlParams.get("theaterId");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/cinema/theater/findtheater?theaterId=${theaterId}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var list = document.getElementById("list");
    let item = result.data;

    var HTMLAdd = `<tr class= "user-info" value = "${item.id}">
        <td >${item.id}</td>
        <td >${item.name}</td>
        <td>${item.address}</td>
        <td>${item.content}</td>
      </tr>`;

    list.innerHTML = HTMLAdd;

    document.getElementById("theater-name").value = `${item.name}`;
    document.getElementById("address").value = `${item.address}`;
    document.getElementById("content").value = `${item.content}`;
  });
});

$(".update-btn").click(function (e) {
  e.preventDefault();
  var id = theaterId;
  var name = $("#theater-name").val();
  var address = $("#address").val();
  var content = $("#content").val();

  var data = {
    id: id,
    name: name,
    address: address,
    content: content,
  };
  $.ajax({
    url: "http://localhost:8080/admin/cinema/theater/update",
    method: "put",
    headers: { Authorization: "Bearer " + accessToken },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    if (result.message == "Successfully") {
      alert("Cập nhật thành công");
      location.reload();
    } else {
      alert("Cập nhật thất bại");
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
