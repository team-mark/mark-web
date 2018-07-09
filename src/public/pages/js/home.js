Vue.component('mark-component', {
    props: ['author', 'content', 'id', 'date'],
    data: function() {
        return {
            likes: 0,
            imgsrc: null,
            picture: false,
            profile_img: "https://img.buzzfeed.com/buzzfeed-static/static/2014-06/20/11/enhanced/webdr03/enhanced-28723-1403279311-6.jpg"
        }
    },
    computed:{
        post_id: function () {
            return this.id;
        },
        text: function(){
            return this.content;
        }
    },
    created: function () {

        if(this.text && this.text.match(/https?:\/\/.*\.(?:png|jpg)/i)) {
            this.imgsrc = this.text;
            this.picture = true;
        }
            
        axios.get(LIKE_ENDPOINT + '/' + this.post_id )
                .then( response => {
                   this.likes = response.data.length
                }, error => {
                    console.log(error.data);
                });
    },
                                        // Set at 80% width for now
                                        // needs css wizards help
    template:   `<div class="card mx-auto mb-3" style="width:80vw">
                    <div class="card-header">
                        <div class="row">
                        <div class="col-3"><img v-bind:src="profile_img" class="d-block rounded-circle img-fluid"></div>
                        <div class="col d-flex align-items-center pl-0">
                            <h5 class="mb-0">@{{author}}</h5>
                        </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <img class="img-thumbnail" v-if="picture" v-bind:src="imgsrc" alt="" />
                        <p v-else class="card-text">{{content}}</p>
                    </div>
                    <div class="card-footer text-muted">
                        <div style="font-size:0.8rem" class="row">
                        <div class="col-5">
                            <p class="mb-0 text-muted">{{date}}</p>
                        </div>
                        <div class="col-4">
                            <p class="mb-0 text-muted">{{likes}} Likes</p>
                        </div>
                        <div class="col-3 text-right"><a href="#" v-on:click="$emit(\'like_mark\', id)">Like</a></div>
                        </div>
                    </div>
                </div>`
})

const marksPath = '/api/marks';
const marksEndpoint = MS_URL + marksPath;
const LIKE_ENDPOINT = MS_URL + '/api/likes';
const TOKEN = 'mark-token';
const NUMBER_OF_MARKS = 20;

const app = new Vue({
    el: '#app',
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
        axios.defaults.headers.common =  {'Authorization': localStorage.getItem(TOKEN)};
        this.load_feed();
    },
    methods: {
        load_feed: function () {
            const query = '?sort=' + 1 + '&skip=' + 0 + '&limit=' + NUMBER_OF_MARKS;
            this.marks = [];
            axios.get(marksEndpoint + query)
                .then(response => {
                    console.log(response);
                    this.marks = response.data;
                })
                .catch(error => {
                    console.log(error.response);
                })
        },

        marks_by_likes: function () {
            const query = '?sort=' + -1 + '&skip=' + 0 + '&limit=' + NUMBER_OF_MARKS;
            this.marks = [];

            axios.get(MS_URL + '/api/likes/sort' + query)
                .then(response => {
                    var postIds = [];

                    response.data.forEach(element => {
                        postIds.push(element._id)
                    });

                    postIds = JSON.stringify(postIds);

                    axios.get(marksEndpoint + '?ids=' + postIds)
                        .then(response => {
                            this.marks = response.data;
                        });
                });
            
        },

        post_mark: function () {
            axios.post(marksEndpoint, { body: this.new_mark_body })
                .then(success => {
                    this.load_feed();
                }, error => {
                    console.log(error.data);
                });
        },

        update_token: function () {
            localStorage.setItem(TOKEN, this.token_input);
            Vue.http.headers.common['Authorization'] = {'Authorization': this.token_input};
        },

        like_mark: function(id) {
            axios.put(LIKE_ENDPOINT, { postId: id })
                .then( response => {
                    console.log("Like added!");
                }, error => {
                    console.log(error.data);
                });
        }
    }

});