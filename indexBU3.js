
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
const colorURL = "https://pokeapi.co/api/v2/pokemon-color/";
const habitatURL = "https://pokeapi.co/api/v2/pokemon-habitat/";

// const colorTextBox = document.getElementById("txtColor");
const colorDropDown= document.getElementById("ddColor");
const habitatDropDown= document.getElementById("ddHabitat");

const searchForm = document.getElementById("frmSearch");

const errorHeader = document.getElementById("h2Error");
const resultsHeader = document.getElementById("h2Results");

const resultList = document.getElementById("resultList");

//colorDropDown.addEventListener('change', getResults); 
searchForm.addEventListener('submit', getResults); 


const detailsDiv = document.getElementById("pokemonDetails");
const pokemonName = document.getElementById("pokemonName");
const pokemonSprites = document.getElementById("pokemonSprites");
const back_shinyfront_default = document.getElementById("front_default");
const front_shiny = document.getElementById("front_shiny");
const front_female = document.getElementById("front_female");
const front_shiny_female = document.getElementById("front_shiny_female");
const back_default = document.getElementById("back_default");
const back_shiny = document.getElementById("back_shiny");
const back_female = document.getElementById("back_female");
const back_shiny_female = document.getElementById("back_shiny_female");

const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");


detailsDiv.style.display = 'none';

// BEGIN Code For Testing
//colorTextBox.value = "blue";
// END Code For Testing



// Get the colors for the drop down
fetch(colorURL)
.then(result => {
    // console.log(result);
    return result.json();
})
.then(data => {
    // console.log(data);
    addColors(data);
})
.catch(err => {
    console.log(err)
    errorHeader.innerText = err;
    errorHeader.style.display = 'flex';
});

function addColors(data){
    // console.log(data);

    // console.log(data.results);
    let colors = data.results;

    colors.forEach(element => {
        // console.log(element);
        let colorOption = document.createElement("option");
        colorOption.value = element.name;
        colorOption.innerText = element.name;
        colorDropDown.appendChild(colorOption);
    })
};


// Get the habitats for the drop down
fetch(habitatURL)
.then(result => {
    // console.log(result);
    return result.json();
})
.then(data => {
    // console.log(data);
    addHabitats(data);
})
.catch(err => {
    console.log(err)
    errorHeader.innerText = err;
    errorHeader.style.display = 'flex';
});

function addHabitats(data){
    // console.log(data);

    // console.log(data.results);
    let habitats = data.results;

    habitats.forEach(element => {
        // console.log(element);
        let habitatOption = document.createElement("option");
        habitatOption.value = element.name;
        habitatOption.innerText = element.name;
        habitatDropDown.appendChild(habitatOption);
    })
};

let arrColor = [];
let arrHabitat = [];
let arrJoinedItems = [];


// Get the results after the search
function getResults(e){
    e.preventDefault();

    if (colorDropDown.value !== "" || habitatDropDown.value !== "") {

        errorHeader.style.display = 'none';

        // Assemble the URL
        // Using the textbox
        //let URL = colorURL + colorTextBox.value;
        // Using the drop down
        let URL;

        if (colorDropDown.value != "") {
            URL = colorURL + colorDropDown.value;

            fetch(URL)
            .then(result => {
                // console.log(result);
                return result.json();
            })
            .then(data => {
                // console.log(data);
                //displayResults(data);

                arrColor = data.pokemon_species;
                console.log(arrColor);
                //Only compare the arrays when both have values
                //compareArrays();
                //displayResults(arrJoinedItems);

                displayResults(arrColor);
            })
            .catch(err => {
                console.log(err)
                errorHeader.innerText = err;
                errorHeader.style.display = 'flex';
            });

        };
        
        if (habitatDropDown.value != "") {
            URL = habitatURL + habitatDropDown.value;

            fetch(URL)
            .then(result => {
                // console.log(result);
                return result.json();
            })
            .then(data => {
                // console.log(data);
                //displayResults(data);

                arrHabitat = data.pokemon_species;
                console.log(arrHabitat);
                //Only compare the arrays when both have values
                //compareArrays();
                //displayResults(arrJoinedItems);
                displayResults(arrHabitat);
            })
            .catch(err => {
                console.log(err)
                errorHeader.innerText = err;
                errorHeader.style.display = 'flex';
            });

        };

        // fetch(URL)
        // .then(result => {
        //     // console.log(result);
        //     return result.json();
        // })
        // .then(data => {
        //     // console.log(data);
        //     displayResults(data);
        // })
        // .catch(err => {
        //     console.log(err)
        //     errorHeader.innerText = err;
        //     errorHeader.style.display = 'flex';
        // });

    } else {
        errorHeader.innerText = "Please Select An Option";
        errorHeader.style.display = 'flex';
        resultsHeader.style.display = 'none';
    };

};



