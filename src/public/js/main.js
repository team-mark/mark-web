// This file is loaded for all pages and represents functionality seen across
// the entire website.
//
// The following features are examples of this functionality:
// localstorage
// session management


// Application globals
const MS_URL = environment.MS_URL;
const WEB_URL = environment.WEB_URL;
const MS_TOKEN_KEY = 'mark-access-token';

// Session
let accessToken = localStorage.getItem(MS_TOKEN_KEY);
console.log('accessToken', accessToken, accessToken === 'undefined')
if (accessToken === 'undefined')
    accessToken = undefined;
const isLoggedIn = !!accessToken;

if (!isLoggedIn && !(window.location.pathname === '/signup' || window.location.pathname === '/login')) {
    console.log(window.location) // = '/login'
    window.location = '/login'
}


// Functions
function handleError(error) {
    if (error.response.error_description) {
        alert("Error Code " + error.response.status + ": "
            + error.response.error_description);
    } else {
        alert("Error Code " + error.response.status);
    }
    console.log(error.response);
}

// Load default request settings
Vue.http.headers.common['Authorization'] = accessToken;
Vue.http.headers.common['Content-Type'] = 'application/json';
Vue.http.headers.common['Access-Control-Allow-Origin'] = WEB_URL;