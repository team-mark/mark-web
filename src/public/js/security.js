
/**
 * Does 2000 SHA256 hashes on a password for login and signup
 * 
 * @param {String} password 
 */
function hashPassword(password) {
    var hash = password;
    for (i = 0; i < 2000; i++) {
        hash = sha256(hash);
    }
    return hash;
}