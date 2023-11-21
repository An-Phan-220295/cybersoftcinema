let accessToken = getCookie("access-token");
var idurl = window.location.search;
const urlParams = new URLSearchParams(idurl);
var userId = urlParams.get("userId");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/user/role`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var role = document.getElementById("role");
    let data = result.data;
    data.forEach((item2) => {
      var HTMLAdd = `<option value="${item2.id}">${item2.name}</option>`;
      role.innerHTML += HTMLAdd;
    });
  });

  $.ajax({
    url: `http://localhost:8080/admin/user/info?userId=${userId}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var userList = document.getElementById("user");
    let item = result.data;

    var HTMLAdd = `<tr class= "user-info" value = "${item.id}">
      <td >${item.id}</td>
      <td>${item.fullName}</td>
      <td>${item.phoneNumber}</td>
      <td>${item.gender}</td>
      <td>${item.email}</td>
      <td>${formatDate(item.dob)}</td>
      <td>${item.role}</td>
    </tr>`;

    userList.innerHTML = HTMLAdd;

    document.getElementById("birthday").value = `${item.dob}`;
    document.getElementById("email").value = `${item.email}`;
    document.getElementById("fullname").value = `${item.fullName}`;
    document.getElementById("phone-number").value = `${item.phoneNumber}`;
    selectOptionByValue("gender", `${item.gender}`);
    selectOptionByValue("role", `${item.role}`);
  });
});
$(".update-btn").click(function (e) {
  e.preventDefault();
  var id = userId;
  var email = $("#email").val();
  var fullName = $("#fullname").val();
  var phoneNumber = $("#phone-number").val();
  var gender = $("#gender").val();
  var dob = $("#birthday").val();
  var role = $("#role").val();

  if (
    !Boolean(email) ||
    !Boolean(fullName) ||
    !Boolean(phoneNumber) ||
    !Boolean(dob)
  ) {
    alert("Vui lòng điền thông tin đăng ký");
  } else {
    var data = {
      id: id,
      fullName: fullName,
      phoneNumber: phoneNumber,
      gender: gender,
      email: email,
      dob: dob,
      idRole: role,
    };
    $.ajax({
      url: "http://localhost:8080/admin/user/update/info",
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
  }
});

function selectOptionByValue(selectId, itemValue) {
  var options = document.getElementById(selectId).options;

  for (var i = 0; i < options.length; i++) {
    if (options[i].textContent == itemValue) {
      document.getElementById(selectId).selectedIndex = i;
      break;
    }
  }
}

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
