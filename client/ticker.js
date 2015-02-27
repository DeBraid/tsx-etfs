Template.tickerInfo.helpers({
  tickerInfo: function () {
    return Session.get("tickerInfo");
  },
  showFullDescription : function () {
    return Session.get('showFullDescription');
  } 
});

Template.tickerInfo.events({
  'click #show-full-description' : function () {
    return Session.set('showFullDescription', true);
  },
  'click #hide-full-description' : function () {
    return Session.set('showFullDescription', false);
  }
});

Template.tickerList.events({
  'click .ticker': function (e , t) {
    var clickedTicker = e.target.id;
    startSearch( clickedTicker );
  }
});

Template.tickerList.helpers({
  tickers: function () {
    // Session.get('rank', value);
  }
});

// Template.leaderboard.players = function () {
//     return Players.find({}, {sort: {score: -1, name: 1}});
// };

// Template.lineChart.helpers({
//   tickers: function () {
//     // ...
//   }
// });