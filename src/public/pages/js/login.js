const login = new Vue({
    el: '#login',
    data: function () {
        return {
            response: "null"
        }
    },
    methods: {
        submitForm: function(message, event) {
            if(event) event.preventDefault();
            this.$http.post("/accounts/login",
                {
                    handle: "handle",
                    key: "key",

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