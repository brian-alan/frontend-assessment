$( document ).ready(function() {
    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        dataType:"json",
        success: function(data){
            console.log(data);
            $.each(data, function( index, value ) {
                let capital;
                if(value.capital == undefined){
                    capital = "No capital to display";
                }else{
                    capital = value.capital;
                }
                let languages = "";

                $.each(value.languages, function( index, value ) {
                    languages += value + ", ";
                });
                if(languages==""){
                    languages = "No language to display";
                }else{
                    languages =  languages.substring(0, languages.length - 2);
                }
                let row = "<tr class='tbl-row' data-country='"+value.name.common+"'><td>"+value.name.official +
                            "</td><td>"+capital+
                            "</td><td>"+value.region+
                            "</td><td>"+languages+
                            "</td><td>"+value.population+
                            "</td><td><img src='"+value.flags.png+"' alt='flag' width='100px' height='50px'/></td></tr>";
                $("table tbody").append(row);
            });
        }
    });

    let $sR = $(".form-select");
    $.each($(".heading"), function(){
        $sR.append($("<option></option>").attr({
            "value": $(this).text()
        }).text($(this).text()));
    });
});

$("tbody").on("click", "tr", function(){
    let url= "https://en.wikipedia.org/api/rest_v1/page/summary/"
    let country = $(this).data("country");
    url = url + country;
    $.ajax({
        url: url,
        dataType:"json",
        success: function(data){
            $(".modal-body").html(data.extract_html);
        }
    }).done(function() {
        $("#modal-data").modal("show");
    });
    
});