function compareArrays() {

    // remove all items in arrJoinedItems
    arrJoinedItems = [];

    if (arrColor.length > 0 && arrHabitat.length > 0) {
        for (c = 0; c < arrColor.length; c++){
            for (h = 0; h < arrHabitat.length; h++){
                if (arrColor[c].name == arrHabitat[h].name) {
                    arrJoinedItems.push(arrColor[c].name);
                };
            };
        };
    };

    console.log(arrJoinedItems);
    return arrJoinedItems;
};


function displayResults(arrResults){
    // console.log(data);

    // console.log(data.pokemon_species);
    //let results = data.pokemon_species;

    arrResults.forEach(element => {
        // console.log(element);

        resultsHeader.style.display = 'flex';

        let pokemonLI = document.createElement("li");
        pokemonLI.className = "list-group-item list-group-item-light";

        let pokemonA = document.createElement("a");
        //pokemonA.href = element.url;
        pokemonA.href = "#";
        pokemonA.innerText =  element.name;

        pokemonA.addEventListener('click', getPokemon); 

        pokemonLI.appendChild(pokemonA);
        resultList.appendChild(pokemonLI);

    })


};




// Get the information about a pokemon
function getPokemon(event){
    // console.log(event);
    // console.log(event.srcElement.innerText);

    let pokemon = event.srcElement.innerText;

    let URL = pokemonURL + pokemon

    fetch(URL)
    .then(result => {
        // console.log(result);
        return result.json();
    })
    .then(data => {
        //console.log(data);
        displayPokemon(data);
    })
    .catch(err => {
        console.log(err)
        errorHeader.innerText = err;
        errorHeader.style.display = 'flex';
    });

};

// Display the information about a pokemon
function displayPokemon(data){
    console.log(data);

    detailsDiv.style.display = 'flex';

    pokemonName.innerText = data.name;

    let sprites = data.sprites;
    console.log(sprites);

    pokemonSprites.style.display = 'flex';

    if (sprites.front_default !== "") {
        front_default.style.display = 'flex';
        front_default.src = sprites.front_default;
    } else {
        front_default.style.display = 'none';
        front_default.src = "";
    };
    if (sprites.front_shiny !== "") {
        front_shiny.style.display = 'flex';
        front_shiny.src = sprites.front_shiny;
    } else {
        front_shiny.style.display = 'none';
        front_shiny.src = "";
    };

    //console.log(getImage(sprites.front_female));

    //console.log(UrlExists(sprites.front_female));

    console.log(testImage(sprites.front_female));

    // if (sprites.front_female !== "") {
    //     front_female.style.display = 'flex';
    //     front_female.src = sprites.front_female;
    // } else {
    //     front_female.style.display = 'none';
    //     front_female.src = "";
    // };
    // if (sprites.front_shiny_female !== "") {
    //     front_shiny_female.style.display = 'flex';
    //     front_shiny_female.src = sprites.front_shiny_female;
    // } else {
    //     front_shiny_female.style.display = 'none';
    //     front_shiny_female.src = "";
    // };
    if (sprites.back_default !== "") {
        back_default.style.display = 'flex';
        back_default.src = sprites.back_default;
    } else {
        back_default.style.display = 'none';
        back_default.src = "";
    };
    if (sprites.back_shiny !== "") {
        back_shiny.style.display = 'flex';
        back_shiny.src = sprites.back_shiny;
    } else {
        back_shiny.style.display = 'none';
        back_shiny.src = "";
    };
    // if (sprites.back_female !== "") {
    //     back_female.style.display = 'flex';
    //     back_female.src = sprites.back_female;
    // } else {
    //     back_female.style.display = 'none';
    //     back_female.src = "";
    // };
    // if (sprites.back_shiny_female !== "") {
    //     back_shiny_female.style.display = 'flex';
    //     back_shiny_female.src = sprites.back_shiny_female;
    // } else {
    //     back_shiny_female.style.display = 'none';
    //     back_shiny_female.src = "";
    // };


    pokemonHeight.innerText = "Height: " + data.height;
    pokemonWeight.innerText = "Weight: " + data.weight;


};


// from https://web.dev/promises/
function getImage(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);
  
      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };
  
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
  
      // Make the request
      req.send();
    });
  }

  // from https://stackoverflow.com/questions/31936444/how-to-check-image-url-is-404-using-javascript
  function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

  // from https://stackoverflow.com/questions/9815762/detect-when-an-image-fails-to-load-in-javascript/9815854
function testImage(url) {

    // Define the promise
    const imgPromise = new Promise(function imgPromise(resolve, reject) {

        // Create the image
        const imgElement = new Image();

        // When image is loaded, resolve the promise
        imgElement.addEventListener('load', function imgOnLoad() {
            resolve(this);
        });

        // When there's an error during load, reject the promise
        imgElement.addEventListener('error', function imgOnError() {
            reject();
        })

        // Assign URL
        imgElement.src = url;

    });

    return imgPromise;
}

// testImage("http://foo.com/bar.jpg").then(

//     function fulfilled(img) {
//         console.log('That image is found and loaded', img);
//     },

//     function rejected() {
//         console.log('That image was not found');
//     }

// );