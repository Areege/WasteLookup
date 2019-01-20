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
                            $('<img/>',{src:"./images/greystar.png",class:"staricons greystaricon"}),
                            resultArray[i]["title"]
                        ),
                        $('<div/>',{class: "col-7"}).append(
                            description
                       ) 
                    )
                )
            }

            $('.greystaricon').click(function(){
                $('.greystaricon').replaceWith(
                    $('<img/>',{src:"./images/greenstar.png",class:"staricons",class:"greenstaricon"})
                )
            })

        });

        // modify 'enter' key functionality
        $('#inputbox').keypress(function(e){
            $("form").submit(function() { return false; }); // prevent the form from "submitting" and therefore refreshing the page
            // when the enter key is pressed, trigger the search button click event
            if(e.which == 13){
                $('#submitbutton').click();
            }
        });



    }    
});

 