const marksEndpoint = MS_URL + '/api/marks';
const usersEndpoint = MS_URL + '/api/users';
const likeEndpoint = MS_URL + '/api/likes';
const feedEndpoint = MS_URL + '/api/feed';
const followersEndpoint = MS_URL + '/api/followers';
const accountInfoEndpoint = MS_URL + '/api/accounts/info';
const updateAvatarEndpoint = MS_URL + '/api/accounts/update-profile-picture'


const accountsEndpoint = MS_URL + '/api/accounts';
const NUMBER_OF_MARKS = 100;

let editProfile;
let profile;
let feedContent;


Vue.component('mark-component', {
    props: ['mark'],
    data: function () {
        return {
            likes: 0,
            imgsrc: null,   // if the post is an image this holds the url
            picture: false,
            profile_img: "https://randomuser.me/api/portraits/men/74.jpg",
            liked: false,
        }
    },
    computed: {
        post_id: function () {
            return this.mark._id;
        },
        text: function () {
            return this.mark.body;
        }
    },
    created: function () {
        const username = this.$parent.username;

        if (this.text && this.text.match(/https?:\/\/.*\.(?:png|jpg)/i)) {
            this.imgsrc = this.text;
            this.picture = true;
        }

        // get likes and set component like button
        this.$http.get(likeEndpoint + '/' + this.mark._id)
            .then(response => {
                this.likes = response.data.items.length

                response.data.items.forEach(element => {
                    if (element.author == username) {
                        console.log('test if this works', element.author, username);
                        this.liked = true;
                        return;
                    }
                });

            }, error => {
                console.log(error.data);
            });
    },
    methods: {
        like: function (event) {
            console.log("Like:", this.mark._id)
            this.$http.put(likeEndpoint, { id: this.mark._id })
                .then(response => {
                    console.log("Like added!");
                    this.likes = this.likes + 1;
                    this.liked = true;
                }, error => {
                    handleError(error);
                });
        },
        unlike: function (event) {
            console.log("Like:", this.mark._id)
            this.$http.delete(likeEndpoint + '/' + this.mark._id)
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

editProfile = new Vue({
    el: '#edit-profile',
    data: function () {
        return {
            account: {}
        }
    },
    created: function () {
        const externalContext = this;

        $(document).on('change', ':file', function () {
            const file = $(this).get(0).files[0]
            externalContext.handleFileUpload(file)
        })
    },
    methods: {
        submitFile: function () {
            /*
                    Initialize the form data
                */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            console.log('adding new file', this.fileUpload)

            formData.append('profile-picture', this.fileUpload);
            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };


            this.$http.post(updateAvatarEndpoint, formData, options)
                .then(function (response) {
                    console.log('SUCCESS!!');
                    this.response = response.body;
                    console.log('response', this.response);
                    this.account.avatar = this.response.avatar;
                    Vue.set(profile.user, 'avatar', this.account.avatar);
                    $('#file-label').text(file.name)

                })
                .catch(function (error) {
                    handleError(error);
                });
        },

        handleFileUpload: function (file) {
            this.fileUpload = file;
            $('#file-label').text(file.name)
        },


    }
});;

profile = new Vue({
    el: '#profile',
    data: function () {
        return {
            marks: [],
            followers: [],
            account: {

            },
            user: {
                avatar: 'https://randomuser.me/api/portraits/men/74.jpg'
            },
            tagetHandle: '',
            isFollowing: false
        }
    },
    created: function () {
        this.targetHandle = window.location.pathname.split('/')[2];
        this.loadProfile();
    },
    methods: {
        loadProfile: function () {
            console.log('load profile')

            this.updateUserMarks();
            this.targetHandle = window.location.pathname.split('/')[2];

            // {
            //     "handle": "jakef",
            //     "address": "0x18c4dcD21A0A4501d6aB13a824b1fbdF0289f5C2",
            //     "balance": "0.000000000000224752"
            //     "avatar": "http://pictureurl"
            // }

            // Configure browsing account (important not information displayed on page)
            this.$http.get(accountInfoEndpoint, {})
                .then(response => {
                    console.log('account info');
                    this.account = response.body;
                    console.log('account info avatar', this.account.avatar);
                    if (this.tagetHandle === this.account.handle) {
                        Vue.set(editProfile.account, 'avatar', this.account.avatar);
                    }

                    const targetHandle = window.location.pathname.split('/')[2]

                    // Configure user page
                    this.$http.get(`${usersEndpoint}/${targetHandle}`, {})
                        .then(response => {
                            console.log('account info');
                            this.user = response.body;
                        }).catch(error => {
                            handleError(error);
                        });

                    this.updateUserFollowers();

                }).catch(error => {
                    handleError(error);
                });


        },
        follow: function () {
            this.$http.put(`${followersEndpoint}/${this.targetHandle}`, {})
                .then(function (response) {
                    if (response.status === 200) {
                        console.log('follower added');
                        this.updateUserFollowers();
                    } else {
                        console.log('issue adding follower');
                        console.log('response.status', response.status);
                    }
                },
                    function (error) {
                        handleError(error);
                    })
        },
        unfollow: function () {
            this.$http.delete(`${followersEndpoint}/${this.targetHandle}`, {})
                .then(function (response) {
                    if (response.status === 200) {
                        console.log('follower removed');
                        this.updateUserFollowers();
                    } else {
                        console.log('issue removing follower');
                        console.log('response.status', response.status);
                    }
                },
                    function (error) {
                        handleError(error);
                    })
        },
        updateUserMarks: function () {
            this.$http.get(`${marksEndpoint}/${this.targetHandle}`, {})
                .then(function (response) {
                    console.log('marks');
                    console.log(response);

                    this.marks = response.body.items;
                    this.next = response.body.next;
                },
                    function (error) {
                        handleError(error);
                    })
        },

        updateUserFollowers: function () {
            this.$http.get(`${followersEndpoint}/${this.targetHandle}`, {})
                .then(function (response) {
                    console.log(response);

                    this.followers = response.body.items;
                    console.log('followers', this.followers);

                    this.isFollowing = !!this.followers
                        .filter(f => f.owner === this.account.handle)
                        .map(f => f.owner)[0];

                    console.log('isFollowing', this.isFollowing);

                    this.next = response.body.next;
                },
                    function (error) {
                        handleError(error);
                    })
        }
    }
});

feedContent = new Vue({
    el: '#feed-content',
    // data: function () {
    //     return {
    //         marks: [],
    //         next: ''
    //     }
    // },
    // created: function () {
    //     this.targetHandle = window.location.pathname.split('/')[2];
    //     this.updateUserMarks();
    // },
    // methods: {
    //     updateUserMarks: function () {
    //         this.$http.get(`${marksEndpoint}/${this.targetHandle}`, {})
    //             .then(function (response) {
    //                 console.log('marks');
    //                 console.log(response);

    //                 this.marks = response.body.items;
    //                 this.next = response.body.next;
    //             },
    //                 function (error) {
    //                     handleError(error);
    //                 })
    //     }
    // }

    data: function () {
        return {
            marks: [],
            username: "",
            account: {},
            targetHandle: ''
        }
    },
    created: function () {
        this.targetHandle = window.location.pathname.split('/')[2];
        this.username = '';
        this.$http.get(accountsEndpoint + '/info', {})
            .then(function (response) {
                console.log("account info:", response.body);
                this.username = response.body.handle;
                this.account = response.body;
                console.log(this.username);
                this.loadFeed();
            });
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

            const filterBots = localStorage.getItem("mark-bot-filter");
            var params = "";

            // if (filterBots)
            //     params = "?bots=" + filterBots;

            this.targetHandle = window.location.pathname.split('/')[2];

            this.$http.get(`${marksEndpoint}/${this.targetHandle}`, {})
                .then(function (response) {
                    console.log('feed returned');
                    console.log(response);

                    this.marks = response.data.items;
                    this.next = response.data.next;

                    const handles = Array.from(new Set(this.marks.map(m => m.owner)))
                    console.log('handles', handles)
                    console.log('this.marks', this.marks)
                    handles.forEach(handle => {


                        const targetHandle = window.location.pathname.split('/')[2];

                        this.$http.get(`${usersEndpoint}/${targetHandle}`, {})
                            .then(function (response) {

                                console.log(response.body)
                                this.marks.forEach((mark, index) => {
                                    console.log(`${mark.owner} === ${handle}`, response.body.avatar)
                                    if (mark.owner === handle) {
                                        this.marks[index].avatar = response.body.avatar;
                                    }
                                })
                                console.log(this.marks)

                            })
                    })

                },
                    function (error) {
                        console.log(error)
                        // handleError(error);
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

