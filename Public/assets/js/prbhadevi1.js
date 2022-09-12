var firebaseConfig = {
    apiKey: "AIzaSyBcGBdNqOEmWu_M9U-GjijRVUnS924Bi0Q",
    authDomain: "buildint-ebd3e.firebaseapp.com",
    databaseURL: "https://buildint-ebd3e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "buildint-ebd3e",
    storageBucket: "buildint-ebd3e.appspot.com",
    messagingSenderId: "198539515334",
    appId: "1:198539515334:web:4151ea6c2f818901af4ec7",
    measurementId: "G-N03S00YSWS"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
let utctoday = new Date();
var ref;
var date;
// let today = new Date(utctoday.getTime() - (utctoday.getTimezoneOffset() * 60000)).toJSON().slice(0,10);

$('#datepicker').datepicker({
    format: 'yyyy-mm-dd',
    endDate: 'd',
    autoclose: true,   
})

window.onload = function(e){
    date = new Date(utctoday.getTime() - (utctoday.getTimezoneOffset() * 60000)).toJSON().slice(0,10);

    if (window.name == '') {
        document.getElementById('date_input').setAttribute('value',date);
        ref = database.ref("icici/prabhadevi/consumption/" + date);
        dataCall()
    }

    else{
        document.getElementById('date_input').setAttribute('value',window.name);
        ref = database.ref("icici/prabhadevi/consumption/" + window.name);
        dataCall()

    }
}


$('#datepicker').datepicker().on('change', function (ev) {
    window.name = $("#datepicker").data('datepicker').getFormattedDate('yyyy-mm-dd');
    // ref = database.ref("consumption/" + date);
    location.reload()
});
var CH1A,CH1B,CH1C,CH2A,CH2B,CH2C,CH3A,CH3B,CH3C,CH1AValues,CH1BValues,CH1CValues,CH2AValues,CH2BValues,CH2CValues,CH3AValues,CH3BValues,CH3CValues,time;
let lenghts;
var [seven_day,arr_channle_values_sum,arr_per_day_sum, arr_per_day_sum_controlling,arr_per_day_sum_monitoring,arr_day,arr_channle2_values_sum,arr_per_day_channle2_sum_monitoring,arr_per_day_channle2_sum_controlling] = [[],[],[],[],[],[],[],[],[]]
function dataCall(){
    ref.on('value', async function (snapshot){
        CH1A =  await snapshot.child("CH1 - Active Power Total A").val();
        CH1AValues = Object.values(CH1A);
        CH1B = await snapshot.child("CH1 - Active Power Total B").val();
        CH1BValues = Object.values(CH1B);
        CH1C = await snapshot.child("CH1 - Active Power Total C").val();
        CH1CValues = Object.values(CH1C);
        CH2A = await snapshot.child("CH2 - Active Power Total A").val();
        CH2AValues = Object.values(CH2A);
        CH2B = await snapshot.child("CH2 - Active Power Total B").val();
        CH2BValues = Object.values(CH2B);
        CH2C = await snapshot.child("CH2 - Active Power Total C").val();
        CH2CValues = Object.values(CH2C);
        CH3A = await snapshot.child("CH3 - Active Power Total A").val();
        CH3AValues = Object.values(CH3A);
        CH3B = await snapshot.child("CH3 - Active Power Total B").val();
        CH3BValues = Object.values(CH3B);
        CH3C = await snapshot.child("CH3 - Active Power Total C").val();
        CH3CValues = Object.values(CH3C);
        lenghts = Object.keys(CH1A).length;
        time = Object.keys(CH1A)
    }) 

    database.ref('icici/prabhadevi/consumption').on('value', function(snapshot){
        var cons_dates = snapshot.val()
        var cons_dates_values = Object.keys(cons_dates)
        
        for(let i = 49;i<54;i++) { 
            var req_date = snapshot.child(cons_dates_values.at(i)).val()
            var req_date_key = Object.keys(req_date)
            var req_date_key_length = Object.keys(req_date).length
            for(let j=0; j<req_date_key_length;j++){
                var channle = snapshot.child(cons_dates_values.at(i)).child(req_date_key[j]).val()
                var channle_values = Object.values(channle)
                var channle_keys_length = Object.keys(channle).length
                var channle_values_sum = channle_values.reduce((a,b) => a + b)
                arr_channle_values_sum.push(channle_values_sum)
                if (j==3 || j==5){
                    for (k=0; k<channle_keys_length; k++){
                        if (k<9 || k>20){
                            var channle2_values_sum = channle_values[k]
                            arr_channle2_values_sum.push(channle2_values_sum)
                        }
                    }
                }
            }
            arr_day.push(cons_dates_values.at(i))

            var per_day_sum = Math.round((arr_channle_values_sum.reduce((a,b) => a + b))*1000)/1000 
            arr_per_day_sum_monitoring.push(per_day_sum)
            arr_per_day_channle2_sum_monitoring.push(Math.round((arr_channle2_values_sum.reduce((a,b) => a + b))*1000)/1000)
            arr_channle2_values_sum = []

            arr_channle_values_sum = []
        }
    });

    database.ref('icici/prabhadevi/consumption').on('value', function(snapshot){
        var cons_dates = snapshot.val()
        var cons_dates_values = Object.keys(cons_dates)
        
        for(let i = 62; i<67;i++) { 
            var req_date = snapshot.child(cons_dates_values.at(i)).val()
            var req_date_key = Object.keys(req_date)
            var req_date_key_length = Object.keys(req_date).length
            for(let j=0; j<req_date_key_length;j++){
                var channle = snapshot.child(cons_dates_values.at(i)).child(req_date_key[j]).val()
                var channle_values = Object.values(channle)
                var channle_keys_length = Object.keys(channle).length
                var channle_values_sum = channle_values.reduce((a,b) => a + b)
                arr_channle_values_sum.push(channle_values_sum)
                if (j==3 || j==5){
                    for (k=0; k<channle_keys_length; k++){
                        if (k<9 || k>20){
                            var channle2_values_sum = channle_values[k]
                            arr_channle2_values_sum.push(channle2_values_sum)
                        }
                    }
                }
            }
            arr_day.push(cons_dates_values.at(i))

            var per_day_sum = Math.round((arr_channle_values_sum.reduce((a,b) => a + b))*1000)/1000 
            arr_per_day_sum_controlling.push(per_day_sum)
            arr_per_day_channle2_sum_controlling.push(Math.round((arr_channle2_values_sum.reduce((a,b) => a + b))*1000)/1000)
            arr_channle2_values_sum = []
            arr_channle_values_sum = []
        }
    });

    database.ref('icici/prabhadevi/consumption').on('value', function(snapshot){
        var cons_dates = snapshot.val()
        var cons_dates_values = Object.keys(cons_dates)
        
        for(let i = -8; i<-1;i++) { 
            var req_date = snapshot.child(cons_dates_values.at(i)).val()
            var req_date_key = Object.keys(req_date)
            var req_date_key_length = Object.keys(req_date).length
            for(let j=0; j<req_date_key_length;j++){
                var channle = snapshot.child(cons_dates_values.at(i)).child(req_date_key[j]).val()
                var channle_values = Object.values(channle)
                var channle_values_sum = channle_values.reduce((a,b) => a + b)
                arr_channle_values_sum.push(channle_values_sum)
            }
            seven_day.push(cons_dates_values.at(i))

            var per_day_sum = Math.round((arr_channle_values_sum.reduce((a,b) => a + b))*1000)/1000 
            arr_per_day_sum.push(per_day_sum)
            arr_channle_values_sum = []
        }
    });

    setTimeout(() => {
        let light_total = Math.round((CH1AValues.reduce((a,b) => a + b) + CH1BValues.reduce((a,b) => a + b) + CH1CValues.reduce((a,b) => a + b))*1000)/1000;
        let ac_total = Math.round((CH2AValues.reduce((a,b) => a + b) + CH2BValues.reduce((a,b) => a + b) + CH2CValues.reduce((a,b) => a + b))*1000)/1000;
        let ups_total = Math.round((CH3AValues.reduce((a,b) => a + b) + CH3BValues.reduce((a,b) => a + b) + CH3CValues.reduce((a,b) => a + b))*1000)/1000;
        let [light_total_hr,ups_total_hr,ac_total_hr,total_hr,nw_light_total_hr,nw_ac_total_hr,nw_ups_total_hr,nw_total_hr,nw_time,w_light_total_hr,w_ac_total_hr,w_ups_total_hr,w_total_hr,w_time] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        // let total_test = CH1AValues.reduce((a,b) => a + b) + CH1BValues.reduce((a,b) => a + b) + CH1CValues.reduce((a,b) => a + b) + CH2AValues.reduce((a,b) => a + b) + CH2BValues.reduce((a,b) => a + b) + CH2CValues.reduce((a,b) => a + b) + CH3AValues.reduce((a,b) => a + b) + CH3BValues.reduce((a,b) => a + b) + CH3CValues.reduce((a,b) => a + b)
        for (let i=0; i < lenghts; i++){
            light_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i])*1000)/1000)
            ac_total_hr.push(Math.round((CH2AValues[i] + CH2BValues[i] + CH2CValues[i])*1000)/1000)
            ups_total_hr.push(Math.round((CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
            total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i] + CH2AValues[i] + CH2BValues[i] + CH2CValues[i] + CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
        }

        for (let i=0; i<lenghts; i++){
            if (i<9 || i>20){
                nw_light_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i])*1000)/1000)
                nw_ac_total_hr.push(Math.round((CH2AValues[i] + CH2BValues[i] + CH2CValues[i])*1000)/1000)
                nw_ups_total_hr.push(Math.round((CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
                nw_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i] + CH2AValues[i] + CH2BValues[i] + CH2CValues[i] + CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
                nw_time.push(time[i])
            }
        }

        for (let i=0; i<lenghts; i++){
            if (i>8 && i<21){
                w_light_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i])*1000)/1000)
                w_ac_total_hr.push(Math.round((CH2AValues[i] + CH2BValues[i] + CH2CValues[i])*1000)/1000)
                w_ups_total_hr.push(Math.round((CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
                w_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i] + CH2AValues[i] + CH2BValues[i] + CH2CValues[i] + CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
                w_time.push(time[i])
            }
        }


        new ApexCharts(document.querySelector("#lineChart2"), { 
            series: [
                {
                    name: "Total",
                    data: total_hr
                },
    
                {
                    name: "All AC's",
                    data: ac_total_hr
                },
    
                {
                    name: "UPS",
                    data: ups_total_hr
                },
                {
                    name: "Light",
                    data: light_total_hr
                },
    
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                width: 2.5, 
                colors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1']
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                categories: time,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                },
                title: {
                    text: 'Time'
                }
            },
            yaxis: {
                title: {
                    text: 'kWh'
                }
            },
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ],
            markers: {
                size: 3,
                colors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                // strokeColors: '#fff',
                // strokeWidth: 2,
                strokeOpacity: 1,
                strokeDashArray: 0,
                fillOpacity: 1,
                // discrete: [],
                shape: "circle",
                radius: 2,
                // onClick: undefined,
                // onDblClick: undefined,
                // showNullDataPoints: true,
                hover: {
                  size: 5,
                //   sizeOffset: 3
                }
            },
            legend: {
                position: 'top',
                markers: {
                    fillColors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                }
            },
            tooltip: {
                marker: {
                    fillColors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                }
            }
        }).render();

        new ApexCharts(document.querySelector("#working"), { 
            series: [
                {
                    name: "Total",
                    data: w_total_hr
                },
    
                {
                    name: "All AC's",
                    data: w_ac_total_hr
                },
    
                {
                    name: "UPS",
                    data: w_ups_total_hr
                },
                {
                    name: "Light",
                    data: w_light_total_hr
                },
    
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                width: 2.5, 
                colors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1']
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                categories: w_time,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                },
                title: {
                    text: 'Time'
                }
            },
            yaxis: {
                title: {
                    text: 'kWh'
                }
            },
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ],
            markers: {
                size: 3,
                colors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                // strokeColors: '#fff',
                // strokeWidth: 2,
                strokeOpacity: 1,
                strokeDashArray: 0,
                fillOpacity: 1,
                // discrete: [],
                shape: "circle",
                radius: 2,
                // onClick: undefined,
                // onDblClick: undefined,
                // showNullDataPoints: true,
                hover: {
                  size: 5,
                //   sizeOffset: 3
                }
            },
            legend: {
                position: 'top',
                markers: {
                    fillColors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                }
            },
            tooltip: {
                marker: {
                    fillColors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                }
            }
        }).render();

        new ApexCharts(document.querySelector("#non_working"), { 
            series: [
                {
                    name: "Total",
                    data: nw_total_hr
                },
    
                {
                    name: "All AC's",
                    data: nw_ac_total_hr
                },
    
                {
                    name: "UPS",
                    data: nw_ups_total_hr
                },
                {
                    name: "Light",
                    data: nw_light_total_hr
                },
    
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                width: 2.5, 
                colors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1']
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                categories: nw_time,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                },
                title: {
                    text: 'Time'
                }
            },
            yaxis: {
                title: {
                    text: 'kWh'
                }
            },
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ],
            markers: {
                size: 3,
                colors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                // strokeColors: '#fff',
                // strokeWidth: 2,
                strokeOpacity: 1,
                strokeDashArray: 0,
                fillOpacity: 1,
                // discrete: [],
                shape: "circle",
                radius: 2,
                // onClick: undefined,
                // onDblClick: undefined,
                // showNullDataPoints: true,
                hover: {
                  size: 5,
                //   sizeOffset: 3
                }
            },
            legend: {
                position: 'top',
                markers: {
                    fillColors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                }
            },
            tooltip: {
                marker: {
                    fillColors: ['#b7b0e3', '#9eb6cf', '#f4c599', '#b0cda1'],
                }
            }
        }).render();
    
        new ApexCharts(document.querySelector("#pieChart"), { 
            series: [ac_total, light_total, ups_total],
            chart: {
                width: 380,
                type: 'pie',
            },
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                        chart: {
                          width: 300
                        },
                    }
                }
            ],
            labels: ['All AC\'s', 'Total Light', 'Total UPS'],
            legend: {
                position: 'top',
                markers: {
                    fillColors: ['#9eb6cf', '#f4c599', '#b0cda1'],
                },
    
                formatter: function(seriesName, opts) {
                    return [seriesName, ":", opts.w.globals.series[opts.seriesIndex], "kWh"]
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        offset: -20,
                    },
                },
            },
            dataLabels: {
                style: {
                    fontSize: '14px',
                    colors: ['#000000'],
                    fontWeight: 'bold'
                },
                dropShadow: {
                   enabled: false 
                },
            },
            colors: ['#9eb6cf', '#f4c599', '#b0cda1'], 
            tooltip: {
                y: {
                    formatter: function(val) {
                      return val + "Kwh"
                    },
                  }
            }
        }).render();

        new ApexCharts(document.querySelector("#mixedChart"), { 
            series: [
                {
                    name: "Total Consumption",
                    type: 'column',
                    data: arr_per_day_sum
                },
    
                {
                    name: "Baseline",
                    type: 'line',
                    data: [109,109,109,109,109,109,109]
                },
        
            ],
            chart: {
                height: 325,
                zoom: {
                enabled: false
                },
            },
            stroke: {
                curve: 'straight',
                width: 2.5, 
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                categories: seven_day,
                labels: {
                    style: {
                        fontSize: '11px'
                    }
                },
                title: {
                    text: 'Days'
                }
            },

            yaxis: {
                title: {
                    text: 'kWh'
                }
            },
            
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ],
            markers: {
                size: 3,
                // strokeColors: '#fff',
                // strokeWidth: 2,
                strokeOpacity: 1,
                strokeDashArray: 0,
                fillOpacity: 1,
                // discrete: [],
                shape: "circle",
                radius: 2,
                // onClick: undefined,
                // onDblClick: undefined,
                // showNullDataPoints: true,
                hover: {
                  size: 5,
                //   sizeOffset: 3
                }
            },
            legend: {
                position: 'top',
            },
        }).render();

        new ApexCharts(document.querySelector("#mixedChart2"), { 
            series: [
                {
                    name: "Monitoring",
                    type: 'column',
                    data: arr_per_day_sum_monitoring
                },

                {
                    name: "Controlling",
                    type: 'column',
                    data: arr_per_day_sum_controlling
                },
        
            ],
            chart: {
                height: 325,
                zoom: {
                enabled: false
                },
            },
            stroke: {
                curve: 'straight',
                width: 2.5, 
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                //
                categories: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'],
                labels: {
                    style: {
                        fontSize: '11px'
                    }
                },
                title: {
                    text: 'Days'
                }
            },

            yaxis: {
                title: {
                    text: 'kWh'
                }
            },
            
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ],
            markers: {
                size: 3,
                // strokeColors: '#fff',
                // strokeWidth: 2,
                strokeOpacity: 1,
                strokeDashArray: 0,
                fillOpacity: 1,
                // discrete: [],
                shape: "circle",
                radius: 2,
                // onClick: undefined,
                // onDblClick: undefined,
                // showNullDataPoints: true,
                hover: {
                  size: 5,
                //   sizeOffset: 3
                }
            },
            legend: {
                position: 'top',
            },
        }).render();

        new ApexCharts(document.querySelector("#mixedChart3"), { 
            series: [
                {
                    name: "Monitoring",
                    type: 'column',
                    data: arr_per_day_channle2_sum_monitoring
                },

                {
                    name: "Controlling",
                    type: 'column',
                    data: arr_per_day_channle2_sum_controlling
                },
        
            ],
            chart: {
                height: 325,
                zoom: {
                enabled: false
                },
            },
            stroke: {
                curve: 'straight',
                width: 2.5, 
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                //
                categories: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'],
                labels: {
                    style: {
                        fontSize: '11px'
                    }
                },
                title: {
                    text: 'Days'
                }
            },

            yaxis: {
                title: {
                    text: 'kWh'
                }
            },
            
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ],
            markers: {
                size: 3,
                // strokeColors: '#fff',
                // strokeWidth: 2,
                strokeOpacity: 1,
                strokeDashArray: 0,
                fillOpacity: 1,
                // discrete: [],
                shape: "circle",
                radius: 2,
                // onClick: undefined,
                // onDblClick: undefined,
                // showNullDataPoints: true,
                hover: {
                  size: 5,
                //   sizeOffset: 3
                }
            },
            legend: {
                position: 'top',
            },
        }).render();

    }, 1000);
}

const handleClick =()=>{
    fetch('https://us-central1-buildint-ebd3e.cloudfunctions.net/app/wifi')
  .then(response => response.json())
  .then(data => console.log(data));
}