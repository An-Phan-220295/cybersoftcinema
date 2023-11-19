$(document).ready(function () {
    //Call API to get all movie
    $.ajax({
        method: 'get',
        url: "http://localhost:8080/admin/movie",
    }).done(function (result) {
        var table = $('#example').DataTable();
        let htmlData = result.data;

        htmlData.forEach((item, index) => {
            table.row
                .add([
                    index + 1,
                    item.movieStatus,
                    `<img style="height:150px; width: 225px; object-fit:fill;" src="` +item.image + `" />`,
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
                    '<a href="#" class="btn btn-sm btn-primary" data-id="' + item.id + '" id="btn-edit">Sửa</a>' +
                    '<a href="#" class="btn btn-sm btn-danger" data-id="' + item.id + '">Xóa</a>' +
                    "</div>",
                ])
                .draw();
        });
    })
})

//Leads to movie-add page when click "Thêm mới" button
$(document).on('click', '#btn-add', function() {
    document.location= `movie-add.html`;
})

//Leads to movie-edit page when click "Sửa" button
$(document).on('click', '#btn-edit', function() {
    var id = $(this).attr('data-id');
    document.location= `movie-edit.html?id=${id}`;
})

//Edit the text format to shorten the content to 50 characters
function formatContent(content) {
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