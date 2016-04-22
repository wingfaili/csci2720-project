$(document).ready(function(){

  $.ajax({
        url: "/checkorder",
        type: 'GET',
        success: function(result){
          if (result==="1"){
            alert("Your Order Quota is Ful.");
            window.location.href = "/o_view";
          }
        }

  });

});
