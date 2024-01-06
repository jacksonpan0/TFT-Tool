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
                //Loop to add images and names to each respective champion and append to container
                comp.champs.forEach(champName => {
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
                });
                //Statistics Container
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
                //More Info Container
                const moreInfoContainer = document.createElement("div");
                moreInfoContainer.classList.add("more-info-container");
                //Text Container
                const carryChampsTextDiv = document.createElement("div");
                carryChampsTextDiv.classList.add("carry-champs-text");
                carryChampsTextDiv.textContent = "Carry Champs";
                //Button
                const moreInfoBtn = document.createElement("button");
                moreInfoBtn.classList.add("more-info-btn");
                moreInfoBtn.textContent = "More Info";
                //Hidden
                const moreInfoContent = document.createElement("div");
                moreInfoContent.classList.add("more-info-content", "hidden");
                moreInfoBtn.addEventListener("click", function () {
                    // Toggle the "hidden" class on carryDropdownContent
                    moreInfoContent.classList.toggle("hidden");
                });
                //Champions List
                const carryChampsListUl = document.createElement("ul");
                carryChampsListUl.classList.add("champs-list", "horizontal");
                //Loop to add images and names to each respective champion and append to container
                comp.carryChamps.forEach(carryChamp => {
                    const champLi = document.createElement("li");
                    //Div creation
                    const championContainer = document.createElement("div");
                    championContainer.classList.add("champion-container");
                    //Name and Img containers
                    const champImg = document.createElement("img");
                    champImg.src = `./champs/${carryChamp.name.toLowerCase()}.avif`;
                    champImg.alt = carryChamp.name;
                    const champNameDiv = document.createElement("div");
                    champNameDiv.classList.add("champion-name");
                    champNameDiv.textContent = carryChamp.name;
                    //Append           
                    championContainer.appendChild(champImg);
                    championContainer.appendChild(champNameDiv);         
                    // Check if the carryChamp has items
                    if (carryChamp.items && carryChamp.items.length > 0) {
                        const itemsList = document.createElement("ul");
                        itemsList.classList.add("items-list", "horizontal"); // Added "horizontal" class
                        carryChamp.items.forEach(item => {
                            const itemLi = document.createElement("li");
                            itemLi.classList.add("item"); // Added "item" class for styling
                            const itemImg = document.createElement("img");
                            itemImg.src = `${item.image}`;
                            itemImg.alt = item.name;
                            itemLi.appendChild(itemImg);
                            itemsList.appendChild(itemLi);
                        });
                        championContainer.appendChild(itemsList);
                    }
                    champLi.appendChild(championContainer);
                    carryChampsListUl.appendChild(champLi);
                });
                //Append More Info elements
                moreInfoContainer.appendChild(moreInfoBtn);   
                moreInfoContent.appendChild(carryChampsTextDiv);
                moreInfoContent.appendChild(carryChampsListUl);
                moreInfoContainer.appendChild(moreInfoContent);
                //Append Comps
                compContainer.appendChild(compNameDiv);
                compContainer.appendChild(champsListUl);
                compContainer.appendChild(statsContainer);
                compContainer.appendChild(moreInfoContainer);
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
            text: `TFT Tool displays the top 10 performing comps from the last 2 days. 
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
