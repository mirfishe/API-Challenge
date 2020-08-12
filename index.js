
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
const colorURL = "https://pokeapi.co/api/v2/pokemon-color/";
const habitatURL = "https://pokeapi.co/api/v2/pokemon-habitat/";
const shapeURL = "https://pokeapi.co/api/v2/pokemon-shape/";

// const colorTextBox = document.getElementById("txtColor");
const colorDropDown = document.getElementById("ddColor");
const habitatDropDown = document.getElementById("ddHabitat");
const shapeDropDown = document.getElementById("ddShape");

const btnSearch = document.getElementById("btnSearch");
btnSearch.style.display = 'none';

const searchForm = document.getElementById("frmSearch");

const errorHeader = document.getElementById("h2Error");
const h2PokemonError = document.getElementById("h2PokemonError");
const resultsHeader = document.getElementById("h2Results");
const h3SearchedOn = document.getElementById("h3SearchedOn");

colorDropDown.addEventListener('change', getResults); 
habitatDropDown.addEventListener('change', getResults); 
shapeDropDown.addEventListener('change', getResults); 
//searchForm.addEventListener('submit', getResults); 

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

const pokemonTypes = document.getElementById("pokemonTypes");

const pokemonMoves = document.getElementById("pokemonMoves");

const pokemonAbilities = document.getElementById("pokemonAbilities");

const pokemonForms = document.getElementById("pokemonForms");

const pokemonHeldItems = document.getElementById("pokemonHeldItems");

detailsDiv.style.display = 'none';

let firstLoop = 0;

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

    colors.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });

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

    habitats.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });

    habitats.forEach(element => {
        // console.log(element);
        let habitatOption = document.createElement("option");
        habitatOption.value = element.name;
        habitatOption.innerText = element.name;
        habitatDropDown.appendChild(habitatOption);
    })
};

// Get the forms for the drop down
fetch(shapeURL)
.then(result => {
    // console.log(result);
    return result.json();
})
.then(data => {
    // console.log(data);
    addShapes(data);
})
.catch(err => {
    console.log(err)
    errorHeader.innerText = err;
    errorHeader.style.display = 'flex';
});

function addShapes(data){
    // console.log(data);

    // console.log(data.results);
    let shapes = data.results;

    shapes.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });

    shapes.forEach(element => {
        // console.log(element);
        let shapeOption = document.createElement("option");
        shapeOption.value = element.name;
        shapeOption.innerText = element.name;
        shapeDropDown.appendChild(shapeOption);
    })
};



// Get the results after the search
function getResults(e){
    //e.preventDefault();

    resultsHeader.style.display = 'none';
    h3SearchedOn.style.display = 'none';
    detailsDiv.style.display = 'none';

    if (colorDropDown.value !== "" || habitatDropDown.value !== "" || shapeDropDown.value !== "") {

        errorHeader.style.display = 'none';

        // Assemble the URL
        // Using the textbox
        //let URL = colorURL + colorTextBox.value;
        // Using the drop down
        let URL;
        if (colorDropDown.value != "") {
            URL = colorURL + colorDropDown.value;
            h3SearchedOn.innerText = "Searched: Color=" + colorDropDown.value;
            // h3SearchedOn.style.display = 'flex';
        } else if (habitatDropDown.value != "") {
            URL = habitatURL + habitatDropDown.value;
            h3SearchedOn.innerText = "Searched: Habitat=" + habitatDropDown.value;
            // h3SearchedOn.style.display = 'flex';
        } else if (shapeDropDown.value != "") {
            URL = shapeURL + shapeDropDown.value;
            h3SearchedOn.innerText = "Searched: Shape=" + shapeDropDown.value;
            // h3SearchedOn.style.display = 'flex';
        };

        colorDropDown.selectedIndex = 0;
        habitatDropDown.selectedIndex = 0;
        shapeDropDown.selectedIndex = 0;

        fetch(URL)
        .then(result => {
            // console.log(result);
            return result.json();
        })
        .then(data => {
            // console.log(data);
            displayResults(data);
        })
        .catch(err => {
            console.log(err)
            errorHeader.innerText = err;
            errorHeader.style.display = 'flex';
        });

    } else {
        errorHeader.innerText = "Please Select An Option";
        errorHeader.style.display = 'flex';
        resultsHeader.style.display = 'none';
    };

};


