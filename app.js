// My personal GIPHY API key
var apiKey = 'irKsuYqDdx0NOhuarY8zv12EF5Jp48jk';

// array of search topics, dynamically appended
var topics = ['burgers', 'pastrami', 'hoagie'];

// add a button with a search term to the DOM
function addButton (searchTerm) {
    var newButton = $('<button>').attr({'data-name': searchTerm, 'class': 'term-select'}).text(searchTerm);
    $('#buttonsHere').append(newButton);
}

// display all buttons whose labels are listed in an array
function displayButtons(topics) {
    $('#buttonsHere').html('');
    for (i=0; i < topics.length; i++) {
        var searchTerm = topics[i];
        addButton(searchTerm);
    }
}

// take an array of GIPHY image data and display the images in browser.

function displayImages(data) {
    // clear image container of previous images

    l = data.length;
    for (var i = 0; i < l; i++) {
        var url = data[i].images.fixed_height.url;
        var url_still = data[i].images.fixed_height_still.url;
        var image = $('<img>').attr({
            'src': url_still,
            'data-state': 'still',
            'data-still': url_still,
            'data-animated': url
        });
        $('#imagesHere').append(image);
    }
}

function retrieveData(searchTerm) {
    console.log(searchTerm);
    $('#imagesHere').html('');
    var queryURL = "https://api.giphy.com/v1/gifs/search?apikey=" + apiKey + "&q=" + searchTerm + "&limit=10&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var data = response.data;
        displayImages(data);
    });
}

function toggleImage(img) {
    if (img.attr('data-state') == 'still') {
        img.attr('src', img.attr('data-animated')).attr('data-state', 'animated');
    } else {
        img.attr('src', img.attr('data-still')).attr('data-state', 'still');
    }
}

$('body').on('click', 'img', function () {
    toggleImage($(this));
});

$('body').on('click', '.term-select', function () {
    var searchTerm = $(this).attr('data-name');
    retrieveData(searchTerm);
});

$('body').on('click', '#buttonSubmit', function () {
    var searchTerm = $('#addTerm').val().trim();
    topics.push(searchTerm);
    displayButtons(topics);
});

displayButtons(topics);