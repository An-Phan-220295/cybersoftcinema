// Khi nội dung file html đã được hiển thị trên browser thì sẽ kích hoạt
$(document).on("click", "#btn-sign-in", function () {
  // Đăng ký sự kiện click cho thẻ tag được chỉ định bên HTML

  // .val() : Lấy giá trị của thẻ input được chỉ định
  var username = $("#user").val();
  var password = $("#password").val();

  // Xuất giá trị ra trên tab console trên trình duyệt
  console.log("username : ", username, " password : ", password);

  //ajax : Dùng để call ngầm API mà không cần trình duyệt
  //axios, fetch
  //data : chỉ có khi tham số truyền ngầm
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
