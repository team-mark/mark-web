const logoutEndpoint = MS_URL + '/api/accounts/logout'

const logout = new Vue({
    el: 'footer',
    data: function () {
        return {}
    },
    methods: {
        logout: function (message, event) {
            this.$http.post(logoutEndpoint, {})
                .then(function (response) {

                    console.log('logout response')
                    console.log(response)
                    this.response = response.body;

                    if (response.status === 200) {
                        // get body data
                        localStorage.removeItem(MS_TOKEN_KEY, this.response.token);
                        console.log('logout end')
                        window.location = '/login';
                    } else {
                        console.log('invalid logout')
                        // window.location = '/login';
                    }
                },
                    function (error) {
                        handleError(error);
                    });
        }
    }
})

