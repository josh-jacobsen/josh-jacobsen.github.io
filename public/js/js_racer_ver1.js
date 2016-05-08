

// Declare Variables //

var activeGame = false;
var finishedGame = false;
var missileImpact = document.getElementById("missile_impact");
var missileVideo = document.getElementById("missile_video");

// Functions //

function callAlert() {

    activeGame = false;
    alert("game over");
    start_game();
    }

function clearTorpedoes(track) {
    var torpedoes = document.getElementById(track).getElementsByTagName("td");
    for (i = 0; i < torpedoes.length; i++) {
        torpedoes[i].className = "";
    }
}

function findActive(player){
    var check = Boolean(player)
    if (check === true) {
        var cells = document.getElementById(player).getElementsByTagName("td");
        for (i = 0; i < cells.length; i++){
            if (cells[i].className === "active" && cells[i].nextElementSibling !== null && activeGame === true){
                cells[i].className = "";
                cells[i].nextElementSibling.className = "active";
                break;
            }
            else if (cells[i].className === "active" && cells[i].nextElementSibling === null && activeGame === true) {
                var ship = document.getElementById("ship");
                ship.style.backgroundImage="url('../public/images/js_racer_ver1/impact.gif')";
                clearTorpedoes(player);
                //document.getElementsByClassName("active").className = "";
                missileImpact.play();
                activeGame = false;
                finishedGame = true;
                break;
            }
            else {
                //
            }
        }
    }
}

function assignCellstoPlayers(player){
}

function numberOfPlayers(){
    var game_players = prompt("Captain, how many torpedoes do you want to fire? (Enter a number between 2 and 4", 2);
    return game_players;
}

function lengthOfTrack() {
    var track = prompt("How far from the target are we?", 10);
    return track;
}

function clear_all(){
    document.getElementById("centered-content").innerHTML = "";
    document.getElementById("sub").style.backgroundImage="url('')";
    document.getElementById("ship").style.backgroundImage ="url('')";
}

function restart() {
    if (activeGame === true){
        var end = confirm("Winners never quit and quitters never win. Are you sure you want to leave the game?")
        if (end === true){

            activeGame = false;
            clear_all();
            start_game();
        }
    }
   else {
        clear_all();
        start_game();
   }
}

function keyUsed(event) {
    // key a
    if (event.which === 65){
        findActive("stripPlayer:1");
    }
    // key s
    else if (event.which === 83) {
        findActive("stripPlayer:2")
    }
    // key d
    else if (event.which === 68) {
        findActive("stripPlayer:3")
    }
    // key f
    else if (event.which === 70) {
        findActive("stripPlayer:4")
    }
}



function boardSetup() {

    var game_players = numberOfPlayers();
    var track = lengthOfTrack();

    var num_players = [];
    for (i = 0; i < game_players; i++){
        var player_number = [i + 1];
        num_players.push(player_number);
    }

    var playerIds = [];
    for (i = 0; i < game_players; i++){
        var player = [i + 1];
        playerIds.push(player);
    }

    var trackLength = [];
    for (i = 0; i < track; i++){
      var cell = [i + 1];
      trackLength.push(cell);
    }

    var cellIds = [];
    for (i = 0; i < track; i++){
      var cell = [i + 1];
      cellIds.push(cell);
    }

    // get div to insert table
    var container = document.getElementById("centered-content");
    // create table element
    var table = document.createElement("table");
    // loop num_players to create rows
    for (i = 0; i < num_players.length; i++){
        var row = document.createElement("tr");
        // append row to table
        table.appendChild(row);
        // loop rows
        for (j = 0; j < trackLength.length; j++){
            var cell = document.createElement("td");
            row.appendChild(cell);
        }
    }
    container.appendChild(table);

    // Assign IDs to rows and cells //
    var rows = document.getElementsByTagName("tr");
    // traverse rows //
    for (i = 0; i < game_players; i++) {
        rowId = "stripPlayer:" + playerIds[i];
        rows[i].id = rowId;
        var cells = rows[i].getElementsByTagName("td");
        // traverse columns //
        for (j = 0; j < cells.length; j++) {
            cells[j].id = "player:" + playerIds[i] + " " + "cell:" + cellIds[j];
        }
    }

    for (i = 0; i < game_players; i++){
        var cells = rows[i].getElementsByTagName("td");
        for (j = 0; j < cells.length; j++) {
            cells[0].className = "active";
        }
    }

}

function start_game() {

    if (activeGame === false){
        activeGame = true;

        clear_all();

        boardSetup();
        var ship = document.getElementById("ship");
        ship.style.backgroundImage="url('../public/images/js_racer_ver1/ship.jpg')";

        var sub = document.getElementById("sub");
        sub.style.backgroundImage="url('../public/images/js_racer_ver1/submarine.jpg')";

        document.addEventListener("keyup", keyUsed);

    }

    else {
        //
    }
}

