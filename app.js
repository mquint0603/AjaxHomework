var shows = ["The Office", "Parks and Rec", "Adventure Time", "Twin Peaks", "Stranger Things"];
var numberShown;
var queryURL;
var searchedShow;
var startingIndex;
var results;
var favorites = [];
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
displayFavorites();
$("#showMore").hide()
$("#showPrevious").hide()



function showGifs(startingi){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        results = response.data  
        for (var i = startingi; i < results.length; i++) {
            var gifDiv = $("<div>").addClass("gif-holder")

            // var rating = $("<p>")           
            // rating.text('Rating: ' + results[i].rating)

            var url = $("<a>Giphy</a>")
            url.attr("href", results[i].images.original.url)

            var addtoFavorites = $("<button>Add to favorites</button>")
            addtoFavorites.attr("data-thumb", results[i].images.fixed_width_small_still.url)
            
            var gifImage = $("<img>").addClass("gif")
            gifImage.attr("data-animated", results[i].images.fixed_height.url)
            gifImage.attr("data-still", results[i].images.fixed_height_still.url)
            gifImage.attr("src", results[i].images.fixed_height_still.url)
            
            gifDiv.append(gifImage, url, addtoFavorites)
            
            $("#gifs-go-here").append(gifDiv)
        }
        
    });
}


$("#buttonSection").on("click", ".show", function() {
    $("#gifs-go-here").empty();
    searchedShow = $(this).attr("data-name")
    startingIndex = 0;
    numberShown = 20
    $("#showMore").show()
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
    $("#showPrevious").show()

    numberShown += 15;
    startingIndex += 15;

    $("#gifs-go-here").empty();
    searchedShow = $(this).attr("data-name")
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchedShow + "&api_key=53rTNycyKtaDMuqIM8lZWUhSn4bbBSXi&limit=" + numberShown
    
    showGifs(startingIndex)

})

$("#showPrevious").on("click", function(){

    numberShown -= 15;
    startingIndex -= 15;

    $("#gifs-go-here").empty();
    searchedShow = $(this).attr("data-name")
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchedShow + "&api_key=53rTNycyKtaDMuqIM8lZWUhSn4bbBSXi&limit=" + numberShown
    
    showGifs(startingIndex)

})

$("#gifs-go-here").on('click', 'button', function(){
    var thumbURL = $(this).attr("data-thumb")

    favorites.push(thumbURL)
    // console.log(favorites)
    
    localStorage.setItem('favorites', JSON.stringify(favorites))
    // console.log(localStorage.favorites)
    $(".favorites").empty()
    displayFavorites()
    
})


function displayFavorites(){
    var stringFavorites = localStorage.getItem("favorites");
    favorites = JSON.parse(stringFavorites);
    
    console.log(favorites)
    if(!Array.isArray(favorites)){
        console.log("goo");
        favorites = [];
    }else {
        for (let i = 0; i < favorites.length; i++){
            var thumb = $(`<a href='${favorites[i]}'><img src='${favorites[i]}'></a>`)
            $(".favorites").append(thumb)

        }}


}

$(".clear-favs").on("click", function(){
    localStorage.clear()
    favorites = [];
    $(".favorites").empty()

})

$("body").on('mouseenter', ('button, input'),function() {
    $(this).animate({opacity: .5}, 0);
});
$("body").on('mouseleave', ('button, input'),function() {
    $(this).animate({opacity: 1.0}, 0);
});