$( document ).ready(function() {
    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        dataType:"json",
        success: function(data){
            $.each(data, function( index, value ) {
                ascendingSort(value, index);
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
function ascendingSort(data, total){
    array.push(data);
    array.sort(function (a, b){
        if (a.name.official > b.name.official) {
            return 1;
          }
          if (a.name.official < b.name.official) {
            return -1;
          }
          // a must be equal to b
          return 0;
    });
}

$("#filter").on('input', function(){
    if($("#filter").val().length > 2){
        searchAll();
    }else{
        showAll();
    }
});

function searchAll() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbl-countries");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
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
  }

  function showAll() {
    var table, i;
    table = document.getElementById("tbl-countries");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        rows[i].style.display = "";
    }
  }