Vue.component('follower-component', {
    props: ['followername'],
    template:
        // Change button link
        `<div class="card mx-auto mb-3" style="width:80vw">
        <div class="row">
            <div class="col-3"><img v-bind:src="profile_img" class="d-block rounded-circle img-fluid"></div>
            <div class="col d-flex align-items-center pl-0">
                <h5 class="mb-0">@{{followername}}</h5>
            </div>
        </div>
        <a href="#" class="btn btn-primary"> 
            Follow
        </a>
    </div>`
})
// HREF template is temporary is not an actual link (Yet! (?))

const accountInfoEndpoint = MS_URL + "/api/accounts/info"

const followers = new Vue({
    el: '#account',
    data: function () {
        return {
            handle: '',
            balance: ''
        }
    },
    created: function () {
        this.getAccountInfo();
    },
    methods: {
        loadAccountInfo: function () {
            this.$http.get(accountInfoEndpoint)
                .then(function (response) {
                    if (response.status === 200) {
                        this.response = response.body;
                        console.log(this.response);
                    } else {
                        handleError(error);
                    }
                })
                .catch(error => {
                    handleError(error);

                    // DEBUG ONLY, REMOVE WHEN FINISHED
                    this.followersList = ["Tom", "Jerry", "Betty", "Marcus"];
                });
        },
    }
});