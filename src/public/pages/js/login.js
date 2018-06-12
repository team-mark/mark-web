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
        submitForm: function(message, event) {
            if(event) event.preventDefault();
            this.$http.post("/accounts/login",
                {
                    handle: this.inputUsername,
                    key: this.inputPassword,

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