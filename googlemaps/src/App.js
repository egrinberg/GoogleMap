import React, { Component } from 'react';


class MapContainer extends Component {

  state = {    
    isLoading: true,
    currentLocation: { lat: 0, lng: 0 },
    country: "",
    city: "",    
    error: null
  };

  
  getCurrentLocation = () => {
    const apiUrl = `https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA}`;
    
    fetch(apiUrl).then(response => response.json())
    .then(data => {
      var latitude = data.latitude;
      var longitude = data.longitude;
      const pos = { latitude, longitude };     
      this.setState({
        currentLocation: pos,
        country: data.country_name,
        city: data.city,
        isLoading: false,
      })}
    )
    .catch(error => this.setState({ error, isLoading: false }));

  };

  componentDidMount() {
    this.getCurrentLocation();
  }

 
  
  render() {
    const { isLoading, currentLocation,country,city} = this.state;
    const googleCurrentLocation = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${currentLocation.latitude},${currentLocation.longitude}`;    
    return (
      <div>
        {!isLoading ? (
          <div>
            <h1>Your Location</h1>
            <p><strong>City :</strong> {city} <strong>Country: </strong>{country}</p>
          
            <iframe
              src={googleCurrentLocation}
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}              
              aria-hidden="false"
              tabIndex="0"
              allowFullScreen
            />
            </div>
            ):(
              <div>Loading ... </div>
            )}
        
      </div>
    );
  }
}

export default MapContainer;