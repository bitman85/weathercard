![weathercard](https://github.com/user-attachments/assets/aafeee63-42e8-4bb1-8b4e-22fd7126dd63)

ENGLISH

A small library for inserting a weather widget with geolocation. It requires an OpenWeatherMap API 2.5 for it to work. There are two types of widgets: minimalist and normal, and some configuration parameters. The library is written in JavaScript and is easy to use.


=============================================================================


Spanish

pequeña libreria para insertar un widget del tiempo con geolocalización, se necesita una api de openweathermap 2.5 para que funcione, existen 2 tipos de widgets minimalista y normal y algunos parametros de configuración. la libreria esta escrita en javascript, facil de usar

==============================================================================

EXAMPLES

Minimal:

  bitWeather.card("#weatherCard", {
            apiKey,
            type: "minimal",
            language: "es", // Language: Spanish
            units: "metric" // Units: Metric (Celsius) | imperial
        }).create();


bitWeather.card("#weatherCard2", {
            apiKey,
            language: "es", // Language: Spanish
            units: "metric" // Units: Metric (Celsius) | imperial
        }).create();
        
