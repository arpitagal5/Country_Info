let srciptElement =  document.createElement('script');
srciptElement.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB5Hqtr8WtiX3pDwtGLQon-qj_mzstRHfg&callback=initMap" ;
srciptElement.async = true ;
document.head.appendChild(srciptElement);

function initMap(val1,val2){
    var options = {
        zoom : 3 ,
        center:{lat:val1, lng:val2 }
    }
    var map = new google.maps.Map(document.getElementById('map'), options) ;
    addMarker({lat:val1 , lng:val2}) ;
    function addMarker(coords){
        var marker = new google.maps.Marker({
            position: coords,
            map:map
     });
     }
}

const countryCard = document.querySelector('.maincard');
const dataCard  = document.querySelector('.dataCard');
const inputElement = document.querySelector('input') ;
const ulElement = document.querySelector('ul');
const listItems = document.querySelectorAll('li');
const mapElement = document.querySelector('#map');

inputElement.addEventListener('keyup' , event => {
while (dataCard.firstChild) {
    dataCard.removeChild(dataCard.firstChild);
}
while (countryCard.firstChild) {
    countryCard.removeChild(countryCard.firstChild);
}
while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
}
    let term = event.target.value ;
    if(term.length >= 3){
        fetchTerm(term);
    }
})

function fetchTerm(term){
    fetch(`https://restcountries.eu/rest/v2/name/${term}`)
    .then(res => res.json())
    .then(data => getCountryOptionData(data)) 
    .catch(err => console.log(err));
}
 
let country ;
getGeoLocation() ;
function getGeoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success , error);
    }
}

function error(){
    alert('Geolocation error');
}

function success(position){
     let lat = position.coords.latitude ;
     let lng = position.coords.longitude ;
    getLocation(lat ,lng) ;
}

function getLocation(lat, lng){
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&pretty=1&key=9387df95bfbd441d8a364fafef142b21`)
   .then(res => res.json())
   .then(data => getCountry(data))
   .catch(() => {}) 
};

function getCountry(data){
     country = data.results[0].components['ISO_3166-1_alpha-3'] ;
     getCountryData();
}

function getCountryData(){
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => res.json())
    .then(data => getCountryOptionData(data))
    .catch(err => console.log(err));
}

function getCountryOptionData(data){
    for(let i = 0 ; i< data.length ; i++){
       const countryList = document.createElement('li');
       countryList.innerHTML = data[i].name ;
       ulElement.appendChild(countryList);
       countryList.addEventListener('click' , event => {
        while (countryCard.firstChild) {
            countryCard.removeChild(countryCard.firstChild);
        }
        while (dataCard.firstChild) {
            dataCard.removeChild(dataCard.firstChild);
        }
        while (ulElement.firstChild) {
            ulElement.removeChild(ulElement.firstChild);
        }
        mapElement.style.display ='block';
           if(data[i].name == event.target.innerHTML){
            setCountryData(data[i]) ;
            setGoogleMap(data[i]);
           } 
       })
    }
}   

function setGoogleMap(data){
    let lat = data.latlng[0] ;
    let lng = data.latlng[1] ;
    console.log(lat,lng);
    initMap(lat, lng);
}
    
function setCountryData(data){
    let dataTopic = ['Capital', 'Population' , 'TimeZone', 'Currency' , 'Language' ,'Region', 'Alpha Code'];
    let countryFlag = document.createElement('img');
    countryFlag.src = data.flag ;
    countryCard.appendChild(countryFlag);
    let countryName = document.createElement('h2');
    countryName.innerHTML = data.name.toUpperCase();
    countryCard.appendChild(countryName);
    let dataTopicValue = [ data.capital , data.population , data.timezones[0] ,data.currencies[0].name , data.languages[0].name ,data.region , data.alpha3Code];
    for(let i = 0 ; i< dataTopic.length ; i++){
       let countryData =  document.createElement('p');
       countryData.innerHTML = `${dataTopic[i]} : ${dataTopicValue[i]}`;
       countryCard.appendChild(countryData);
    }
    neighbourCountries(data.borders);
}

function neighbourCountries(data){
    data.forEach(elem => {
        fetchCountry(elem);
    });
}

function fetchCountry(elem){
    fetch(`https://restcountries.eu/rest/v2/alpha/${elem}`)
    .then(res => res.json())
    .then(data => neighbourCountryCard(data))
    .catch(err => console.log(err));
}

function neighbourCountryCard(data){
    let countryDiv = document.createElement('div');
    dataCard.appendChild(countryDiv);
    let countryFlag = document.createElement('img');
    countryFlag.src = data.flag ;
    countryDiv.appendChild(countryFlag);
    let countryName = document.createElement('h2');
    countryName.innerHTML = data.name.toUpperCase();
    countryDiv.appendChild(countryName);
    const neighCountryTopic = ['Capital','Alpha Code','Language'];
    const neighCountryTopicValue = [data.capital ,data.alpha3Code ,data.languages[0].name];
    for(let i = 0 ; i < neighCountryTopic.length ; i++){
        let countryDetails = document.createElement('p');
    countryDetails.innerHTML = `${neighCountryTopic[i]} : ${neighCountryTopicValue[i]}` ;
      countryDiv.appendChild(countryDetails);
    }
}

