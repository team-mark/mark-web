

const signupEndpoint = MS_URL + '/api/accounts/signup'
const validateEndpoint = MS_URL + '/api/accounts/signup-validate'

const signup = new Vue({
    el: '#signup',
    data: function () {
        return {
            response: "null",
            isActive: false,
            inputUsername: "",
            inputPassword: "",
            inputPhone: "",
            inputCode: ""
        }
    }, methods: {
        getConfirmationCode: function (message, event) {
            console.log('get code start')
            localStorage.setItem('mark-signup-active', response.state);

            if (event) event.preventDefault();
            var i;
            var hash = this.inputPassword;
            for (i = 0; i < 2000; i++) {
                hash = sha256(hash);
            }

            this.$http.post(signupEndpoint,
                {
                    handle: this.inputUsername,
                    phone: this.inputPhone,
                    passwordh: hash

                })
                .then(function (response) {

                    // get body data
                    this.response = response.body;
                    alert("A text will be sent to your phone shortly!");
                    console.log('Roll:', this.response.roll);
                    console.log('state', this.response.state);

                    localStorage.setItem('mark-signup-roll', response.roll);
                    localStorage.setItem('mark-signup-state', response.state);
                    console.log('roll/state saved');
                    console.log('get code end')

                }, function (error) {
                    // error callback
                    console.log(error)
                    this.response = error;
                });

            this.isActive = true;
        },
        submitForm: function (message, event) {
            console.log('verify start')

            this.$http.post(verifyEndpoint,
                {
                    handle: this.inputUsername,
                    phone: this.inputPassword,
                    passwordh: hash

                })
                .then(function (response) {

                    // get body data
                    this.response = response.body;

                    localStorage.setItem('mark-signup-roll', response.roll);
                    localStorage.setItem('mark-signup-state', response.state);
                    console.log('roll/state saved');
                    console.log('get code end')

                }, function (error) {
                    // error callback
                    console.log(error)
                    this.response = error;
                });


            console.log('verify end')
        }
    }
})