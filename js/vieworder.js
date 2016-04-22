$(document).ready(function(){

  $.ajax({
  	method: "GET",
  	url: "/checkorder",
  	success: function(result){
      console.log(result);
      if(result=="1"){
        $("#o_id").html("<div>Order<a href='/o_delete' class='secondary-content view_delete'><i class='material-icons'>delete</i></a> <a href='/o_edit' class='secondary-content'><i class='material-icons'>view_headline</i></a></div>");
      }
      if(result=="0"){
        $("#o_id").html("<div><p>Start Your New Order On Menu Bar</p></div>");
      }
    }
  });

});
