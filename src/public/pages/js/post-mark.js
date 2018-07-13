const markEndpoint = MS_URL + '/api/marks'

const hash = localStorage.getItem('mark-passwordh')

const postMark = new Vue({
    el: '#post-mark',
    data: function () {
        return {
            postBody: "",
        }
    },
    methods: {
        post: function (message, event) {


            const requestBody = {
                body: this.postBody,
                passwordh: hash,
            }
            console.log('submit mark', requestBody)
            this.$http.post(markEndpoint, requestBody)
                .then(function (response) {

                    console.log('post response')
                    console.log(response)
                    this.response = response.body;

                    if (response.status === 200) {
                        // get body data
                        window.location = '/';
                    } else {
                        console.log('could not make post request')
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

