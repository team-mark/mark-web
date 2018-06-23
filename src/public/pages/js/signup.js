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
            this.$http.post("/account/signup",
                {
                    handle: this.inputUsername,
                    phone: this.inputPassword,
                    passwordh: hash

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

            this.isActive = true;
        },
        submitForm: function (message, event) {

        }
    }
})