Meteor.methods({
  getQuandlData: function () {
    var authKey = Meteor.settings.quandlKey;
    var ticker = "XIU";  // TSX60
    // var ticker = "XEM";  // EMs
    // var ticker = "XSP";  // S&P500
    var url = "https://www.quandl.com/api/v1/datasets/YAHOO/TSX_" + 
              ticker + 
              "_TO.json?auth_token=";
    
    return Meteor.http.get( url + authKey );
  }  
});