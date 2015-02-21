Meteor.call("getQuandlData", function(error, result) {
  if (error)
      console.log(error)
  
  var rawData = JSON.parse(result.content),
      response = rawData.data,
      dataset = [],
      parseDate = d3.time.format("%Y-%m-%d").parse;
    
    response.map(function (item, index) {
      var myDate = parseDate( item[0] ),
          price = item[1]; 

      dataset.push({
        date : myDate,
        value : price
      });
    });

  return Session.set("quandlList", dataset);
});