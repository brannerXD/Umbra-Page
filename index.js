function checkAuth() {
    const loggedEmail = sessionStorage.getItem('loggedEmail');
    const selectedProfileId = sessionStorage.getItem('selectedProfileId');


    const currentPage = window.location.pathname.split('/').pop(); 

    if (!loggedEmail) {
        if (!['index.html', 'login.html', 'register.html'].includes(currentPage)) {
            window.location.href = 'index.html';
        }
    } else {
        if (!selectedProfileId && currentPage !== 'profiles.html') {
            window.location.href = 'profiles.html';
        }
        if (['login.html', 'register.html'].includes(currentPage)) {
            window.location.href = 'profiles.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);