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
        <!-- If there is no data returned, then skip rendering the information -->
        <div v-if="weatherData">
          <!-- Display the weather data attributes returned from API -->
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!-- Display the weather icon -->
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- Display the weather description -->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "48ce56b4caaf32b8f46c2c393e54917d"; 
  
  export default {
    name: "WeatherView",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    computed: {
      temperature() {
        return this.weatherData
          ? Math.round(this.weatherData.main.temp)
          : null;
      },
      iconUrl() {
        return this.weatherData
          ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
              await this.fetchWeatherData(url);
            },
            (error) => {
              console.error("Error fetching location:", error);
              alert("Unable to retrieve your location.");
            }
          );
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
          alert("Error fetching weather data. Please try again.");
        }
      },
      async searchByCity() {
        if (this.city.trim() === "") {
          alert("Please enter a city name.");
          return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          this.city
        )}&appid=${apikey}&units=metric`;
        await this.fetchWeatherData(url);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .header {
    text-align: center;
  }
  
  .search-bar {
    margin-top: 20px;
  }
  
  .search-input {
    width: calc(100% - 100px);
    padding: 10px;
    font-size: 16px;
  }
  
  .search-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #369870;
  }
  
  main {
    text-align: center;
    margin-top: 30px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  img {
    width: 100px;
    height: 100px;
  }
  
  p {
    font-size: 20px;
    margin: 10px 0;
  }
  
  span {
    font-size: 18px;
    color: #555;
  }
  </style>