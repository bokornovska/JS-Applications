function attachEvents() {


    //GET ALL ELEMENTS
    let inputElement = document.getElementById('location');
    let getButtonElement = document.getElementById('submit');
    let divDisplay = document.getElementById('forecast');
    let currentDiv = document.getElementById('current');
    let upcommingDiv = document.getElementById('upcoming');

    let baseUrl = `http://localhost:3030/jsonstore/forecaster`;

    //DEFINE WEATHER SYMBOLS
    let sunny = '&#x2600';
    let partlySunny = '&#x26C5';
    let overcast = '&#x2601';
    let rain = '&#x2614';
    let degrees = '&#176';

    let code = '';

    //DEFINE UPCOMMING AND WEATHER DIVS
    let divElementUpcomming = document.createElement('div');
    let divElementCurrent = document.createElement('div');

    //ADD EVENTLISTENER TO BTN

    getButtonElement.addEventListener('click', (e) => {

        divElementUpcomming.innerHTML = '';
        divElementCurrent.innerHTML = '';

        divElementUpcomming.setAttribute('class', 'forecast-info');
        divElementCurrent.setAttribute('class', 'forecasts');

        divDisplay.style.display = 'inline';

        fetch(`${baseUrl}/locations`)
            .then(response => response.json())
            .then(data => {
                console.log(data) // {code: 'london', name: 'London'}
                
                data.forEach(locInfoObject => {
                    if (locInfoObject.name === inputElement.value) {
                        code = locInfoObject.code;
                    };
                });

                fetch(`${baseUrl}/today/${code}`)
                    .then((response) => response.json())
                    .then((data) => {

                        let spanGroup = document.createElement('span');
                        let conditionSpan = document.createElement('span');
                        let temperatureSpan = document.createElement('span');
                        let locationSpan = document.createElement('span');
                        let spanwithIcon = document.createElement('span');

                        spanwithIcon.setAttribute('class', 'condition symbol');
                        spanGroup.setAttribute('class', 'condition');
                        temperatureSpan.setAttribute('class', 'forecast-data');
                        conditionSpan.setAttribute('class', 'forecast-data');
                        locationSpan.setAttribute('class', 'forecast-data');

                        locationSpan.textContent = data.name;
                        temperatureSpan.innerHTML = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;
                        conditionSpan.textContent = data.forecast.condition;

                        if (data.forecast.condition === 'Sunny') {
                            spanwithIcon.innerHTML = sunny;
                        } else if (data.forecast.condition === 'Partly sunny') {
                            spanwithIcon.innerHTML = partlySunny;
                        } else if (data.forecast.condition === 'Overcast') {
                            spanwithIcon.innerHTML = overcast;
                        } else if (data.forecast.condition === 'Rain') {
                            spanwithIcon.innerHTML = rain;
                        }

                        spanGroup.appendChild(locationSpan);
                        spanGroup.appendChild(temperatureSpan);
                        spanGroup.appendChild(conditionSpan);
                        divElementCurrent.appendChild(spanwithIcon);
                        divElementCurrent.appendChild(spanGroup);

                        currentDiv.appendChild(divElementCurrent);
                    })
                    .catch(error => {
                        let label = document.querySelector('.label');
                        label.textContent = 'Error';
                    })

                fetch(`${baseUrl}/upcoming/${code}`)                        // Взимаме заявка за следващите дни 
                    .then((response) => response.json())                    // Взимаме json()
                    .then((data) => {                                       // Получаваме масив от обекти 
                        let nextDays = data.forecast;                       // Взимаме масива получен в пропъртито forecast 
                        nextDays.forEach((day) => {                         // Минаваме по всеки един от трите дни 

                            let spanGroup = document.createElement("span");     // Създаваме спан елементи 
                            let conditionSpan = document.createElement("span");
                            let temperatureSpan = document.createElement("span");
                            let iconSpan = document.createElement("span");

                            spanGroup.setAttribute("class", "upcoming");                // Слагаме им клас
                            conditionSpan.setAttribute("class", "forecast-data");
                            temperatureSpan.setAttribute("class", "forecast-data");
                            iconSpan.setAttribute("class", "symbol");

                            temperatureSpan.innerHTML = `${day.low}${degrees}/${day.high}${degrees}`;   // Слагаме температурата
                            conditionSpan.textContent = day.condition;                                  // Слагаме времето 

                            let condition = day.condition;                      // Взимаме времето в променлива 
                            if (condition === "Sunny") {                        // Проверяваме какво е и го слагаме като иконка 
                                iconSpan.innerHTML = sunny;
                            } else if (condition === "Partly sunny") {
                                iconSpan.innerHTML = partlySunny;
                            } else if (condition === "Overcast") {
                                iconSpan.innerHTML = overcast;
                            } else if (condition === "Rain") {
                                iconSpan.innerHTML = rain;
                            }

                            spanGroup.appendChild(iconSpan);                // Аппендваме елементите поред 
                            spanGroup.appendChild(temperatureSpan);
                            spanGroup.appendChild(conditionSpan);
                            divElementUpcomming.appendChild(spanGroup);
                            upcommingDiv.appendChild(divElementUpcomming);
                        })
                    })


            })
    
    });
}
        
attachEvents()