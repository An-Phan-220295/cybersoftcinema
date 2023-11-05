let movieIdGlobal = null;
let theaterIdGlobal = null;
let timeIdGlobal = null;

//Get the list of movie function
$(document).ready(function () {
  //Call API to get list of movie
  $.ajax({
    method: "get",
    url: "http://localhost:8080/index/poster",
  }).done(function (result) {
    var ul = document.getElementById("list-movie");
    let htmlData = result.data;

    //Iterate through an htmlData(reusult.data) array to add HTML code to show movie list in website
    htmlData.forEach((item) => {
      var li = document.createElement("li");
      li.classList.add("movie-option");
      var htmlAdd = `
        <a class="list-group-item list-movie movie" value = "${item.id}">
          <div class="showtimes-row">
            <img src="${item.image}" class="lazy" />
            <span><span class="age-rating">T${item.requireAge}</span></span>
            <div class="title-movie">
              <p class="upper-text"> The Creator</p>
              <p class="vn upper-text">${item.name}</p>
            </div>
          </div>
        </a>`;

      li.innerHTML = htmlAdd;
      ul.appendChild(li);
    });
  });
});

//Get the list of theater when clicked to the movie.
$(document).on("click", ".list-movie", function () {
  var movieId = $(this).attr("value");

  //Assign the value of the clicking to the movie global variation for the buying function.
  movieIdGlobal = $(this).attr("value");

  //Remove the class "active" from all of the elements having "list-movie" class
  $(".list-movie").removeClass("active");

  //Add class "active" for the element movie name has been clicked in
  $(".list-movie").each(function (index, element) {
    if ($(element).attr("value") === movieId) {
      $(element).addClass("active");
    }
  });

  //Remove the continue button
  const continueButton = document.getElementById("continueButton");
  if (continueButton) {
    continueButton.parentNode.removeChild(continueButton);
  }

  //Get the elements and remove the theater list when we click in to change the movie
  var theaterul = document.getElementById("list-theater");
  var theaterliElements = theaterul.getElementsByTagName("li");
  if (theaterliElements.length !== 0) {
    theaterul.innerHTML = "";
  }

  //Get the elements and remove the showing list and add the default message when we click in to change the movie
  var ulShowingDate = document.getElementById("list-showing");
  var showingDateLiElements = ulShowingDate.getElementsByTagName("li");
  if (showingDateLiElements.length !== 0) {
    ulShowingDate.innerHTML = "";
    ulShowingDate.innerHTML = `<li
    ng-if="dates.length == 0 "
    class="list-group-item-text">
    Vui lòng chọn rạp
  </li>`;
  }

  //Call API to get theater list from the movie id
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/quickbuy/movie/theater?movieId=${movieId}`,
  }).done(function (result) {
    var ul = document.getElementById("list-theater");
    let htmlData = result.data;

    //Iterate through an htmlData(result.data) array to add HTML code to show theater list in website
    htmlData.forEach((item) => {
      var li = document.createElement("li");
      var htmlAdd = `
      <li class = "theater-options">
      <a href="javascript:;" class="list-group-item list-theater" value ="${item.theaterId}">
        <div class="showtimes-row">
          <div class="title-movie">
            <p>${item.theaterName}</p>
          </div>
        </div>
      </a>
    </li>`;

      li.innerHTML = htmlAdd;
      ul.appendChild(li);
    });
  });
});

//Get the list of showing when clicked in to the movie and theater.
$(document).on("click", ".list-theater", function () {
  var theaterId = $(this).attr("value");

  //Assign the value of the clicking to the theater global variation for the buying function.
  theaterIdGlobal = $(this).attr("value");

  //Remove the class "active" from all of the elements having "list-theater" class
  $(".list-theater").removeClass("active");

  //Add class "active" for the element movie name has been clicked in
  $(".list-theater").each(function (index, element) {
    if ($(element).attr("value") === theaterId) {
      $(element).addClass("active");
    }
  });

  //Get the elements and remove the showing list when we click in to change the theater
  var ulShowingDate = document.getElementById("list-showing");
  var showingDateLiElements = ulShowingDate.getElementsByTagName("li");
  if (showingDateLiElements.length !== 0) {
    ulShowingDate.innerHTML = "";
  }

  //Call API to get showing list (date and time) from the movie id and theater id
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/quickbuy/movie/date?movieId=${movieIdGlobal}&theaterId=${theaterId}`,
  }).done(function (result) {
    let htmlData = result.data;

    //Iterate through an htmlData(result.data) array to add HTML code to show showing date list in website
    htmlData.forEach((item) => {
      var li = document.createElement("li");
      li.setAttribute("style", "border-bottom: 1px solid #ddd");
      var htmlAddShowingDate = `
      <div class="list-group-item">
                              <div class="showtimes-row">
                                <p style = "display: inline-block; margin-right: 10px">
                                ${formatDate(item.showingDate)}</p>
                                <div
                                  class="showtimes-item"
                                  style="margin-bottom: 0px;margin-top: 0px;">
                                  <div class="list-group-item">
                                    <ul class="center " id= "${formatDate(
                                      item.showingDate
                                    )}">
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>`;

      li.innerHTML = htmlAddShowingDate;
      ulShowingDate.appendChild(li);

      //Iterate through an htmlData(result.data) array to add HTML code to show showing time list in website
      $.ajax({
        method: "GET",
        url: `http://localhost:8080/quickbuy/time?movieId=${movieIdGlobal}&theaterId=${theaterId}&showingDate=${item.showingDate}`,
      }).done(function (result) {
        var ulShowingTime = document.getElementById(
          formatDate(item.showingDate)
        );
        let htmlDataTime = result.data;

        //Iterate through an htmlData(result.data) array to add HTML code to show showing time list in website
        htmlDataTime.forEach((item2) => {
          var liTime = document.createElement("li");
          var htmlAddShowingTime = `
          <div
          class="col-md-4 text-center"
          style="margin-bottom: 20px">
          <a
            href=""
            style="
              padding: 5px 10px;
              border: 1px solid #ddd;
            " value = "${item2.showingId}" class = "showingTime"
            >${item2.showingTime}</a>
        </div>`;
          liTime.innerHTML = htmlAddShowingTime;
          ulShowingTime.appendChild(liTime);
        });
      });
    });
  });
});

//Show buy button when clicked in showing time
$(document).on("click", ".showingTime", function () {
  const continueButton = document.createElement("button");
  continueButton.type = "button";
  continueButton.id = "continueButton";
  continueButton.classList.add(
    "btn",
    "btn-success",
    "position-absolute",
    "bottom-0",
    "end-0"
  );
  continueButton.textContent = "Tiếp tục";

  // Find the "showing-time" div by its id
  const showingTimeDiv = document.getElementById("showing-time");

  // Append the button to the "showing-time" div
  const checkButton = document.getElementById("continueButton");
  if (!checkButton) showingTimeDiv.appendChild(continueButton);
});

//Function to buy the ticket when click showing time
$(document).on("click", ".showingTime", function () {
  timeIdGlobal = $(this).attr("value");
});

//Function to buy the ticket when click showing time
$(document).on("click", "#continueButton", function () {
  console.log(
    `idMovie la ${movieIdGlobal}, idTheater la ${theaterIdGlobal} va idTime la ${timeIdGlobal}`
  );
});

//Function to change the format of the date from yyyy/mm/dd to dd//mm/yyyy
function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}
