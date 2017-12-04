// Array containing the different Disney movies
var topics = ["Cinderella", "Beauty and the Beast", "The Little Mermaid", "Mulan", "Alladin", "Tangled", "Toy Story", "Dumbo", "Peter Pan", "Alice in Wonderland", "Lion King"];
// variable for buttons
var button;
// user's input for additional disney movies
var userInput = "";

// function to create new buttons with gifs
var buttonGenerator = function (){
    // empties previous divs 
     $("#disneyButtons").empty();
    // loops through the array then creates newbuttons
    for(i = 0; i < topics.length; i++) {
        button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-info").attr("data",topics[i]);
        $("#disneyButtons").append(button);
    };
}

// This is the on-click function of the button, which will generate still gifs on the page
$("#disneyButtons").on("click", ".btn", function(){
        // this vaiable gathers the data from the button which is clicked
        var movie = $(this).attr("data");
        // this is the URL for giphy.com with the API key attached
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";


        // AJAX call that GETs the data
        $.ajax({
            url: queryURL,
            method: "GET" 

        })

        // when "done", run the response function
        .done(function(response){

            console.log(response);
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                // this div is reated to hold a gif of any topic
                var gifDiv = $("<div class ='item'>");

                // where the results are stored
                var rating= results[i].rating;
                
                // this displays the gifs rating
                var p = $("<p>").text("Rating: " + rating);

                var movieImage = $("<img>");


                // adds states of, which allows the user to make the gif animate or still
                movieImage.attr("src", results[i].images.fixed_height_still.url);
                movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                movieImage.attr("data-animate", results[i].images.fixed_height.url)
                movieImage.attr("data-state", "still")
                movieImage.addClass("gif_state");
                

				gifDiv.prepend(p);
				gifDiv.prepend(movieImage);    

                // places the new gifs onto the page
                $("#gifs-appear-here").prepend(gifDiv);
            }
        })
  })


// on click function that allows the user to change the state of the gifs. (animate vs. still)
$("#gifs-appear-here").on("click", ".gif_state", function(event){
    event.preventDefault();
    
    // checks the current state of the clicked gif 
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
   
// value chosen by the user in the input box, is added to the array. The button generator then makes the new button.
$(".submit").on("click", function(event){
    event.preventDefault();

    console.log("submit");
    // sets inputted value to newTopic 
    userInput = $("#disney-input").val();
    // new disney movie, chosen by the user is added to the topics array 
    topics.push(userInput);
    console.log(topics);
    // call the function that creates the new button
    buttonGenerator();
});


// creates new buttons
buttonGenerator();
