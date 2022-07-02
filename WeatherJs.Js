var weather = {
    "apiKey":"5eaaf81c202a70319d20567f217733bd",
    getinfo: function(city){
        fetch("http://api.openweathermap.org/data/2.5/weather?q="+city
        +"&units=metric&cnt=7&APPID="
        +this.apiKey)
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },
    
    
    displayWeather: function(data){
        const {name} = data;
        const{min,temp_min}=data.main;
        const{max,temp_max}=data.main;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        
        console.log(name,icon,description,temp,humidity,speed,min,max)
        document.querySelector(".city").innerText="Weather in "+name;
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+".png"
        document.querySelector(".description").innerText=description;
        document.querySelector(".min").innerText="Min: "+convert(temp_min)+"°C";
        document.querySelector(".max").innerText="Max: "+convert(temp_max)+"°C";
        document.querySelector(".temp").innerText = convert(temp) + "°C";
        document.querySelector(".humidity").innerText="Humidity : " +convert(humidity)+"%";
        document.querySelector(".wind").innerText="Wind speed : "+convert(speed)+" km/h";
        //background
        document.body.style.backgroundImage = "URL('https://source.unsplash.com/1600x900/?"+name+"')"
    },
    
    
    
    search: function() {
     this.getinfo(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search-btn").addEventListener("click", function(){
    weather.search();
} )

document.querySelector(".search-bar").addEventListener("keypress",function(e){
    if (e.key =="Enter") {
        weather.search();
    }
})

// Current location
var x = document.querySelector(".search-bar");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
 
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  }

function convert(temp){
    return Math.round(temp);
}

