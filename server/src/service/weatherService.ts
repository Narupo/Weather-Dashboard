import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public city: string,
    public date: string,
    public tempF: number,
    public windSpeed: number,
    public humidity: number,
    public icon: string,
    public icondescription: string
  ) {}
}
// TODO: Complete the WeatherService class
class WeatherService {
  private baseUrl = string;
  private apiKey = string;
  private cityname = string;

  constructor() {
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/';
    this.apiKey = process.env.WEATHER_API_KEY; || '';
    this.cityname = '';
  }

  setcityname(cityname: string): void {
    this.cityname = cityname;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(): Promise<any> {
    cosnt Response = await fetch(query);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    return response.json();
  }
  // TODO: Create destructureLocationData method
  private destructLocationData(locationData: any): Coordinates {
    if (!locationData[0]) {
      throw new Error('Failed to fetch location data');
    }
    return {lat: locationData[0].lat, lon: locationData[0].lon};
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseUrl}geocode?q=${this.cityname}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructLocationData(locationData);

  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) Weather (
    const currentWeather = response.list[0];
    return new Weather(
      response.city.name,
      currentWeather.dt_txt,
      currentWeather.main.temp,
      currentWeather.wind.speed,
      currentWeather.main.humidity,
      currentWeather.weather[0].icon,
      currentWeather.weather[0].description
  );
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecasts: Weather[] = [];
    weatherData.forEach((item: any) => {
      const forecast = new Weather(
        currentWeather.city,
        item.dt_txt,
        item.main.temp,
        item.wind.speed,
        item.main.humidity,
        item.weather[0].icon,
        item.weather[0].description
      );
      forecasts.push(forecast);
    });
    return forecasts;
  } {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    this.setcityname(city);
    const coordinates = await this.fetchAndDestructureLocationData();
    const response = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(response);
    const forecastArray = this.buildForecastArray(currentWeather, response.list);
    return [currentWeather, ...forecastArray];
  }
}

export default new WeatherService();
