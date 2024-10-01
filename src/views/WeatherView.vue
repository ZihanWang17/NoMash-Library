<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
  
      <!-- The <main> tag in HTML is used to specify the main content of a document -->
      <main>
        <!-- If there are no data returned, then skip rendering the information -->
        <div v-if="weatherData">
          <!-- Display the weather data attribute returned from API -->
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!-- The image source of the weather icon will be coming from a function called iconUrl -->
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- weather[0] means the current weather, the way we need to obtain data depends on how the API JSON data looks -->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>

<script>
  // The info section in 10.1.1 provided detailed information about this package
  import axios from "axios";

  const apikey = "48ce56b4caaf32b8f46c2c393e54917d";

  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    // computed is a property that is used to define a property that
    // is dependent on other data properties.
    // The derived value such as temperature automatically updates when the relevant value changes.
    computed: {
      // There are multiple ways to obtain the data in Celsius format.
      // Calculation by yourself like below after data is retrieved or via API parameters

      // Example of adding additional units requirement, if you choose this, remember to change section 3.1
      // https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273)
          : null;
      },
      // Get the current weather icon using the API link
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    // There are two steps involved in this,
    // step 1: identify current location
    // step 2: after identifying, get the weather data straight based on the current location.
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      // Async means the method will run in the background thread,
      // and it won't occupy the main thread, so the user experience is still smooth
      async fetchCurrentLocationWeather() {
        // The navigator.geolocation object is part of the Web API provided by modern web browsers
        // Please note this function does not belong to Vue or OpenWeather.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            // API link to obtain the current weather based on the current location identified by the browser
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            // await means wait for the fetchWeatherData method to complete before proceeding
            await this.fetchWeatherData(url);
          });
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          // Returned data from API is stored as a JSON object in weatherData
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
    }, 
  }; 
</script>