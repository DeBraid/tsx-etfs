Template.lineChart.created = function () {
    Tracker.autorun(function () {
        var ticker,
            data = Session.get('selectedTicker'),
            data1 = Session.get('currentTicker');

        data ? ticker = data : ticker = data1;

        Meteor.call("getQuandlData", ticker.toUpperCase(), function (error, result) {
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
                name: response.name,
                source: response.source_name,
                description: response.description
            });

            respDataArr.map(function (item, index) {
                var myDate = parseDate(item[0]),
                    price = item[1];

                priceDataPoints.push({
                    date: myDate,
                    value: price
                })
            });
            Session.set('inputState', 'has-success');
            return Session.set("lineChartData", priceDataPoints);
        });
    });
};

Template.lineChart.rendered = function () {
    var margin = {
            top: 15,
            right: 10,
            bottom: 30,
            left: 30
        },
        width = parseInt(d3.select("#line-chart-container").style("width")) - margin.bottom - margin.left * 1.5,
        height;

    (width > 480) ? height = 400 - margin.top - margin.bottom: height = 270 - margin.top - margin.bottom;

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
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.value);
        });

    var svg = d3.select("#lineChart")
        .attr("width", width + margin.left + margin.top)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left*1.25 + "," + margin.top + ")");

    // .append("g")
    // .attr("transform", "translate(" + margin + "," + margin + ")");

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

    Tracker.autorun(function () {
        console.log("dataset tracker");
        var dataset = Session.get("lineChartData");

        console.log("input state: ", 'success');
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

        x.domain(d3.extent(dataset, function (d) {
            return d.date;
        }));
        y.domain(d3.extent(dataset, function (d) {
            return d.value;
        }));

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