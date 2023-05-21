class UserService {
    username
    password
    static error = null

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    get username() {
        return this.username;
    }

    get password() {
        return this.password;
    }

    static authenticateUser(username, password) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' +
            username.username + '&password=' + password.password, true);
        xhr.responseType = 'json';
        xhr.send();

        let result
        xhr.onload = function () {
            if (xhr.status === 200) {
                UserService.error = null
                result = xhr.response;
                return result
            } else {
                return UserService.error = `Ошибка ${xhr.status}: ${xhr.statusText}`
            }
        };
    }
}

$('#login').click(function () {
    let username = $('#username');
    let password = $('#password');

    const resObj = new UserService(username, password)
    UserService.authenticateUser(resObj);
    if (UserService.error === null) {
        document.location.href = '/home';
    } else {
        alert(UserService.error);
    }
})

