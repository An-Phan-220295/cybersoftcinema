checkCookie();
var userId = getCookie("userId");
let accessToken = getCookie("access-token");

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/user/info?userId=${userId}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var userInfo = document.getElementById("full-user-info");
    let item = result.data;
    var HTMLAdd = `<div>
    <div
      class="d-flex align-items-center justify-content-center"
    >
      <p class="d-inline" style="font-size: xx-large">
        👤
      </p>
      <p class="ms-1" style="font-size: x-large">
        ${item.fullName}
      </p>
    </div>
    <div class="row">
      <div class="col-3"  style="padding:0" >
        <p style="font-size: 15px">- Email:</p>
        <p style="font-size: 15px">- Phone:</p>
        <p style="font-size: 15px">- Gender:</p>
        <p style="font-size: 15px">- DOB:</p>
      </div>
      <div class="col-9"  style="padding:0 !important">
        <p style="font-size: 15px">${item.email}</p>
        <p style="font-size: 15px">${item.phoneNumber}</p>
        <p style="font-size: 15px">${item.gender}</p>
        <p style="font-size: 15px">${formatDate(item.dob)}</p>
      </div>
    </div>
  </div>`;
    userInfo.innerHTML = HTMLAdd;
  });
});

$(document).ready(function () {
  $.ajax({
    url: `http://localhost:8080/user/ticket?userId=${userId}`,
    headers: { Authorization: "Bearer " + accessToken },
    method: "get",
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    var ticketInfo = document.getElementById("ticket-info");
    let data = result.data;

    data.forEach((item) => {
      var HTMLAdd = `<div
      class="row border p-3 rounded-4 mb-3"
      style="background-color: beige"
      
    >
      <div
        class="col-md-2 p-0 d-flex justify-content-center"
      >
        <img
          src=${item.movieImg}
          alt=""
          style="width: 110px; height: 110px"
          class="mx-auto d-block"
        />
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-3">
                <p style="font-size: medium">Tên phim:</p>
              </div>
              <div class="col-9"">
                <p style="font-size: large">
                  <strong>${item.movieName}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-5">
            <div class="row">
              <div class="col-2"><p>Rạp:</p></div>
              <div class="col-10">
                <strong>${item.theaterName}</strong>
              </div>
            </div>
          </div>
          <div class="col-7">
            <div class="row">
              <div class="col-5"><p>Ngày chiếu:</p></div>
              <div class="col-7">
                <strong>${getDayOfWeek(item.showingDate)},${formatDate(
        item.showingDate
      )}</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-5">
            <div class="row">
              <div class="col-2">
                <p style="margin-bottom: 8px">Suất:</p>
              </div>
              <div class="col-10">
                <p style="margin-bottom: 8px">
                  <strong>${moment(item.showingTime, "HH:mm:ss").format(
                    "HH:mm"
                  )}</strong>
                </p>
              </div>
            </div>
          </div>
          <div class="col-7">
            <div class="row">
              <div class="col-4">
                <p style="margin-bottom: 8px">Ghế số:</p>
              </div>
              <div class="col-7">
                <p style="margin-bottom: 8px" >
                <strong id = "seatNumberContainer">${seatNumberList(
                  item.seatNumber
                )}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

      ticketInfo.innerHTML += HTMLAdd;
    });
  });
});
function seatNumberList(family) {
  var result = [];

  for (var prop in family) {
    result.push(family[prop]);
  }
  return result.join(", ");
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
function checkCookie() {
  if (!getCookie("userName")) {
    alert("Vui lòng đăng nhập để xem thông tin!");
    window.location.replace("index.html");
  } else {
    var loginLink = document.getElementById("loginLink");
    loginLink.style.display = "none";
    document.getElementById("user-info").classList.remove("hidden");
    document.getElementById("user-name").textContent = getCookie("userName");
  }
}
function getDayOfWeek(date) {
  const weekday = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const d = new Date(date);
  return weekday[d.getDay()];
}
