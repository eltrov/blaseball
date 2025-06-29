function main() {
    var boxElement = document.getElementById("textArea");
    boxElement.value = "Enter your new bottom text here...";

    var bottomText = document.getElementById("bottomText");

    var textbox = document.getElementById('type');

    var siesta = document.getElementById('siesta');
    var peanut = document.getElementById('peanut');
    var monitor = document.getElementById('monitor');
    var chefMonitor = document.getElementById('chef-monitor');
    var boss = document.getElementById('boss');
    var commish = document.getElementById('mmolb-commish');
    var mrfour = document.getElementById('mmolb-mr-four');
    
    textbox.value = "commish";

    textbox.onchange = function () {
        var textboxValue = document.getElementById('type').value;
        siesta.className = "main hidden"
        peanut.className = "content hidden";
        monitor.className = "content hidden";
        chefMonitor.className = "content hidden";
        boss.className = "content hidden";
        commish.className = "content hidden";
        mrfour.className = "content hidden";

        console.log(textboxValue)
        switch(textboxValue) {
            case "siesta":
                siesta.className = "siesta visible"
                bottomText.className = "siesta";
                bottomText.innerText = "Siesta";
                break;
            case "peanut":
                peanut.className = "content visible";
                bottomText.className = "peanut";
                bottomText.innerText = "THE SHELLED ONE";
                break;
            case "monitor":
                monitor.className = "content invert visible";
                bottomText.className = "montior";
                bottomText.innerText = "The Hall Monitor";
                break;
            case "chef-monitor":
                chefMonitor.className = "content visible";
                bottomText.className = "monitor";
                bottomText.innerText = "The Chef Monitor";
                break;
            case "boss":
                boss.className = "content visible";
                bottomText.className = "boss";
                bottomText.innerText = "Boss";
                break;
            case "mmolb-commish":
                commish.className = "content visible";
                bottomText.className = "mmolb-commish";
                bottomText.innerText = "COMMISSIONER: That was quite the Superstar Game. Excellent job, everyone!";   
                break;             
            case "mmolb-mr-four":
                mrfour.className = "content visible";
                bottomText.className = "mmolb-mr-four";
                bottomText.innerText = "MR. FOUR: The Stars though... how shall we say? They were in quite a bad mood.";                 
                break;
        }
        bottomText.className = textboxValue;
    }
}

function swapText() {
    var h1 = document.getElementById("bottomText");
    var boxElement = document.getElementById("textArea");
    var newText = boxElement.value;
    h1.innerText = newText;
}