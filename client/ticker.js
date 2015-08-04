Template.tickerInfo.helpers({
  tickerInfo: function () {
    return Session.get("tickerInfo");
  },
  showFullDescription : function () {
    return Session.get('showFullDescription');
  },
  tickers : function () {
    return Etfs.find()
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
    Meteor.call('startSearch', clickedTicker);
  }
});