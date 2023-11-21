var name = urlParams.get("name");
var id = urlParams.get("id");
var a = window.location.pathname;
var idurl = window.location.search;

$(document).ready(function () {


    $.ajax({
       
        method: "GET",
        url: "http://localhost:8080/cinema/person/${id}"
    }).done(function(data){
       
        var ul = document.getElementById("list-person");
        let htmlData = data.data;
    })
    $(document).on("click", ".list-person", function () {
        var persontypeId = $(this).attr("value");
    })


    $.ajax({
       
        method: "GET",
        url: "http://localhost:8080/cinema/person/${name}"
    }).done(function(data){
       
        var ul = document.getElementById("list-person");
        let htmlData = data.data;
    })
    $(document).on("click", ".list-person", function () {
        var persontypeId = $(this).attr("value");
    })


})