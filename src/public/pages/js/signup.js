

const signupEndpoint = MS_URL + '/api/accounts/signup'
const validateEndpoint = MS_URL + '/api/accounts/signup-validate'

const signup = new Vue({
    el: '#signup',
    data: function () {
        return {
            response: '',
            isActive: false,
            inputUsername: "",
            inputPassword: "",
            inputPhone: "",
            inputCode: "",
            value: 0,
            max: 2000,
            key: 0, // key, roll, and state may not be of the correct datatype currently
            roll: 0,
            state: 0
        }
    }, methods: {
        getConfirmationCode: function (message, event) {

            if (event) event.preventDefault();

            var hash = hashPassword(this.inputPassword);

            localStorage.setItem('mark-passwordh', hash);

            this.$http.post(signupEndpoint, {
                handle: this.inputUsername,
                phone: this.inputPhone,
                passwordh: hash

            }) // We still need to update key/roll/state
                .then(function (response) {
                    console.log("Recieved response");
                    console.log(response);

                    // get body data
                    this.response = response.body;

                    alert("A text will be sent to your phone shortly!");
                    console.log('Roll:', this.response.roll);
                    console.log('state', this.response.state);

                    localStorage.setItem('mark-signup-roll', this.response.roll);
                    localStorage.setItem('mark-signup-state', this.response.state);
                    console.log('roll/state saved');
                    console.log('get code end')

                    $('#inputUsername').prop('disabled', true);
                    $('#input').prop('disabled', true);
                    $('#inputUsername').prop('disabled', true);
                    $('#confirmationButton').prop('disabled', true);

                    $('#inputCode').prop('disabled', false);
                    $('#createAccountButton').prop('disabled', false);

                }, function (error) {
                    // error callback
                    console.log(error)
                    this.response = error;
                });

            this.isActive = true;
        },
        submitForm: function (message, event) {
            console.log('verify start')

            const roll = localStorage.getItem('mark-signup-roll');
            const state = localStorage.getItem('mark-signup-state');
            const code = this.inputCode;

            var hash = hashPassword(this.inputPassword);

            this.$http.post(validateEndpoint, {
                roll,
                state,
                code,
                key: hash

            })
                .then(function (response) {

                    // get body data
                    this.response = response.body;
                    console.log(MS_TOKEN_KEY, this.response)

                    localStorage.setItem(MS_TOKEN_KEY, this.response.token);
                    localStorage.removeItem('mark-signup-roll');
                    localStorage.removeItem('mark-signup-state');
                    console.log('token saved');
                    console.log('get token end')
                    window.location = '/';

                }, function (error) {
                    // error callback
                    console.log(error)
                });

            this.isActive = false;
        }
    }
})