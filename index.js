
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
const colorURL = "https://pokeapi.co/api/v2/pokemon-color/";
const habitatURL = "https://pokeapi.co/api/v2/pokemon-habitat/";
const shapeURL = "https://pokeapi.co/api/v2/pokemon-shape/";

// const colorTextBox = document.getElementById("txtColor");
const colorDropDown = document.getElementById("ddColor");
const habitatDropDown = document.getElementById("ddHabitat");
const shapeDropDown = document.getElementById("ddShape");

//const btnSearch = document.getElementById("btnSearch");
//btnSearch.style.display = 'none';

//const searchForm = document.getElementById("frmSearch");

colorDropDown.addEventListener('change', getResults); 
habitatDropDown.addEventListener('change', getResults); 
shapeDropDown.addEventListener('change', getResults); 
//searchForm.addEventListener('submit', getResults); 

const errorHeader = document.getElementById("h2Error");
const h2PokemonError = document.getElementById("h2PokemonError");
const resultsHeader = document.getElementById("h2Results");
const h3SearchedOn = document.getElementById("h3SearchedOn");

const detailsDiv = document.getElementById("pokemonDetails");

const pokemonSprites = document.getElementById("pokemonSprites");
const front_default = document.getElementById("front_default");
const front_shiny = document.getElementById("front_shiny");
const front_female = document.getElementById("front_female");
const front_shiny_female = document.getElementById("front_shiny_female");
const back_default = document.getElementById("back_default");
const back_shiny = document.getElementById("back_shiny");
const back_female = document.getElementById("back_female");
const back_shiny_female = document.getElementById("back_shiny_female");
const front_defaultDiv = document.getElementById("front_defaultDiv");
const front_shinyDiv = document.getElementById("front_shinyDiv");
const front_femaleDiv = document.getElementById("front_femaleDiv");
const front_shiny_femaleDiv = document.getElementById("front_shiny_femaleDiv");
const back_defaultDiv = document.getElementById("back_defaultDiv");
const back_shinyDiv = document.getElementById("back_shinyDiv");
const back_femaleDiv = document.getElementById("back_femaleDiv");
const back_shiny_femaleDiv = document.getElementById("back_shiny_femaleDiv");

// const h5Height = document.getElementById("h5Height");
// const h5Weight = document.getElementById("h5Weight");
// const h5Forms = document.getElementById("h5Forms");
// const h5Types = document.getElementById("h5Types");
// const h5HeldItems = document.getElementById("h5HeldItems");
// const h5Abilities = document.getElementById("h5Abilities");
// const h5Moves = document.getElementById("h5Moves");
const heightDiv = document.getElementById("heightDiv");
const weightDiv = document.getElementById("weightDiv");
const formsDiv = document.getElementById("formsDiv");
const typesDiv = document.getElementById("typesDiv");
const heldItemsDiv = document.getElementById("heldItemsDiv");
const abilitiesDiv = document.getElementById("abilitiesDiv");
const movesDiv = document.getElementById("movesDiv");

const pokemonName = document.getElementById("pokemonName");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");

const pokemonTypes = document.getElementById("pokemonTypes");

const pokemonMoves = document.getElementById("pokemonMoves");

const pokemonAbilities = document.getElementById("pokemonAbilities");

const pokemonForms = document.getElementById("pokemonForms");

const pokemonHeldItems = document.getElementById("pokemonHeldItems");

