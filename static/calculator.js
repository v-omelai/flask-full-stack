document.addEventListener('DOMContentLoaded', () => {
    const operationsForm = document.querySelector('form[name="operations"]');
    const operationsDiv = document.querySelector('div[name="operations"]');
    const cloned = operationsDiv.cloneNode(true);
    const addRow = document.getElementById('add-row');
    const removeRow = document.getElementById('remove-row');
    const calculate = document.getElementById('calculate');
    const easterEgg = document.getElementById('easter-egg');
    const [minRows, maxRows] = [1, 5];

    let row = 1;

    M.AutoInit();

    addRow.addEventListener('click', async (e) => {
        if (row < maxRows) {
            row += 1;
            const newElement = cloned.cloneNode(true);
            newElement.querySelector('[name=row-1-operator]').setAttribute('name', `row-${row}-operator`);
            newElement.querySelector('[name=row-1-operand]').setAttribute('name', `row-${row}-operand`);
            operationsForm.appendChild(newElement);
            M.AutoInit();
            removeRow.classList.remove('disabled');
        }
        if (row === maxRows) {
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
        if (row === minRows) {
            removeRow.classList.add('disabled');
            M.toast({html: `Minimum rows: ${minRows}`});
        }
    });

    calculate.addEventListener('click', async (e) => {
        const formData = new FormData(operationsForm);
        let jsonData = {};

        for (const value of formData.values()) {
            if (value.trim() === '') return M.toast({html: 'Fields cannot be empty'});
        }

        try {
            const response = await fetch('/calculator/calculate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(Object.fromEntries(formData))
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            const { value, error } = data;

            if (error === 'ZeroDivisionError') {
                M.Modal.getInstance(easterEgg).open();
            } else {
                M.toast({html: `Value is: ${value}`});
            }
        } catch (error) {
            M.toast({html: error.message});
        }
    });
});
