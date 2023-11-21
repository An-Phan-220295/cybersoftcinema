
// var id = urlParams.get("id");

$(document).ready(function () {

    // var token = localStorage.getItem("token")

    $.ajax({
        // headers: {
        //     "Authorization": "Bearer" + token
        // },
        method: "GET",
        url: "http://localhost:8080/cinema/blog/${id}"
    }).done(function(data){

        var ul = document.getElementById("list-blog");
        let htmlData = data.data;

        htmlData.forEach((item) => {
            var li = document.createElement("li");
            var htmlAdd = `
            <li class = "blog-options">
            <a href="javascript:;" class="list-group-item list-blog" value ="${item.id}">
              <div class="showtimes-row">
                <div class="title-blog">
                  <p>${item.name}</p>
                </div>
              </div>
            </a>
          </li>`;
      
            li.innerHTML = htmlAdd;
            ul.appendChild(li);
          });

    })
    $(document).on('click', '#btn-blog', function () {
        var name = $(this).attr("name");
        var id = $(this).attr("id");
        window.location=`movie-blog.html?id=${id}&name=${name}`;
      });

})