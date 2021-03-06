module.exports = function(app, passport,models) {

    var api = require('./api.js')(models);

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/partials/:name', showClientRequest, function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.get('/partials/auth/:name', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),function (req, res) {
        var name = req.params.name;
        res.render('partials/auth/' + name);
    });

    app.post('/api/login', showClientRequest, passport.authenticate('local-login', {
        session: false
    }),api.login);

    app.post('/api/signup', showClientRequest, api.signup);


    app.get('/api/logout', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.logout);

    // app.get('/api/computeFindata', showClientRequest, passport.authenticate('local-authorization', {
    //     session: false
    // }),api.computeFindata);

    app.get('/api/people', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getPeople);

    app.post('/api/person', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.createPerson);

    app.put('/api/person/:id', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.updatePerson);

    app.delete('/api/person/:id', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.removePerson);

    app.get('/api/bids', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getBids);

    app.get('/api/bids/:uid', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getBidsPerBank);

    app.get('/api/clientBids/:uid', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getBidsPerClient);

    app.get('/api/clientRequests', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getClientRequests);

    app.get('/api/requests', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getRequests);

    app.get('/api/infoRequest/:id', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getInfoRequest);

    app.post('/api/request', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.createRequest);

    app.post('/api/profile', showClientRequest, passport.authenticate('local-authorization', {
      session: false
    }),api.createProfile);

    app.get('/api/scoreRequest', showClientRequest, passport.authenticate('local-authorization', {
      session: false
    }),api.getMergedScoreRequests);

    app.post('/api/bid', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.placeBid);

    app.delete('/api/bid/:id', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.removeBid);
    // app.get('/api/bidInfo/:id')

    // app.get('/api/bidInfo/:id', showClientRequest, passport.authenticate('local-authorization', {
    //     session:false
    // }),api.bidInfo);

    function showClientRequest(req, res, next) {
        var request = {
            REQUEST : {
                HEADERS: req.headers,
                BODY : req.body
            }
        }
        console.log(request)
        return next();
    }
}
