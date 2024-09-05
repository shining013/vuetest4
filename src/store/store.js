import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    //initial data
    name: "이윤주",
    counter: 0,
    weatherData: {
      icon: "icon",
      temp: 0,
      text: "text",
      location: "location",
      city: "seoul",
    },
  },
  _mutations: {
    //변형 //commit
    addCount(state, payload) {
      state.counter++;
    },
    updateData(state, payload) {
      state.weatherData.icon = payload.weather[0].icon;
      state.weatherData.temp = payload.main.temp;
      state.weatherData.text = payload.weather[0].description;
      state.weatherData.location = payload.sys.country;
      state.weatherData.city = payload.name;
    },
    onSearchCity(state, payload) {
      state.weatherData.city = payload;
    },
  },
  get mutations() {
    return this._mutations;
  },
  set mutations(value) {
    this._mutations = value;
  },
  actions: {
    //비동기 //
    async getWeather(context) {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${context.state.weatherData.city}&appid=4eedfeb184dc7cb08af6c0bd529c48b9`
      );
      console.log(res.data);
      context.commit("updataData", res.data);
    },
  },
});
