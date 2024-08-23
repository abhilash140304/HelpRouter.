#JAVASCRIPT

let userProfile = {
    username: '',
    email: '',
    phoneNumber: '',
    helpsCompleted: 0,
    badges: 0
};

function navigateTo(pageId) {
    let pages = document.querySelectorAll('.full-page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.remove('hidden');
        } else {
            page.classList.add('hidden');
        }
    });
}

function verifyCredentials() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let password = document.getElementById('password').value;

    if (username && email && phoneNumber && password) {
        userProfile.username = username;
        userProfile.email = email;
        userProfile.phoneNumber = phoneNumber;
    }
}
