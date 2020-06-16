window.onload = function () {
    updateChart();
}
function updateChart() {
    var dataPoints = [];
    var chart = chart
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo';
    var obj = {}
    jQuery.ajax({
        url: url,
        dataType: 'json',
        contentType: "application/json",
        success: function (obj) {
            console.log('obj', obj);
            $.each(obj['Time Series (Daily)'], function (key, value) {
                var dte = []
                dte.push(parseFloat(value['1. open']))
                dte.push(parseFloat(value['2. high']))
                dte.push(parseFloat(value['3. low']))
                dte.push(parseFloat(value['4. close']))
                dataPoints.push({
                    x: new Date(key),
                    y: dte
                });
            });
            var chart
            console.log(dataPoints)
            chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                exportEnabled: false,
                exportFileName: "Stock Tracker",
                title: {
                    text: "Stock-Tracker"
                },
                axisX: {
                    interval: 1,
                    intervalType: "month",
                    valueFormatString: "MMM"
                },
                axisY: {
                    includeZero: false,
                    prefix: "$",
                    title: "Price (in USD)"
                },
                data: [{
                    type: "ohlc",
                    yValueFormatString: "$###0.00",
                    xValueFormatString: "MMM YYYY",
                    dataPoints: dataPoints
                }]
            });
            chart.render();
        }
    });

}
