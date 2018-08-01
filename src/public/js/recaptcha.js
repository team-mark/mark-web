// Only have one recaptcha component on a page!
// var recaptchaLoaded = false;

// function reCaptchaOnLoad() {
//     recaptchaLoaded = true;
// }

Vue.component('recaptcha-component', {
    props: ['active', 'modal_mode'],
    data: function () {
        return {
            recaptchaWidget: 0,
            site_key: '6Le4OGUUAAAAALgJs_oHK5vEJGYyz9mQHn2NXpfM'
        }
    },
    created: function () {
    },
    mounted: function () {
        // console.log('grecaptcha vue', grecaptcha)
        this.initReCaptcha();
    },
    methods: {
        initReCaptcha: function () {
            // console.log('grecaptcha init', grecaptcha)

            var self = this;
            setTimeout(function () {
                // if (typeof grecaptcha === 'undefined') {
                //     self.initReCaptcha();
                // }
                // else {
                //     console.log('this.site_key', this.site_key)
                //     console.log('grecaptcha render', grecaptcha)
                //     recaptchaWidget = grecaptcha.render('recaptcha', {
                //         'sitekey': self.site_key,
                //         'callback': self.captchaRes
                //     });
                // }
                if (recaptchaLoaded === false) {
                    self.initReCaptcha();
                }
                else {
                    console.log('this.site_key', this.site_key)
                    console.log('grecaptcha render', grecaptcha)
                    recaptchaWidget = grecaptcha.render('recaptcha', {
                        'sitekey': self.site_key,
                        'callback': self.captchaRes
                    });
                }
            }, 100);
        },
        captchaRes: function (responseToken) {
            this.$emit('captcha_result', responseToken);
        },
        captchaExp: function () {
            // user needs to re verify
            this.$emit('captcha_expired');
        }
    },
    template: `
    <div align="center" id="recaptcha" class="g-recaptcha"></div>
    `,
})