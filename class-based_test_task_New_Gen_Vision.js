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

    static authenticateUser(user) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' +
            user.username + '&password=' + user.password, true);
        xhr.responseType = 'json';
        xhr.send();

        let result
        xhr.onload = function () {
            if (xhr.status === 200) {
                UserService.error = null
                result = JSON.parse(xhr.response);
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

    const userObj = new UserService(username,password)
    UserService.authenticateUser(userObj);
    if (UserService.error === null) {
        document.location.href = '/home';
    } else {
        alert(UserService.error);
    }
})

