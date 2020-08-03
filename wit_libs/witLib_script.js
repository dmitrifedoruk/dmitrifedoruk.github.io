
const menu = document.getElementById('menuButton');
menu.addEventListener( "click", showMenu );


window.addEventListener("load", (event) => {
    mainPageFadeIn();
    storyFadeIn();
});

// toggleMusic.addEventListener( "click", toggleMute );

document.querySelector("#buttons2PlayAgain").addEventListener("click", (event) => {
    resetLib('storyLib', 'storyCreate');
});

document.querySelector("#create").addEventListener("click", (event) => {
    setLib();
});


function mainPageFadeIn() {
    document.getElementsByTagName("nav")[0].style.opacity = "1";
    //document.getElementById("main-header").style.opacity = "1";
}

function storyFadeIn() {
    document.getElementsByClassName("storyLib")[0].style.opacity = "1";
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

function getLib(class1, class2) {

    const element1 = document.getElementsByClassName(class1)[0];
    const element2 = document.getElementsByClassName(class2)[0];

    element1.style.transition = "opacity 1s linear";

    window.setTimeout(function() {
        element1.style.opacity = "0";
    }, 2);

    window.setTimeout(function() {
        element1.style.display = "none";
        element2.style.display = "grid";
    }, 1002);

    window.setTimeout(function() {
        element2.style.opacity = "1";
    }, 1023);
}

function setLib() {

    getLib("storyLib", "storyCreate");
    getWords();

}



function resetLib(class1, class2) {

    // let inputs = document.querySelectorAll(class1+' input');
    //
    // inputs.forEach(function (input) {
    //     input.value = '';
    // })

    const element1 = document.getElementsByClassName(class1)[0];
    const element2 = document.getElementsByClassName(class2)[0];

    window.setTimeout(function() {
        element2.style.opacity = "0";
    }, 2);


    window.setTimeout(function() {
        element2.style.display = "none";
        element1.style.display = "grid";
    }, 1002);

    window.setTimeout(function() {
        element1.style.opacity = "1";
    }, 1023);
}



function getWords() {
    let words = document.querySelectorAll(".storyLib input");
    let wordList = {};
    let blanks = document.querySelectorAll(".storyCreate .story span");

    words.forEach(function (input) {
        wordList[input.classList[0]] = input.value;
    });

    blanks.forEach(function (span) {

        if(wordList[span.classList[0]].trim()!= ''){
            span.innerText = wordList[span.classList[0]];
        }

        //span.innerText = wordList[span.classList[0]];
    });
}


let labels = document.querySelectorAll('.storyLib label');

let labelString = '';

labels.forEach(function(label) {
    labelString += label.innerHTML;
    }
)

console.log(labelString);


// function getClasses() {
//
//
//     let spans = document.querySelectorAll(".story span");
//
//     spans.forEach(function (span) {
//         console.log(span.classList[0]);
//     });
//
// }
//
// getClasses();