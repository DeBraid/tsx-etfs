Template.searchBox.events({
    'keyup #ticker-search': function (e, t) {
        var searched = t.find('input').value;
        if (e.keyCode == 13) {
            Meteor.call('startSearch', searched);
        }
    },
    'click #get-new-data': function (e, t) {
        var searched = t.find('input').value;
        Meteor.call('startSearch', searched);
    }
});

Template.searchBox.helpers({
    inputState: function () {
        return {
            klass: Session.get('inputState')
        }
    }
});
