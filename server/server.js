/* 

Makes API call, takes ticker symbol as argument. 
Example tickers: "XIU" TSX60, "XEM" EMs, "XSP" S&P500

*/

Meteor.methods({
  getQuandlData: function ( ticker ) {
    var authKey = Meteor.settings.quandlKey;    
    var url = "https://www.quandl.com/api/v1/datasets/YAHOO/TSX_" + 
              ticker + 
              "_TO.json?auth_token=";
    return Meteor.http.get( url + authKey );
  }  
});


Meteor.publish('etfs', function () {
	return Etfs.find();
});