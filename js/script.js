$(document).ready(function(){

  $(".button-collapse").sideNav();

$.ajax({
      url: "/session",
      type: 'GET',
      success: function(data){
        console.log(data);
        if(data !== "0"){
		//var user = $("#name").val(data);

		$("#username").val(data.username);
    $("#logo").html('<form method="POST" action="/login" name="getlogin"><input type="hidden" name="username" value=' + data.username + '>' + '<input type="hidden" name="password" value=' + data.password + '>' + '<a href="javascript:document.getlogin.submit()" class="brand-logo" id="brand-logo">CSCI 2720 Project</a></form>');
    /*$("#logo_sandwich").html('<a href="/sandwich" class="brand-logo" id="brand-logo">CSCI 2720 Project</a>');
    $("#logo_s_edit").html('<a href="/s_edit" class="brand-logo" id="brand-logo">CSCI 2720 Project</a>');
    $("#logo_s_start").html('<a href="/s_start" class="brand-logo" id="brand-logo">CSCI 2720 Project</a>');
    $("#logo_s_view").html('<a href="/s_view" class="brand-logo" id="brand-logo">CSCI 2720 Project</a>');
    $("#logo_o_edit").html('<a href="/s_view" class="brand-logo" id="brand-logo">CSCI 2720 Project</a>');
    $("#logo_o_start").html('<a href="/s_view" class="brand-logo" id="brand-logo">CSCI 2720 Project</a>');
    $("#logo_o_view").html('<a href="/s_view" class="brand-logo" id="brand-logo">CSCI 2720 Project</a>');
    $("#logo_order").html('<a href="/s_view" class="brand-logo" id="brand-logo">CSCI 2720 Project</a>');*/
        }
        //else{
         // $("#fieldset").css("display", "block");

      }
    });





  $(".view_delete").click(function(){
    alert("delete action");
  });






});
