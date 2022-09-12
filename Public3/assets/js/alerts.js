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
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
var alert_dates_values,alert_dates_lenght,kWh_total_value
var total_value = 0;
let lenghts;

    database.ref('Alerts').on('value', function(snapshot){
        var alert_dates = snapshot.val()
        alert_dates_values = Object.keys(alert_dates)
        alert_dates_lenght = Object.keys(alert_dates).length
        var html = '<table class=\"table\">'
        html+='<tr>';
        html+='<th>'+'Date'+'</th>';
        html+='<th>'+'Alert'+'</th>';
        html+='<th>'+'Time'+'</th>';
        html+='<th>'+'Over Consumption in kWh'+'</th>';
        html+='</tr>';
        let text
        for(let i=0; i<alert_dates_lenght; i++){
            var channel_name = snapshot.child(alert_dates_values.at(i)).val()
            var channel_name_key = Object.keys(channel_name)
            var channel_name_length = Object.keys(channel_name).length
            for (let k=0; k<channel_name_length; k++){
                var timing = snapshot.child(alert_dates_values.at(i)).child(channel_name_key[k]).val()
                var timing_keys = Object.keys(timing)
                var timing_values = Object.values(timing)
                kWh_total_value = Math.round(timing_values.reduce((a,b) => a+b)*1000)/1000
                if (channel_name_key[k]=='CH1 - Active Power Total A' || channel_name_key[k]=='CH1 - Active Power Total B' || channel_name_key[k]=='CH1 - Active Power Total C'){
                    text = 'Light'
                }
                else if(channel_name_key[k]=='CH2 - Active Power Total A' || channel_name_key[k]=='CH2 - Active Power Total B' || channel_name_key[k]=='CH2 - Active Power Total C'){
                    text = 'AC'
                }
                html+='<tr>';
                html+='<td>'+alert_dates_values[i]+'</td>';
                html+='<td>'+'<strong>'+channel_name_key[k]+'</strong>'+' - over consumption of '+text+'</td>';
                html+='<td>'+timing_keys+'</td>';
                html+='<td>'+kWh_total_value+'kWh'+'</td>';
                html+='</tr>';
                total_value = kWh_total_value + total_value;
            }

        }
        html+='<tr>';
        html+='<th style=\'width:150px\'>'+'Total'+'</th>';
        html+='<th>'+''+'</th>';
        html+='<th>'+''+'</th>';
        html+='<th>'+Math.round((total_value)*1000)/1000+'kWh'+'</th>';
        // html+='<th>'+total_value+'kWh (&#x20B9 '+Math.round((total_value*12)*1000)/1000+')'+'</th>';
        html+='</tr>';
        document.getElementById('table').innerHTML = html
    })