checkCookie();
$(document).on("click", "#btn-sign-in", function () {
  var data = {
    email: $("#user").val(),
    password: $("#password").val(),
  };
  console.log(data);

  $.ajax({
    url: "http://localhost:8080/login/signin",
    method: "post",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    console.log(result);
    if (result.message === "Đăng nhập thành công") {
      setCookie("access-token", result.data.token);
      setCookie("userId", result.data.userId);
      setCookie("userName", result.data.email);
      closeModal();
      alert("Đăng nhập thành công");
      // localStorage.removeItem("mytime");
      location.reload();
    } else {
      alert("Sign-in failed");
    }
  });
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie() {
  if (!getCookie("userName")) {
    // alert("Vui lòng đăng nhập để mua vé!");
  } else {
    var loginLink = document.getElementById("loginLink");
    loginLink.style.display = "none";
    document.getElementById("user-info").classList.remove("hidden");
    document.getElementById("user-name").textContent = getCookie("userName");
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

function openModal() {
  var modal = document.getElementById("login-modal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("login-modal");
  modal.style.display = "none";

  // Ẩn lớp màn mờ
  var modalBackdrop = document.querySelector(".modal-backdrop");
  if (modalBackdrop) {
    modalBackdrop.style.display = "none";
  }
}
function checkCookie() {
  if (getCookie("userName") != "") {
    var loginLink = document.getElementById("loginLink");
    loginLink.style.display = "none";
    document.getElementById("user-info").classList.remove("hidden");
    document.getElementById("user-name").textContent = getCookie("userName");
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
