document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-button');
    const leaveButton = document.getElementById('leave-button');
    const loadingOverlay = document.getElementById('loading-overlay');
    const resultMessage = document.getElementById('result-message');
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('lastName');
    const birthDateInput = document.getElementById('birthDate');
    const passportNumberInput = document.getElementById('passportNumber');
    const cuNumberInput = document.getElementById('cuNumber');
    const inputs = [nameInput, lastNameInput, birthDateInput, passportNumberInput, cuNumberInput];
    const container = document.getElementById('container');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        const data = {
            name: nameInput.value,
            lastName: lastNameInput.value,
            birthDate: birthDateInput.value,
            passportNumber: passportNumberInput.value,
            cuNumber: cuNumberInput.value
        };

        loadingOverlay.style.display = 'block';
        resultMessage.style.display = 'none';

        setTimeout(function() {
            loadingOverlay.style.display = 'none';
            checkData(data);
        }, 3000);
    });

    leaveButton.addEventListener('click', function(event) {
        event.preventDefault();
        alert('ترک اپلیکشن');
    });

    function checkData(data) {
        fetch('data.json')
            .then(response => response.json())
            .then(jsonData => {
                const matchedUser = jsonData.find(user =>
                    user.name === data.name &&
                    user.lastName === data.lastName &&
                    user.birthDate === data.birthDate &&
                    user.passportNumber === data.passportNumber &&
                    user.cuNumber === data.cuNumber
                );

                if (matchedUser) {
                    const resultText = document.getElementById('result-text');
                    resultText.textContent = matchedUser.message;
                    resultMessage.style.display = 'block';

                    // ساخت جدول
                    const table = document.getElementById('info-table');
                    table.innerHTML = ''; // پاک کردن جدول قبلی

                    // اضافه کردن هدر جدول
                    let headerRow = table.insertRow();
                    let headers = ['اسم', 'تخلص', 'تاریخ تولد', 'نمبر پاسپورت', 'نمبر سی یو'];
                    headers.forEach(headerText => {
                        let header = document.createElement('th');
                        header.textContent = headerText;
                        headerRow.appendChild(header);
                    });

                    // اضافه کردن ردیف اطلاعات
                    let dataRow = table.insertRow();
                    let dataValues = [matchedUser.name, matchedUser.lastName, matchedUser.birthDate, matchedUser.passportNumber, matchedUser.cuNumber];
                    dataValues.forEach(dataValue => {
                        let cell = document.createElement('td');
                        cell.textContent = dataValue;
                        dataRow.appendChild(cell);
                    });

                    hideInputs();

                    setTimeout(function() {
                        resetForm();
                    }, 300000); // 5 minutes
                } else {
                    resultMessage.textContent = 'اطلاعات شما مطابقت ندارد.';
                    resultMessage.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultMessage.textContent = 'خطا در دریافت اطلاعات.';
                resultMessage.style.display = 'block';
            });
    }

    function hideInputs() {
        inputs.forEach(input => {
            input.classList.add('hidden');
        });
        submitButton.classList.add('hidden');
    }

    function resetForm() {
        inputs.forEach(input => {
            input.classList.remove('hidden');
            input.value = '';
        });
        submitButton.classList.remove('hidden');
        resultMessage.style.display = 'none';

        // پاک کردن جدول هنگام ریست شدن فرم
        const table = document.getElementById('info-table');
        table.innerHTML = '';
    }
});
