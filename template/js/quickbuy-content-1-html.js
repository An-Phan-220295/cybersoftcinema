$(document).ready(function () {
  var contentMovieDiv = document.querySelector(".content-movie");

  if (contentMovieDiv) {
    // Xóa tất cả các phần tử con bên trong "content-movie"
    while (contentMovieDiv.firstChild) {
      contentMovieDiv.removeChild(contentMovieDiv.firstChild);
    }
  }

  var content1Div = document.createElement("div");
  content1Div.className = "content-1";

  content1Div.innerHTML = `
  <form>
    <select id="movie-list-movie" class="form-control" style="border-radius: 0; height: 40px">
      <option value="0">Vui lòng chọn phim</option>
    </select>
    <br />
    <select id="theater-list-movie" class="form-control" style="border-radius: 0; height: 40px">
      <option value="0">Vui lòng chọn rạp</option>
    </select>
    <br />
    <select id="date-list-movie" class="form-control" style="border-radius: 0; height: 40px">
      <option value="0">Vui lòng chọn ngày</option>
    </select>
    <br />
    <select id="time-list-movie" class="form-control" style="border-radius: 0; height: 40px">
      <option value="0">Vui lòng chọn suất</option>
    </select>
    <br />
    <a
                        id="loginBuyticket"
                        ng-click="buyTicket()"
                        class="btn primary fl-right btn-buyticket-box"
                        >Mua vé</a
                      >
  </form>
`;

  contentMovieDiv.appendChild(content1Div);
});
