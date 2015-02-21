Template.lineChart.events({
  'keyup #ticker-search': function (e,t) {
    var searched = t.find('input').value; 
    if  ( e.keyCode == 13 ) {
      return Session.set('selectedTicker', searched);
    }
  }
});

Template.lineChart.helpers({
  TSX: function () {
    return ["BBD-B","R","WEF","CVE","TD","MFC","PD","RY","TLM","PLI","ABX","TCK-B","PWT","YRI","SLF","RIO","SGY","ECA","G","LTS","TA","BXE","ELD","COS","CPG","SU","LEG","CR","CM","BTO","ERF","CNQ","TXG","BNK","HSE","TCW","BNS","BB","IMG","BCE","BTE","FM","LSG","LUN","BMO","PRE","K","CRH","EDV","WCP","TGZ","CIX","DGC","NGD","TRP","SNC","SJR-B","MMT","BAM-A","T","INN-UN","FTT","ENB","NA","AC","SVC","SMF","PRW","ATD-B","IPL","CHP-UN","MEG","KEL","FTS","AEM","NKO","STB","CAE","TRI","DTX","HBM","CHR-B","PGF","TRQ","PSK","IMO","OGC","CNR","ATH","POT","MND","PPY","PPL","CCO","HNL","LRE","DPM","POW","S","GWO"];
  }
});

Template.lineChart.created = function () {
  
  Tracker.autorun(function () {
    var ticker,
        data = Session.get('selectedTicker');
    
     data ? ticker = data : ticker = "XIU";

    Meteor.call("getQuandlData", ticker , function(error, result) {
      if (error)
          console.log(error)
          
    var parseDate = d3.time.format("%Y-%m-%d").parse, 
        dataset = [],
        response = JSON.parse(result.content).data;
      
      response.map(function (item, index) {
        var myDate = parseDate( item[0] ),
            price = item[1]; 

        dataset.push({
          date : myDate,
          value : price
        });
      });
      return Session.set("lineChartData", dataset);
    });
  });
};

Template.lineChart.rendered = function(){
  
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // data format: "2015-01-30"
  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x) 
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.value);
    });

  var svg = d3.select("#lineChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

  svg.append("g")
    .attr("class", "y axis")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

  Tracker.autorun(function(){
    var dataset = Session.get("lineChartData");

    if (!dataset) {
      return Meteor.defer(function () {
        console.log("dataset from defer");
        var dataset = Session.get("lineChartData");
      });
    }

    var paths = svg.selectAll("path.line")
      .data([dataset]); //todo - odd syntax here - should use a key function, but can't seem to get that working

    x.domain(d3.extent(dataset, function(d) { return d.date; }));
    y.domain(d3.extent(dataset, function(d) { return d.value; }));

    //Update X axis
    svg.select(".x.axis")
      .transition()
      .duration(1000)
      .call(xAxis);
      
    //Update Y axis
    svg.select(".y.axis")
      .transition()
      .duration(1000)
      .call(yAxis);
    
    paths
      .enter()
      .append("path")
      .attr("class", "line")
      .attr('d', line);

    paths
      .attr('d', line); //todo - should be a transisition, but removed it due to absence of key
      
    paths
      .exit()
      .remove();
  });
};