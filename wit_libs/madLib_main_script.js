
const menu = document.getElementById('menuButton');
menu.addEventListener( "click", showMenu );


window.addEventListener("load", (event) => {

    mainPageFadeIn();
    storyFadeIn();
});


function mainPageFadeIn() {
    document.getElementsByTagName("nav")[0].style.opacity = "1";
    document.querySelector(".container").style.opacity = "1";
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
