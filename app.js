// My personal GIPHY API key
var apiKey = 'irKsuYqDdx0NOhuarY8zv12EF5Jp48jk';

// array of search topics, dynamically appended
var topics = ['physics', 'thermodynamics', 'marine biology'];

// add a button with a search term to the DOM
function addButton (searchTerm) {
    var newButton = $('<button>').attr({'data-name': searchTerm, 'class': 'term-select'}).text(searchTerm);
    $('#buttonsHere').prepend(newButton);
}

// display all buttons whose labels are listed in the 'topics' array
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
    $('#imagesHere').html('');

    l = data.length;
    for (var i = 0; i < l; i++) {
        // urls for animated and still versions of image
        var url = data[i].images.fixed_height.url;
        var url_still = data[i].images.fixed_height_still.url;

        // div containing information relevant to image
        var panel = $('<div>').attr('class', 'gif-panel');

        // image has data for current state (still or animated) and the above urls
        var image = $('<img>').attr({
            'src': url_still,
            'data-state': 'still',
            'data-still': url_still,
            'data-animated': url
        });

        // DOM attachment
        panel.append(image);
        panel.append($('<h4>').text(data[i].rating));

        $('#imagesHere').append(panel);
    }
}

// AJAX call retrieving top 10 results from an input search term
function retrieveData(searchTerm) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?apikey=" + apiKey + "&q=" + searchTerm + "&limit=10&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var data = response.data;
        displayImages(data);
    });
}

// swapping source urls between still and animated states
function toggleImage(img) {
    if (img.attr('data-state') == 'still') {
        img.attr('src', img.attr('data-animated')).attr('data-state', 'animated');
    } else {
        img.attr('src', img.attr('data-still')).attr('data-state', 'still');
    }
}

// when an image is clicked, switch between still and animated states
$('body').on('click', 'img', function () {
    toggleImage($(this));
});

// when a button in the left <div> is clicked, search GIPHY for the corresponding search term
$('body').on('click', '.term-select', function () {
    var searchTerm = $(this).attr('data-name');
    retrieveData(searchTerm);
});

// when the submit button in the right <div> is clicked, add the typed input as a search term
$('body').on('click', '#buttonSubmit', function () {
    var searchTerm = $('#addTerm').val().trim();
    $('#addTerm').val('');
    if (topics.indexOf(searchTerm) == -1 && searchTerm != "") {
        topics.push(searchTerm);
        displayButtons(topics);
        console.log(topics);
    }
});

// display buttons from the original search topics
displayButtons(topics);