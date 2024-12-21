import { Router, type Request, type Response } from 'express';
import { HistoryService} from '../../service/historyService.js';
import { WeatherService } from '../../service/weatherService.js';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const {cityName} = req.body;
  if (!cityName) {
    return res.status(400).json({message: 'City name is required'});
  }
  try {
    const weatherData = await WeatherService.getWeatherData(cityName);
  // TODO: save city to search history
  await HistoryService.addCity(cityName);

  res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({message: 'Failed to fetch weather data'});
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({message: 'Failed to fetch search history'});
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
