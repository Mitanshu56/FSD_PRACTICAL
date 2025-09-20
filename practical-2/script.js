// Enhanced weather data with more cities and detailed information
const weatherData = {
  "New York": { 
    temp: 22, 
    desc: "Sunny", 
    icon: "fas fa-sun",
    humidity: 65,
    windSpeed: 12,
    feelsLike: 25
  },
  "London": { 
    temp: 18, 
    desc: "Cloudy", 
    icon: "fas fa-cloud",
    humidity: 78,
    windSpeed: 8,
    feelsLike: 16
  },
  "Paris": { 
    temp: 20, 
    desc: "Partly Cloudy", 
    icon: "fas fa-cloud-sun",
    humidity: 72,
    windSpeed: 10,
    feelsLike: 22
  },
  "Tokyo": { 
    temp: 25, 
    desc: "Clear", 
    icon: "fas fa-sun",
    humidity: 58,
    windSpeed: 15,
    feelsLike: 27
  },
  "Mumbai": { 
    temp: 30, 
    desc: "Humid", 
    icon: "fas fa-smog",
    humidity: 85,
    windSpeed: 6,
    feelsLike: 35
  },
  "Sydney": { 
    temp: 24, 
    desc: "Windy", 
    icon: "fas fa-wind",
    humidity: 70,
    windSpeed: 20,
    feelsLike: 22
  },
  "Berlin": { 
    temp: 16, 
    desc: "Rainy", 
    icon: "fas fa-cloud-rain",
    humidity: 88,
    windSpeed: 14,
    feelsLike: 14
  },
  "Dubai": { 
    temp: 38, 
    desc: "Hot", 
    icon: "fas fa-temperature-high",
    humidity: 45,
    windSpeed: 8,
    feelsLike: 42
  },
  "Moscow": { 
    temp: 12, 
    desc: "Cold", 
    icon: "fas fa-snowflake",
    humidity: 60,
    windSpeed: 18,
    feelsLike: 8
  },
  "Los Angeles": { 
    temp: 26, 
    desc: "Perfect", 
    icon: "fas fa-sun",
    humidity: 55,
    windSpeed: 11,
    feelsLike: 28
  }
};

// DOM Elements
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");
const loadingSpinner = document.getElementById("loadingSpinner");
const cityTags = document.querySelectorAll(".city-tag");

// State management
let isLoading = false;

// Weather icons mapping
const weatherIcons = {
  "sunny": "fas fa-sun",
  "cloudy": "fas fa-cloud",
  "rainy": "fas fa-cloud-rain",
  "clear": "fas fa-sun",
  "partly cloudy": "fas fa-cloud-sun",
  "humid": "fas fa-smog",
  "windy": "fas fa-wind",
  "hot": "fas fa-temperature-high",
  "cold": "fas fa-snowflake",
  "perfect": "fas fa-sun"
};

// Utility Functions
function showLoading() {
  isLoading = true;
  loadingSpinner.style.display = 'block';
  weatherResult.innerHTML = '';
  getWeatherBtn.disabled = true;
  getWeatherBtn.style.opacity = '0.7';
}

function hideLoading() {
  isLoading = false;
  loadingSpinner.style.display = 'none';
  getWeatherBtn.disabled = false;
  getWeatherBtn.style.opacity = '1';
}

function formatCityName(city) {
  return city.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function createWeatherCard(city, weather) {
  const formattedCity = formatCityName(city);
  const icon = weatherIcons[weather.desc.toLowerCase()] || weather.icon || "fas fa-cloud";
  
  return `
    <div class="weather-card">
      <h2>
        <i class="fas fa-map-marker-alt"></i>
        ${formattedCity}
      </h2>
      <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 20px 0;">
        <i class="${icon}" style="font-size: 3rem; opacity: 0.9;"></i>
        <div class="temperature">${weather.temp}°C</div>
      </div>
      <div class="description">${weather.desc}</div>
      <div class="weather-details">
        <div class="detail-item">
          <i class="fas fa-thermometer-half"></i>
          <div>Feels like</div>
          <div><strong>${weather.feelsLike}°C</strong></div>
        </div>
        <div class="detail-item">
          <i class="fas fa-tint"></i>
          <div>Humidity</div>
          <div><strong>${weather.humidity}%</strong></div>
        </div>
        <div class="detail-item">
          <i class="fas fa-wind"></i>
          <div>Wind Speed</div>
          <div><strong>${weather.windSpeed} km/h</strong></div>
        </div>
        <div class="detail-item">
          <i class="fas fa-eye"></i>
          <div>Visibility</div>
          <div><strong>Good</strong></div>
        </div>
      </div>
    </div>
  `;
}

function createErrorMessage(city) {
  return `
    <div class="error-message">
      <i class="fas fa-exclamation-triangle" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
      <h3>City Not Found</h3>
      <p>Weather data for '${formatCityName(city)}' is not available.</p>
      <p style="font-size: 0.9rem; opacity: 0.9; margin-top: 10px;">
        Try searching for: ${Object.keys(weatherData).slice(0, 3).join(', ')}, etc.
      </p>
    </div>
  `;
}

// Main weather fetching function
async function getWeather(city) {
  if (!city) {
    weatherResult.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <p>Please enter a city name to get weather information.</p>
      </div>
    `;
    return;
  }

  showLoading();

  // Simulate API delay for better UX demonstration
  await new Promise(resolve => setTimeout(resolve, 1200));

  const weather = weatherData[city];
  
  if (weather) {
    weatherResult.innerHTML = createWeatherCard(city, weather);
    
    // Add animation class
    const weatherCard = weatherResult.querySelector('.weather-card');
    if (weatherCard) {
      weatherCard.style.animation = 'slideInUp 0.6s ease-out';
    }
  } else {
    weatherResult.innerHTML = createErrorMessage(city);
  }
  
  hideLoading();
}

// Event Listeners
getWeatherBtn.addEventListener("click", () => {
  if (isLoading) return;
  const city = cityInput.value.trim();
  getWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !isLoading) {
    const city = cityInput.value.trim();
    getWeather(city);
  }
});

// City tag click handlers
cityTags.forEach(tag => {
  tag.addEventListener("click", () => {
    if (isLoading) return;
    
    const city = tag.dataset.city;
    cityInput.value = city;
    getWeather(city);
    
    // Add visual feedback
    tag.style.transform = 'scale(0.95)';
    setTimeout(() => {
      tag.style.transform = '';
    }, 150);
  });
});

// Auto-suggestion functionality
cityInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  if (value.length > 0) {
    const suggestions = Object.keys(weatherData)
      .filter(city => city.toLowerCase().includes(value))
      .slice(0, 3);
    
    // You could implement a dropdown suggestion list here
    // For now, we'll just highlight matching city tags
    cityTags.forEach(tag => {
      const cityName = tag.dataset.city.toLowerCase();
      if (cityName.includes(value)) {
        tag.style.background = 'linear-gradient(45deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))';
        tag.style.borderColor = 'rgba(102, 126, 234, 0.6)';
      } else {
        tag.style.background = '';
        tag.style.borderColor = '';
      }
    });
  } else {
    // Reset all city tags
    cityTags.forEach(tag => {
      tag.style.background = '';
      tag.style.borderColor = '';
    });
  }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Add some entrance animations
  setTimeout(() => {
    cityInput.focus();
  }, 1000);
  
  // Add keyboard shortcut info
  console.log('💡 Pro tip: Press Enter to search, or click on popular cities below!');
});
