$(function(){

})

var randomPeople = ["Hakeem Olajuwon", "Rock Hudson", "Marina Abramovic", "Kenneth Anger", "Sid Vicious", "Yayoi Kusama", "Ziggy Stardust", "Stan Brakhage", "DMX", "Manute Bol", "Andrezj Zulawski", "GG Allin", "Rasheed Wallace", "Klaus Kinski", "Busta Rhymes", "Richard Nixon", "Ric Flair", "John Carradine", "Lon Chaney Jr.", "Edward G. Robinson", "Guy Fieri", "Billy Bob Thornton", "Karl Marx", "Gilbert Gottfried", "Agnes Varda", "Udo Kier", "Larry Johnson", "Rico Suave"];


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

})

$(document).on("click", ".person", function() {
    var type = $(this).data("name");
    console.log(type)
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=xCcrRbcoALUlRySaKH6td4TAqg02ltSd&limit=10"; $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='returned-image'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var personImage = $("<img>");
        personImage.attr("src", still);
        personImage.attr("data-still", still);
        personImage.attr("data-animated", animated);
        personImage.attr("data-state", "still")
        personImage.addClass("searchImage");
        gifDiv.append(p);
        gifDiv.append(personImage)
        $("#image-area").prepend(gifDiv)
    }
});

$(document).on("click", ".searchImage", function() {
    var state = $(this).attr("data-state");
    if(state == "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
    

})



});

renderButtons();
