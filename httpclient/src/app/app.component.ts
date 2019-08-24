import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'httpclient';
  WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1";
  imgMapCity = {
    "Singapore":'https://www.nea.gov.sg/assets/images/map/base-853.png',
    "London":'https://map.viamichelin.com/map/carte?map=viamichelin&z=10&lat=51.51341&lon=-0.08894&width=550&height=382&format=png&version=latest&layer=background&debug_pattern=.*',
    "Beijing":'https://images.chinahighlights.com/allpicture/2015/04/f394a00abf264c95b7f4eb89.jpg'
  };
  imageurl = this.imgMapCity['Singapore'];
  model = new Weather(0,0,0,'',0,0, "Singapore");
  constructor(private weatherSvc: WeatherService){

  }

  ngOnInit(){
    console.log("retrieve weather !")
    this.weatherSvc.getWeather("Singapore", this.WEATHER_API_KEY).then((result)=>{
      console.log(result);
      console.log(result.main);
      this.model = new Weather(result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed, result.name);
  
      //console.log()
    }).catch((error)=>{
      console.log(error);
    })
  }

  changeCountry(value:string){
    console.log("got into changecountry.");
    this.weatherSvc.getWeather(value, this.WEATHER_API_KEY).then((result)=>{
      console.log(result);
      console.log(result.main);
      this.model = new Weather(result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed, result.name);
      this.imageurl = this.imgMapCity[this.model.country];
      //console.log()
    }).catch((error)=>{
      console.log(error);
    })
  }
}