function displayResults(data){
    // console.log(data);

    while (resultList.firstChild) { // while the value is not null
        resultList.removeChild(resultList.firstChild);
    };

    // console.log(data.pokemon_species);
    let results = data.pokemon_species;

    results.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });

    results.forEach(element => {
        // console.log(element);

        resultsHeader.style.display = 'flex';
        h3SearchedOn.style.display = 'flex';

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

    errorHeader.style.display = 'none';
    h2PokemonError.style.display = 'none';
    detailsDiv.style.display = 'none';

    let pokemon = event.srcElement.innerText;

    let URL = pokemonURL + pokemon

    fetch(URL)
    .then(result => {
        // console.log(result);
        // console.log(result.status);

        if (result.status != 404) {
            return result.json();
        } else {
            console.log(result)
            h2PokemonError.innerText = "Pokémon not found.";
            h2PokemonError.style.display = 'flex';
            return result.status
        };
    })
    .then(data => {
        // console.log(data);

        if (data != 404) {
            displayPokemon(data);
        }
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
    //console.log(sprites);

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
    // if (sprites.front_female !== "") {
    //     front_female.style.display = 'flex';
    //     front_female.src = sprites.front_female;
    // } else {
        front_female.style.display = 'none';
        front_female.src = "";
    // };
    // if (sprites.front_shiny_female !== "") {
    //     front_shiny_female.style.display = 'flex';
    //     front_shiny_female.src = sprites.front_shiny_female;
    // } else {
        front_shiny_female.style.display = 'none';
        front_shiny_female.src = "";
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
        back_female.style.display = 'none';
        back_female.src = "";
    // };
    // if (sprites.back_shiny_female !== "") {
    //     back_shiny_female.style.display = 'flex';
    //     back_shiny_female.src = sprites.back_shiny_female;
    // } else {
        back_shiny_female.style.display = 'none';
        back_shiny_female.src = "";
    // };


    // pokemonHeight.innerText = "Height: " + data.height;
    // pokemonWeight.innerText = "Weight: " + data.weight;
    pokemonHeight.innerText = data.height;
    pokemonWeight.innerText = data.weight;


    let types = data.types;
    //console.log(types);

    types.sort((a, b) => {
        if (a.type.name > b.type.name) {
            return 1;
        } else {
            return -1;
        }
    });

    firstLoop = 0;
    types.forEach(element => {
        //console.log(element);

        // if (firstLoop === 0) {
        //     pokemonTypes.innerText += element.type.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonTypes.innerText += ", " + element.type.name;
        // };

        if (firstLoop !== 0) {
            pokemonTypes.innerText += ", "
        } else {
            // pokemonTypes.innerText = "Types: "
            firstLoop = 1;
        };

        pokemonTypes.innerText += element.type.name;

    })


    let moves = data.moves;
    //console.log(moves);

    moves.sort((a, b) => {
        if (a.move.name > b.move.name) {
        // console.log("A: ", a.move.name);
        // console.log("B: ", b.move.name);
            return 1;
        } else {
            return -1;
        }
    });

    firstLoop = 0;
    moves.forEach(element => {
        //console.log(element);

        // if (firstLoop === 0) {
        //     pokemonMoves.innerText += element.move.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonMoves.innerText += ", " + element.move.name;
        // };

        if (firstLoop !== 0) {
            pokemonMoves.innerText += ", "
        } else {
            // pokemonMoves.innerText = "Moves: "
            firstLoop = 1;
        };

        pokemonMoves.innerText += element.move.name;

    })


    let abilities = data.abilities;
    //console.log(abilities);

    abilities.sort((a, b) => {
        if (a.ability.name > b.ability.name) {
            return 1;
        } else {
            return -1;
        }
    });

    firstLoop = 0;
    abilities.forEach(element => {
        //console.log(element);

        // if (firstLoop === 0) {
        //     pokemonAbilities.innerText += element.ability.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonAbilities.innerText += ", " + element.ability.name;
        // };

        if (firstLoop !== 0) {
            pokemonAbilities.innerText += ", "
        } else {
            // pokemonAbilities.innerText = "Abilities: "
            firstLoop = 1;
        };

        if (element.is_hidden) {
            pokemonAbilities.innerText += element.ability.name + "(Hidden)";
        } else {
            pokemonAbilities.innerText += element.ability.name;
        };

    })
    

    let forms = data.forms
    //console.log(forms);

    forms.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });

    firstLoop = 0;
    forms.forEach(element => {
        //console.log(element);

        // if (firstLoop === 0) {
        //     pokemonForms.innerText += element.ability.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonForms.innerText += ", " + element.ability.name;
        // };

        if (firstLoop !== 0) {
            pokemonForms.innerText += ", "
        } else {
            // pokemonForms.innerText = "Forms: "
            firstLoop = 1;
        };

        pokemonForms.innerText += element.name;

    })


    let held_items = data.held_items;
    //console.log(heldItems);

    held_items.sort((a, b) => {
        if (a.item.name > b.item.name) {
            return 1;
        } else {
            return -1;
        }
    });

    firstLoop = 0;
    held_items.forEach(element => {
        //console.log(element);

        // if (firstLoop === 0) {
        //     pokemonHeldItems.innerText += element.type.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonHeldItems.innerText += ", " + element.type.name;
        // };

        if (firstLoop !== 0) {
            pokemonHeldItems.innerText += ", "
        } else {
            // pokemonHeldItems.innerText = "Held Items: "
            firstLoop = 1;
        };

        pokemonHeldItems.innerText += element.item.name;

    })


};
