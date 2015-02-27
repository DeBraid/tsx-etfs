
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('chart', { 
    path: '/chart/:ticker',
      data: function() {  
        startSearch( this.params.ticker );
    }
  });
});