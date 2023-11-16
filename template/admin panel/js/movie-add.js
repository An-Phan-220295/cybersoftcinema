$(document).ready(function() {
    //Call API to get all movie type
    $.ajax({
        method: 'get',
        url: 'http://localhost:8080/movie/type',
    }).done(function(result){
        var htmlData = result.data;
        var htmlAdd =``;
        htmlData.forEach(item => {
            htmlAdd +=`
                <option data-id="${item.id}">${item.name}</option>
            `;
        });
        document.getElementById('movieType').innerHTML = htmlAdd;
    })

    //Call API to get all person
})