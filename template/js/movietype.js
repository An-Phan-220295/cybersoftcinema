

  $(document).ready(function () {

    $.ajax({
    
        method: "GET",
        url: "http://localhost:8080/cinema/movietype"
    }).done(function(data){
        
        var ul = document.getElementById("list-movietype");
        let htmlData = data.data;
    })

    $(document).on("click", ".list-movietype", function () {
        var movietypeId = $(this).attr("value");
    })

    $("#tab-cinema-movietype").on('click','.btn-cinema-movietype',function(){
        var id = $(this).attr('custom-id')
        alert(id)
    })
  })
  