import "../../assets/styles/RestaurantInfo.css";
import React, { Component } from 'react';

class RestaurantInfo extends Component {
	render() {
		const { data } = this.props;
		
		if(!data.name){
			return(
				<div></div>
			)
		}
		return(
			<div className="result">
		        <span className="restaurant_name">
		        	{data.name} 
		        </span>
		        <div className="restaurant_img"> 
		        	<img src={data.featured_image} alt="whatever" />
		        </div>
		        <span className="restaurant_info">
		        	{data.user_rating.aggregate_rating}
		        </span>
		    </div>
		);
	}
}

export default RestaurantInfo;