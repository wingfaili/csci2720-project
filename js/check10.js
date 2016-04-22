$(document).ready(function(){

  $.ajax({
        url: "/check10",
        type: 'GET',
        success: function(result){
          if (result==="full"){
            alert("Your Sandwich Quota is Full.");
            window.location.href = "/s_view";
          }
        }

  });

});
