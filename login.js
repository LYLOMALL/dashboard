const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const fullName = document.getElementById('fullName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const passport = document.getElementById('passport').value.trim();
  const caseNumber = document.getElementById('caseNumber').value.trim();
  const accessCode = document.getElementById('accessCode').value.trim();

  // بارگذاری data.json
  try {
    const response = await fetch('https://raw.githubusercontent.com/LYLOMALL/dashboard/main/data.json');
    const users = await response.json();

    // جستجو در بین کاربران
    const user = users.find(u => 
      u.fullName === fullName &&
      u.lastName === lastName &&
      u.passport === passport &&
      u.caseNumber === caseNumber &&
      u.accessCode === accessCode
    );

    if (user) {
      // ذخیره اطلاعات یوزر در sessionStorage جهت استفاده در داشبورد
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      // انتقال به داشبورد
      window.location.href = 'dashboard.html';
    } else {
      errorMsg.textContent = 'اطلاعات وارد شده نادرست است.';
    }

  } catch (error) {
    errorMsg.textContent = 'خطا در بارگذاری اطلاعات کاربران.';
  }
});
