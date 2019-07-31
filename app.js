// Using jQuery to say  that the .ready() event occurs when the DOM has been loaded. the ready method specifies the function to run after the document is loaded.
$(document).ready(function() {

    // We are creating an array with a list of animals and setting it to a variable and giving it a value called animals.
    var animals = [
      "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
      "bird", "ferret", "turtle", "sugar glider", "chinchilla",
      "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
      "capybara", "teacup pig", "serval", "salamander", "frog"
    ];
  
    // creating a function 
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      // Creating a for loop that will go through the array one index at a time
      for (var i = 0; i < arrayToUse.length; i++) {
        // We then create a button using jQuery and set it equal to a variable named a.
        var a = $("<button>");
        // the following utilizes the addClass method to add one or more class names to the selected element once the user creates new content
        a.addClass(classToAdd);
        // this adds the attribute method to set the data-type attribute into the arrayToUse array that goes hand-in-hand with the new content created by the user.
        a.attr("data-type", arrayToUse[i]);
        // this sets the text method so that the user can write into the button to create new content for the array.
        a.text(arrayToUse[i]);
        // The following makes sure to grab the value of all of the above mentioned methods that are set to the variable a and it appends it to the areaToAddTo section of the document.
        $(areaToAddTo).append(a);
      }
  
    }
  
    // The is the creation of the onclick event listener that  will execute a function on the document when the 
  
    $(document).on("click", ".animal-button", function() {
      // Using jQuery and the empty method to remove the content from the div with  the id of animals (where the gifs are added)
      $("#animals").empty();
      // using jQuery and the removeClass method to remove the 
  
      $(".animal-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      // going to the  giphy api and asking it to retrieve 10 gifs from the api.
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  
      // We're executing an AJAX request to retrieve the above  information (queryURL) and we're asking it to go to the specific URL and retrievving the info usingg the GET method.
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      
      // using  the .then from the promise library where it is waiting for the completion or failure of the ajax operation to then run a callback function.
        .then(function(response) {
          //  We then save the data from the callback in a variable called results
          var results = response.data;
  
          // We run  a for loop again to make sure to go through the aray of the results again
          for (var i = 0; i < results.length; i++) {
            // so  that  we  can then create a new div class for  the new result that came back from the API and save it to a new variable called animalDiv
            var animalDiv = $("<div class=\"animal-item\">");
            // We then save the results that include the rating from the object in the API and save it to a variable called rating, but we make sure that we are adding it on to the results variable for new content.
            var rating = results[i].rating;
            // We use jQuery to create a new paragraph tag and write into the paragragh by including  our text 'Rating' and the API result of rating.
            var p = $("<p>").text("Rating: " + rating);
  
            // Creating a new variable called animated and set it equal to the results that we get from the giphy API. We are making sure that we add the response into the original array.
            var animated = results[i].images.fixed_height.url;
            // Creating a new variable called still and set it equal to the results that we get from the giphy API. We are making sure that we add the response into the original array and that we indicate that it's taking the stills from the gifs.
            var still = results[i].images.fixed_height_still.url;
  
            // We are dynamically creating an image tag using jQuery and setting it equal to a variable named animalImage so that it can store several other values once the image is populated on the document.
            var animalImage = $("<img>");
             // using jQuery and the attribute method to set a key value pair. It is making sure that the still variable is set something we are calling src.
            animalImage.attr("src", still);
             // using jQuery and the attribute method to set a key value pair. It is making sure that the still variable is also being set to something we are calling data-still.
            animalImage.attr("data-still", still);
             // using jQuery and the attribute method to set a kay value pair for the animated variable created above. We are setting it equal to something called data-animate.
            animalImage.attr("data-animate", animated);
             // using jQuery and the attribute method to set both data-state and still for the animalImage variable created above.
            animalImage.attr("data-state", "still");
             // using jQuery and the addClass method to set a class called animal-image to the animalImage variable that was created above.
            animalImage.addClass("animal-image");
  
            // this is making sure that we are able to append the paragraph that we created to capture the ratings and have it set to the section called animalDiv.
            animalDiv.append(p);
            // this is making sure that we are able to append all of the information we just created for the animalImage variable and have it show up under the section called animalDiv.
            animalDiv.append(animalImage);
  
            // We are finally adding all the information now held in the animalDiv variable and appending it to the div on the document that has an id of animals so that we can make sure that it renders in a specific location.
            $("#animals").append(animalDiv);
          }
        });
    });
  
    // dynamically creating on onclick event listener that will run a function whenever a new item is added to the animal-image.
    $(document).on("click", ".animal-image", function() {
  
      // The above function will consist of setting 'data state' to the new animal image rendered on the page and then setting that equal to the new variable called state. This is in reference to the animal image.
      var state = $(this).attr("data-state");
  
      // Create an if statement that will consider the state of the image when in the state of still.
      if (state === "still") {
        // if the image is in state of still, set the attribute method so that data-animate is linked to the image source. 
        $(this).attr("src", $(this).attr("data-animate"));
        // use the this method to change the data state of the image to animate so that it starts moving.
        $(this).attr("data-state", "animate");
      }
      // otherwise, set the attribute method so that the data-still in linked to the image source again. 
      else {
        $(this).attr("src", $(this).attr("data-still"));
        // use of this method to changee the data-state of the image to change to still so that it doesnt move.
        $(this).attr("data-state", "still");
      }
    });
  
    // creation of another onclick event listener that will be linked to the submit button
    $("#add-animal").on("click", function(event) {
      // make sure that the page does not refresh 
      event.preventDefault();
      // using the eq() method to return an element with a specific index number, we create a new variable that is set equal to the returned value of the first index in input.
      var newAnimal = $("input").eq(0).val();
  
      // if statement that will make sure to read through the new giphy api array. Checks to see if in reading the first two gifs of whatever new animal is chosen that they new information get selected in pairs.
      if (newAnimal.length > 2) {
        // we then push those valules and add them on to the section in our document with the id of animals so that they render on the page.
        animals.push(newAnimal);
      }
  
      // set the value of of the new animal-button created to the animals array and have it create a new button in the buttons section of the document.
      populateButtons(animals, "animal-button", "#animal-buttons");
  
    });
  
    // return that same value about so that the buttons populates in the appropriate section of the document.
    populateButtons(animals, "animal-button", "#animal-buttons");
  });
  