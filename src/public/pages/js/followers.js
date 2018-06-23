Vue.component('follower-component', {
    props: ['followerName'],
    template: '<a href="/users/{{followerName}}"><h3>{{followerName}}</h3><a>'
})
// HREF template is temporary is not an actual link (Yet! (?))

const settings = new Vue({
    el: '#settings',
    data: function () {
        return {
            followersList: [],
        }
    }, methods: {
        loadFollowers: function (){
            this.$http.get("/followers")
            .then(function (response) {
                this.followers = response;
            },
            function (error){
                // error callback
                console.log(error)
                this.response = error;
            })
        }

    }

});