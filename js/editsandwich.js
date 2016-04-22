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
      url: "/edit_sandwich",
      datatype: 'jsonp',
      success: function(result){
        console.log(result);
        console.log(result[0].meat);
        console.log(typeof(result[0].meat));
        console.log(result[0].meat.length);
        console.log(result[0].meat.slice(0,3));
        //console.log(Object.keys(result));
        //console.log(Object.keys(result));
        //$("#s_view_name").html(result.name);
        /*
        for (var i=0; i<Object.keys(result).length;i++){
          var li = $("#s_view_ul").children();
          li.append(
              '<li class="collection-item" style="border: 0px;"><div><form method="get">'
            + '<input type="text" name="sandwich_name" readonly value=\"'
            + result[0].name
            + '\">'
            + '<button type="submit" formaction="/s_delete" class="secondary-content view_delete"><i class="material-icons">delete</i></button>'
            + '<button type="submit" formaction="/s_edit" class="secondary-content"><i class="material-icons">view_headline</i></button></form>	</div></li>'
          );
        }*/
        //$("#content").html('<p>'+result.name+'</p>');
        //$("#s_id").
        $("#s_start_name").val(result[0].name);
        //for breadtype
        if(result[0].breadtype=="b_1")
        $("#content").find(':radio[name=bread][value="b_1"]').prop('checked',true);

        else if(result[0].breadtype=="b_2")
        $("#content").find(':radio[name=bread][value="b_2"]').prop('checked',true);

        else if(result[0].breadtype=="b_3")
        $("#content").find(':radio[name=bread][value="b_3"]').prop('checked',true);

        else if(result[0].breadtype=="b_4")
        $("#content").find(':radio[name=bread][value="b_4"]').prop('checked',true);

        //for size
        if(result[0].size=="s_1")
        $("#content").find(':radio[name=size][value="s_1"]').prop('checked',true);

        else if(result[0].size=="s_2")
        $("#content").find(':radio[name=size][value="s_2"]').prop('checked',true);

        //for vegetable
        for (var i=0; i<23;i++){
          for (var j=0; j<23;j++){
        if(result[0].vegetable.slice(i,j)=="c_1")
        $("#content").find(':checkbox[name=vegetable][value="c_1"]').prop('checked',true);

        else if(result[0].vegetable.slice(i,j)=="c_2")
        $("#content").find(':checkbox[name=vegetable][value="c_2"]').prop('checked',true);

        else if(result[0].vegetable.slice(i,j)=="c_3")
        $("#content").find(':checkbox[name=vegetable][value="c_3"]').prop('checked',true);

        else if(result[0].vegetable.slice(i,j)=="c_4")
        $("#content").find(':checkbox[name=vegetable][value="c_4"]').prop('checked',true);

        else if(result[0].vegetable.slice(i,j)=="c_5")
        $("#content").find(':checkbox[name=vegetable][value="c_5"]').prop('checked',true);

        else if(result[0].vegetable.slice(i,j)=="c_6")
        $("#content").find(':checkbox[name=vegetable][value="c_6"]').prop('checked',true);
      }
    }
        //for meat
        for (var i=0; i<19; i++){
          for(var j=0; j<19; j++){
        if(result[0].meat.slice(i,j)=="m_1")
        $("#content").find(':checkbox[name=meat][value="m_1"]').prop('checked',true);

        else if(result[0].meat.slice(i,j)=="m_2")
        $("#content").find(':checkbox[name=meat][value="m_2"]').prop('checked',true);

        else if(result[0].meat.slice(i,j)=="m_3")
        $("#content").find(':checkbox[name=meat][value="m_3"]').prop('checked',true);

        else if(result[0].meat.slice(i,j)=="m_4")
        $("#content").find(':checkbox[name=meat][value="m_4"]').prop('checked',true);

        else if(result[0].meat.slice(i,j)=="m_5")
        $("#content").find(':checkbox[name=meat][value="m_5"]').prop('checked',true);
      }
    }
        //for cheese
        for (var i=0; i<19; i++){
          for(var j=0; j<19; j++){
        if(result[0].cheese.slice(i,j)=="ch_1")
        $("#content").find(':checkbox[name=cheese][value="ch_1"]').prop('checked',true);

        else if(result[0].cheese.slice(i,j)=="ch_2")
        $("#content").find(':checkbox[name=cheese][value="ch_2"]').prop('checked',true);

        else if(result[0].cheese.slice(i,j)=="ch_3")
        $("#content").find(':checkbox[name=cheese][value="ch_3"]').prop('checked',true);

        else if(result[0].cheese.slice(i,j)=="ch_4")
        $("#content").find(':checkbox[name=cheese][value="ch_4"]').prop('checked',true);
      }
    }
        //for source
        if(result[0].source=="so_1")
        $("#content").find(':radio[name=source][value="so_1"]').prop('checked',true);

        else if(result[0].source=="so_2")
        $("#content").find(':radio[name=source][value="so_2"]').prop('checked',true);

        else if(result[0].source=="so_3")
        $("#content").find(':radio[name=source][value="so_3"]').prop('checked',true);

        else if(result[0].source=="so_4")
        $("#content").find(':radio[name=source][value="so_4"]').prop('checked',true);

        else if(result[0].source=="so_5")
        $("#content").find(':radio[name=source][value="so_5"]').prop('checked',true);

        else if(result[0].source=="so_6")
        $("#content").find(':radio[name=source][value="so_6"]').prop('checked',true);

        $("#s_start_specInstr").val(result[0].comment);


    }
    });



});
