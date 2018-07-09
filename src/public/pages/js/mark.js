{
    // GET /someUrl
    axios.get('/someUrl').then(response => {

        // get body data
        this.someData = response.body;

    }, response => {
        // error callback
    });
}