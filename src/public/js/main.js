// This file is loaded for all pages and represents functionality seen across
// the entire website.
//
// The following features are examples of this functionality:
// localstorage
// session management


// Application globals
const { MS_URL } = environment;

// Session controls
const accessToken = localStorage.getItem('mark-access-token');
const isLoggedIn = !!accessToken;

if (!isLoggedIn && !(window.location.pathname === '/signup' || window.location.pathname === '/login')) {
    console.log(window.location) // = '/login'
    window.location = '/login'
}

// Load default request settings
Vue.http.headers.common['Authorization'] = accessToken;
Vue.http.headers.common['Content-Type'] = 'application/json';