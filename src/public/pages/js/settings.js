
var botFilter = document.getElementById("botFilter");

if(localStorage.getItem("mark-bot-filter"))
    botFilter.checked = true;

function toggleBotFilter(checkBox) {
    console.log("HI ITS A MEE MARIO");

    if(checkBox.checked) {
        localStorage.setItem("mark-bot-filter", true);
    } else {
        localStorage.setItem("mark-bot-filter", false);
    }
};