Template.tickerInfo.helpers({
  tickerInfo: function () {
    return Session.get("tickerInfo");
  }
});

Template.tickerList.events({
  'click .ticker': function (e , t) {
    var clickedTicker = e.target.id;
    startSearch( clickedTicker );
  }
});

UI.registerHelper("tryAgain", function () {
  return Session.get("tryAgain");
});