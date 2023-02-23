async function solve() {

    const url = 'http://localhost:3030/jsonstore/collections/students';

    const table = document.querySelector('#results tbody');

    const response = await fetch(url);

    const data = await response.json();

    Object.values(data).forEach(s => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const fNumber = s.facultyNumber;
        const grade = Number(s.grade);

        const tr = document.createElement('tr');

        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;


        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;

        const fNumberCell = tr.insertCell(2);
        fNumberCell.innerText = fNumber;

        const gradeCell = tr.insertCell(2);
        gradeCell.innerText = grade;

        table.appendChild(tr)
    });

    const subbmitBtn = document.getElementById('submit');

    subbmitBtn.addEventListener('click', onSumbmit);

    async function onSumbmit(e) {
        e.preventDefault();

        const firtsNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (isNaN(facNumberInput.value) || isNaN(gradeInput.value)) {
            return alert('Wrong input data')
        };

        if(firtsNameInput.value !== '' && lastNameInput.value !== ''&& facNumberInput.value !=='' && gradeInput.value !== ''){
            const response = await fetch(url, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName:firtsNameInput.value,
                    lastName:lastNameInput.value,
                    facultyNumber:facNumberInput.value,
                    grade:gradeInput.value
                })
    
            });
    
            const tr = document.createElement('tr');
    
            const firstNameCell = tr.insertCell(0);
            firstNameCell.innerText = firtsNameInput.value;
    
    
            const lastNameCell = tr.insertCell(1);
            lastNameCell.innerText = lastNameInput.value;
    
            const fNumberCell = tr.insertCell(2);
            fNumberCell.innerText = facNumberInput.value;
    
            const gradeCell = tr.insertCell(2);
            gradeCell.innerText = gradeInput.value;
    
            table.appendChild(tr);
        }

        firtsNameInput.value = '';
        lastNameInput.value = '';
        facNumberInput.value = '';
        gradeInput.value = '';
    }
}

solve()