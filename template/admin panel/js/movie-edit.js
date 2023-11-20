var idurl = window.location.search;
const urlParams = new URLSearchParams(idurl);
var idGlobal = urlParams.get("id");

$(document).ready(function () {
    $.ajax({
        method: 'get',
        url: `http://localhost:8080/movie?idMovie=${idGlobal}`,
    }).done(function (selected) {
        htmlDataSelected = selected.data;
        //Call API to get all movie status
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/admin/movie/moviestatus',
        }).done(function (result) {
            var htmlData = result.data;
            var htmlAdd = ``;
            htmlData.forEach(item => {
                if (item.name == htmlDataSelected[0].movieStatus) {
                    htmlAdd += `
                        <option selected value="${item.id}">${item.name}</option>
                    `;
                } else {
                    htmlAdd += `
                        <option value="${item.id}">${item.name}</option>
                    `;
                }
            });
            document.getElementById('movieStatus').innerHTML = htmlAdd;
        })
        //Call API to get all movie type
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/admin/movie/type',
        }).done(function (result) {
            var htmlData = result.data;
            var htmlAdd = ``;
            htmlData.forEach((item, index) => {
                // console.log(item.name);
                // console.log(htmlDataSelected[0].movieType);
                // htmlAdd += `
                // <option value="${item.id}">${item.name}</option>
                // `;
                console.log(item.name);
                for (let index = 0; index < htmlDataSelected[0].movieType.length; index++) {
                    console.log(item.name);
                    if (item.name == htmlDataSelected[0].movieType[index]) {
                        
                        console.log(htmlDataSelected[0].movieType[index]);
                        htmlAdd += `
                            <option selected value="${item.id}">${item.name}</option>
                        `;
                        break;
                    } else {
                        htmlAdd += `
                            <option value="${item.id}">${item.name}</option>
                        `;
                        
                    }  
                }
                // (htmlDataSelected[0].movieType).forEach(itemMovieType => {
                //     if (item.name == itemMovieType) {
                //         htmlAdd += `
                //             <option selected value="${item.id}">${item.name}</option>
                //         `;
                //         break;
                //     } else {
                //         htmlAdd += `
                //             <option value="${item.id}">${item.name}</option>
                //         `;
                //     }
                // });
                
            });
            document.getElementById('movieType').innerHTML = htmlAdd;
        })
        //Call API to get all person
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/admin/movie/person',
        }).done(function (result) {
            var htmlData = result.data;
            var htmlActorAdd = ``;
            var htmlDirectorAdd = ``;
            htmlData.forEach(item => {
                if (item.personType == null) {
                    htmlActorAdd += `
                <option value="${item.id}">${item.name}</option>;
                `;
                    htmlDirectorAdd += `
                <option value="${item.id}">${item.name}</option>;
                `;
                }
                if (item.personType === "Actor") {
                    htmlActorAdd += `
                <option value="${item.id}">${item.name}</option>;
                `;
                }
                if (item.personType === "Director") {
                    htmlDirectorAdd += `
                <option value="${item.id}">${item.name}</option>;
                `;
                }
            });
            document.getElementById('actor').innerHTML = htmlActorAdd;
            document.getElementById('director').innerHTML = htmlDirectorAdd;
        })
        //Call API to get all producer
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/admin/movie/producer',
        }).done(function (result) {
            var htmlData = result.data;
            var htmlAdd = ``;
            htmlData.forEach(item => {
                htmlAdd += `
                <option value="${item.id}">${item.name}</option>
            `;
            });
            document.getElementById('producer').innerHTML = htmlAdd;
        })
        //Call API to get all country
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/admin/movie/country',
        }).done(function (result) {
            var htmlData = result.data;
            var htmlAdd = ``;
            htmlData.forEach(item => {
                if (item.name == htmlDataSelected[0].country) {
                    htmlAdd += `
                        <option selected value="${item.id}">${item.name}</option>
                    `;
                } else {
                    htmlAdd += `
                        <option value="${item.id}">${item.name}</option>
                    `;
                }     
            });
            document.getElementById('country').innerHTML = htmlAdd;
        })
            
        document.getElementById('releaseDate').value = htmlDataSelected[0].releaseDate;
        document.getElementById('content').value = htmlDataSelected[0].content;
        document.getElementById('trailer').value = htmlDataSelected[0].trailer;
    })

})

$('#movieAddForm').submit(function () {
    if (confirm("Do you really want to update this movie?") == true) {
        var image = document.getElementById('image');
        var file = image.files;
        var formData = new FormData();

        //Get all selected option in multiple selection
        var movieType = document.getElementById('movieType');
        var director = document.getElementById('director');
        var actor = document.getElementById('actor');
        var producer = document.getElementById('producer');
        var selectedMovieType = [];
        var selectedPerson = [];
        var selectedProducer = [];
        for (var option of movieType.options) {
            if (option.selected) {
                selectedMovieType.push(option.value);
            }
        }
        for (var option of director.options) {
            if (option.selected) {
                selectedPerson.push(option.value);
            }
        }
        for (var option of actor.options) {
            if (option.selected) {
                selectedPerson.push(option.value);
            }
        }
        for (var option of producer.options) {
            if (option.selected) {
                selectedProducer.push(option.value);
            }
        }
        formData.append("id", idGlobal);
        formData.append("idStatus", document.getElementById('movieStatus').value);
        formData.append("image", file[0]);
        formData.append("name", document.getElementById('movieName').value);
        formData.append("rating", document.getElementById('rating').value);
        formData.append("requireAge", document.getElementById('requireAge').value);
        formData.append("duration", document.getElementById('duration').value);
        formData.append("idMovieType", selectedMovieType);
        formData.append("idPerson", selectedPerson);
        formData.append("idProducer", selectedProducer);
        formData.append("idCountry", document.getElementById('country').value);
        formData.append("releaseDate", document.getElementById('releaseDate').value);
        formData.append("content", document.getElementById('content').value);
        formData.append("trailer", document.getElementById('trailer').value);

        $.ajax({
            method: 'put',
            url: 'http://localhost:8080/admin/movie/edit',
            data: formData,
            processData: false,
            contentType: false
        }).done(function (result) {
            if (result.data) {
                alert("Movie Updated");
            } else {
                alert("Movie Update Failed");
            }
        })
    }
    return false;
})

$(document).on('click', '#btn-return', function () {
    window.location = `movie.html`;
})