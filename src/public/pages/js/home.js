const marksEndpoint = MS_URL + '/api/marks';
const likeEndpoint = MS_URL + '/api/likes';
const NUMBER_OF_MARKS = 10;

const feedEndpoint = MS_URL + '/api/feed';

Vue.component('mark-component', {
    props: ['mark'],
    data: function () {
        return {
            likes: 0,
            imgsrc: null,   // if the post is an image this holds the url
            picture: false,
            profile_img: "https://randomuser.me/api/portraits/men/74.jpg",
            liked: false
        }
    },
    computed: {
        post_id: function () {
            return this.mark.id;
        },
        text: function () {
            return this.mark.body;
        }
    },
    created: function () {

        if (this.text && this.text.match(/https?:\/\/.*\.(?:png|jpg)/i)) {
            this.imgsrc = this.text;
            this.picture = true;
        }

        this.$http.get(likeEndpoint + '/' + this.post_id)
            .then(response => {
                this.likes = response.data.items.length
            }, error => {
                console.log(error.data);
            });
    },
    methods: {
        like: function (event) {
            console.log("Like:", this.mark.id)
            this.$http.put(likeEndpoint, { postId: this.mark.id })
                .then(response => {
                    console.log("Like added!");
                    this.likes = this.likes + 1;
                    this.liked = true;
                }, error => {
                    handleError(error);
                });
        },
        unlike: function (event) {
            console.log("Like:", this.mark.id)
            this.$http.delete(likeEndpoint + '/' + this.mark.id )
                .then(response => {
                    console.log("Like deleted!");
                    this.likes = this.likes - 1;
                    this.liked = false;
                }, error => {
                    handleError(error);
                });
        }
    }
})

const feed = new Vue({
    el: '#feed',
    data: function () {
        return {
            marks: [{}],
        }
    },
    created: function () {
        this.loadFeed();
    },
    methods: {
        loadFeed: function () {
            console.log('load feed')
            if (event) event.preventDefault();

            // {
            //     "items": [
            //         {
            //             "id": "5b47bbff2e54c01b4cad1501",
            //             "ethereum_id": "0xcc84db156a77aeb40804785506b6614d0c4837a7560ae90f4bc652ae0bc89837",
            //             "body": "My first mark!",
            //             "owner": "jakef",
            //             "createdAt": "Thu Jul 12 2018"
            //         }
            //     ]
            // }

            this.$http.get(marksEndpoint, {})
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