detailsDiv.style.display = 'none';
// h5Height.style.display = 'none';
// h5Weight.style.display = 'none';
// h5Forms.style.display = 'none';
// h5Types.style.display = 'none';
//h5HeldItems.style.display = 'none';
// h5Abilities.style.display = 'none';
// h5Moves.style.display = 'none';
heightDiv.style.display = 'none';
weightDiv.style.display = 'none';
formsDiv.style.display = 'none';
typesDiv.style.display = 'none';
heldItemsDiv.style.display = 'none';
abilitiesDiv.style.display = 'none';
movesDiv.style.display = 'none';

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
            h3SearchedOn.innerHTML = "Searched: Color = " + colorDropDown.value;
            // h3SearchedOn.style.display = 'flex';
        } else if (habitatDropDown.value != "") {
            URL = habitatURL + habitatDropDown.value;
            h3SearchedOn.innerHTML = "Searched: Habitat = " + habitatDropDown.value;
            // h3SearchedOn.style.display = 'flex';
        } else if (shapeDropDown.value != "") {
            URL = shapeURL + shapeDropDown.value;
            h3SearchedOn.innerHTML = "Searched: Shape = " + shapeDropDown.value;
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

    // h5Height.style.display = 'none';
    // h5Weight.style.display = 'none';
    // h5Forms.style.display = 'none';
    // h5Types.style.display = 'none';
    // h5HeldItems.style.display = 'none';
    // h5Abilities.style.display = 'none';
    // h5Moves.style.display = 'none';
    heightDiv.style.display = 'none';
    weightDiv.style.display = 'none';
    formsDiv.style.display = 'none';
    typesDiv.style.display = 'none';
    heldItemsDiv.style.display = 'none';
    abilitiesDiv.style.display = 'none';
    movesDiv.style.display = 'none';

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

    pokemonName.innerHTML = data.name;

    let sprites = data.sprites;
    //console.log(sprites);

    pokemonSprites.style.display = 'flex';

    if (sprites.front_default !== "") {
        front_default.style.display = 'flex';
        front_defaultDiv.style.display = 'flex';
        front_default.src = sprites.front_default;
    } else {
        front_default.style.display = 'none';
        front_defaultDiv.style.display = 'none';
        front_default.src = "";
    };
    if (sprites.front_shiny !== "") {
        front_shiny.style.display = 'flex';
        front_shinyDiv.style.display = 'flex';
        front_shiny.src = sprites.front_shiny;
    } else {
        front_shiny.style.display = 'none';
        front_shinyDiv.style.display = 'none';
        front_shiny.src = "";
    };
    // if (sprites.front_female !== "") {
    //     front_female.style.display = 'flex';
    //     front_femaleDiv.style.display = 'flex';
    //     front_female.src = sprites.front_female;
    // } else {
        front_female.style.display = 'none';
        front_femaleDiv.style.display = 'none';
        front_female.src = "";
    // };
    // if (sprites.front_shiny_female !== "") {
    //     front_shiny_female.style.display = 'flex';
    //     front_shiny_femaleDiv.style.display = 'flex';
    //     front_shiny_female.src = sprites.front_shiny_female;
    // } else {
        front_shiny_female.style.display = 'none';
        front_shiny_femaleDiv.style.display = 'none';
        front_shiny_female.src = "";
    // };
    if (sprites.back_default !== "") {
        back_default.style.display = 'flex';
        back_defaultDiv.style.display = 'flex';
        back_default.src = sprites.back_default;
    } else {
        back_default.style.display = 'none';
        back_defaultDiv.style.display = 'none';
        back_default.src = "";
    };
    if (sprites.back_shiny !== "") {
        back_shiny.style.display = 'flex';
        back_shinyDiv.style.display = 'flex';
        back_shiny.src = sprites.back_shiny;
    } else {
        back_shiny.style.display = 'none';
        back_shinyDiv.style.display = 'none';
        back_shiny.src = "";
    };
    // if (sprites.back_female !== "") {
    //     back_female.style.display = 'flex';
    //     back_femaleDiv.style.display = 'flex';
    //     back_female.src = sprites.back_female;
    // } else {
        back_female.style.display = 'none';
        back_femaleDiv.style.display = 'none';
        back_female.src = "";
    // };
    // if (sprites.back_shiny_female !== "") {
    //     back_shiny_female.style.display = 'flex';
    //     back_shiny_femaleDiv.style.display = 'flex';
    //     back_shiny_female.src = sprites.back_shiny_female;
    // } else {
        back_shiny_female.style.display = 'none';
        back_shiny_femaleDiv.style.display = 'none';
        back_shiny_female.src = "";
    // };


    if (data.height != "") {
        // h5Height.style.display = 'flex';
        heightDiv.style.display = 'flex';
        // pokemonHeight.innerText = "Height: " + data.height;
        pokemonHeight.innerHTML = data.height;
    } else {
        // h5Height.style.display = 'none';
        heightDiv.style.display = 'none';
    };

    if (data.weight != "") {
        // h5Weight.style.display = 'flex';
        weightDiv.style.display = 'flex';
        // pokemonWeight.innerText = "Height: " + data.height;
        pokemonWeight.innerHTML = data.weight;
    } else {
        // h5Weight.style.display = 'none';
        weightDiv.style.display = 'none';
    };


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
        //     pokemonTypes.innerHTML += element.type.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonTypes.innerHTML += ", " + element.type.name;
        // };

        if (firstLoop !== 0) {
            pokemonTypes.innerHTML += ", "
        } else {
            // pokemonTypes.innerHTML = "Types: "
            firstLoop = 1;
        };

        pokemonTypes.innerHTML += element.type.name;

        // h5Types.style.display = 'flex';
        typesDiv.style.display = 'flex';

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
        //     pokemonMoves.innerHTML += element.move.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonMoves.innerHTML += ", " + element.move.name;
        // };

        if (firstLoop !== 0) {
            pokemonMoves.innerHTML += ", "
        } else {
            // pokemonMoves.innerHTML = "Moves: "
            firstLoop = 1;
        };

        pokemonMoves.innerHTML += element.move.name;

        // h5Moves.style.display = 'flex';
        movesDiv.style.display = 'flex';
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
        //     pokemonAbilities.innerHTML += element.ability.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonAbilities.innerHTML += ", " + element.ability.name;
        // };

        if (firstLoop !== 0) {
            pokemonAbilities.innerHTML += ", "
        } else {
            // pokemonAbilities.innerHTML = "Abilities: "
            firstLoop = 1;
        };

        if (element.is_hidden) {
            pokemonAbilities.innerHTML += element.ability.name + "(Hidden)";
        } else {
            pokemonAbilities.innerHTML += element.ability.name;
        };

        // h5Abilities.style.display = 'flex';
        abilitiesDiv.style.display = 'flex';
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
        //     pokemonForms.innerHTML += element.ability.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonForms.innerHTML += ", " + element.ability.name;
        // };

        if (firstLoop !== 0) {
            pokemonForms.innerHTML += ", "
        } else {
            // pokemonForms.innerHTML = "Forms: "
            firstLoop = 1;
        };

        pokemonForms.innerHTML += element.name;

        // h5Forms.style.display = 'flex';
        formsDiv.style.display = 'flex';

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
        //     pokemonHeldItems.innerHTML += element.type.name;
        //     firstLoop = 1;
        // } else {
        //     pokemonHeldItems.innerHTML += ", " + element.type.name;
        // };

        if (firstLoop !== 0) {
            pokemonHeldItems.innerHTML += ", "
        } else {
            // pokemonHeldItems.innerHTML = "Held Items: "
            firstLoop = 1;
        };

        pokemonHeldItems.innerHTML += element.item.name;

        //h5HeldItems.style.display = 'flex';
        heldItemsDiv.style.display = 'flex';

    })


};
