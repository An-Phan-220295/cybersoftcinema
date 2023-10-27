$(document).on("click", "#btn-sign-in", function () {
  var username = $("#user").val();
  var password = $("#password").val();

  $.ajax({
    url: "http://localhost:8080/login/signin",
    method: "post",
    data: {
      email: username,
      password: password,
    },
  }).done(function (data) {
    if (data && data.statusCode == 200) {
      localStorage.setItem("token", data.data);
      //   window.location.href = "index.html";
    } else {
      alert("Sai email hoặc mật khẩu.");
    }
    console.log("server tra ve ", data);
  });
});

$(document).on("click", "#btn-sign-up", function () {
  var fullName = $("#fullname-sign-up").val();
  var phoneNumber = $("#phone-number-sign-up").val();
  var gender = $("#gender-sign-up").val();
  var emailSignUp = $("#email-sign-up").val();
  var passwordSignUp = $("#password-sign-up").val();
  var dobSignUp = document.getElementById("birthday").value;

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
    if (data.data) alert("Đăng ký thành công, vui lòng đăng nhập!");
    window.location.href = "index.html";
  });
});
