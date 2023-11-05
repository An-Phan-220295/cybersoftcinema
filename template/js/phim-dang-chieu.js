$(document).ready(function () {
  $.ajax({
    method: "get",
    url: "http://localhost:8080/index/poster",
  }).done(function (result) {
    var div = document.createElement('div');
    let htmlAdd = "";
    let htmlAddContent = `<p>
        <span style="font-family: Arial, Helvetica, sans-serif">
          <span style="font-size: 14px">
          Mùa thu đến rồi, mùa thu đến rồi, dậy đi thôi, dậy đi thôi”, đi đến 
          <strong><a href="http://galaxycine.vn">Galaxy Cinema</a></strong>
          để đốt cháy kỳ nghỉ lễ Quốc Khành và “xin tí lửa” cho một mùa êm dịu nhất trong năm.
          </span>
        </span>
      </p>

      <p>
        <span style="font-family: Arial, Helvetica, sans-serif">
          <span style="font-size: 14px">
          Mở đầu mùa thu cũng đã “Đến lúc bến phà rồi”, cùng Valak quậy tung phòng vé 
          cùng thám tử Hercule Poirot trong <strong>Án Mạng Tại Venice</strong>. 
          Không những thế những màn hành động cháy nổ mãn nhãn cũng sẽ trở lại rạp chiếu phim với 
          <strong>Thiện Ác Đối Đầu 3</strong> và 
          <strong>Biệt Đội Đánh Thuê 4</strong>. Check legit nè.
          </span>
        </span>
      </p>`;
    let htmlData = result.data;
    htmlData.forEach((item, index) => {
      htmlAdd += `
            <div class="col-md-3 col-sm-3 col-xs-6 watchmovie-item" style="float:left;" >
              <div class="article-watchmovie">
                <img
                  src="${item.image}"
                />
                  <div class="decription-hover overlay">
                    <div class="movies-content">
                      <span><span class="age-rating">T${item.requireAge}</span></span>
                        <div class="group">
                          <div class="btn secondary-white" movieName="${item.name}" id="btn-movie">mua vé</div>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="title-watchmovie">
                <h4 class="upper-text">${item.name}</h4>
              </div>
            </div>
          `;
      htmlAddContent += `
          <p>
                      <span style="font-family: Arial, Helvetica, sans-serif">
                        <span style="font-size: 14px">
                          <a href="dat-ve.html?name=${item.name}"
                            ><strong
                              >${index + 1}. ${item.name} (${formattedDate(item.releaseDate)})
                            </strong
                          ></a>
                        </span>
                      </span>
                    </p>
                    <p>
                      <span style="font-family: Arial, Helvetica, sans-serif">
                        <span style="font-size: 14px">
                          ${item.content}
                        </span>
                      </span>
                    </p>
          `;
    });
    div.innerHTML = htmlAdd;
    document.getElementById("moviePosters").appendChild(div);
    document.getElementById("conten-text").innerHTML = htmlAddContent;
  });

  function formattedDate(d) {
    var initial = String(d).split('-');
    return [ initial[2], initial[1], initial[0],  ].join('-');
  }
});

$(document).on('click', '#btn-movie', function () {
  var name = $(this).attr("movieName");
  window.location=`dat-ve.html?name=${name}`;
});