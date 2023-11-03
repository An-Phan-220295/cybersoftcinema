$(document).ready(function () {
    $.ajax({
        method: "get",
        url: "http://localhost:8080/index/upcomingmovie",
    }).done(function (result) {
        var div = document.createElement('div');
        let htmlAdd = "";
        let htmlAddContent = `<p>
        <span style="display: none">&nbsp;</span>
        <span style="font-size: 14px">
          <span style="font-family: Arial, Helvetica, sans-serif">
            <strong><a href="index.html">Galaxy Cinema</a></strong
            >
            luôn cập nhật nhanh nhất những bộ phim chiếu rạp mới nhất, hấp dẫn nhất sắp ra mắt 
            trong thời gian tới. Các bộ phim sắp chiếu tại Galaxy Cinema luôn đủ mọi thể loại được 
            ưa chuộng nhất bao gồm hành động, kinh dị, phiêu lưu, hoạt hình…phù hợp cho mọi lứa tuổi, 
            đến từ Hollywood và nhiều quốc gia khác, thật dễ dàng để lựa chọn phim hay theo sở thích 
            của bạn tại website <strong><a href="index.html">Galaxy Cinema</a></strong>.
          </span>
        </span>
      </p>
      <p>
            <span style="font-size: 14px">
                <span style="font-family: Arial, Helvetica, sans-serif">
                    Mỗi bộ phim mới cập nhật lên website sẽ hiển thị đầy đủ thông tin từ tựa phim, 
                    nội dung phim, ngày công chiếu giúp bạn thuận tiện trong việc theo dõi. Ngoài ra, 
                    <strong><a href="index.html">Galaxy Cinema</a></strong> sẽ luôn cập nhật và tạo 
                    thuận tiện giúp bạn nhanh tay đặt lấy suất phim mới nhất, phù hợp nhất để thưởng thức.
                 </span>
            </span>
        </p>

        <p>
            <span style="font-size: 14px">
                <span style="font-family: Arial, Helvetica, sans-serif">
                Hãy cùng <strong><a href="index.html">Galaxy Cinema</a></strong> lướt sơ danh 
                sách các phim hay không-thể-không-mua-vé 
                vào năm 2023 nhé!
                </span>
            </span>
        </p>
      `;
        let htmlData = result.data;
        htmlData.forEach((item, index) => {
            htmlAdd += `
                <div class="col-md-3 col-sm-3 col-xs-6 watchmovie-item">
                            <div class="article-watchmovie">
                              <img
                                src="${item.image}"
                              />
                              <a href="dat-ve/the-creator.html">
                                <div class="decription-hover overlay">
                                  <div class="movies-content">
                                    <span><span class="age-rating">T${item.requireAge}</span></span>
                                    <div class="group">
                                      <div class="btn secondary-white">mua vé</div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div class="title-watchmovie">
                              <h4 class="upper-text">${item.name}</h4>
                            </div>
                          </div>
            `;
            htmlAddContent += `
        <p>
                    <span style="font-size: 14px">
                      <span style="font-family: Arial, Helvetica, sans-serif">
                      <strong>${index + 1}. ${item.name} (${formattedDate(item.releaseDate)})</strong></span>
                    </span>
                  </p>

                  <p>
                    <span style="font-size: 14px">
                      <span style="font-family: Arial, Helvetica, sans-serif">
                        ${item.content}
                      </span>
                    </span>
        </p>
            `;
        });
        div.innerHTML = htmlAdd;
        document.getElementById("upcomingMoviePoster").appendChild(div);
        document.getElementById("content-text").innerHTML = htmlAddContent;
    });
    function formattedDate(d) {
        var initial = String(d).split('-');
        return [ initial[2], initial[1], initial[0],  ].join('-');
    }
});