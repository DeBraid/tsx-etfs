// XIU = new Mongo.Collection('xiu');

Template.waiting.helpers({
  waitingIs: function () {
    var loading = Session.get('inputState');
    return loading == 'has-success' ? false : true ; 
  }
});

Template.waiting.created = function () {
  Meteor.Spinner.options = {
    lines: 15, // The number of lines to draw
    length: 5, // The length of each line
    width: 2, // The line thickness
    radius: 5, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0.5, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#F00', // #rgb or #rrggbb
    speed: 0.5, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    right: 'auto' // Left position relative to parent in px
  };
};