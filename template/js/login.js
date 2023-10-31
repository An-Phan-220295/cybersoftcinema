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
    // error: function (response) {
    //   error = response.responseJSON;
    //   console.log(error.message);
    //   if (Array.isArray(error.message)) {
    //     error.message.forEach((element) => {
    //       notify(element);
    //     });
    //   } else {
    //     notify(error.message);
    //   }
    // },
  }).done(function (result) {
    console.log(result.message);
    if (result.message !== null) {
      setCookie("access-token", result.data);
      window.location.href = "index.html";
    } else {
      alert("Sign-in failed");
    }
    console.log("server tra ve ", data);
  });
});

// function notify(msg) {
//   $("<p/>")
//     .appendTo("#notify")
//     .addClass("notify")
//     .addClass("text-center")
//     .html(msg)
//     .slideDown();
// }
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// function getCookie(cname) {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
// function checkCookie() {
//   var username = getCookie("username");
//   if (username != "") {
//     alert("Welcome again " + username);
//   } else {
//     username = prompt("Please enter your name:", "");
//     if (username != "" && username != null) {
//       setCookie("username", username, 365);
//     }
//   }
// }
