Meteor.startup(function() {
    if (Meteor.isClient) {
        return SEO.config({
            title: 'TSX ETFs',
            meta: {
                'description': 'A website with charts for TSX listed securities by Derek Braid.',
                twitter: {
                    'card' : 'summary_large_image',
                    'site' : '@Royal_Arse',
                    'creator' : '@Royal_Arse',
                    'title' : 'Stock and or ETF Info.',
                    'description' : 'Charts for stocks and etfs on TSX.  Canadian-based securities.',
                    'image' : 'http://imgur.com/gallery/lFOj8oz'
               }
            },
            og: {
                'image': 'http://static01.nyt.com/images/2015/08/04/world/04BURUNDI/04BURUNDI-master675.jpg' 
           },
        });
    }
});