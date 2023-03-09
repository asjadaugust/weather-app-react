interface Weather {
    description: string;
    icon: string;
    main: string;
}


export interface WeatherResponse {
    name: string;
    main: {
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number
    };
    weather: Weather[];
    visibility: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    },
    wind: {
        deg: number;
        speed: number;
    }
    timezone: number;
}

export interface WeatherOutput {
    humidity: number;
    pressure: number;
    temp: number;
    high: number;
    low: number;
    icon: string;
    weather: string;
    description: string;
    visibility: number;
    country: string;
    city: string;
    sunrise: number;
    sunset: number;
    timezone: number;
    windSpeed: number;
    windDegrees: number;
}