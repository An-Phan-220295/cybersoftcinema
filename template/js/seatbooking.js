let singlePrice, couplePrice;
var ticketDetail = JSON.parse(localStorage.getItem("ticketdetail"));
var ticketDetailData = {
  idMovie: ticketDetail.movieId,
  idTheater: ticketDetail.theaterId,
  idShowing: ticketDetail.timeId,
};

checkCookie();
$(document).ready(function () {
  var details = document.getElementById("details");
  var seat = document.querySelectorAll(".seat-btn");

  $.ajax({
    url: "http://localhost:8080/ticket/getprice",
    method: "post",
    data: JSON.stringify(ticketDetailData),
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    let item = result.data;
    var time = moment(item.showingTime, "HH:mm:ss").format("HH:mm");
    var HTMLAdd = `<div
    class="col-md-4 col-sm-4 col-xs-8 col-xs-offset-2 col-md-offset-0"
  >
    <div class="detail-feat-img">
      <img
        src=${item.movieImg}
        width="135x"
        height="270px"
      />
    </div>
  </div>
  <div class="col-md-8 col-sm-8 col-xs-12">
    <h2 class="detail-title upper-text">The Creator</h2>
    <h2 class="detail-title vn upper-text">
      ${item.movieName}
    </h2>
    <div class="detail-rating">
      <span><span class="age-rating">T${item.ageRating}</span></span>
    </div>
    <p style="font-size: larger; margin-bottom: 5px">
      Rạp: <strong>${item.theaterName}</strong>
    </p>
    <p style="font-size: larger; margin-bottom: 5px">
      Xuất chiếu: <strong>${time}</strong>
    </p>
    <p style="font-size: larger; margin-bottom: 5px">
      Ngày chiếu:<strong> ${formatDate(item.showingDate)} </strong>
    </p>
  </div>
  
</div>`;
    details.innerHTML = HTMLAdd;
    const coupleSeatButtons = document.querySelectorAll(
      'button.seat-btn[seattype="couple"]'
    );
    coupleSeatButtons.forEach((button) => {
      button.setAttribute("price", `${item.priceDouble}`);
      button.setAttribute("id-price", `${item.idPriceDouble}`);
      button.setAttribute("id-seattype", "2");
    });
    const singleSeatButtons = document.querySelectorAll(
      'button.seat-btn[seattype="single"]'
    );
    singleSeatButtons.forEach((button) => {
      button.setAttribute("price", `${item.priceNomal}`);
      button.setAttribute("id-price", `${item.idPriceNomal}`);
      button.setAttribute("id-seattype", "1");
    });
  });

  $.ajax({
    url: "http://localhost:8080/ticket/getunavalableseat",
    method: "post",
    data: JSON.stringify(ticketDetailData),
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    let unAvalableSeat = result.data;

    unAvalableSeat.forEach((item) => {
      seat.forEach((data) => {
        if (Number(data.value) === item.seatNumber) {
          data.style.borderColor = "blue";
          data.style.color = "blue";
          data.disabled = true;
        }
      });
    });
  });
});

var selectedSeats = {};

function toggleButton(button) {
  var seatNumber = button.value;

  if (selectedSeats[seatNumber]) {
    // Nếu nút đã được chọn, hủy chọn
    button.style.borderColor = "#ddd";
    button.style.color = "#ddd";
    delete selectedSeats[seatNumber];
  } else {
    // Nếu nút chưa được chọn, chọn nút
    button.style.borderColor = "orange";
    button.style.color = "orange";

    var seatPrice = button.getAttribute("price");
    var seatType = button.getAttribute("seattype");
    var idSeatType = button.getAttribute("id-seattype");
    var idPrice = button.getAttribute("id-price");
    // Lưu thông tin đã chọn
    selectedSeats[seatNumber] = {
      seatPrice: seatPrice,
      seatType: seatType,
      idSeatType: idSeatType,
      seatNumber: seatNumber,
      idPrice: idPrice,
    };
  }

  // Cập nhật hiển thị thông tin đã chọn và tổng giá trị
  updateSelectedSeatsDisplay();
  updateTotal();
}

function updateSelectedSeatsDisplay() {
  var seatChoseElement = document.getElementById("seat-chose");
  seatChoseElement.innerHTML = ""; // Xóa nội dung cũ

  // Hiển thị thông tin đã chọn
  for (var seatNumber in selectedSeats) {
    var seatInfo = selectedSeats[seatNumber];

    var HTMLAdd = `
    <div style="display: flex; justify-content: space-between">
      <div style="flex: 3">
        
        <p style="font-size: medium; text-align: left; margin-bottom: 0px;">
          Seat: ${seatNumber} -- ${capitalizeFirstLetter(
      seatInfo.seatType
    )} seat
        </p>
      </div>
      <p style="font-size: medium; flex: 1; text-align: right">
        ${seatInfo.seatPrice}
      </p>
    </div>`;
    seatChoseElement.innerHTML += HTMLAdd;
  }
}

function updateTotal() {
  var totalElement = document.getElementById("total");
  var continueButton = document.getElementById("continueButton");

  var totalPrice = calculateTotalPrice();

  // Hiển thị hoặc ẩn đoạn HTML "Total" tùy thuộc vào giá trị totalPrice
  if (totalPrice > 0) {
    var totalHTML = `
      <div style="display: flex; justify-content: space-between">
        <p style="font-size: large; flex: 1">Total:</p>
        <p style="font-size: large; flex: 1; text-align: right">
          ${totalPrice}
        </p>
      </div>`;
    totalElement.innerHTML = totalHTML;

    // Hiển thị nút "Tiếp tục"
    continueButton.style.display = "block";
  } else {
    totalElement.innerHTML = ""; // Ẩn đoạn HTML "Total"

    // Ẩn nút "Tiếp tục"
    continueButton.style.display = "none";
  }
}

function calculateTotalPrice() {
  var totalPrice = 0;

  // Tính tổng giá trị từ các nút đã chọn
  for (var seatNumber in selectedSeats) {
    var seatInfo = selectedSeats[seatNumber];
    totalPrice += parseFloat(seatInfo.seatPrice);
  }

  return totalPrice.toFixed(2); // Làm tròn đến 2 chữ số sau dấu thập phân
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).on("click", "#continueButton", function () {
  var data = Object.values(selectedSeats).map(function (seat) {
    return {
      seatNumber: seat.seatNumber,
      idSeatType: seat.idSeatType,
      idUser: getCookie("userId"),
      idPrice: seat.idPrice,
      idMovie: ticketDetailData.idMovie,
      idTheater: ticketDetailData.idTheater,
      idShowing: ticketDetailData.idShowing,
    };
  });
  $.ajax({
    url: "http://localhost:8080/ticket/buyticket",
    method: "post",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
  }).done(function (result) {
    if (result.message === "Mua vé thành công") {
      alert("Đặt vé thành công");
      location.reload();
    } else {
      alert("Đặt vé thất bại");
    }
  });
});

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
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

function checkCookie() {
  if (!getCookie("userName")) {
    alert("Vui lòng đăng nhập để mua vé!");
    window.location.replace("index.html");
  } else {
    var loginLink = document.getElementById("loginLink");
    loginLink.style.display = "none";
    document.getElementById("user-info").classList.remove("hidden");
    document.getElementById("user-name").textContent = getCookie("userName");
  }
}
