
module.exports = function(app: any) {

    require('./routes.public')(app);
    require('./route.accounts')(app);    
    require('./routes.platform')(app);

}

