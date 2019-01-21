$(document).ready(function(){

    // Send a request to retrive the JSON file from the toronto.ca website
    var requestURL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    // Once the requested item has been retrieved, run the following within an anonymous function
    request.onload = function() {
        var wasteItems = request.response; // wasteItems represents the JSON object retrieved from the network
        var favouritesArray = []; // an array to store user's favourites

        $('#submitbutton').click(function() { // when the submit button is clicked...
            $('#results').empty(); //empty the div before filling it with new search query
            var parser = new DOMParser; // initialize a DOMParser object
            var resultArray = []; // an array to store the results for the search query
            var myForm = document.getElementById('myform');
            formData = new FormData(myForm); // creates a new FormData object using information from the html form
            var query = formData.get("query"); // retrieves the value associated with the name "query" within the html form
            wasteItems.map(checkArrayItem); // run the function 'checkArrayItem' on each element of wasteItems

            function checkArrayItem(currentItem) {
                // if the current element's keyword string includes the user's query, push that element onto the resultArray
                if (currentItem["keywords"].includes(query)) {
                    // if the query string is empty, show nothing
                    if (query == "") {
                        resultArray = resultArray;
                    } else {
                        resultArray.push(currentItem);
                    }
                }
            }

            // attach information from each search result into the html body
            for (var i = 0; i <= ((resultArray.length)-1); i++) {
                var description = parser.parseFromString(resultArray[i]["body"], 'text/html'); // parse the 'body' value in JSON to display correctly on page
                description = description.documentElement.textContent;
                $('#results').append(
                    $('<div/>',{class: "row"}).append(
                        $('<div/>',{class: "col-5"}).append( 
                            $('<ion-icon/>',{name: "star", class: "staricon" }),
                            resultArray[i]["title"]
                        ),
                        $('<div/>',{class: "col-7"}).append(
                            description
                       ) 
                    )
                )
            }
        }); // end clicked search button handler

        $("body").on("click", ".staricon", function() {
            $(this).toggleClass("greenstar");
            let currentObject = {
                'title': $(this).closest('.col-5')[0].textContent,
                'description': $(this).closest('.row').find('.col-7')[0].innerHTML
            };
            if($(this).hasClass("greenstar")) {
                favouritesArray.push(currentObject);
                $('#favourites').append(
                    $('<div/>',{class: "row"}).append(
                        $('<div/>',{class: "col-5"}).append( 
                            $('<ion-icon/>',{name: "star", class: "staricon greenstar"}),
                            currentObject['title']
                        ),
                        $('<div/>',{class: "col-7"}).append(
                            currentObject['description']
                        ) 
                    )
                )
            } else {
                for (i=0; i <= (favouritesArray.length-1); i++) {
                    if (currentObject.title == favouritesArray[i].title){
                        favouritesArray.splice(i,1);
                    }
                }
                $('#favourites').find('.row').each(function() {
                    console.log($(this).find('.col-5'));
                    console.log($(this).find('.col-5')[0].innerText);
                    console.log(currentObject.title);
                    if ($(this).find('.col-5')[0].innerText == currentObject.title) {
                        $(this).remove();
                    }
                });
                $('#results').find('.row').each(function() {
                    if ($(this).find('.col-5')[0].innerText == currentObject.title) {
                        console.log(!($($(this).find('.staricon')[0]).hasClass("greenstar")));
                        if ($($(this).find('.staricon')[0]).hasClass("greenstar")){
                            $($(this).find('.staricon')[0]).toggleClass("greenstar");
                        }
                    }
                });
            }
        });

        // modify 'enter' key functionality
        $('#inputbox').keypress(function(e){
            $("form").submit(function() { return false; }); // prevent the form from "submitting" and therefore refreshing the page
            // when the enter key is pressed, trigger the search button click event
            if(e.which == 13){
                $('#submitbutton').click();
            }
        });

        $('.form-control').on('input', function() {
            if ($(this.value == '')) {
                $('#results').empty();
            }
        });

    }    
});

 