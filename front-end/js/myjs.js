// Image gallary

$('.carousel.carousel-slider').carousel({
    fullWidth: true
});

// Tabs

$(document).ready(function() {
    $('.tabs').tabs();
});

// Modal Trigger

$(document).ready(function() {
    $('.modal').modal();
});

// formSelect 
$(document).ready(function() {
    $('select').formSelect();
});


// side navbar
$(document).ready(function() {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({
        hover: true,
        coverTrigger: false

    });

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
    $(window).resize(function() {
        alterClass();
    });
    alterClass();
});



// Coded by Saim Node

const toggleSearchBar = () => {

    const searchBar = document.getElementById('searchBar')
    const logoDiv = document.getElementById('logoDiv')
    logoDiv.classList.toggle('hide-on-med-and-down')
    searchBar.classList.toggle('hide-on-med-and-down')
    searchBar.classList.toggle('s10')

}



// My way of doing it