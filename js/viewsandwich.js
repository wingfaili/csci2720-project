$(document).ready(function(){
/*
  var curr_session = "";
  $.ajax({
        url: "/session",
        type: 'GET',
        success: function(data){
          console.log(data);
          if(data !== "0"){
  		      curr_session = data;
          }
        }
      });
*/

$.ajax({
      url: "/view_sandwich",
      datatype: 'jsonp',
      success: function(result){
        console.log(result);
        //console.log(result.name);
        console.log(Object.keys(result));
        //console.log(Object.keys(result));
        //$("#s_view_name").html(result.name);
        for (var i=0; i<Object.keys(result).length;i++){
          var li = $("#s_view_ul").children();
          li.append(
              '<li class="collection-item" style="border: 0px;"><div><form method="get">'
            + '<input type="text" name="sandwich_name" readonly value=\"'
            + result[i].name
            + '\">'
            + '<button type="submit" formaction="/s_delete" class="secondary-content view_delete"><i class="material-icons">delete</i></button>'
            + '<button type="submit" formaction="/s_edit" class="secondary-content"><i class="material-icons">view_headline</i></button></form></div></li>'
          );
        }
        //$("#s_id").
      }

    });



});
