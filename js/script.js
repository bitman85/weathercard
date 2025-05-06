const bitWeather = {
    // Método para manejar tarjetas
    card: function (selector, options) {
        return {
            // Método para crear la tarjeta
            create: async function () {
                // Validar si se proporciona la apiKey en las opciones
                if (!options || !options.apiKey) {
                    console.error("Falta la apiKey en las opciones proporcionadas.");
                    return;
                }

                // Establecer valores predeterminados para opciones adicionales
                const language = options.language || "en"; // Idioma por defecto: inglés
                const units = options.units || "metric"; // Unidades por defecto: métrico

                // Seleccionar el elemento del DOM con el selector proporcionado
                const container = document.querySelector(selector);

                if (!container) {
                    console.error("El selector proporcionado no existe en el DOM.");
                    return;
                }

                // Añadir la clase .bitweathercard al contenedor
                container.classList.add("bitweathercard");

                // Obtener la ubicación del usuario
                try {
                    const position = await this.getUserLocation();
                    const { latitude, longitude } = position.coords;

                    // Llamar a la API de OpenWeatherMap para obtener los datos
                    const weatherData = await this.fetchWeatherData(
                        options.apiKey,
                        latitude,
                        longitude,
                        language,
                        units
                    );

                    // Dependiendo del 'type', renderizamos contenido diferente
                    const type = options.type || "default"; // Tipo por defecto si no se proporciona
                    let contentHtml = "";

                    if (type === "minimal") {
                        // Diseño minimalista
                        contentHtml = `
                            <div class="card minimal">
                                <h2 class="city">${weatherData.cityName}</h2>
                                <p class="temperature">${weatherData.temperature}°</p>
                            </div>
                        `;
                    } else {
                        // Diseño por defecto (detallado)
                        contentHtml = `
                            <div class="card">
                                <h2>${weatherData.cityName}</h2>
                                <h3><span> Wind ${weatherData.wind}km/h <span class="dot">•</span>${weatherData.precip}</span></h3>
                                <h1>${weatherData.temperature}°</h1>
                                <div class="sky">
                                    <div class="sun"></div>
                                    <div class="cloud">
                                        <div class="circle-small"></div>
                                        <div class="circle-tall"></div>
                                        <div class="circle-medium"></div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }

                    // Insertar el HTML generado en el contenedor
                    container.innerHTML = contentHtml;
                } catch (error) {
                    console.error("Error:", error);
                    container.innerHTML = `<p>No se pudieron cargar los datos del clima. Verifica tu conexión o los permisos de ubicación.</p>`;
                }
            },

            // Método para obtener ubicación del usuario
            getUserLocation: function () {
                return new Promise((resolve, reject) => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    } else {
                        reject(new Error("La geolocalización no es compatible con este navegador."));
                    }
                });
            },

            // Método para hacer la llamada a la API
            fetchWeatherData: async function (apiKey, lat, lon, language, units) {
                // URL modificada para aceptar idioma y unidades
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${language}&appid=${apiKey}`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }

                const data = await response.json();

                // Convertir los datos necesarios de la API al formato que necesitas
                return {
                    cityName: data.name,
                    temperature: Math.round(data.main.temp),
                    wind: data.wind.speed,
                    precip: data.weather[0]?.main || "0",
                };
            },
        };
    },
};