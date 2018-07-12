

const app = new Vue({
    el: '#post-mark',
    data: function () {
        return {
            body: null
        }
    },
    created: function () {

        // this.load_feed();
    },
    methods: {
        // postMark: function () {
        //     const query = '?sort=' + -1 + '&skip=' + 0 + '&size=' + NUMBER_OF_MARKS;
        //     this.marks = [];
        //     this.$http.get(marksEndpoint + query)
        //         .then(response => {
        //             this.marks = response.data;
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         })
        // },

        // marks_by_likes: function () {
        //     const query = '?sort=' + -1 + '&skip=' + 0 + '&size=' + NUMBER_OF_MARKS;
        //     this.marks = [];

        //     this.$http.get('http://localhost:3000/api/likes/sort' + query)
        //         .then(response => {
        //             var postIds = [];

        //             response.data.forEach(element => {
        //                 postIds.push(element._id)
        //             });

        //             postIds = JSON.stringify(postIds);

        //             this.$http.get(marksEndpoint + '?ids=' + postIds)
        //                 .then(response => {
        //                     this.marks = response.data;
        //                 });
        //         });

        // },

        // post_mark: function () {
        //     this.$http.post(marksEndpoint, { body: this.new_mark_body })
        //         .then(success => {
        //             this.load_feed();
        //         }, error => {
        //             console.log(error.data);
        //         });
        // },

        // update_token: function () {
        //     localStorage.setItem(TOKEN, this.token_input);
        //     Vue.http.headers.common['Authorization'] = { 'Authorization': this.token_input };
        // },

        // like_mark: function (id) {
        //     this.$http.post(LIKE_ENDPOINT, { postId: id })
        //         .then(response => {
        //             console.log("Like added!");
        //         }, error => {
        //             console.log(error.data);
        //         });
        // }
    }
});