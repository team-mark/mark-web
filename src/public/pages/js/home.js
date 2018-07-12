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

        axios.get(LIKE_ENDPOINT + '/' + this.post_id)
            .then(response => {
                this.likes = response.data.length
            }, error => {
                console.log(error.data);
            });
    },
    template: `<div class="row">
        <div class="col">
            <h1 class="mb-4"></h1>
        </div>
        </div>
        <div class="row">
        <div class="col-lg-6">
            <div class="card">
            <div class="card-header">
                <div class="row">
                <div class="col-3"><img class="d-block rounded-circle img-fluid" src="https://randomuser.me/api/portraits/men/74.jpg"/></div>
                <div class="col d-flex align-items-center pl-0">
                    <h5 class="mb-0">@ferrantejake</h5>
                </div>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed metus lorem, semper eget erat in, aliquam imperdiet leo. Fusce ac ex et lectus euismod faucibus ac in ante. Nunc laoreet rutrum sagittis.</p>
            </div>
            <div class="card-footer text-muted">
                <div class="row" style="font-size:0.8rem">
                <div class="col-5">
                    <p class="mb-0 text-muted">5/12/18 8:03 pm</p>
                </div>
                <div class="col-4">
                    <p class="mb-0 text-muted">4,833 Likes</p>
                </div>
                <div class="col-3 text-right"><a href="#">Like  </a></div>
                </div>
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


const app = new Vue({
    el: '#feed',
    data: function () {
        return {
            message: null,
            body: null,
            marks: [],
            new_mark_body: null,
            token_input: null,
        }
    },
    created: function () {
        axios.defaults.headers.common =  {'Authorization': localStorage.getItem(MS_TOKEN)};
        this.load_feed();
    },
    methods: {
        // load_feed: function () {
        //     const query = '?sort=' + -1 + '&skip=' + 0 + '&size=' + NUMBER_OF_MARKS;
        //     this.marks = [];
        //     axios.get(marksEndpoint + query)
        //         .then(response => {
        //             this.marks = response.data;
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         })
        // },

        loadFeed: function () {
            console.log('load feed')
            if (event) event.preventDefault();

            // localStorage.getItem('mark-access-token');

            // access token
            this.$http.get(feedEndpoint, {})
                .then(function (response) {
                    console.log('feed returned');
                    this.response = response.body;
                    console.log(this.response);
                    this.marks = response.items;
                    this.next = response.next;
                },
                    function (error) {
                        handleError(error);
                    })
        },

        marks_by_likes: function () {
            const query = '?sort=' + -1 + '&skip=' + 0 + '&limit=' + NUMBER_OF_MARKS;
            this.marks = [];

            axios.get(likeEndpoint + '/sort' + query)
                .then(response => {
                    var postIds = [];

                    response.data.forEach(element => {
                        postIds.push(element._id)
                    });

                    postIds = JSON.stringify(postIds);

                    axios.get(marksEndpoint + '?ids=' + postIds)
                        .then(response => {
                            this.marks = response.data;
                        }).catch(error => {
                            handleError(error);
                        });
                }).catch(error => {
                    handleError(error);
                });

        },

        post_mark: function () {
            axios.post(marksEndpoint, { body: this.new_mark_body })
                .then(success => {
                    this.load_feed();
                }, error => {
                    handleError(error);
                });
        },

        // Is this function even useful?
        update_token: function () {
            localStorage.setItem(MS_TOKEN, this.token_input);
            Vue.http.headers.common['Authorization'] = {'Authorization': this.token_input};
        },

        like_mark: function(id) {
            axios.put(LIKE_ENDPOINT, { postId: id })
                .then( response => {
                    console.log("Like added!");
                }, error => {
                    handleError(error);
                });
        }
    }

});