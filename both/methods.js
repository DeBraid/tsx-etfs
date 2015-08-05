Meteor.methods({
    startSearch: function (searched) {
        var stub = Router.current().url;
        var path = Router.current().route.getName();
        var route = stub.split('/' + path + '/')[1];
        
        Session.set('currentTicker', route);

        // console.log(
        //     'startSearch route', route,
        //     'searched: ', searched,
        //     'inputState:', Session.get('inputState')
        // );

        if ( route == searched ) {
            $('input#ticker-search').val(searched);
            return;
        } else {
            Session.set('inputState', 'has-warning');
            Session.set('selectedTicker', searched);
            Session.set('tryAgain', false);
            console.log(' ELSE route = searched');
            Router.go('/' + path + '/' + searched);
            $('input#ticker-search').val(searched);
        };
    }
});