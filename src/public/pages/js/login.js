const loginEndpoint = MS_URL + '/api/accounts/login'

const login = new Vue({
    el: '#login',
    data: function () {
        return {
            inputUsername: "",
            inputPassword: ""
        }
    },
    methods: {
        submitForm: function (message, event) {
            console.log('submit form')
            if (event) event.preventDefault();

            console.log('submit form')


            var hash = hashPassword(this.inputPassword);

            this.$http.post(loginEndpoint, {
                handle: this.inputUsername,
                passwordh: hash,
                key: hash,
            })
                .then(function (response) {


                    if (response.status == 200) {
                        // get body data
                        localStorage.setItem(MS_TOKEN_KEY, response.data.token);
                        localStorage.setItem('mark-passwordh', hash);
                        console.log('token saved');
                        console.log('login end')
                        // redirect when finished
                        window.location = '/';
                    } else {
                        alert('invalid login');
                        // window.location = '/login';
                    }
                },
                    function (error) {
                        handleError(error);
                    });
        }
    }
})

