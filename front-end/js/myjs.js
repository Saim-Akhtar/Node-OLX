
// Image gallary

  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });

  // Tabs

  $(document).ready(function(){
    $('.tabs').tabs();
  });
 
 // Modal Trigger

 $(document).ready(function(){
  $('.modal').modal();
});
       

// adding and removing card class 

$(document).ready(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww < 780) {
      $('#my-card').removeClass('horizontal');
    } else if (ww >= 780) {
      $('#my-card').addClass('horizontal');
    };
  };
  $(window).resize(function(){
    alterClass();
  });
  alterClass();
});


// My way of doing it 
