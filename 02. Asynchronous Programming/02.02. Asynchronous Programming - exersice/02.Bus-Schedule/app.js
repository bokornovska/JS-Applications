function solve() {

    // взимаме полето и двата бутона:
    const labelElement = document.querySelector('.info');
    const departBtnElement = document.getElementById('depart');
    const arriveBtnElement = document.getElementById('arrive');

    //създаваме обект с първата спирка:
    let stop = {
        next: 'depot'
    };



    async function depart() {
        //get info for next stop
        //display info
        departBtnElement.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const res = await fetch(url);

        if (res.status !== 200) {
            labelElement.textContent = 'Error';
            arriveBtnElement.disabled = true;
            departBtnElement.disabled = true;
        };
        
        stop = await res.json();

        // console.log(stop) => {name: 'Depot', next: '0361'};

        labelElement.textContent = `Next stop ${stop.name}`;

        arriveBtnElement.disabled = false;
    }

    function arrive() {

        labelElement.textContent = `Arriving at ${stop.name}`;

        arriveBtnElement.disabled = true;
        departBtnElement.disabled = false;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();