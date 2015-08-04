
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('chart', { 
    path: '/chart/:ticker',
      subscriptions: function () {
        return Meteor.subscribe('etfs');
      },
      data: function() {  
        Meteor.call('startSearch', this.params.ticker);
        return {
          tickers: Etfs.find()
        }
      }

  });
});


Router.onAfterAction(function() {
	var ticker = Session.get("tickerInfo");

    SEO.set({
        title: 'TSX Stock and ETF Charts ' + ticker.name + '',
        meta: {
            'description': 'A website with charts for TSX listed securities by Derek Braid.',
            'twitter:card' : 'summary_large_image',
            'twitter:site' : '@Royal_Arse',
            'twitter:creator' : '@Royal_Arse',
            'twitter:title' : 'Chart of ' + ticker.name + '',
            'twitter:description' : '' + ticker.description + '',
            'twitter:image' : 'tsx-chart-ss.png'
        },
        og: {
            'image': 'http://static01.nyt.com/images/2015/08/04/world/04BURUNDI/04BURUNDI-master675.jpg' 
       }
    });
    return;
});