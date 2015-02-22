startSearch = function ( searched ) {
  Session.set('selectedTicker', searched);
  Session.set('inputState', 'has-warning');
  Session.set('tryAgain', false);
};

Template.lineChart.events({
  'keyup #ticker-search': function ( e , t ) {
    var searched = t.find('input').value; 
    if ( e.keyCode == 13 ) {
      startSearch( searched );
    }
  },
  'click #get-new-data': function ( e , t ) {
    var searched = t.find('input').value; 
      startSearch( searched );
  }
});

Template.lineChart.helpers({
  tickers: function () {
    return {
      stocks : ["R","WEF","CVE","TD","MFC","PD","RY","TLM","PLI","ABX","PWT","YRI","SLF","RIO","SGY","ECA","G","LTS","TA","BXE","ELD","COS","CPG","SU","LEG","CR","CM","BTO","ERF","CNQ","TXG","BNK","HSE","TCW","BNS","BB","IMG","BCE","BTE","FM","LSG","LUN","BMO","PRE","K","CRH","EDV","WCP","TGZ","CIX","DGC","NGD","TRP","SNC","MMT","T","FTT","ENB","NA","AC","SVC","SMF","PRW","IPL","MEG","KEL","FTS","AEM","NKO","STB","CAE","TRI","DTX","HBM","PGF","TRQ","PSK","IMO","OGC","CNR","ATH","POT","MND","PPY","PPL","CCO","HNL","LRE","DPM","POW","S","GWO"],
      etfs : ["XIU","XIC","XMD","XCS","XEG","XIT","XGD","XFN","XMA","XRE","XTR","XDV","XCG","XCV","XEN","XSB","XBB","XRB","XCB","XGB","XLB","XSP","XSU","XIN","XEM","XWD","ZCN","ZDJ","ZUE","ZDM","ZEM","ZCH","ZID","ZEB","ZEO","ZUT","ZRE","ZQQ","ZUH","ZUB","ZGI","ZMT","ZJG","ZJO","ZJN","ZAG","ZFS","ZFM","ZFL","ZRR","ZPS","ZCS","ZCM","ZLC","ZHY","ZEF","ZDV","ZPR","CBQ","CDZ","CLO","CLU","CRQ","CWW","CMW","CIE","CJP","CPD","DLR","DLR.U","HXU","HXD","HEU","HED","HFU","HFD","HMU","HMD","HOU","HOD","HNU","HND","HBU","HBD","HAU","HAD","HBB","FHB","RWC","RWE","RWE.B","RWU","RWU.B","RWW","RWW.B","DXM","WXM","FXM","QXM","UXM","UXM.B","YXM","YXM.B","XXM","XXM.B","LXF","OXF","FXF","MXF","TXF","BXF","AXF","KXF","GXF","PXF","EXM","VCE","VCN","VDY","VRE","VUN","VUS","VFV","VSP","VGG","VGH","VXC","VDU","VEF","VE","VA","VEE","VAB","VSB","VSC","VBU","VBG"]
    }
  },
  inputState: function () {
    return {
      klass: Session.get('inputState')
    }
  }
});

Template.lineChart.created = function () {
  
  Tracker.autorun(function () {
    var ticker,
        data = Session.get('selectedTicker');
    
     data ? ticker = data : ticker = "XIU";

    Meteor.call("getQuandlData", ticker.toUpperCase() , function(error, result) {
      if (error) {
          console.log(error);
          return Session.set('tryAgain', true);
      } else {
        Session.set('tryAgain', false);
      }
          
    var parseDate = d3.time.format("%Y-%m-%d").parse, 
        priceDataPoints = [],
        tickerAttrs = {},
        response = JSON.parse(result.content),
        respDataArr = response.data;

        Session.set('tickerInfo', {
          name : response.name,
          source : response.source_name,
          description : response.description,
          urlize_name : response.urlize_name
        });
      

      respDataArr.map(function (item, index) {
        var myDate = parseDate( item[0] ),
            price = item[1]; 
        
        priceDataPoints.push({
          date : myDate,
          value : price
        })

      });

      return Session.set("lineChartData", priceDataPoints);
    });
  });
};

Template.lineChart.rendered = function(){
  
  var margin = {top: 20, right: 20, bottom: 30, left: 35},
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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
    console.log("dataset tracker");
    var dataset = Session.get("lineChartData");
    Session.set('inputState', 'has-success');

    if (!dataset) {
      return Meteor.defer(function () {
        var dataset = Session.get("lineChartData");
        Session.set('inputState', 'has-success');
        console.log("dataset from defer");
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