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
var ref,ref2, ref3, ref4;
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
        ref = database.ref("hdfc/Bommanahalli Prabhava/consumption/" + date);
        dataCall()
    }

    else{
        document.getElementById('date_input').setAttribute('value',window.name);
        ref = database.ref("hdfc/Bommanahalli Prabhava/consumption/" + window.name);
        dataCall()

    }
}

$('#datepicker').datepicker().on('change', function (ev) {
    window.name = $("#datepicker").data('datepicker').getFormattedDate('yyyy-mm-dd');
    location.reload()
});

var CH1A,CH1B,CH1C,CH2A,CH2B,CH2C,CH3A,CH3B,CH3C,CH1AValues,CH1BValues,CH1CValues,CH2AValues,CH2BValues,CH2CValues,CH3AValues,CH3BValues,CH3CValues,time,FwdWh_1,FwdWh_1Values,FwdWh_2,FwdWh_2Values,FwdWh_3,FwdWh_3Values;                                      
let lenghts;
var jsonarr = [];

function dataCall(){
    ref.on('value', async function (snapshot){
        Meter1 =  await snapshot.child("Meter 1").val();
        Meter1Key = Object.keys(Meter1)
        Meter1Values = Object.values(Meter1);
        lenghts2 = Object.keys(Meter1).length
        // CH1A = Object.keys(Meter1Values[0])
        // CH1AValues = Object.values(Meter1Values[0]);

        for (var i = 0; i < lenghts2; i++){
            jsonarr.push({
                name: Meter1Key[i],
                data: Object.values(Meter1Values[i])
            });
        }
        console.log(Object.values(Meter1Values[1]))
        
        time = Object.keys(Meter1Values[0])
    });

    // ref2.on('value', async function (snapshot){
    //     FwdWh_1 =  await snapshot.child("FwdWh").val();
    //     FwdWh_1Values = Object.values(FwdWh_1);
    // });

    setTimeout(() => {
        
        new ApexCharts(document.querySelector("#lineChart"), { 
            series: [
                jsonarr[0],
                jsonarr[1],
                jsonarr[2],
                jsonarr[3],
                jsonarr[4],
                jsonarr[5],
                jsonarr[6],
                jsonarr[7],
                jsonarr[8],
                jsonarr[9],
                jsonarr[10],
                jsonarr[11],
            ],
            chart: {
                height: 410,
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
                colors: ['#f3f3f3', 'transparent'],
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
            ],
    
        }).render();

        // new ApexCharts(document.querySelector("#lineChart1"), { 
        //     series: [
        //         {
        //             name: "FwdWh",
        //             data: FwdWh_1Values
        //         },
        //     ],
        //     chart: {
        //         height: 350,
        //         type: 'line',
        //         zoom: {
        //         enabled: false
        //         }
        //     },
        //     dataLabels: {
        //         enabled: false
        //     },
        //     stroke: {
        //         curve: 'straight'
        //     },
        //     grid: {
        //         row: {
        //         colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        //         opacity: 0.5
        //         },
        //     },
        //     xaxis: {
        //         categories: time,
        //         labels: {
        //             style: {
        //                 fontSize: '12px'
        //             }
        //         }
        //     },
        //     responsive: [
        //         {
        //             breakpoint: 720,
        //             options: {
        //             xaxis: {
        //                 labels: {
        //                     style: {
        //                         fontSize: '8px'
        //                     }
        //                 }
        //             },
        //             }
        //         }
        //     ]
    
        // }).render();

    }, 2000);
}
