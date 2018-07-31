const marksEndpoint = MS_URL + '/api/marks';
const usersEndpoint = MS_URL + '/api/users';
const likeEndpoint = MS_URL + '/api/likes';
const NUMBER_OF_MARKS = 10;
const feedEndpoint = MS_URL + '/api/feed';
const followersEndpoint = MS_URL + '/api/followers';
const accountInfoEndpoint = MS_URL + '/api/accounts/info';
const updateAvatarEndpoint = MS_URL + '/api/accounts/update-profile-picture'

let editProfile;
let profile;

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

                    // Configure user page
                    this.$http.get(`${usersEndpoint}/${this.targetHandle}`, {})
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