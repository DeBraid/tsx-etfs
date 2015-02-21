Meteor.call("getQuandlData", function(error, result) {
  if (error)
      console.log(error)
  var response = JSON.parse(result.content);

  Session.set("quandlList", response);
});


Template.lineChart.helpers({
  quandlList: function () {
    return Session.get("quandlList");
  }
}); 
