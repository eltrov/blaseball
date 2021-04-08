// global stuff
// (scope/context is all new-ish to me)

// jQuery function to read/get from data
// https://www.sitepoint.com/jquery-read-text-file/
// https://api.jquery.com/jQuery.get/

var names = new Array;
$.get('names.txt', function (data) {
    // reads from file, splitting array entries on line breaks
    names = data.split('\n',);
    //console.log(names);
});

function newName() {
    // table starts hidden, gets un-hidden when button is pressed
    var container = document.getElementById("container");
    container.style.display = "block";

    // variable-izing the table so we can add children later
    var table = document.getElementById("table");

    // change button text after clicking it once
    var button = document.getElementById("button");
    button.innerText = "Again!";

    // clear out the array after each run
    var fullNameList = [];

    for (i = 0; i < 14; i++) {
        var rngFirst = Math.floor(Math.random() * Math.floor(names.length));
        var rngLast = Math.floor(Math.random() * Math.floor(names.length));
        var fullName = names[rngFirst] + " " + names[rngLast];
        fullNameList.push(fullName);
        console.log(fullNameList);
    }

    // populating Lineup
    for (i = 0; i < 9; i++) {
        table.rows[i + 1].children[0].children[0].innerText = fullNameList[i];
    }

    // populating Rotation
    for (i = 9; i < 14; i++) {
        table.rows[i + 2].children[0].children[0].innerText = fullNameList[i];
    }

    var rngCity = Math.floor(Math.random() * Math.floor(teamCity.length));
    var rngTeam = Math.floor(Math.random() * Math.floor(teamName.length));
    var rngColor = Math.floor(Math.random() * Math.floor(colors.length));
    //var rngEmoji = Math.floor(Math.random() * Math.floor(emoji.length));

    var teamLogo = document.getElementById("team-logo");
    teamLogo.style = "background-color: #" + colors[rngColor];
    //teamLogo.innerText = emoji[rngEmoji];
    // pairing team emoji with names instead of doing it randomly
    teamLogo.innerText = emoji[rngTeam];


    var fullTeamName = teamCity[rngCity] + " " + teamName[rngTeam];

    var teamNameHeader = document.getElementById("team-name");
    teamNameHeader.innerText = fullTeamName;
}