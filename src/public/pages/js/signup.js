const signup = new Vue({
    el: '#signup',
    data: function () {
        return {
            response: "null",
            isActive: false, // Needs a better name, or more intuitive applicatoin
            inputUsername: "",
            inputPassword: "",
            inputPhone: "",
            inputCode: "",
            value: 0,
            max: 2000,
            hashing: false,
            key: 0, // key, roll, and state may not be of the correct datatype currently
            roll: 0,
            state: 0
        }
    }, methods: {
        getConfirmationCode: function(message, event){
            if(event) event.preventDefault();

            this.hashing = true;
            var hash = this.inputPassword;
            for (value = 0; value < 2000; value++){ // Magic number, TODO: figure out exactly how many we need, maybe make this loop better
                hash = sha256(hash); // So many hashes! Like bitcoin!
            }
            this.hashing = false;

            this.$http.post("/account/signup",
                {
                    handle: this.inputUsername,
                    phone: this.inputPassword,
                    passwordh: hash

            }) // We still need to update key/roll/state
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
        submitForm: function(message, event){
            if(event) event.preventDefault();

            this.$http.post("/account/signup-validate",
            {
                code: this.inputCode,
                key: this.key,
                roll: this.roll,
                state: this.state
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
            // 
        }
    }
})