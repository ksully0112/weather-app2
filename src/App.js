import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다
// 2. 날씨 정보에는 도시, 섭씨 화씨 날씨 상태
// 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null);
  const [activeCity, setActiveCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const cities = ["paris", "new york", "tokyo", "seoul"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=11c7ebab469590380a4f06c4a32591c5&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    setActiveCity("current");
  };

  const getWeatherByCity = async (cityName) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=11c7ebab469590380a4f06c4a32591c5&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    setActiveCity(cityName);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            onCityClick={getWeatherByCity}
            onCurrentLocationClick={getCurrentLocation}
            activeCity={activeCity}
          />
        </div>
      )}
    </div>
  );
}

export default App;
