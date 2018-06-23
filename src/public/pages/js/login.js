const login = new Vue({
    el: '#login',
    data: function () {
        return {
            response: "null",
            inputUsername: "",
            inputPassword: ""
        }
    },
    methods: {
        submitForm: function (message, event) {
            if (event) event.preventDefault();

            console.log('submit form')

            const loginPath = '/api/accounts/login';
            const loginEndpoint = MS_URL + loginPath;

            var hash = this.inputPassword;
            for (i = 0; i < 2000; i++) {
                hash = sha256(hash);
            }

            this.$http.post(loginEndpoint,
                {
                    handle: this.inputUsername,
                    password: hash,
                    key: hash,
                })
                .then(function (response) {

                    console.log('post response')
                    if (response.statusCode === 200) {
                        // get body data
                        this.response = response.body;
                        Vue.localStorage.set('mark-token', response.token);
                    } else {
                        console.log('invalid login')
                        // window.location = '/login';
                    }
                },
                    function (error) {
                        console.log('post error')
                        // error callback
                        console.log(error)
                        this.response = error;
                    });
        }
    }
})

