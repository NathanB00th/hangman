//Full variables
var photos = ["img/006.jpg", "img/005.jpg", "img/004.jpg", "img/003.jpg", "img/002.jpg", "img/001.jpg",
             "img/007.jpg", "img/008.jpg"];
var aphbt = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
            "v", "w", "x", "y", "z"];
var words = ["flight", "unfortunate", "drop", "cruelty", "terrible", "fault", "garbage", "bridge", "destructive"];
var word = "";
var guesses = 5;
var guessedLetters = [];
var letterSpace = "";
var winLose = false;

function makeButtons(){
    var btn;
    var div = document.getElementById("buttonContainer");
    for (var i = 0; i < aphbt.length; i++) {
        btn = document.createElement("button");

        btn.setAttribute("class","ltrBtn");
        btn.setAttribute("value",aphbt[i]);
        btn.setAttribute("onclick","guessLetter(this)");

        btn.innerHTML = aphbt[i];

        div.appendChild(btn);
    }
}

function replaceLetter(index, string, letter) {
    string = string.substr(0, index) + letter + string.substr(index + 1);
    return string;
}

function startGame() {
    var div = document.getElementById("buttonContainer").innerHTML = "";
    letterSpace = "";
    makeButtons();
    word = words[Math.floor(Math.random() * words.length)];
    guesses = 5;
    guessedLetters = [];
    var wordLength = word.length;
    for (var i = 0; i < wordLength; i++) {
        letterSpace += "_";
    }
    document.getElementById("output").innerHTML = letterSpace;
    document.getElementById("guesses").innerHTML = guesses;
    document.getElementById("picture").src = photos[5];
    console.log(word);
    winLose = false;
}

function printWord(letter) {
    var newWord = word;
    console.log("letter recieved");
    for(var i = 0; i < newWord.length; i++) {
        var hasLetter = newWord.charAt(i);
        if (hasLetter == letter) {
            letterSpace = replaceLetter(i, letterSpace, letter);
        }
    }
    document.getElementById("output").innerHTML = letterSpace;
    if (letterSpace == word) {
        document.getElementById("mistake").innerHTML = "You've guessed the right word a saved a person's life!";
        document.getElementById("picture").src = photos[6];
        winLose = true;
    }
}

function guessLetter(letter) {
    if (winLose == false) {
        document.getElementById("mistake").innerHTML = "";
        var guessedLetter = letter.value;
        if (guessedLetters.includes(guessedLetter) == true) {
            document.getElementById("mistake").innerHTML = "Whoops, looks like you already guessed that letter!";
        } else {
            console.log("Letter not yet guessed");
            var includesGuess = word.includes(guessedLetter);
            guessedLetters.push(guessedLetter);
            if (includesGuess == true) {
                console.log("Letter sent");
                printWord(guessedLetter);
            } else {
                console.log("Wrong guess");
                if (guesses == 0) {
                    document.getElementById("mistake").innerHTML = "Oh no! It looks like you ran out of guesses, and now a" +
                    " man has died.";
                    letterSpace = word;
                    document.getElementById("output").innerHTML = letterSpace;
                    document.getElementById("picture").src = photos[7];
                    winLose = true;
                } else {
                    guesses = guesses - 1;
                    document.getElementById("guesses").innerHTML = guesses + 1;
                    document.getElementById("picture").src = photos[guesses];
                }
            }
        }
    }
}
