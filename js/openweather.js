// Documentación en https://openweathermap.org/current
var c = console.log
const api_key = "",
	ciudadBuscada = document.getElementById("ciudadBuscada"),
	btnSearch = document.getElementById("btnSearch"),
	displayClima = document.getElementById("displayClima"),
	displayCiudad = document.getElementById("displayCiudad"),
	iconoClima = document.getElementById("iconoClima"),
	tempMin = document.getElementById("tempMin"),
	tempMax = document.getElementById("tempMax"),
	tempActual = document.getElementById("tempActual"),
	sensTermica = document.getElementById("sensTermica"),
	presionAtm = document.getElementById("presionAtm"),
	humedad = document.getElementById("humedad"),
	velViento = document.getElementById("velViento")

btnSearch.addEventListener("click", () => {
	buscarCiudad(ciudadBuscada.value);
})

function buscarCiudad(nombreCiudad) {
	c("ciudad_nombre: ", nombreCiudad);

	const fetchPromise = fetch(
		"https://api.openweathermap.org/data/2.5/weather?q=" +
			ciudadBuscada.value +
			"&appid=" +
			api_key +
			"&lang=Es&units=metric"
	)

	fetchPromise
		.then((response) => {
			c("respuesta_api: ", response);
			return response.json()
		})
		.then((resultado_search) => {
			c("Informacion que devuelve la API: ", resultado_search);

			mostrar(resultado_search);
		})
		.catch((err) => {
			c("Ooops i failed again -- Fallo en la busqueda", err);
		})
}

function mostrar(resultado_search) {
	var nCiudad = resultado_search.name;
	var dClima = resultado_search.weather[0].description;
	var iconClima = resultado_search.weather[0].icon;
	var tempActualizada = resultado_search.main.temp;
	var temp_Maxima = resultado_search.main.temp_max;
	var temp_Min = resultado_search.main.temp_min;
	var sensTermica = resultado_search.main.feels_like;
	var presionAtms = resultado_search.main.humidity;
	var humedadAct = resultado_search.main.humidity;
	var velVientoAct = parseInt(resultado_search.wind.speed * 3.6);
	c(
		nCiudad,
		dClima,
		iconClima,
		tempActualizada,
		temp_Maxima,
		temp_Min,
		sensTermica,
		presionAtms,
		humedadAct,
		velVientoAct
	);
	displayCiudad.innerHTML = nCiudad;
	displayClima.innerHTML = dClima;
	iconoClima.src = `http://openweathermap.org/img/wn/${iconClima}@2x.png`;
	iconoClima.alt = dClima;
	tempActual.innerHTML = tempActualizada + "°";
	tempMax.innerHTML = temp_Maxima + "°";
	tempMin.innerHTML = temp_Min + "°";
	sensTermica.innerHTML = sensTermica + "°";
	presionAtm.innerHTML = presionAtms + " hp";
	humedad.innerHTML = humedadAct + " %";
	velViento.innerHTML = velVientoAct + " km/h";

	var datosUltimaConsulta = {
		ciudad: nCiudad,
		descripcion: dClima,
		icono: `http://openweathermap.org/img/wn/${iconClima}@2x.png`,
		temperaturaMomentoConsulta: tempActualizada,
		temperaturaMinima: temp_Min,
		temperaturaMaxima: temp_Maxima,
		sensasionTermica: sensTermica,
		humedad: humedadAct,
		presionAtm: presionAtms,
		velocidadDelViento: velVientoAct,
	}

	localStorage.setItem(
		"ult_ciudad_buscada",
		JSON.stringify(datosUltimaConsulta)
	);
}
window.onload = function () {
	var recover_search = JSON.parse(localStorage.getItem("ult_ciudad_buscada"));
	c(recover_search);
	displayCiudad.innerHTML = recover_search.ciudad;
	displayClima.innerHTML = recover_search.descripcion;
	iconoClima.src = recover_search.icono;
	tempActual.innerHTML = recover_search.temperaturaMomentoConsulta + "°";
	sensTermica.innerHTML = recover_search.sensasionTermica + "°";
	tempMin.innerHTML = recover_search.temperaturaMinima + "°";
	tempMax.innerHTML = recover_search.temperaturaMaxima + "°";
	humedad.innerHTML = recover_search.humedad + " %";
	velViento.innerHTML = recover_search.velocidadDelViento + " km/h";
	presionAtm.innerHTML = recover_search.presionAtm + " hp";
}
