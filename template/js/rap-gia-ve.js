const allCurDate = new Date();
const curDate = allCurDate.getDate();
const curMonth = allCurDate.getMonth()+1;
const curYear = allCurDate.getFullYear();
const date = [curYear, curMonth, curDate].join("-");

$(document).ready(function() {
    // Display table next 7 days from today
    getTodayAndNext7Days();

    $.ajax({
        method: "get",
        url: "http://localhost:8080/theater",
      }).done(function (result) {
        let htmlData = result.data;
        let htmlAdd = ``;
        htmlData.forEach((item, index) => {
            if (index==0) {
                htmlAdd += `
                    <option value="${item.id}" selected>${item.name}</option>
                `;
                document.querySelector('.address').textContent=item.address;
            } else {
                htmlAdd += `
                <option value="${item.id}">${item.name}</option>
                `;
            }
        });
        document.getElementById("theaterList").innerHTML = htmlAdd;
      });
});

$(document).on('change', '#theaterList', function(){
    var idTheaeter = this.value;
    $.ajax({
        method: "get",
        url: `http://localhost:8080/theater/${idTheaeter}`
    }).done(function(result){
        let htmlData = result.data;
        document.querySelector('.address').textContent=htmlData.address;
    })
})

function getTodayAndNext7Days () {
    var displayCurDay = allCurDate.getDay();
    var displayVieDay = "";
    var displayCurDate = curDate;
    var displayCurMonth = curMonth;
    var displayCurYear = curYear;
    var dateInMonth = new Date(curYear, curMonth, 0);
    let htmlAdd =``;
    for (let index = 0; index < 7; index++) {
      switch (displayCurDay) {
        case 0:
          displayVieDay = "Chủ nhật";
          break;
        case 1:
          displayVieDay = "Thứ hai";
          break;
        case 2:
          displayVieDay = "Thứ ba";
          break;
        case 3:
          displayVieDay = "Thứ tư";
          break;
        case 4:
          displayVieDay = "Thứ năm";
          break;
        case 5:
          displayVieDay = "Thứ sáu";
          break;
        case 6:
          displayVieDay = "Thứ bảy";
          break;    
        default:
          break;
      }
      //add 0 number for curdate <10 (9 to 09)
      if (displayCurDate < 10) {
        displayCurDate= "0" + displayCurDate;     
      }
      htmlAdd += `
        <button type="button" class="d-flex flex-column align-items-center btn btn-outline-secondary p-2 mx-1 btn-showingdate" 
                date="${displayCurYear}-${displayCurMonth}-${displayCurDate}" 
                style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .75rem; --bs-btn-font-size: 1rem; height: 4rem; width: 5rem;">
          <span>${displayVieDay}</span>
          <span>${displayCurDate + "/" + displayCurMonth}</span>
        </button>
      `;
      displayCurDay++;
      if (displayCurDay > 6) {
        displayCurDay =0;
      }
      displayCurDate++;
      if (displayCurDate > dateInMonth.getDate()) {
        displayCurDate=1;
        displayCurMonth++;
      }
      if (displayCurMonth > 12) {
        displayCurMonth=1;
        displayCurYear++;
      }
    }
    return document.getElementById("showingDate").innerHTML = htmlAdd;
  }