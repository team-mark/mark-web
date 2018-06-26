Vue.component('mark-component', {
    props: ['author', 'content', 'id'],
    data: function() {
        return {
            likes: 0
        }
    },
    computed:{
        post_id:{
          get: function(){
            return this.id;
          }
        }
    },
    created: function () {
        axios.get(LIKE_ENDPOINT + '/:id?postId=' + this.post_id )
                .then( response => {
                   this.likes = response.data.length
                }, error => {
                    console.log(error.data);
                });
    },
    template: '<div class="card bg-light mb-3" >' +
        '<div class="card-body">' +
        '<h5 class="card-title">{{author}}</h5>' +
        '<p class="card-text">{{content}}</p>' +
        '<button v-on:click="$emit(\'like_mark\', id)">Like</button>' +
        '<p>{{likes}}</p>' +
        '</div></div>'
})

const marksPath = '/api/marks';
const marksEndpoint = MS_URL + marksPath;
const LIKE_ENDPOINT = MS_URL + '/api/likes';
const TOKEN = 'mark-token';

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
        this.loadFeed();
    },
    methods: {
        loadFeed: function () {
            axios.get(marksEndpoint)
                .then(response => {
                    this.marks = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },

        post_mark: function () {
            axios.post(marksEndpoint, { body: this.new_mark_body })
                .then(success => {
                    this.loadFeed();
                }, error => {
                    console.log(error.data);
                });
        },

        update_token: function () {
            localStorage.setItem(TOKEN, this.token_input);
            Vue.http.headers.common['Authorization'] = {'Authorization': this.token_input};
        },

        like_mark: function(id) {
            axios.post(LIKE_ENDPOINT, { postId: id })
                .then( response => {
                    console.log("Like added!");
                }, error => {
                    console.log(error.data);
                });
        }
    }

});