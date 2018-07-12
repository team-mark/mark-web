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

const followers = new Vue({
    el: '#followers',
    data: function () {
        return {
            followersList: [],
        }
    },
    created: function() {
        this.loadFollowers();
    },
    methods: {
        loadFollowers: function (){
            axios.get(MS_URL + "/api/followers")
                .then(response => {
                    this.followersList = response.items;
                })
                .catch(error => {
                    handleError(error);

                    // DEBUG ONLY, REMOVE WHEN FINISHED
                    this.followersList = ["Tom","Jerry","Betty","Marcus"];
                });
        },

        unfollow_user: function(id) {
            
        }
    }
});