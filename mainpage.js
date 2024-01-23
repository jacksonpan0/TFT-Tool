//Main JS function
//Purpose is to read in JSON file containing comps and append comps together using that information
document.addEventListener("DOMContentLoaded", function () {
    fetch("comps.JSON")
        .then(response => response.json())
        .then(data => {
            data.forEach(comp => {
                const compContainer = createCompContainer(comp);
                document.getElementById("main-container").appendChild(compContainer);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
//Function to create and append each component of the comp container
function createCompContainer(comp) {
    const compContainer = createElement("div", ["comp-container"]);

    compContainer.appendChild(createCompName(comp));
    compContainer.appendChild(createChampsList(comp));
    compContainer.appendChild(createStatsContainer(comp));
    compContainer.appendChild(createMoreInfoContainer(comp));

    return compContainer;
}
//Function to create the comp name
function createCompName(comp) {
    return createElementWithText("div", ["comp-name"], comp.compName);
}
//Function to create the list of champions
function createChampsList(comp) {
    //Horizontal element styling
    const champsListUl = createElement("ul", ["champs-list", "horizontal"]);
    //For-loop to append champions to list
    comp.champs.forEach(champName => {
        const champLi = createElement("li");
        champLi.appendChild(createChampionContainer(champName));
        champsListUl.appendChild(champLi);
    });

    return champsListUl;
}
//Function to create a container for each champ in the comp
function createChampionContainer(champName) {
    const championContainer = createElement("div", ["champion-container"]);
    //Get name and img from JSON
    const champImg = createElement("img", [], "", { src: `./champs/${champName.toLowerCase()}.avif`, alt: champName });
    const champNameDiv = createElementWithText("div", ["champion-name"], champName);

    championContainer.appendChild(champImg);
    championContainer.appendChild(champNameDiv);

    return championContainer;
}
function createAugmentContainer(augmentName) {
    const augmentContainer = createElement("div", ["augment-container"]);
    //Get name and img from JSON
    const augmentNameDiv = createElementWithText("div", ["augment-name"], augmentName);

    augmentContainer.appendChild(augmentNameDiv);

    return augmentContainer;
}
//Function to create container for stats
function createStatsContainer(comp) {
    //Horizontal element styling
    const statsContainer = createElement("div", ["stats-container", "horizontal"]);

    const statsElements = [
        { label: "Avg Place", value: comp.avgPlace },
        { label: "Pick Rate", value: comp.pickRate },
        { label: "Win Rate", value: comp.winRate },
        { label: "Top 4 Rate", value: comp.Top4Rate }
    ];
    //For-loop to pull info from JSON
    statsElements.forEach(stat => {
        const statDiv = createElementWithText("div", [], `${stat.label}: ${stat.value}`);
        statsContainer.appendChild(statDiv);
    });

    return statsContainer;
}
//Function to create dropdown more info container
function createMoreInfoContainer(comp) {
    const moreInfoContainer = createElement("div", ["more-info-container"]);
    //Hidden element styling plus button functionality
    const moreInfoBtn = createElementWithText("button", ["more-info-btn"], "More Info");
    const moreInfoContent = createElement("div", ["more-info-content", "hidden"]);
    moreInfoBtn.addEventListener("click", function () {
        moreInfoContent.classList.toggle("hidden");
    });
    //Carry Champs
    const carryChampsTextDiv = createElementWithText("div", ["carry-champs-text"], "Carry Champs");
    //Horizontal element styling
    const carryChampsListUl = createElement("ul", ["champs-list", "horizontal"]);
    //For-loop to read carry champ and their best items in
    comp.carryChamps.forEach(carryChamp => {
        const champLi = createElement("li");
        champLi.appendChild(createChampionContainer(carryChamp.name));

        if (carryChamp.items) {
            const itemsList = createElement("ul", ["items-list", "horizontal"]);
            carryChamp.items.forEach(item => {
                const itemLi = createElement("li", ["item"]);
                const itemImg = createElement("img", [], "", { src: `${item.image}`, alt: item.name });
                itemLi.appendChild(itemImg);
                itemsList.appendChild(itemLi);
            });
            champLi.appendChild(itemsList);
        }

        carryChampsListUl.appendChild(champLi);
    });
    //Augments
    const bestAugmentsTextDiv = createElementWithText("div", ["best-augments-text"], "Best Augments");
    //Horizontal element styling
    const bestAugmentsListUl = createElement("ul", ["augment-list", "horizontal"]);
    //For-loop to read best augments
    comp.bestAugments.forEach(bestAugment => {
        const augmentLi = createElement("li");
        augmentLi.appendChild(createAugmentContainer(bestAugment.name));

        if (bestAugment.items) {
            const itemsList = createElement("ul", ["augments-list", "horizontal"]);
            bestAugment.items.forEach(item => {
                const itemLi = createElement("li", ["augment"]);
                const augmentImg = createElement("img", [], "", { src: `${item.image}`, alt: item.name });
                itemLi.appendChild(augmentImg);
                itemsList.appendChild(itemLi);
            });
            augmentLi.appendChild(itemsList);
        }
        bestAugmentsListUl.appendChild(augmentLi);
    });




    moreInfoContainer.appendChild(moreInfoBtn);
    moreInfoContent.appendChild(carryChampsTextDiv);
    moreInfoContent.appendChild(carryChampsListUl);
    moreInfoContent.appendChild(bestAugmentsTextDiv);
    moreInfoContent.appendChild(bestAugmentsListUl);
    moreInfoContainer.appendChild(moreInfoContent);

    return moreInfoContainer;
}
//Function to simplify creation of element
function createElement(tag, classes = [], text = "", attributes = {}) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = text;
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
}
//Function to simplify creation of element w/ text
function createElementWithText(tag, classes = [], text = "") {
    const element = createElement(tag, classes);
    element.textContent = text;
    return element;
}

//More Info JS Function
//Purpose is to allow users to get an idea to why certain comps are being shown, the methodology behind it, and the frequency in updates
document.addEventListener("DOMContentLoaded", function () {
    const infoLink = document.getElementById("info-link");
    const popupInfo = document.getElementById("popup-info");
    const popupBox = document.getElementById("popup-box");
    const closePopupBtn = document.getElementById("close-popup");

    //Text data inserted into the popup
    const infoData = {
        About: {
            gradient: 'linear-gradient(to right, #ff9900, #ff0066)',    
            text: `TFT Tool displays the top 15 performing comps from the last 2 days. 
            Our statistics are pulled from games played in Platinum+, with all Masters+ games accounted for.  
            TFT Tool sources stats and comps from MetaTFT which utilizes Riot’s API combined with Clustering Method to determine comp performance. 
            Each comp’s stats are time-weighted, thus more recent data impacts each stat more than previous data. 
            The comps being displayed reflected meta-shifts relatively quickly while avoiding survivorship bias.`
        }
    };

    //Show popup
    infoLink.addEventListener("click", function (event) {
        event.preventDefault();
        showPopup('About');
    });

    //Hide popup
    closePopupBtn.addEventListener("click", function () {
        hidePopup();
    });

    //Remove hidden class
    function showPopup(section) {
        console.log(`Showing ${section} section`);
        popupInfo.innerHTML = `<span style="background: ${infoData[section].gradient}; color: white;">${section}</span><br>${infoData[section].text}`;
        popupBox.classList.remove("hidden");
    }

    //Add hidden class
    function hidePopup() {
        popupBox.classList.add("hidden");
    }
});
