$(document).ready(function () {
    //Call API to get all movie
    $.ajax({
        method: 'get',
        url: "http://localhost:8080/admin",
    }).done(function (result) {
        var table = $('#example').DataTable();
        let htmlData = result.data;

        htmlData.forEach((item, index) => {
            table.row
                .add([
                    index + 1,
                    item.movieStatus,
                    `<img style="height:100px; object-fit:fill;" src="` +item.image + `" />`,
                    item.name,
                    formattedDate(item.releaseDate),
                    item.trailer,
                    item.country,
                    item.rating,
                    item.requireAge,
                    item.duration,
                    item.movieType,
                    item.director,
                    item.cast,
                    item.producer,
                    formatContent(item.content),
                    '<div class="btn-group row">' +
                    '<a href="#" class="btn btn-sm btn-primary" data-id="' + item.id + '">Sửa</a>' +
                    '<a href="#" class="btn btn-sm btn-danger" data-id="' + item.id + '">Xóa</a>' +
                    '<a href="#" class="btn btn-sm btn-info" data-id="' + item.id + '">Xem</a>' +
                    "</div>",
                ])
                .draw();
        });
    })
})

$(document).on('click', '.btn-success', function() {
    document.location= `movie-add.html`;
})

//Edit the text format to shorten the content to 50 characters
function formatContent(content) {
    // var content = document.getElementsByClassName("content");
    // for (let index = 0; index < content.length; index++) {
    //     if (content[index].textContent.length > 50) {
    //         content[index].textContent = content[index].textContent.substring(0, 50) + "...";
    //     }
    // }
    if (content.length >50) {
        content = content.substring(0,50) + "...";
    }
    return content;
}

//Change format date between yyyy-mm-dd and dd-mm-yyyy
function formattedDate(d) {
    var initial = String(d).split('-');
    return [initial[2], initial[1], initial[0],].join('-');
}