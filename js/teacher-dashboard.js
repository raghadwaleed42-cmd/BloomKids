const ctx = document.getElementById("lineChart");

new Chart(ctx, {
    type: "line",
    data: {
        labels: ["صفر", "شوال", "ربيع اول", "ربيع ثاني", "جمادى اول", "جمادى ثاني"],
        datasets: [
            {
                label: " متوسط الأداء",
                data: [12, 28, 42, 47, 43, 60],
                borderColor: "#FFA0C8",
                backgroundColor: "#FFA0C8",
                pointBackgroundColor: "#FFA0C8",
                pointBorderColor: "#FFA0C8",
                pointRadius: 4.5,
                pointHoverRadius: 5,
                borderWidth: 2,
                tension: .4,
                fill: false,
                pointHitRadius: 12,
                clip: 15,
            },
            {
                label: " نسبة التقدم",
                data: [-8, 2, 10, 13, 18, 26],
                borderColor: "#C86CFF",
                backgroundColor: "#C86CFF",
                pointBackgroundColor: "#C86CFF",
                pointBorderColor: "#C86CFF",
                pointRadius: 4.5,
                pointHoverRadius: 5,
                borderWidth: 2,
                tension: .4,
                fill: false,
                pointHitRadius: 12,
                clip: 15,

                
            }
        ]
    },

    options: {

        responsive: true,
        maintainAspectRatio: false,

        layout: {
       padding:{
        left:12,
        right:12,
        top:5,
        bottom:0
    }
        },

        plugins: {

            legend: {

                position: "bottom",

                align: "start",

                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 6,
                    font: {
                        family: "Cairo",
                        size: 13
                    },
                    color: "#444"
                }
            }

        },

        scales: {

            x: {
              offset: true,

                grid: {
                color: "#EEF2F8"
              },

    ticks: {
          color: "#506683",
            font: {
            family: "Cairo",
            size: 13,
            weight: "600"
           }
    },

        border: {
        display: false
        }
    },

            y: {

                min: -60,
                max: 60,

                ticks: {
                    stepSize: 20,
                    color: "#7C93AF",
                    font: {
                        family: "Cairo",
                        size: 12
                    }
                },

                grid: {
                     color: "#EEF2F8",
                     lineWidth: 1
                },

                border: {
                    display: false
                }

            }

        }

    }

});
const barCtx = document.getElementById("barChart");

Chart.register(ChartDataLabels);

new Chart(barCtx, {
    type: "bar",

    data: {
        labels: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],

        datasets: [{
            data: [446, 285, 382, 368, 413, 307, 432],

            backgroundColor: [
                "#5A9BEF",
                "#34D1BF",
                "#5A9BEF",
                "#5A9BEF",
                "#5A9BEF",
                "#5A9BEF",
                "#5A9BEF"
            ],

            borderRadius: 8,
            borderSkipped: false,

            barPercentage: 0.72,
            categoryPercentage: 0.72
        }]
    },

    options: {

        responsive: true,
        maintainAspectRatio: false,

        layout:{
            padding:{
                top:20,
                right:8,
                left:8,
                bottom:0
            }
        },

        plugins:{

            legend:{
                display:false
            },

            tooltip:{
                enabled:false
            },

            datalabels:{

                color:"#444",

                anchor:"end",

                align:"end",

                offset:2,

                font:{
                    family:"Cairo",
                    size:12,
                    weight:"700"
                }

            }

        },

        scales:{

            y:{
                display:false,
                beginAtZero:true
            },

            x:{

                grid:{
                    display:false
                },

                border:{
                    display:false
                },

                ticks:{ 
                    color:"#8A96A8",

                    font:{
                        family:"Cairo",
                        size:11
                    }
                }

            }

        }

    }

});



