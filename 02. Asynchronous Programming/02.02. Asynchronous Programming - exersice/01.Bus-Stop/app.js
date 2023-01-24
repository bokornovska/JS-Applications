async function getInfo() {

    //вземаме инпут полето:
    let stopId = document.getElementById('stopId').value;

    //взимаме полетата за резултата:
    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');


    //създаваме променлива за url адреса:
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    // //ЗАЯВКА ДО СЪРВЪРА:
    // const res = await fetch(url);

    // //парсваме към JSON:
    // const data = await res.json();

    
    // console.log(data);
    // {
        // buses:{20: 11, 22: 4},
        // name:"Centralni Hali" => data.name
        // }
        //          
        
    // след това ги местим в try =>
    try {

        stopNameElement.textContent = 'Loading...';
        timeTableElement.replaceChildren(); //clear the results before new request
        //ЗАЯВКА ДО СЪРВЪРА:
        const res = await fetch(url);

        //проверяваме дали номера на спирката съществува:
        if(res.status !== 200){
            throw new Error('Stop ID not found!');
        }

        //парсваме към JSON:
        const data = await res.json();

        //пълним полето за име на спирката с текст:
        stopNameElement.textContent = data.name;

        //обект => масив и минаваме по масива:
        Object.entries(data.buses).forEach(b => {
            // console.log(b)  //['20', 11]  //  ['22', 4];

            // създаваме ли елемент с text content и прикрепяме към ul.
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timeTableElement.appendChild(liElement);
        })

    } catch (error) {
        stopNameElement.textContent = 'Error';
    }

}