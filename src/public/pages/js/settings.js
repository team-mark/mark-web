
const marksEndpoint = MS_URL + '/api/marks';
const likeEndpoint = MS_URL + '/api/likes';
const NUMBER_OF_MARKS = 10;
const feedEndpoint = MS_URL + '/api/feed';
const followersEndpoint = MS_URL + '/api/followers';
const followingEndpoint = MS_URL + '/api/following';
const accountInfoEndpoint = MS_URL + '/api/accounts/info';
const updateAvatarEndpoint = MS_URL + '/api/accounts/update-profile-picture'

const settings = new Vue({
    el: '#settings',
    data: function () {
        return {
            user: {
                handle: null,
                avatar: null,
                numFollowers: null,
                numFollowing: null,
            },
            fileUpload: null
        }
    },
    created: function () {
        this.loadProfile();
    },
    methods: {
        loadProfile: function () {
            console.log('load feed')
            if (event) event.preventDefault();



            // {
            //     "handle": "jakef",
            //     "address": "0x18c4dcD21A0A4501d6aB13a824b1fbdF0289f5C2",
            //     "balance": "0.000000000000224752"
            // }
            this.$http.get(accountInfoEndpoint, {})
                .then(response => {

                    this.response = response.body;
                    console.log('this.response', this.response)
                    this.user.handle = this.response.handle;
                    this.user.avatar = this.response.avatar;

                })
                .catch(error => {
                    handleError(error);
                });

            this.$http.get(followersEndpoint, {})
                .then(response => {

                    this.response = response.body;
                    this.user.numFollowers = this.response.followers.length;

                })
                .catch(error => {
                    handleError(error);
                });


            this.$http.get(followingEndpoint, {})
                .then(response => {

                    this.response = response.body;
                    this.user.numFollowing = this.response.following.length;

                })
                .catch(error => {
                    handleError(error);
                });
        },
    }

});