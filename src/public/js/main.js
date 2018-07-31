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
// console.log('accessToken', accessToken, accessToken === 'undefined')
if (accessToken === 'undefined')
    accessToken = undefined;
const isLoggedIn = !!accessToken;

if (!isLoggedIn && !(window.location.pathname === '/signup' || window.location.pathname === '/login')) {
    console.log(window.location) // = '/login'
    window.location = '/login'
}


// Functions

/**
 * Logs response errors and gives an alert to the user. Call after most (every?) request
 * 
 * @param {error response} error
 */
function handleError(error) {
    alert("Error Code " + error.status +
        ((error.statusText != null) ? ": " + error.statusText : "") +
        ((error.bodyText != null) ? "\n" + error.bodyText : ""));

    console.log(error);
}

// Load default request settings
Vue.http.headers.common['Authorization'] = accessToken;
Vue.http.headers.common['Content-Type'] = 'application/json';
Vue.http.headers.common['Access-Control-Allow-Origin'] = WEB_URL;