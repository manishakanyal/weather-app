window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-discription')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let temperatureTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.temperature')
    let countryC = document.querySelector('.country')
    let nameMa = document.querySelector('.name')

    const temperatureSpan = document.querySelector('.temperature span')
    let iconElem = document.querySelector('#icon');
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position=>{
       long = position.coords.longitude
       lat = position.coords.latitude
       const proxy = "https://cors-anywhere.herokuapp.com/"
       const api =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ca3e3e1830829c8a7bf938066eab8803`;
       fetch(api)
       .then(response =>{
           return response.json()
       })
        .then(data=>{
        console.log(data)
        const { name, dt, timezone, main:{temp, pressure, humidity}, sys: {country}, weather: [{description, icon}] } = data;
        let date = new Date(data.dt)
        console.log(name, dt, temp, pressure, humidity, country, description)
        //    sets dom elements from the api

        let temperature = (temp-273.15)
        temperatureDegree.textContent = temperature
        temperatureDescription.textContent = description
        temperatureTimezone.textContent = timezone
        countryC.textContent = country
        nameMa.textContent = name
        // formula for celcius
        // let celcius = (temperature-32)*(5/9);
        // set icon 
        // setIcon(icon,document.querySelector("icon"))
        iconElem.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)
        // change temperature to celcius
        let farenhiet = (32 * 9/5) + temperature
        temperatureSpan.addEventListener('click', function(){
            if(temperatureSpan.textContent==="C"){
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.floor(farenhiet)
            }else{
                temperatureSpan.textContent="C"
                temperatureDegree.textContent = temperature
            }
          })
       })
    })

    }else{
        h1.textContent ="this isn't working because reasons"
    }
})
