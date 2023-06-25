window.onload = function () {
    google.charts.load('current', { 'packages': ['geochart', 'corechart', 'columnchart'] });

}

function drawfundedspend(json) {
    var jsonData = JSON.parse(json);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Invoice');
    data.addColumn('number', 'Approved');
    data.addColumn('string', 'Rejected');

    for (var i = 0; i < jsonData.length; i++) {
        var row = [jsonData[i].Category, jsonData[i].Invoice, jsonData[i].Approved, jsonData[i].Rejected];
        data.addRow(row);
    }

    var options = {
        width: 200,
        height: 400,
        legend: { position: 'none' }, // Hide the default legend
        bar: { groupWidth: '75%' },
        isStacked: true,
        is3D: true,
        tooltip: { trigger: 'selection' }, // Show legend on mouse hover
        colors: ['red', 'blue', 'green'], // Set the colors for the series
        series: {
            2: { color: 'green' } // Set the color for the "Rejected" series
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("div_drawfundedspend"));
    chart.draw(data, options);
}

function drawRegionsMap(json) {
    var jsonData = JSON.parse(json);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'TotalDelivery');

    jsonData.forEach(function (item) {
        data.addRow([item.Country, item.TotalDelivery]);
    });

    var options = {
        resolution: 'countries',
        colorAxis: {
            colors: ['#FF0000', '#FFFF00', '#00FF00'],
            values: [700, 1000, 3000]
        },
        tooltip: {
            textStyle: {
                color: 'black',
                fontSize: 12
            }
        }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, options);
}

function drawMonthlyRequestByProgram(json) {
    var jsonData = JSON.parse(json);

    // Create the DataTable and add columns
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Month');
    data.addColumn('number', 'Program1');
    data.addColumn('number', 'Program2');
    data.addColumn('number', 'Program3');
    data.addColumn('number', 'Total');

    // Add rows to the DataTable
    jsonData.forEach(function (item) {
        data.addRow([item.Month, item.Program1, item.Program2, item.Program3, item.Total]);
    });

    var options = {
        title: 'May 2021 through May 2022',
        vAxis: { title: 'Number of Page' },
        hAxis: { title: 'Month' },
        seriesType: 'bars',
        series: { 3: { type: 'line' } },
        legend: { position: 'bottom' } // Position the legend at the bottom
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}


