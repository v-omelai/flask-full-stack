document.addEventListener('DOMContentLoaded', () => {
    const operationsForm = document.querySelector('form[name="operations"]');
    const operationsDiv = document.querySelector('div[name="operations"]');
    const cloned = operationsDiv.cloneNode(true);
    const addRow = document.getElementById('add-row');
    const removeRow = document.getElementById('remove-row');
    const calculate = document.getElementById('calculate');
    const [minRows, maxRows] = [1, 5];

    let row = 1;

    M.AutoInit();

    addRow.addEventListener('click', (e) => {
        if (row < maxRows) {
            row += 1;
            newElement = cloned.cloneNode(true);
            newElement.querySelector('[name=row-1-operator]').setAttribute('name', `row-${row}-operator`);
            newElement.querySelector('[name=row-1-operand]').setAttribute('name', `row-${row}-operand`);
            operationsForm.appendChild(newElement);
            M.AutoInit();
            removeRow.classList.remove('disabled');
        } 
        if (row == maxRows) {
            addRow.classList.add('disabled');
            M.toast({html: `Maximum rows: ${maxRows}`});
        }
    });

    removeRow.addEventListener('click', (e) => {
        if (row > minRows) {
            row -= 1;
            operationsForm.removeChild(operationsForm.lastChild);
            addRow.classList.remove('disabled');
        }
        if (row == minRows) {
            removeRow.classList.add('disabled');
            M.toast({html: `Minimum rows: ${minRows}`});
        }
    });

    calculate.addEventListener('click', (e) => {
        const formData = new FormData(operationsForm);
        const xhr = new XMLHttpRequest();
        let jsonData = {};

        for (const value of formData.values()) {
            if (value.trim() === '') return M.toast({html: 'Fields cannot be empty'});
        }
        xhr.open('POST', '/calculator/calculate', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                const result = JSON.parse(xhr.responseText);
                M.toast({html: `Result is: ${result.result}`});
            } else {
                M.toast({html: 'Something went wrong'});
            }
        };
        xhr.onerror = function() {
            M.toast({html: 'Something went wrong'});
        };
        formData.forEach((value, key) => jsonData[key] = value);
        xhr.send(JSON.stringify(jsonData));
    });
});
