let accessToken = getCookie("access-token");
var role = document.getElementById("role");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/admin/user/role`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    let data = result.data;
    data.forEach((item2) => {
      var HTMLAdd = `<option value="${item2.id}">${item2.name}</option>`;
      role.innerHTML += HTMLAdd;
    });
  });
});
$(document).on("click", "#btn-sign-up", function (e) {
  e.preventDefault();
  var fullName = $("#fullname-sign-up").val();
  var phoneNumber = $("#phone-number-sign-up").val();
  var gender = $("#gender-sign-up").val();
  var emailSignUp = $("#email-sign-up").val();
  var passwordSignUp = $("#password-sign-up").val();
  var dobSignUp = document.getElementById("birthday").value;
  var idRole = $("#role").val();
  console.log(passwordSignUp);
  if (
    !Boolean(fullName) ||
    !Boolean(phoneNumber) ||
    !Boolean(gender) ||
    !Boolean(emailSignUp) ||
    !Boolean(passwordSignUp) ||
    !Boolean(dobSignUp) ||
    !Boolean(idRole)
  ) {
    alert("Vui lòng điền thông tin đăng ký");
  } else {
    $.ajax({
      url: "http://localhost:8080/admin/user/add",
      headers: { Authorization: "Bearer " + accessToken },
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({
        fullName: fullName,
        phoneNumber: phoneNumber,
        gender: gender,
        email: emailSignUp,
        password: passwordSignUp,
        dob: dobSignUp,
        idRole: idRole,
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

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}
