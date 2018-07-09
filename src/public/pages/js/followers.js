Vue.component('follower-component', {
    props: ['followername'],
    template: '<h3>{{followername}}</h3>'
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
                    console.log(error.response);

                    this.followersList = ["Tom","Jerry","Betty","Marcus"];
                });
        }
    }
});