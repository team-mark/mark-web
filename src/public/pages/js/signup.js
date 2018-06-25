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
            console.log("I'm doing something!");
            if (event) event.preventDefault();
            var i;
            var hash = this.inputPassword;
            for (i = 0; i < 2000; i++) {
                hash = sha256(hash);
            }
            console.log("I finished the for loop!");
            this.$http.post("http://localhost:3000/api/accounts/signup",
                {
                    handle: this.inputUsername,
                    phone: this.inputPhone,
                    passwordh: hash

                })
                .then(function (response) {

                    // get body data
                    this.response = response.body;

                    console.log('Roll:',this.response.roll);
                    console.log('state', this.response.state);

                },
                    function (error) {
                        // error callback
                        console.log(error)
                        this.response = error;
                    });

            this.isActive = true;
        },
        submitForm: function (message, event) {
            this.$http.post("http://localhost:3000/api/accounts/signup-validate",
            {
                key:"moo",
                roll:this.response.roll,
                code: this.inputCode,
                state: this.response.state

            })
            .then(function (response) {

                // get body data
                this.response = response.body;

            },
            function (error) {
                // error callback
                console.log(error)
                this.response = error;
            });
        }
    }
})