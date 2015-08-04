UI.registerHelper("tryAgain", function () {
  Tracker.autorun(function () {
  	return Session.get("tryAgain");
  });
});