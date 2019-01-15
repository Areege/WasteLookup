$(document).ready(function(){

    var requestURL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var wasteItems = request.response;
        populateResultTitle(wasteItems);
    }

    function populateResultTitle(jsonObject) {
        $("h2").click(function(){
            $('#resultdesc').html(jsonObject[0]['body']);
        });  
    }

  });

 