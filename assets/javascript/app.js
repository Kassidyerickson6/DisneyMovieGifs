// Array containing the different Disney movies
var topics = ["Cinderella", "Beauty and the Beast", "The Little Mermaid", "Mulan", "Brave", "Alladin", "Tangled", "Toy Story", "Dumbo", "Peter Pan", "Alice in Wonderland", "Lion King"];
// variable for buttons
var button;
// user's input for additional disney movies
var userInput = "";

// function to create new buttons from the topics array
var buttonGenerator = function (){
    // the previous div elements are emptied 
     $("#disneyButtons").empty();
    // loops through the array and creates buttons
    for(i = 0; i < topics.length; i++) {
        button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data",topics[i]);
        $("#disneyButtons").append(button);
    };
}

$("#disneyButtons").on("click", ".btn", function(){
        var movie = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";



        $.ajax({
            url: queryURL,
            method: "GET" 

        })

        .done(function(response){

            console.log(response);
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                // a div is created to hold a gif of any topic
                var gifDiv = $("<div class ='item'>");

                // stores the results
                var rating= results[i].rating;
                
                // Under every gif, display its rating (PG, G, so on).
                var p = $("<p>").text("Rating: " + rating);

                var movieImage = $("<img>");


                // add a CSS style to create colored borders around the gifs
               // var topicImage = $("<img>").addClass("orangeBorder");

                // add states of animate and still which will be toggled 
                movieImage.attr("src", results[i].images.fixed_height_still.url);
                
				gifDiv.prepend(p);
				gifDiv.prepend(movieImage);            
                // new images will be placed at the beginning (top) of the containing gif area
                $("#gifs-appear-here").prepend(gifDiv);
            }
        })
  })


// When the user clicks one of the still GIPHY images, and it animates. When the user clicks the gif again, it stops playing.
$("#gifs-appear-here").on("click", ".gif", function(event){
    event.preventDefault();
    
    // gets the current state of the clicked gif 
    var state = $(this).attr("data-state");
    
    // according to the current state gifs toggle between animate and still 
    if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})
   

// The form takes the value from the input box and adds it into the topics  array. The buttonGenerator function is called that takes each topic in the array remakes the buttons on the page.


$(".submit").on("click", function(event){
    event.preventDefault();

    console.log("submit");
    // sets inputted value to newTopic 
    userInput = $("#disney-input").val();
    // new topic is added to the topics array 
    topics.push(userInput);
    console.log(topics);
    // call the function that creates the new button
    buttonGenerator();
});



buttonGenerator();
