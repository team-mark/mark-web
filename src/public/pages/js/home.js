Vue.component('mark-component', {
    props: ['author', 'content', 'id', 'date'],
    data: function () {
        return {
            likes: 0,
            imgsrc: null,
            picture: false,
            profile_img: "https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/11/enhanced/webdr03/enhanced-28723-1403279311-6.jpg"
        }
    },
    computed: {
        post_id: function () {
            return this.id;
        },
        text: function () {
            return this.content;
        }
    },
    created: function () {

        if (this.text && this.text.match(/https?:\/\/.*\.(?:png|jpg)/i)) {
            this.imgsrc = this.text;
            this.picture = true;
        }

        this.$http.get(LIKE_ENDPOINT + '/' + this.post_id)
            .then(response => {
                this.likes = response.data.length
            }, error => {
                console.log(error.data);
            });
    },
    template: `<div class="container" id="feed">
        <div class="card">
        <div class="card-header">
            <div class="row">
            <div class="col-2"><img class="d-block rounded-circle img-fluid" src="https://randomuser.me/api/portraits/men/74.jpg"/></div>
            <div class="col d-flex align-items-center pl-0">
                <h5 class="card-title">@{{ mark.owner }}</h5>
            </div>
            </div>
        </div>
        <div class="card-body">
            <p class="card-text">{{ mark.body }}</p>
        </div>
        <div class="card-footer text-muted">
            <div class="row" style="font-size:0.8rem">
            <div class="col-5">
                <p class="mb-0 text-muted">{{ mark.createdAt }}</p>
            </div>
            <div class="col-4">
                <p class="mb-0 text-muted">326 likes</p>
            </div>
            <div class="col-3 text-right"><a href="#">Like</a></div>
            </div>
        </div>
        </div>
        </div>`
})

// `<div class="card border-dark mb-3">
//                     <div class="card-header">
//                         <h6 align="left" class="card-title">{{author}}</h6>
//                         <small align="right">{{date}}</small>
//                     </div>
//                     <div class="card-body">
//                         <img v-if="picture" v-bind:src="imgsrc" alt="" />
//                         <p v-else class="card-text">{{content}}</p>
//                         <div class="container">
//                             <button v-on:click="$emit(\'like_mark\', id)">Like</button>
//                             <p>{{likes}}</p>
//                         </div>
//                     </div>
//                 </div>`

const marksEndpoint = MS_URL + '/api/marks';
const likeEndpoint = MS_URL + '/api/likes';
const NUMBER_OF_MARKS = 10;

const feedEndpoint = MS_URL + '/api/feed';


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

            this.$http.get(feedEndpoint, {})
                .then(function (response) {

                    console.log('feed returned');

                    this.response = response.body;
                    console.log(this.response);

                    this.marks = this.response.items
                    this.next = this.response.next;
                    console.log('this.marks', this.marks)

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
        },

        like_mark: function (id) {
            this.$http.put(LIKE_ENDPOINT, { postId: id })
                .then(response => {
                    console.log("Like added!");
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