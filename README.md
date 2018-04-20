# GIPHY-Display
A web app that calls the GIPHY API to display GIF images

The user searches GIPHY by clicking on one of the topic buttons at the top of the page. This triggers an $.ajax call which returns 10 images. The images are displayed with the ability to toggle between still and animated by clicking. The rating of each .gif is displayed as well.

Users are able to add search topics using a search bar at the top of the page. This causes the DOM to be dynamically populated with buttons. The app will prohibit adding the same topic (string) multiple times as well as the empty string.
