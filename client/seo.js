Meteor.startup(function() {
    if (Meteor.isClient) {
        return SEO.config({
            title: 'TSX ETFs',
            meta: {
                'description': 'A website with charts for TSX listed securities by Derek Braid.'
            },
            og: {
                'image': 'http://static01.nyt.com/images/2015/08/04/world/04BURUNDI/04BURUNDI-master675.jpg' 
           }
        });
    }
});