UI.registerHelper("tryAgain", function () {
  return Session.get("tryAgain");
});

startSearch = function ( searched ) {
  Session.set('selectedTicker', searched);
  Session.set('inputState', 'has-warning');
  Session.set('tryAgain', false);
  Router.go('/chart/' + searched );
  $('input#ticker-search').val(searched);
  window.document.title = "TSX Quotes: " + searched;
};
