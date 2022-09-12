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
        ref = database.ref("icici/vashi/consumption/" + date);
        dataCall()
    }

    else{
        document.getElementById('date_input').setAttribute('value',window.name);
        ref = database.ref("icici/vashi/consumption/" + window.name);
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
var seven_day = []
var arr_channle_values_sum = []
var arr_per_day_sum = []
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

    database.ref('icici/vashi/consumption').on('value', function(snapshot){
        var cons_dates = snapshot.val()
        var cons_dates_values = Object.keys(cons_dates)
        
        for(let i = -7; i<-1;i++) { 
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
    })

    setTimeout(() => {
        let light_total = Math.round((CH1AValues.reduce((a,b) => a + b) + CH1BValues.reduce((a,b) => a + b) + CH1CValues.reduce((a,b) => a + b))*1000)/1000;
        let ac_total = Math.round((CH2AValues.reduce((a,b) => a + b) + CH2BValues.reduce((a,b) => a + b) + CH2CValues.reduce((a,b) => a + b))*1000)/1000;
        let ups_total = Math.round((CH3AValues.reduce((a,b) => a + b) + CH3BValues.reduce((a,b) => a + b) + CH3CValues.reduce((a,b) => a + b))*1000)/1000;
        let light_total_hr = []
        let ups_total_hr = []
        let ac_total_hr = []
        let total_hr = []
        // let total_test = CH1AValues.reduce((a,b) => a + b) + CH1BValues.reduce((a,b) => a + b) + CH1CValues.reduce((a,b) => a + b) + CH2AValues.reduce((a,b) => a + b) + CH2BValues.reduce((a,b) => a + b) + CH2CValues.reduce((a,b) => a + b) + CH3AValues.reduce((a,b) => a + b) + CH3BValues.reduce((a,b) => a + b) + CH3CValues.reduce((a,b) => a + b)
        for (let i=0; i < lenghts; i++){
            light_total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i])*1000)/1000)
            ac_total_hr.push(Math.round((CH2AValues[i] + CH2BValues[i] + CH2CValues[i])*1000)/1000)
            ups_total_hr.push(Math.round((CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
            total_hr.push(Math.round((CH1AValues[i] + CH1BValues[i] + CH1CValues[i] + CH2AValues[i] + CH2BValues[i] + CH2CValues[i] + CH3AValues[i] + CH3BValues[i] + CH3CValues[i])*1000)/1000)
        }

        new ApexCharts(document.querySelector("#lineChart"), { 
            series: [
                {
                    name: "CH1 - Active Power Total A",
                    data: CH1AValues
                },
    
                {
                    name: "CH1 - Active Power Total B", 
                    data: CH1BValues
                },
    
                {
                    name: "CH1 - Active Power Total C", 
                    data: CH1CValues
                },
    
                {
                    name: "CH2 - Active Power Total A",
                    data: CH2AValues
                },
    
                {
                    name: "CH2 - Active Power Total B", 
                    data: CH2BValues
                },
    
                {
                    name: "CH2 - Active Power Total C", 
                    data: CH2CValues
                },
    
                {
                    name: "CH3 - Active Power Total A",
                    data: CH3AValues
                },
    
                {
                    name: "CH3 - Active Power Total B", 
                    data: CH3BValues
                },
    
                {
                    name: "CH3 - Active Power Total C", 
                    data: CH3CValues
                }, 
    
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
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
            ]
    
        }).render();

    }, 1000);
}
