$(document).ready(function() {
    renderButtons();
});
var randomPeople = ["Hakeem Olajuwon", "Rock Hudson", "Marina Abramovic", "Kenneth Anger", "Sid Vicious", "Yayoi Kusama", "Ziggy Stardust", "Stan Brakhage", "DMX", "Manute Bol", "Andrezj Zulawski", "GG Allin", "Rasheed Wallace", "Klaus Kinski", "Busta Rhymes", "Richard Nixon", "Ric Flair", "Peter Lorre", "Lon Chaney Jr.", "Edward G. Robinson", "Guy Fieri", "Karl Marx", "Miles Davis",  "Ernest Borgnine", "Gilbert Gottfried", "Udo Kier", "Chantal Akerman", "Cam'Ron", "Garrincha", "Bruce Nauman", "MF Doom"];

function renderButtons() {
    $("#buttons-display").empty();

    for (var i = 0; i < randomPeople.length; i++) {
        var buttonMaker = $("<button>");
        buttonMaker.addClass("person");
        buttonMaker.attr("data-name", randomPeople[i]);
        buttonMaker.text(randomPeople[i]);
        $("#buttons-display").append(buttonMaker);
    }
}

$("#add-image").on("click", function(event) {
    event.preventDefault();
    var searchResult = $("#search-input").val().trim();
    randomPeople.push(searchResult);
    console.log(searchResult);
    renderButtons();
});

$(document).on("click", ".person", function () {
    var images = ["tv.jpg", "1.jpg", "6.jpg", "fuzz.png", "tv-fuzz.jpg", "bars.png", "8.jpg", "9.jpg", "10.jpg", "3.jpg", "11.jpg", "12.gif", "13.gif", "14.gif", "15.jpg", "16.gif", "17.gif", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg"];
    $("#image-area").css({"background-image": "url(assets/images/" + images[Math.floor(Math.random() * images.length)] + ")"});
   });

$(document).on("click", ".person", function() {
    var type = $(this).data("name");
    console.log(type)
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=xCcrRbcoALUlRySaKH6td4TAqg02ltSd&limit=7"; 
    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='returned-image'>");
        var rating = results[i].rating;
        var p = $("<p id='rating'>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var personImage = $("<img>");
        personImage.attr("src", still);
        personImage.attr("data-still", still);
        personImage.attr("data-animated", animated);
        personImage.attr("data-state", "still");
        console.log(personImage.attr);
        personImage.addClass("search-image");
        gifDiv.append(personImage);
        gifDiv.append(p);
        $("#image-area").prepend(gifDiv);
        }
    });
});

$(document).on("click", ".search-image", function() {

    var state = $(this).attr("data-state");
    console.log(state);
    if(state === "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    } 
});