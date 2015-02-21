# TSX ETFs

### by Derek Braid [@Royal_Arse](http://twitter.com/Royal_Arse) 

A Meteor JS application for financial data.  

* charts with d3js.  
* data Quandl API to display stock charts.

#### _Note_: `.gitignore` contains `settings.json` contains API key like so: 

```javascript
{
  "keyName" : "someRandomKey3s2df14sd098sd4522fa"
}
```

After cloning you must create this file, and run modified `meteor` command to start the app: 

`meteor --settings settings.json`
