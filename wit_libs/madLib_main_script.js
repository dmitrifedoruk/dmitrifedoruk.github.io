
const menu = document.getElementById('menuButton');
menu.addEventListener( "click", showMenu );

let player = document.getElementById('music');

let mute = document.getElementById('mute');

let toggleMusic = document.getElementById('toggleMusic');

window.addEventListener("load", (event) => {
    player.play();
    mainPageFadeIn();
    storyFadeIn();
});

toggleMusic.addEventListener( "click", toggleMute );



function mainPageFadeIn() {
    document.getElementsByTagName("nav")[0].style.opacity = "1";
    document.querySelector(".container").style.opacity = "1";
}


function toggleMute() {

    if(!player.paused) {

        if (player.volume === 0) {

            mute.style.opacity = 0;
            player.style.opacity = 1;


            player.volume = 1

        } else {

            mute.style.opacity = 1;
            player.style.opacity = 0;

            player.volume = 0
        }
    }
    else{
        player.play()
    }
}

function showMenu () {

    const x = document.getElementById("links");

    if (x.classList[0] === "showMenu") {

        x.classList.remove("showMenu");
        x.classList.add("hideMenu");

    } else {
        x.classList.remove("hideMenu");
        x.classList.add("showMenu");
    }

}

function addNumberPlus1 () {

}