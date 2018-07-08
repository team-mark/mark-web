

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
            console.log('get code start')

            if (event) event.preventDefault();
            var i;
            var hash = this.inputPassword;
            for (value = 0; value < 2000; value++){ // Magic number, TODO: figure out exactly how many we need, maybe make this loop better
                hash = sha256(hash); // So many hashes! Like bitcoin!
            }
            localStorage.setItem('mark-passwordh', hash);

            this.$http.post(signupEndpoint,
                {
                    handle: this.inputUsername,
                    phone: this.inputPhone,
                    passwordh: hash

            }) // We still need to update key/roll/state
            .then(function (response) {

                    // get body data
                    this.response = response.body;
                    alert("A text will be sent to your phone shortly!");
                    console.log('Roll:', this.response.roll);
                    console.log('state', this.response.state);

                    localStorage.setItem('mark-signup-roll', this.response.roll);
                    localStorage.setItem('mark-signup-state', this.response.state);
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

            const roll = localStorage.getItem('mark-signup-roll');
            const state = localStorage.getItem('mark-signup-state');
            const code = this.inputCode;

            var hash = this.inputPassword;
            for (i = 0; i < 2000; i++) {
                hash = sha256(hash);
            }

            this.$http.post(validateEndpoint,
                {
                    roll,
                    state,
                    code,
                    key: hash

                })
                .then(function (response) {

                    // get body data
                    this.response = response.body;
                    console.log(response)


                    localStorage.setItem('mark-access-token', this.response.token);
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