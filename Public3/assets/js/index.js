//HDFC

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
        ref = database.ref("hdfc/HDFC BANGLORE BRANCH EMS 1/consumption/" + date);
        dataCall()
    }

    else{
        document.getElementById('date_input').setAttribute('value',window.name);
        ref = database.ref("hdfc/HDFC BANGLORE BRANCH EMS 1/consumption/" + window.name);
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
var [seven_day,arr_channle_values_sum,arr_per_day_sum,] = [[],[],[]]
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


    // database.ref('hdfc/HDFC BANGLORE BRANCH EMS 1/consumption/').on('value', function(snapshot){
    //     var cons_dates = snapshot.val()
    //     var cons_dates_values = Object.keys(cons_dates)
        
    //     for(let i = -8; i<-1;i++) { 
    //         var req_date = snapshot.child(cons_dates_values.at(i)).val()
    //         var req_date_key = Object.keys(req_date)
    //         var req_date_key_length = Object.keys(req_date).length
    //         for(let j=0; j<req_date_key_length;j++){
    //             var channle = snapshot.child(cons_dates_values.at(i)).child(req_date_key[j]).val()
    //             var channle_values = Object.values(channle)
    //             var channle_values_sum = channle_values.reduce((a,b) => a + b)
    //             arr_channle_values_sum.push(channle_values_sum)
    //         }
    //         seven_day.push(cons_dates_values.at(i))

    //         var per_day_sum = Math.round((arr_channle_values_sum.reduce((a,b) => a + b))*1000)/1000 
    //         arr_per_day_sum.push(per_day_sum)
    //         arr_channle_values_sum = []
    //     }
    // });

    setTimeout(() => {
        let CH1_total = Math.round((CH1AValues.reduce((a,b) => a + b) + CH1BValues.reduce((a,b) => a + b) + CH1CValues.reduce((a,b) => a + b))*1000)/1000;
        let CH2_total = Math.round((CH2AValues.reduce((a,b) => a + b) + CH2BValues.reduce((a,b) => a + b) + CH2CValues.reduce((a,b) => a + b))*1000)/1000;
        let CH3_total = Math.round((CH3AValues.reduce((a,b) => a + b) + CH3BValues.reduce((a,b) => a + b) + CH3CValues.reduce((a,b) => a + b))*1000)/1000;
        let [CH1_total_hr,CH2_total_hr,CH3_total_hr,total_hr] = [[],[],[],[]]
        // let total_test = CH1AValues.reduce((a,b) => a + b) + CH1BValues.reduce((a,b) => a + b) + CH1CValues.reduce((a,b) => a + b) + CH2AValues.reduce((a,b) => a + b) + CH2BValues.reduce((a,b) => a + b) + CH2CValues.reduce((a,b) => a + b) + CH3AValues.reduce((a,b) => a + b) + CH3BValues.reduce((a,b) => a + b) + CH3CValues.reduce((a,b) => a + b)
        for (let i=0; i < lenghts; i++){
            CH1_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i])*1000)/1000)
            CH2_total_hr.push(Math.round((CH2AValues[i] + CH2BValues[i] + CH2CValues[i])*1000)/1000)
            CH3_total_hr.push(Math.round((CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
            total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i] + CH2AValues[i] + CH2BValues[i] + CH2CValues[i] + CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
        }

        // for (let i=0; i<lenghts; i++){
        //     if (i<9 || i>20){
        //         nw_light_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i])*1000)/1000)
        //         nw_ac_total_hr.push(Math.round((CH2AValues[i] + CH2BValues[i] + CH2CValues[i])*1000)/1000)
        //         nw_ups_total_hr.push(Math.round((CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
        //         nw_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i] + CH2AValues[i] + CH2BValues[i] + CH2CValues[i] + CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
        //         nw_time.push(time[i])
        //     }
        // }

        // for (let i=0; i<lenghts; i++){
        //     if (i>8 && i<21){
        //         w_light_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i])*1000)/1000)
        //         w_ac_total_hr.push(Math.round((CH2AValues[i] + CH2BValues[i] + CH2CValues[i])*1000)/1000)
        //         w_ups_total_hr.push(Math.round((CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
        //         w_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i] + CH2AValues[i] + CH2BValues[i] + CH2CValues[i] + CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
        //         w_time.push(time[i])
        //     }
        // }


        new ApexCharts(document.querySelector("#lineChart2"), { 
            series: [
                {
                    name: "Total",
                    data: total_hr
                },
    
                {
                    name: "UPS",
                    data: CH1_total_hr
                },
    
                {
                    name: "Total Main Power",
                    data: CH2_total_hr
                },
                {
                    name: "Row Power",
                    data: CH3_total_hr
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
    
        new ApexCharts(document.querySelector("#pieChart"), { 
            series: [CH1_total, CH2_total, CH3_total],
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
            labels: ['UPS', 'Total Main Power', 'Row Power'],
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

    }, 1000);
}
