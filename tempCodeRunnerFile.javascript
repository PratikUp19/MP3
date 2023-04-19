var myHeaders = new Headers();
myHeaders.append("apikey", "5YHWfQEIqV7uB8mavM82ZVY7CwSdPjh1");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/number_verification/validate?number=+917499074559", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));