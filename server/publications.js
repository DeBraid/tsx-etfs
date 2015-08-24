/* 

Makes database calls, fetch the data.
Example tickers (for etfs, stocks, mutual funds etc.)

*/
Meteor.publish('tickers', function () {
	// for ETFs
	return Tickers.find();
});

Meteor.publish('cdz', function () {
	return CDZ.find();
});

Meteor.publish('stocks', function () {
	// for ETFs
	return Stocks.find();
});