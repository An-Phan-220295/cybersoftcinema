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
