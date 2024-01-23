// Getting the current date
const currentDate = new Date().toDateString();

/* OpenWeather */
const weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ba3647bf8ea930ea3097b482e125d50d';
const serverURL = "http://127.0.0.1:4848"

const errorElement = document.getElementById("error");

const generateData = () => { 
  const zipCode = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;
  getWeatherData(zipCode).then((data) => {
   
    if (data) {
      const {
        main: { temperature },
        name: cityName,
        weather: [{ description }],
      } = data;

      const info = {
        currentDate,
        cityName,
        temperature: Math.round(temperature), 
        description,
        userFeelings,
      };
      postData(serverURL + "/add", info);
      updateUI();
      document.getElementById('entry').style.opacity = 1;
    }
  });
};

document.getElementById("generate").addEventListener("click", generateData);

const getWeatherData = async (zip) => {
  try {
    const response = await fetch(weatherBaseURL + zip + apiKey);
    const data = await response.json();

    if (data.cod != 200) {
      errorElement.innerHTML = data.message;
      setTimeout(() => errorElement.innerHTML = '', 2000);
      throw `${data.message}`;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = "", info = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await response.json();
    console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const response = await fetch(serverURL + "/all");
  try {
    const savedData = await response.json();

    document.getElementById("date").innerHTML = savedData.currentDate;
    document.getElementById("cityName").innerHTML = savedData.cityName;
    document.getElementById("temperature").innerHTML = savedData.temperature;
    document.getElementById("description").innerHTML = savedData.description;
    document.getElementById("content").innerHTML = savedData.userFeelings;
  } catch (error) {
    console.log(error);
  }
}
