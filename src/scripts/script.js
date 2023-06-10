// Get the container where the divs will be appended
var container = document.querySelector('.section-3-day-data-container');
var json_full_data = {};
var original_hour_data_index=0;
// Loop 24 times to create and append the divs
for (var i = 0; i <= 23; i++) {
  // Create a new div element
  var div = document.createElement('div');
  div.className = 'section-3-hour-data-container hour-data-box-index-' + i;

  // Create the nested divs
  var allInWrapper = document.createElement('div');
  allInWrapper.className = 'section-3-hour-data-allin-wrapper';

  var timeContainer = document.createElement('div');
  timeContainer.className = 'section-3-hour-data-time-container hour-data-time-box-index-' + i;
  var timeText = document.createElement('span');
  timeText.className = 'section-3-hour-data-time-text hour-data-time-text-index-' + i;
  timeText.textContent = '--AM/PM'; // Set the time value
  timeContainer.appendChild(timeText);

  var tempContainer = document.createElement('div');
  tempContainer.className = 'section-3-hour-data-temp-container hour-data-temp-box-index-' + i;
  var tempText = document.createElement('span');
  tempText.className = 'section-3-hour-data-temp-text hour-data-temp-text-index-' + i;
  tempText.textContent = '--°C'; // Set the temperature value
  tempContainer.appendChild(tempText);

  var windSpeedContainer = document.createElement('div');
  windSpeedContainer.className = 'section-3-hour-data-wind-speed-container hour-data-wind-speed-box-index-' + i;
  var windSpeedText = document.createElement('span');
  windSpeedText.className = 'section-3-hour-data-wind-speed-text hour-data-wind-speed-text-index-' + i;
  windSpeedText.textContent = 'Wind speed --kph'; // Set the wind speed value
  windSpeedContainer.appendChild(windSpeedText);

  // Append the nested divs to the main div
  allInWrapper.appendChild(timeContainer);
  allInWrapper.appendChild(tempContainer);
  allInWrapper.appendChild(windSpeedContainer);
  div.appendChild(allInWrapper);

  // Append the main div to the container
  container.appendChild(div);
}


city_name="new delhi"
fetch('https://calamivathan.pythonanywhere.com/?city='+city_name)
  .then(response => response.json())
  .then(data => {
    // Access the data and perform operations
    console.log(data);
    console.log(typeof data);
    json_full_data = Object.assign({}, data); // Corrected line
    console.log("json_full_data: "+json_full_data);
    update_values();
  })
  .catch(error => {
    // Handle any errors
    console.log(error);
  });

function update_values() {
      // update in html
    document.getElementsByClassName('section-1-weather-temp-text')[0].textContent = json_full_data[0].current.temp_c + "°C";
    document.getElementsByClassName('humidity-data-updating')[0].textContent =json_full_data[0].current.humidity + "%";
    document.getElementsByClassName('wind-speed-data-updating')[0].textContent = json_full_data[0].current.wind_kph + " Kph";
    document.getElementsByClassName('section-1-weather-condition-text')[0].textContent = json_full_data[0].current.condition.text;
    document.getElementsByClassName('section-1-weather-location-text')[0].textContent =json_full_data[0].location.name;
    document.getElementsByClassName('air-pressure-data-updating')[0].textContent = json_full_data[0].current.pressure_mb + "Mb";
    document.getElementsByClassName('rain-chances-data-updating')[0].textContent =json_full_data[0].forecast.forecastday[0].hour[12].chance_of_rain + "%";
    document.getElementsByClassName('section-3-day-name-text')[0].textContent = json_full_data[0].forecast.forecastday[0].date;
    // applying the backgroung to the body
    document.body.style.backgroundImage = "url('"+json_full_data[1][0].urls.full +"')";
    
    update_hour_data_values();
}
function change_hour_data(next,prev){
  console.log("next prev values : "+next,prev);
  if(prev == 1){
    original_hour_data_index = original_hour_data_index + next - prev;
    if(original_hour_data_index <0){
      original_hour_data_index = 9;
    }
  }
  if(next=1){
    original_hour_data_index = original_hour_data_index + next - prev;
    if(original_hour_data_index >9){
      original_hour_data_index = 0;
    }
  }
  update_hour_data_values();
  console.log(original_hour_data_index);
}
function update_hour_data_values(){
  document.getElementsByClassName('section-3-day-name-text')[0].textContent = json_full_data[0].forecast.forecastday[original_hour_data_index].date;
    for (var i = 0; i <= 23; i++) {
      document.getElementsByClassName('section-3-hour-data-time-text hour-data-time-text-index-' + i)[0].textContent = json_full_data[0].forecast.forecastday[original_hour_data_index].hour[i].time.split(' ')[1];
      document.getElementsByClassName('section-3-hour-data-temp-text hour-data-temp-text-index-' + i)[0].textContent = json_full_data[0].forecast.forecastday[original_hour_data_index].hour[i].temp_c+"°C" ;
      document.getElementsByClassName('section-3-hour-data-wind-speed-text hour-data-wind-speed-text-index-' + i)[0].textContent ="Wind Speed " + json_full_data[0].forecast.forecastday[original_hour_data_index].hour[i].wind_kph+"Kph";
  }
}