const userlog = require('./userlog.json');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

module.exports = (app) => {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/auth', (req, res) => {
        var loginDetails = req.body;
        var userFoundflag = 0;
        for(let userIndex = 0; userIndex < userlog.length; userIndex++){
            if ((userlog[userIndex].username === loginDetails.username) && (userlog[userIndex].password === loginDetails.password)){
                console.log("Logged in succesfully");
                userlog[userIndex].activeStatus = "true";
                res.send({status: 200});
                userFoundflag = 1;
                break;
            }
        }
        if(!userFoundflag){
            res.send({status: 400});
        }
    });

    app.get('/auth', (req, res) => {
        let pathObj = url.parse(req.url);
        // let username = pathObj.query.split('=')[1];
        let query = querystring.parse(pathObj.query);
        if(query.user){
            let requestedUser = userlog.filter((user) => user.username === query.user);
            res.send(requestedUser[0].activeStatus);
        } else {
            let requestedUser = userlog.filter((user) => user.activeStatus === "true");
            res.send(requestedUser[0]? requestedUser[0]: {status: 400});
        }
    });

    app.get('/logout', (req,res) => {
        let pathObj = url.parse(req.url);
        let query = querystring.parse(pathObj.query);
        if(query.user){
            let requestedUser = userlog.filter((user) => user.username === query.user);
            requestedUser[0].activeStatus = "false";
            res.send({status: 200});
        } else {
            let requestedUser = userlog.filter((user) => user.activeStatus === "true");
            requestedUser[0].activeStatus = "false";
            res.send({status: 200});
        }
    })

};