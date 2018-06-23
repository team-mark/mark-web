// This file is loaded for all pages and represents functionality seen across
// the entire website.
//
// The following features are examples of this functionality:
// localstorage
// session management


// Application globals
const { MS_URL } = environment;

// Session
const accessToken = localStorage.getItem('mark-access-token');

if (!accessToken) {
    // if (!accessToken && window.location !== '/login') {
    console.log(window.location) // = '/login'
    // window.location = '/login'
}