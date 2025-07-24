const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  errorMsg.textContent = ''; // پاک کردن ارورها

  const fullName = document.getElementById('fullName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const passport = document.getElementById('passport').value.trim();
  const caseNumber = document.getElementById('caseNumber').value.trim();
  const accessCode = document.getElementById('accessCode').value.trim();

  try {
    console.log('شروع بارگذاری data.json ...');
    const response = await fetch('https://raw.githubusercontent.com/LYLOMALL/dashboard/main/data.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    console.log('کاربران بارگذاری شدند:', users);

    const user = users.find(u =>
      u.fullName === fullName &&
      u.lastName === lastName &&
      u.passport === passport &&
      u.caseNumber === caseNumber &&
      u.accessCode === accessCode
    );

    if (user) {
      console.log('یوزر یافت شد:', user);
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'dashboard.html';
    } else {
      errorMsg.textContent = 'اطلاعات وارد شده نادرست است.';
      console.log('کاربر یافت نشد');
    }
  } catch (error) {
    errorMsg.textContent = 'خطا در بارگذاری اطلاعات کاربران: ' + error.message;
    console.error('خطا در fetch:', error);
  }
});
