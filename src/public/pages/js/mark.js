{
    // GET /someUrl
    this.$http.get('/someUrl').then(response => {

        // get body data
        this.someData = response.body;

    }, response => {
        // error callback
    });
}