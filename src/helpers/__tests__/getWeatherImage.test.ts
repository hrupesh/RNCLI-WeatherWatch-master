import getWeatherImage, {WeatherCode} from '../getWeatherImage';

test.each([
  {
    weatherCode: '0' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/01d@2x.png',
  },
  {
    weatherCode: '1' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/01d@2x.png',
  },
  {
    weatherCode: '2' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/02d@2x.png',
  },
  {
    weatherCode: '3' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/03d@2x.png',
  },
  {
    weatherCode: '45' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/50d@2x.png',
  },
  {
    weatherCode: '48' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/50d@2x.png',
  },
  {
    weatherCode: '51' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    weatherCode: '53' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    weatherCode: '55' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    weatherCode: '56' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    weatherCode: '57' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    weatherCode: '61' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/10d@2x.png',
  },
  {
    weatherCode: '63' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/10d@2x.png',
  },
  {
    weatherCode: '65' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/10d@2x.png',
  },
  {
    weatherCode: '66' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/10d@2x.png',
  },
  {
    weatherCode: '67' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/10d@2x.png',
  },
  {
    weatherCode: '71' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/13d@2x.png',
  },
  {
    weatherCode: '73' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/13d@2x.png',
  },
  {
    weatherCode: '75' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/13d@2x.png',
  },
  {
    weatherCode: '77' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/13d@2x.png',
  },
  {
    weatherCode: '80' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    weatherCode: '81' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    weatherCode: '82' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    weatherCode: '85' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/13d@2x.png',
  },
  {
    weatherCode: '86' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/13d@2x.png',
  },
  {
    weatherCode: '95' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/11d@2x.png',
  },
  {
    weatherCode: '96' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/11d@2x.png',
  },
  {
    weatherCode: '99' as WeatherCode,
    image: 'https://openweathermap.org/img/wn/11d@2x.png',
  },
])(
  'should render the correct image for weather code: $weatherCode',
  ({weatherCode, image}) => {
    expect(getWeatherImage(weatherCode)).toEqual(image);
  },
);
