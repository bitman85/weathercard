    <?php header('Access-Control-Allow-Origin: *'); ?>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/styles.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>



</head>
<body>
<div>
    <div id="weatherCard">
    </div>
    <div id="weatherCard2">
    </div>
</div>
</body>
<script src="js/script.js" defer></script>
<script>
    $(document).ready(function () {
        const apiKey = "{API_OpenWeatherMap}"; // Replace {API_OpenWeatherMap} with your OpenWeatherMap API key

        // Render card with default design
        bitWeather.card("#weatherCard", {
            apiKey,
            type: "minimal",
            language: "es", // Language: Spanish
            units: "metric" // Units: Metric (Celsius)
        }).create();

        bitWeather.card("#weatherCard2", {
            apiKey,
            language: "es", // Language: Spanish
            units: "metric" // Units: Metric (Celsius)
        }).create();
    });

</script>
</html>
