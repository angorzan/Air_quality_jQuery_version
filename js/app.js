document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector("button");
button.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
var lat = position.coords.latitude;
var lon = position.coords.longitude;
document.querySelector(".position").innerText = lat + ' ' + lon;
$.ajax({
    url: 'https://airapi.airly.eu/v1/nearestSensor/measurements?latitude=' + lat + '&longitude=' + lon + '&maxDistance=1000',
    headers: {'apikey': '6777c55a879246c99c1242bea6bb7ac9'},

    success: function (response) {
        console.log(response);
        const pm10standard24h = 50;
        const pm25standard24h = 25;
        const pm25 = response.pm25;
        const pm10 = response.pm10;
        const pm10perc = (response.pm10/pm10standard24h*100).toFixed(2);
        const pm25perc = (response.pm25/pm25standard24h*100).toFixed(2);
        const street = response.address.route;
        document.querySelector(".air").innerText = street + ', PM2.5: ' + pm25 + ', PM10: ' + pm10;
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["PM10", "PM2.5", "PM10%", "PM2.5%"],
                datasets: [{
                    label: 'μg/m3',
                    data: [pm10, pm25, pm10perc, pm25perc],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});
});
});
})