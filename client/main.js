Template.tickerInfo.helpers({
  tickerInfo: function () {
    return Session.get("tickerInfo");
  }
});

UI.registerHelper('tryAgain', function (argument) {
  return Session.get("tryAgain");
});