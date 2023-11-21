let accessToken = getCookie("access-token");

$(document).on("click", "#btn-add", function (e) {
  e.preventDefault();
  var name = $("#theater-name").val();
  var address = $("#address").val();
  var content = $("#content").val();

  if (!Boolean(name) || !Boolean(address) || !Boolean(content)) {
    alert("Vui lòng điền thông tin đăng ký");
  } else {
    $.ajax({
      url: "http://localhost:8080/admin/cinema/theater/insert",
      headers: { Authorization: "Bearer " + accessToken },
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({
        name: name,
        address: address,
        content: content,
      }),
    }).done(function (data) {
      console.log(data);
      if (data.message == "Successfully") {
        alert("Thêm thành công");
        location.reload();
      } else {
        alert("Email đã tồn tại, vui lòng thử lại!");
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
