import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from 'node:fs/promises';

// TODO: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}
// TODO: Complete the HistoryService class
class HistoryService {
  private historyPath: string;
  constructor() {
    this.historyPath = path.join(process.cwd(), 'db/searchHistory.json');
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await readFile(this.historyPath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await writeFile(this.historyPath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    if (cities.some((city) => city.name.toLowerCase() === cityName.toLowerCase())) {
      console.warn('City already exists in search history');
      return;
  }
  const newCity = new City(uuidv4(), cityName);

  cities.push(newCity);

  await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
