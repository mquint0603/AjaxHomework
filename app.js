var shows = ["The Office", "Parks and Rec", "Adventure Time", "Twin Peaks", "Stranger Things"];
var numberShown;
var queryURL;
var searchedShow;
var startingIndex;
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
$("#showMore").hide()
$("#showPrevious").hide()



function showGifs(startingi){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var results = response.data  
        for (var i = startingi; i < results.length; i++) {
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
}


$("#buttonSection").on("click", ".show", function() {
    $("#gifs-go-here").empty();
    searchedShow = $(this).attr("data-name")
    startingIndex = 0;
    numberShown = 20
    $("#showMore").show()
    $("#showPrevious").show()
    $("#showMore").attr("data-name", searchedShow)
    $("#showPrevious").attr("data-name", searchedShow)
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchedShow + "&api_key=53rTNycyKtaDMuqIM8lZWUhSn4bbBSXi&limit=" + numberShown
    showGifs(0)
});

//------------------------- toggle animation

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



$("#showMore").on("click", function(){

    numberShown += 20;
    startingIndex += 20;

    $("#gifs-go-here").empty();
    searchedShow = $(this).attr("data-name")
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchedShow + "&api_key=53rTNycyKtaDMuqIM8lZWUhSn4bbBSXi&limit=" + numberShown
    
    showGifs(startingIndex)

})

$("#showPrevious").on("click", function(){

    numberShown -= 20;
    startingIndex -= 20;

    $("#gifs-go-here").empty();
    searchedShow = $(this).attr("data-name")
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchedShow + "&api_key=53rTNycyKtaDMuqIM8lZWUhSn4bbBSXi&limit=" + numberShown
    
    showGifs(startingIndex)

})