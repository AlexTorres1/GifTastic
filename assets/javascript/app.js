$(document).ready(function(){

var topics = ["dog", "falling", "funny", "windy"];

function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        // gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
 displayGifButtons();

 // This function adds the new gif button to the page that a user inputs
 $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#gif-input").val().trim();
    // Adding movie from the textbox to our array
    topics.push(topic);
    // Calling renderButtons which handles the processing of our gif array
    displayGifButtons();
    $("#gif-input").val("");
  });

$(document).on("click", ".btn-primary", function() {
    // Grabbing and storing the data-name property value from the button
    var gif = $(this).attr("data-name");
    // Constructing a queryURL using the gif name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gif + "&api_key=9YI7eHAGWYTfLtk7FGhUIs6JnwRtkZb4&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var gifDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var gifImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          gifImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the gifDiv
          gifDiv.append(p);
          gifDiv.append(gifImage);

          // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

//   $(document).on("click", ".btn btn-primary", gifDisaplyInfo);

});