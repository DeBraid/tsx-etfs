Template.tickerInfo.helpers({
  tickerInfo: function () {
    return Session.get("tickerInfo");
  }
});

Template.tickerList.events({
  'click .ticker': function (e , t) {
    console.log("e.target.id", e.target.id);
    var clickedTicker = e.target.id;
    startSearch( clickedTicker );
  }
});

UI.registerHelper("tryAgain", function () {
  return Session.get("tryAgain");
});