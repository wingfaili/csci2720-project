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
      url: "/editorder",
      datatype: 'jsonp',
      success: function(result){
        console.log(result);
        //console.log(result.name);
        console.log(Object.keys(result));
        //console.log(Object.keys(result));
        //$("#s_view_name").html(result.name);
        for (var i=0; i<Object.keys(result).length;i++){
          var tr = $("#order_table");
          tr.append(
            "<tr>"
              +"<td>"
                +"<p>"
                  +"<input type='checkbox' checked name='o_edit_sandwichType' id='order_" + i + "' value='" + result[i]._id + "'/>"
                  +"<label for='order_" + i + "'></label>"
                +"</p>"
              +"</td>"
              +"<td>"
                +"<label id='o_start_name'>"+ result[i].name + "</label>"
              +"</td>"
              +"<td class='input-field col s1'>"
                +"<input type='number' name='o_start_quantity' id='o_start_quantity' min='0' max='100' step='1' value='0'>"
              +"</td>"
            +"</tr>"

          );
        }
        //$("#s_id").
        // +"<input type='checkbox' name='o_start_sandwichType' value='1'>"
      }

    });

    //$("#:checkbox").prop(check, true);
});
