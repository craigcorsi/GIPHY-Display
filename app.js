// My personal GIPHY API key
var apiKey = 'irKsuYqDdx0NOhuarY8zv12EF5Jp48jk';

// Function to take an array of GIPHY image data and display the images in browser.

function parseImages(data) {
    // clear image container of previous images

    console.log(data);

    l = data.length;
    for (var i=0; i < l; i++) {
        var url = data[i].images.fixed_height.url;
        var url_still = data[i].images.fixed_height_still.url;
        var image = $('<img>').attr({
            'src': url_still,
            'data-state': 'still',
            'data-still': url_still,
            'data-animated': url
        });
        $('#imagesHere').append(image);
        console.log(image);
    }
    
}




// search term string obtained from user input
var searchTerm = "burgers";
var queryURL = "https://api.giphy.com/v1/gifs/search?apikey=" + apiKey + "&q=" + searchTerm + "&limit=10&lang=en";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    var data = response.data;
    parseImages(data);
});



//   // Get reference to existing tbody element, create a new table row element
//   var tBody = $("tbody");
//   var tRow = $("<tr>");

//   // Methods run on jQuery selectors return the selector they we run on
//   // This is why we can create and save a reference to a td in the same statement we update its text
//   var titleTd = $("<td>").text(response.Title);
//   var yearTd = $("<td>").text(response.Year);
//   var actorsTd = $("<td>").text(response.Actors);
//   // Append the newly created table data to the table row
//   tRow.append(titleTd, yearTd, actorsTd);
//   // Append the table row to the table body
//   tBody.append(tRow);