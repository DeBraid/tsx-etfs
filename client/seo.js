Meteor.startup(function() {
    if (Meteor.isClient) {
        // var ticker = Session.get("tickerInfo");
        
        // console.log('ticker NAME ', ticker.name);
        // console.log('ticker  DESC', ticker.description);
        
        // // var description = Session.get('tickerInfo').description;
        // // var name = Session.get('tickerInfo').name;
        // // console.log('description in SEO.js', description );
        // // console.log('name in SEO.js', name );
        
        // return SEO.config({
        //     title: 'TSX ETFs ' + ticker.name + '',
        //     meta: {
        //         'description': 'A website with charts for TSX listed securities by Derek Braid.',
        //         'twitter:card' : 'summary_large_image',
        //         'twitter:site' : '@Royal_Arse',
        //         'twitter:creator' : '@Royal_Arse',
        //         'twitter:title' : 'Chart of ' + ticker.name + '',
        //         'twitter:description' : '' + ticker.description + '',
        //         'twitter:image' : 'http://imgur.com/gallery/lFOj8oz'
        //     },
        //     og: {
        //         'image': 'http://static01.nyt.com/images/2015/08/04/world/04BURUNDI/04BURUNDI-master675.jpg' 
        //    },
        // });
    }
});