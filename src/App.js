import React, { Component } from 'react';
import logo from './assets/quickeats.png';
import './App.css';
import CuisineFilter from "./components/filter/CuisineFilter";
import PriceFilter from "./components/filter/PriceFilter";
import Randomizer from "./components/randomizer/Randomizer";
import RestoLocator from "./components/map/RestoLocator";
import Zomato from "zomato.js";

class App extends Component {
  constructor() {
    super();

    this.state = {
      position: {
        longitude: 0,
        latitude: 0
      },
      priceRange: {
        min: 0,
        max: 4000
      },
      restaurant: {},
      cuisines: [], 
      data: {}
    };

    this.zapi = new Zomato('d0d950221eb063b6e7d5c708ed65fced');

    this.handleCuisineFilterchange = this.handleCuisineFilterchange.bind(this);
    this.handlePriceFilterChange = this.handlePriceFilterChange.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.getLocationData = this.getLocationData.bind(this);
    this.getPriceRange = this.getPriceRange.bind(this);
    this.setCuisineValue = this.setCuisineValue.bind(this);
    this.setRestaurantValue = this.setRestaurantValue.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }
  
  componentDidMount() {
    this.getUserLocation();
  }
  
  render() {
    let priceRange = this.getPriceRange();
    const { position } = this.state;

    let restoLocator = [];

    if (this.state.data.nearby_restaurants) {
      restoLocator = this.state.data.nearby_restaurants.map((resto) => {
        return <RestoLocator
          key={resto.restaurant.name}
          origin={position}
          destination={{
            latitude: resto.restaurant.location.latitude,
            longitude: resto.restaurant.location.longitude
          }} />
      });
    }

    return (
      <div className="App">
        <img src={logo} alt="logo"/>

        <CuisineFilter
          choices={this.getCuisineFilters()}
          onChange={this.handleCuisineFilterChange} 
          passCuisineValue={this.setCuisineValue}/>

        <PriceFilter
          min={priceRange.min}
          max={priceRange.max}
          onChange={this.handlePriceFilterChange} />

        <Randomizer 
          passRestaurantValue={this.setRestaurantValue}
          choices={this.getNearbyRestos()}
        />

        {this.renderResult()}

        {restoLocator}
      </div>
    );
  }

  renderResult() {
    if (!this.state.restaurant.name) return <span />;

    return (
      <div className="result">
        {this.state.restaurant.name} 
        <img src={this.state.restaurant.featured_image} alt="whatever" />
        Rating {this.state.restaurant.user_rating.aggregate_rating}
      </div>
    );
  }

  handleCuisineFilterchange(newCuisines = []) {
    this.setState( { cuisines: newCuisines });
  }

  handlePriceFilterChange() {

  }

  setCuisineValue(event) {
    let newCuisines = this.state.cuisines;

    if(event.target.checked) {
      newCuisines.push(event.target.name);
    }
    else{
      newCuisines.splice(newCuisines.indexOf(event.target.name), 1);
    }

    this.setState({
      cuisines: newCuisines
    });
  }

  setRestaurantValue(restaurantValue) {
    this.setState({
      restaurant: restaurantValue
    });
  }

  getPriceRange() {
    const { data } = this.state;
    return data.priceRange ? data.priceRange : {min: 0, max: 4000};
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          position: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
        }, this.getLocationData);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getLocationData() {
    this.zapi.geocode({
      lat: this.state.position.latitude,
      lon: this.state.position.longitude
    }).then((data) => {
      this.setState({ data });
    }).catch((error) => {
      console.log(error);
    });
  }

  getCuisineFilters() {
    const { data } = this.state;
    return data.popularity ? data.popularity.top_cuisines : [];
  }

  filterRestaurants(restau) {
    if(restau.restaurant.currency === 'P'){
      return;
    }
  }

  getNearbyRestos() {
    const { data } = this.state;
    let nearbyRestos = [];

    if (data.nearby_restaurants) {
      let rawRestaurants = data.nearby_restaurants;
      nearbyRestos = rawRestaurants.filter(this.filterRestaurants);
    }

    return data.nearby_restaurants;
  }
}

export default App;
