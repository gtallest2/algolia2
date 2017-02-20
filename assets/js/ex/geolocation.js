// Experimenting with Browser Geolocation

import { helper } from './algolia'

const formatted = [];

function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log('geo error');
  }
}

function success(e) {
  const latitude = e.coords.latitude;
  const longitude = e.coords.longitude;
  formatted.push(`${latitude},${longitude}`);
  // console.log(formatted);
  formatted;
}

function error(e) {
  console.error(e.message);
}


export { formatted };
