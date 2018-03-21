var shows = ["The Office", "Parks and Rec", "Adventure Time", "Twin Peaks", "Stranger Things"];

//----------------------------  add buttons to page

function makeButtons() {
$("#buttonSection").empty();
for (var i = 0; i < shows.length; i++) {
    var newBtn = $("<button>");
    newBtn.addClass("show");
    newBtn.attr("data-name", shows[i]);
    newBtn.text(shows[i]);
    $("#buttonSection").append(newBtn);
}
}

$("#addShow").on("click", function(event) {
    event.preventDefault();
    var newShow = $("#show-input").val().trim();
    $("#show-input").val("")
    shows.push(newShow);
    makeButtons();
});

makeButtons();

//____________________________ request from giphy api

$("#buttonSection").on("click", ".show", function() {
    $("#gifs-go-here").empty();
    var searchedShow = $(this).attr("data-name")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchedShow + "&api_key=53rTNycyKtaDMuqIM8lZWUhSn4bbBSXi&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response)
        var results = response.data

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>").addClass("gif-holder")
            var rating = $("<p>")

            rating.text(results[i].rating)

            var gifImage = $("<img>").addClass("gif")
            gifImage.attr("data-animated", results[i].images.fixed_height.url)
            gifImage.attr("data-still", results[i].images.fixed_height_still.url)

            gifImage.attr("src", results[i].images.fixed_height_still.url)

            gifDiv.append(rating, gifImage)

            $("#gifs-go-here").append(gifImage)
        }

    });
});


$("#gifs-go-here").on('click', '.gif', function(){

var animatedURL = $(this).attr("data-animated")
var stillURL = $(this).attr("data-still")
var currentURL = $(this).attr("src")

if (currentURL === stillURL){
    $(this).attr("src", animatedURL)
} else if (currentURL === animatedURL){
    $(this).attr("src", stillURL)
}

});