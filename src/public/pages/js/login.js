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
            if (event) event.preventDefault();

            console.log('submit form')


            var hash = this.inputPassword;
            for (i = 0; i < 2000; i++) {
                hash = sha256(hash);
            }

            axios.post(loginEndpoint,
                {
                    handle: this.inputUsername,
                    passwordh: hash,
                    key: hash,
                })
                .then(function (response) {

                    console.log('post response')
                    console.log(response)
                    this.response = response.body;
                    console.log("response status:" + response.status);

                    if (response.status == 200) {
                        // get body data
                        localStorage.setItem('mark-access-token', response.data.token);
                        console.log('token saved');
                        console.log('login end')
                        // redirect when finished
                        window.location = '/';
                    } else {
                        console.log('invalid login');
                        // window.location = '/login';
                    }
                },
                    function (error) {
                        console.log('post error')
                        // error callback
                        console.log(error)
                    });
        }
    }
})

