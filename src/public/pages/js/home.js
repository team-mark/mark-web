Vue.component('mark-component', {
    props: ['author', 'content', 'id'],
    data: function () {
        method
    },
    template: '<div class="card bg-light mb-3" >' + 
                '<div class="card-body">' +
                '<h5 class="card-title">{{author}}</h5>' + 
                '<p class="card-text">{{content}}</p>' +
                '<button type="button" v-on:click="likePost">Like</button>' +
                '</div></div>'
})


const marksPath = '/api/marks';
const marksEndpoint = MS_URL + marksPath;

const app = new Vue({
    el: '#app',
    data: function () {
        return {
            message: null,
            body: null,
            marks: [],
            new_mark_body: null,
        }
    },
    created: function () {
        // this.loadBody();
        this.loadFeed();
    },
    methods: {

        // loadBody: function () {
        //     // GET /someUrl
        //     this.$http.get('http://dev-mark-services.azurewebsites.net/')
        //         .then(function (response) {

        //             // get body data
        //             this.body = response.body;

        //         },
        //             function (error) {
        //                 // error callback
        //                 console.log(error);
        //                 this.body = error;
        //             });
        // },

        loadFeed: function () {
            this.$http.get(marksEndpoint)
                .then(function (response) {
                    this.marks = response.body;
                })
        },

        post_mark: function () {
            console.log(this.new_mark_body);
            this.$http.post(marksEndpoint, { body: this.new_mark_body })
                .then(function (success) {
                    this.loadFeed();
                }, function (error) {
                    console.log(error.data);
                });
        }
    }

});

// // var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

// /**
//  * Actual demo
//  */

// // var demo = new Vue({

// //     el: '#demo',

// //     data: {
// //         branches: ['master', 'dev'],
// //         currentBranch: 'master',
// //         commits: null
// //     },


// //     watch: {
// //         currentBranch: 'fetchData'
// //     },

// //     filters: {
// //         truncate: function (v) {
// //             var newline = v.indexOf('\n')
// //             return newline > 0 ? v.slice(0, newline) : v
// //         },
// //         formatDate: function (v) {
// //             return v.replace(/T|Z/g, ' ')
// //         }
// //     },

// //     methods: {
// //         fetchData: function () {
// //             var xhr = new XMLHttpRequest()
// //             var self = this
// //             xhr.open('GET', apiURL + self.currentBranch)
// //             xhr.onload = function () {
// //                 self.commits = JSON.parse(xhr.responseText)
// //                 console.log(self.commits[0].html_url)
// //             }
// //             xhr.send()
// //         }
// //     }
// // })

