const zone = document.querySelector('.zone');
const temp = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind-speed');
const windDeg = document.querySelector('.wind-deg');
const submitBtn = document.querySelector('.submit-btn');
const icon = document.querySelector('.icon');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const wrapper = document.querySelector('.wrapper');
const desc = document.querySelector('.desc');
const main = document.querySelector('.main');
let searchValue;
let active = false;

searchInput.addEventListener('input',updateInput);

form.addEventListener('submit', (e) => {
  e.preventDefault();
	if(!searchValue){
		return;
	}
  currentSearch = searchValue;
  create(currentSearch);
});

async function getWeather(location){
	const data  = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=7d8978bfb75df48bc27b19447532e898`);
	if(data.status === 404){
		return false;
	} else {
		return data.json();
	}
}


async function create(location){
	let date = await getWeather(location);
	if(date){
		console.log(date);
	  zone.textContent = `${date.name}, ${date.sys.country}`;
	  icon.innerHTML = `<img src='http://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png' />`;
		desc.textContent = date.weather[0].main;
		main.textContent = `${date.main.temp}°C`;
    temp.textContent = `${date.main.temp_min}/${date.main.temp_max}°C`;
    windSpeed.textContent = `wind: ${date.wind.speed} m/s`;
	  if(!active) {
		  wrapper.classList.add('active');
  		active = true;
	  }
  } else if( !date  && active === true) {
		wrapper.classList.remove('active');
  	active = false;
	}
	date = null;
}

function updateInput(e){
  searchValue = e.target.value; 
}