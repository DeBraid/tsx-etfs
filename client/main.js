Template.tickerInfo.helpers({
  tickerInfo: function () {
    return Session.get("tickerInfo");
  }
});

UI.registerHelper("tryAgain", function () {
  return Session.get("tryAgain");
});