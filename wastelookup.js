$(document).ready(function(){

    var requestURL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var wasteItems = request.response;
        var resultArray = [];
        populateResultTitle(wasteItems);

        wasteItems.map(checkArrayItem);
        console.log(resultArray); //resultArray is an array of arrays

        function checkArrayItem(currentItem) {
            var valuesInCurrentItem = Object.values(currentItem);
            var arrayLength = valuesInCurrentItem.length;
            if (valuesInCurrentItem[arrayLength-1].includes("takeout")) {
                //console.log("Title: " + valuesInCurrentItem[2] + "\n Description: " + valuesInCurrentItem[1]); **some entries have 5 values in array and some 4
                resultArray.push(valuesInCurrentItem);
            }
        }

        $('#submitbutton').click(function() {

            $('#resulttitle').append(resultArray[0][2]);

        })


    }

    

    function populateResultTitle(jsonObject) {
        $("h2").click(function(){
            $('#resultdesc').html(jsonObject[0]['body']);
        });  
    }

    // $('#submitbutton').click(function() {
    //     var myForm = document.getElementById('myform');
    //     formData = new FormData(myForm);
    //     var query = formData.get("query");
    //     //alert(query);
    //     $("#resulttitle").append(query);
    //   });

  });

 