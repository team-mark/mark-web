const marksEndpoint = MS_URL + '/api/marks';
const likeEndpoint = MS_URL + '/api/likes';
const NUMBER_OF_MARKS = 10;
const feedEndpoint = MS_URL + '/api/feed';
const followersEndpoint = MS_URL + '/api/followers';
const accountInfoEndpoint = MS_URL + '/api/accounts/info';
const updateAvatarEndpoint = MS_URL + '/api/accounts/update-profile-picture'

const profile = new Vue({
    el: '#profile',
    data: function () {
        return {
            marks: [{}],
            numFollowers: null,
            user: {
                handle: null
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

                    this.user.handle = this.response.handle;
                }).catch(error => {
                    handleError(error);
                });



            // this.$http.get(marksEndpoint, {})
            this.$http.get(feedEndpoint, {})
                .then(function (response) {
                    console.log('feed returned');
                    console.log(response);

                    this.marks = response.data.items;
                    this.next = response.data.next;
                },
                function (error) {
                    handleError(error);
                })
        },

        marks_by_likes: function () {
            const query = '?sort=' + -1 + '&skip=' + 0 + '&limit=' + NUMBER_OF_MARKS;
            this.marks = [];


            this.$http.get(likeEndpoint + '/sort' + query)
                .then(response => {
                    var postIds = [];

                    this.response = response.body;

                    this.response.items.data.forEach(element => {
                        postIds.push(element._id)
                    });

                    postIds = JSON.stringify(postIds);

                    this.$http.get(marksEndpoint + '?ids=' + postIds)
                        .then(response => {
                            this.response = response.body;
                            this.marks = response.items;
                        }).catch(error => {
                            handleError(error);
                        });
                }).catch(error => {
                    handleError(error);
                });

        },

        post_mark: function () {
            this.$http.post(marksEndpoint, { body: this.new_mark_body })
                .then(success => {
                    this.load_feed();
                }, error => {
                    handleError(error);
                });
        }
    }

});

const search = new Vue({
    el: '#search',
    data: function () {
        return {
            searchInput: null,
        }
    },
    methods: {
        search: function () {
            console.log('search')
            // window.location = `/users/${this.searchInput}`
        },
    }
});