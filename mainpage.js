//Main JS function
//Purpose is to read in JSON file containing comps and append comps together using that information
document.addEventListener("DOMContentLoaded", function () {
    fetch("comps.JSON")
        .then(response => response.json())
        .then(data => {
            data.forEach(comp => {
                //Composition Container
                const compContainer = document.createElement("div");
                compContainer.classList.add("comp-container");
                //Champions List
                const compNameDiv = document.createElement("div");
                compNameDiv.classList.add("comp-name");
                compNameDiv.textContent = comp.compName;
                const champsListUl = document.createElement("ul");
                champsListUl.classList.add("champs-list", "horizontal");
                //Loop to add images to each respective champion and append to container
                for (let i = 1; i <= 9; i++) {
                    const champName = comp[`champ${i}`];
                    //If statement in case a comp contains < 9 champions
                    if (champName) {
                        const champLi = document.createElement("li");

                        const championContainer = document.createElement("div");
                        championContainer.classList.add("champion-container");

                        const champImg = document.createElement("img");
                        champImg.src = `./champs/${champName.toLowerCase()}.avif`;
                        champImg.alt = champName;

                        const champNameDiv = document.createElement("div");
                        champNameDiv.classList.add("champion-name");
                        champNameDiv.textContent = champName;

                        championContainer.appendChild(champImg);
                        championContainer.appendChild(champNameDiv);
                        champLi.appendChild(championContainer);
                        champsListUl.appendChild(champLi);
                    }
                }
                // Statistics Container
                const statsContainer = document.createElement("div");
                statsContainer.classList.add("stats-container", "horizontal");
                //Average Place
                const avgPlaceDiv = document.createElement("div");
                avgPlaceDiv.textContent = `Avg Place: ${comp.avgPlace}`;
                //Pick Rate
                const pickRateDiv = document.createElement("div");
                pickRateDiv.textContent = `Pick Rate: ${comp.pickRate}`;
                //Win Rate
                const winRateDiv = document.createElement("div");
                winRateDiv.textContent = `Win Rate: ${comp.winRate}`;
                //Top 4 Rate
                const top4RateDiv = document.createElement("div");
                top4RateDiv.textContent = `Top 4 Rate: ${comp.Top4Rate}`;
                //Append Stats
                statsContainer.appendChild(avgPlaceDiv);
                statsContainer.appendChild(pickRateDiv);
                statsContainer.appendChild(winRateDiv);
                statsContainer.appendChild(top4RateDiv);
                //Append Comps
                compContainer.appendChild(compNameDiv);
                compContainer.appendChild(champsListUl);
                compContainer.appendChild(statsContainer);
                //Append Comps to Main Container
                document.getElementById("main-container").appendChild(compContainer);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
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
            text: `The top 10 performing compositions from the last 2 days are being displayed.
            The statistics are pulled from games played in Platinum and above, with all Masters+ games being accounted for.
            Our information is pulled from MetaTFT which utilizes Riot's API to analyse match histories and determine perfomance.
            Each composition's statistics are time weighted, thus more recent data impacts each statistic more than previous data.
            This ensures the page reflects meta shifts relatively quickly.`
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

