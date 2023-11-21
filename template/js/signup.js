$(document).on("click", "#btn-sign-up", function () {
  var fullName = $("#fullname-sign-up").val();
  var phoneNumber = $("#phone-number-sign-up").val();
  var gender = $("#gender-sign-up").val();
  var emailSignUp = $("#email-sign-up").val();
  var passwordSignUp = $("#password-sign-up").val();
  var dobSignUp = document.getElementById("birthday").value;

  if (
    !Boolean(fullName) ||
    !Boolean(phoneNumber) ||
    !Boolean(gender) ||
    !Boolean(emailSignUp) ||
    !Boolean(passwordSignUp) ||
    !Boolean(dobSignUp)
  ) {
    alert("Vui lòng điền thông tin đăng ký");
  } else {
    $.ajax({
      url: "http://localhost:8080/login/signup",
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({
        fullName: fullName,
        phoneNumber: phoneNumber,
        gender: gender,
        email: emailSignUp,
        password: passwordSignUp,
        dob: dobSignUp,
      }),
    }).done(function (data) {
      console.log(data);
      if (data.message == "Đăng ký thành công") {
        alert("Đăng ký thành công, vui lòng đăng nhập!");
        reloadWithoutHash();
      } else {
        alert("Email đã tồn tại, vui lòng thử lại!");
      }
    });
  }
});
function reloadWithoutHash() {
  var currentUrl = window.location.href;
  if (currentUrl.indexOf("#!#tab_login_2") !== -1) {
    var newUrl1 = currentUrl.replace("#!#tab_login_2", "");
    window.location.href = newUrl1;
  } else {
    location.reload();
  }
}
