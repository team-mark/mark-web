// const app = new Vue({
//     el: '#app',
//     data: function () {
//         return {
//             message: null,
//             body: null
//         }
//     },
//     created: function () {
//         this.loadMessage();
//         this.loadBody();
//     },
//     methods: {
//         loadMessage: function () {
//             this.message = 'this page was loaded at' + new Date().toISOString();
//         },

//         loadBody: function () {
//             // GET /someUrl
//             this.$http.get('http://dev-mark-services.azurewebsites.net/')
//                 .then(function (response) {

//                     // get body data
//                     this.body = response.body;

//                 },
//                     function (error) {
//                         // error callback
//                         console.log(error)
//                         this.body = error;
//                     });
//         }
//     }

// });

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