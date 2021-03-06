$( document ).ready(function() {
    //Initial Ajax to retrieve all data
    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        dataType:"json",
        success: function(data){
            $.each(data, function( index, value ) {
                ascendingSort(value);
            });
            $.each(array, function(index, value){
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

    $("#noDataRow").hide();

    let $sR = $(".form-select");
    $.each($(".heading"), function(index){
        if(index == 0){
            $sR.append($("<option></option>").attr({"value":0}).text("--Select filerting option--"));
        }
        
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

var array = [];
function ascendingSort(data){
    array.push(data);
    array.sort(function (a, b){
        if (a.name.official > b.name.official) {
            return 1;
          }
          if (a.name.official < b.name.official) {
            return -1;
          }
          return 0;
    });
}

$("#filter").on('input', function(){
    
    if($("#filter").val().length > 2){
        if($("#col-sel").val() == 0){
            searchAll();
        }else{
            searchBy($("#col-sel").val());
        }
        
    }else{
        showAll();
    }
    
});

function searchBy(column){
    let option;
    switch (column){
        case "Oficial Name":
            option = 0;
            break;
        case "Capital":
            option = 1;
            break;
        case "Region":
            option = 2;
            break;
        case "Language":
            option = 3;
            break;
        case "Population":
            option = 4;
            break;
    }
    var input, filter, table, i;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbl-countries");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var j;
        var rowContainsFilter = false;
        for (j = 0; j < cells.length; j++) {
            if (cells[option]) {
                if (cells[option].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    rowContainsFilter = true;
                    continue;
                }
            }
        }
  
        if (! rowContainsFilter) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
        }

        if(allHidden()){
            $("#noDataRow").show();
        }else{
            $("#noDataRow").hide();
        }
    }
}

function searchAll() {
    var input, filter, table, i;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbl-countries");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var j;
        var rowContainsFilter = false;
        for (j = 0; j < cells.length; j++) {
            if (cells[j]) {
                if (cells[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    rowContainsFilter = true;
                    continue;
                }
            }
        }
        if (! rowContainsFilter) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
        }
    }
    if(allHidden()){
        $("#noDataRow").show();
    }else{
        $("#noDataRow").hide();
    }
}

function showAll() {
    var table, i;
    table = document.getElementById("tbl-countries");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        rows[i].style.display = "";
    }
    $("#noDataRow").hide();
    
}

function allHidden(){
    var table, i;
    table = document.getElementById("tbl-countries");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        if(rows[i].style.display == ""){
            return false;
        }
    }
    return true;
}