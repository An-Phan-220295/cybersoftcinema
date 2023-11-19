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
            htmlData.forEach(item => {
                console.log(item.name);
                console.log(htmlDataSelected[0].movieType);
                (htmlDataSelected[0].movieType).forEach(itemMovieType => {
                    if (item.name == itemMovieType) {
                        htmlAdd += `
                            <option selected value="${item.id}">${item.name}</option>
                        `;
                    } else {
                        htmlAdd += `
                            <option value="${item.id}">${item.name}</option>
                        `;
                    }
                });
                
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
                htmlAdd += `
                <option value="${item.id}">${item.name}</option>
            `;
            });
            document.getElementById('country').innerHTML = htmlAdd;
        })
    })

})

$(document).on('click', '#btn-return', function () {
    window.location = `movie.html`;
})