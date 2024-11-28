//Shakib Tidjani - 11/27/24
$( function() { //This function has 4 iterations of similar code and implements the two way binding
    $( "#slider" ).slider( { //slider is set to have a minimum and maximum reflecting the number constraints and is default 0
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) { //once the slider is used, we grab its value and set our text to it
            val = ui.value;
            $("#myText").val(val);
        }
    });
    $("#myText").change(function () { //once there is a text change detected we grab the value in the textbox and set the slider value to it
        val = $("#myText").val();
        $("#slider").slider("value", val);
    });
    $( "#slider2" ).slider( { //same process for sliders 2-4
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            val = ui.value;
            $("#myText2").val(val);
        }
    });
    $("#myText2").change(function () {
        val = $("#myText2").val();
        $("#slider2").slider("value", val);
    });
    $( "#slider3" ).slider( {
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            val = ui.value;
            $("#myText3").val(val);
        }
    });
    $("#myText3").change(function () {
        val = $("#myText3").val();
        $("#slider3").slider("value", val);
    });
    $( "#slider4" ).slider( {
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            val = ui.value;
            $("#myText4").val(val);
        }
    });
    $("#myText4").change(function () {
        val = $("#myText4").val();
        $("#slider4").slider("value", val);
    });
  } );
$( function() {
    $( "#tabs" ).tabs();
  } );
$(function () { //this is a function for our validation, it sets the boxes to require a number between -50 and 50 and requires them to have something in them
    $("#boxes").validate({
        rules: {
            1: {
                required: true,
                range: [-50, 50]
            },
            2: {
                required: true,
                range: [-50, 50]
            },
            3: {
                required: true,
                range: [-50, 50]
            },
            4: {
                required: true,
                range: [-50, 50]
            }
        },
        messages: {
            1: {
                required: "Enter a num between +/-50 into Box 1. ", //same message for each error since its a very simple constraint
                range: "Enter a num between +/-50 into Box 1. "
            },
            2: {
                required: "Enter a num between +/-50 into Box 2. ",
                range: "Enter a num between +/-50 into Box 2. "
            },
            3: {
                required: "Enter a num between +/-50 into Box 3. ",
                range: "Enter a num between +/-50 into Box 3. "
            },
            4: {
                required: "Enter a num between +/-50 into Box 4. ",
                range: "Enter a num between +/-50 into Box 4. "
            }
        },
        errorPlacement: function(error) { //puts the error inside the error paragraph defined in the html which sits under the textboxes
            $("#error").append(error);
        },
    });
    $("#genButton").on("click", function() { //when generate is clicked, run the button function which generates a new table and tab to hold said table
        if ($("#boxes").valid()) {
            button();
        }
    });
    $("#delButton").on("click", function() { //when delete 1 is clicked:
        count = $("#names li").length; //grab the number of tabs
        if(count > 1) { //so long as we have more than 1 tab: (so that we dont delete the base tab)
            $("tabs-" + count.toString()).remove(); //remove tabs-x where x is the latest tab
            $("ul li:last").remove(); //remove the latest li from the tabs list ul
            $("#tabs").tabs("refresh"); //refresh the tabs
        }
    });
    $("#delAllButton").on("click", function() { //when delete all is clicked:
        count = $("#names li").length; //do the same thing as delete 1, but instead of an if, its a while, so it deletes all tabs but the base tab
        while(count > 1) {
            $("tabs-" + count.toString()).remove();
            $("ul li:last").remove();
            $("#tabs").tabs("refresh");
            count -= 1;
        }
    });
});

function button() { //when the generate button is clicked
    var minRow = parseInt(document.getElementById("myText").value); //grab the values in the table
    var maxRow = parseInt(document.getElementById("myText2").value);
    var minCol = parseInt(document.getElementById("myText3").value);
    var maxCol = parseInt(document.getElementById("myText4").value);
    var tabName = minRow.toString() + " " + maxRow.toString() + " " +  minCol.toString() + " " +  maxCol.toString(); //create a tab named with the values
    var count = $("#names li").length + 1;
    $("#names").append('<li><a href="#tabs-' + count + '">' + tabName + '</a></li>'); //append an li to the tabs list
    $("#tabs").append('<div id="tabs-' + count + '"><table id="table-' + count + '"></table></div>'); //use append to make a new tab with a table inside of it
    $("#tabs").tabs("refresh"); //refresh tabs
    var table = document.getElementById("table-" + count); //fill the table
    table.innerHTML = "";
    var row = table.insertRow();
    for(let i = minCol-1; i <= maxCol; i++) {
        if(i == minCol-1) {
            (row.insertCell()).innerHTML = "";
        }
        else {
            (row.insertCell()).innerHTML = i;
        }
    }
    for (let i = minRow; i <= maxRow; i++) {
        row = table.insertRow();
        for (let j = minCol-1; j <= maxCol; j++) {
            if(j == minCol-1) {
                (row.insertCell()).innerHTML = i;
            }
            else {
                (row.insertCell()).innerHTML = i * j;
            }
        }
    }
}