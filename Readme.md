# A simple Backbone application to manage appointments

# Install MacPorts

Follow the instructions at http://www.macports.org

# Install Node, NPM and Bower

$ sudo port install nodejs
$ sudo port install npm
$ sudo port install bower

# Run npm install

# Run bower install

# Create config.js in the root folder and insert these lines:

module.exports = { 'port': process.env.PORT || 8080,
'database': '<--your mongodb connection information-->',
'secret': '<--any string of values like uubYhhggs556hHVj so your token can be encrypted and decrypted-->' };

Start Node server by running node server.js