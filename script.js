let srciptElement =  document.createElement('script');
srciptElement.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB5Hqtr8WtiX3pDwtGLQon-qj_mzstRHfg&callback=initMap" ;
srciptElement.async = true ;
document.head.appendChild(srciptElement);


let arrayList = [] ;
function setNeighbourContryData(data){
    let name = data.name ;
    let lat =data.latlng[0] ;
    let lng = data.latlng[1];
    console.log(name, lat, lng);
    arrayListData = [name,lat,lng] ;
    arrayList.push(arrayListData);

   

}





function initMap(val1,val2){
//     console.log(arrayList.length);
// for(let  i = 0 ; i< dataMaker.length ; i++){
    
//     let name = dataMaker[i].name ;
//     let lat = dataMaker[i].latlng[0];
//     let lng = dataMaker[i].latlng[1];
//     console.log(name);

//     new google.maps.Maker({
//         position:({lat:lat ,lng:lng}),
//         map:map
//     })
// }
    var options = {
        zoom : 3 ,
        center:{lat:20.5937, lng:78.9629 }
    }
   

    var map = new google.maps.Map(document.getElementById('map'), options) ;
    // addMarker({lat:val1 , lng:val2}) ;
    addMarker({lat:33 , lng:65}) ;
    addMarker({lat: 27.5, lng:90.5}) ;
    addMarker({lat:22 , lng:98}) ;
    addMarker({lat:35 , lng:105}) ;
    addMarker({lat:24 , lng:90}) ;
    addMarker({lat:24 , lng:84}) ;
    addMarker({lat:30 , lng:70}) ;
    addMarker({lat:7 , lng:81}) ;

    function addMarker(coords){
        var marker = new google.maps.Marker({
            position: coords,
            map:map
     });

     }
 
    // addMarker({
    //     coords: {lat:lat , lng:lng} ,
    //     content : '<h1>Delhi</h1>'
    // }) ;
    // addMarker({lat:33 , lng:65}) ;
    // addMarker({lat: 27.5, lng:90.5}) ;
    // addMarker({lat:22 , lng:98}) ;
    // addMarker({lat:35 , lng:105}) ;
    // addMarker({lat:24 , lng:90}) ;
    // addMarker({lat:24 , lng:84}) ;
    // addMarker({lat:30 , lng:70}) ;
    // addMarker({lat:7 , lng:81}) ;

    // //addMarket function
    // function addMarker(coords){
    //     var marker = new google.maps.Marker({
    //    position: coords,
    //    map:map

    // });

    // if(content){
    //        var infoWindow = new google.maps.InfoWindow({
    //     content:'<h3>Delhi</h3>'
    // });
    // marker.addListener('click' , function() {
    //     infoWindow.open(map,marker);
    // });

    // }

    // }
 

}




const countryCard = document.querySelector('.maincard');
const dataCard  = document.querySelector('.dataCard');
const inputElement = document.querySelector('input') ;
const ulElement = document.querySelector('ul');
const listItems = document.querySelectorAll('li');
const mapElement = document.querySelector('#map');

//get country that you type
inputElement.addEventListener('keyup' , event => {
    //removing data from div to get new data after we click
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

//use to fetch data that you type
function fetchTerm(term){
    fetch(`https://restcountries.eu/rest/v2/name/${term}`)
    .then(res => res.json())
    .then(data => getCountryOptionData(data))  //call this function to create li ,maincard and datacard
    .catch(err => console.log(err));
}






//getting your  own location using longitute and latitude
 
let country ;

getGeoLocation() ;

//to get position of your location
function getGeoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success , error);
    }
}

function error(){
    console.log('Geolocation error');
}

//here getting lat ,lng using position
function success(position){
     let lat = position.coords.latitude ;
     let lng = position.coords.longitude ;
    getLocation(lat ,lng) ;
}

//fetch api for data of that particular lat,lng \\ it shows user location
function getLocation(lat, lng){
    
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&pretty=1&key=9387df95bfbd441d8a364fafef142b21`)
   .then(res => res.json())
   .then(data => getCountry(data))
   .catch(() => {}) 
};

//get user location alpha code
function getCountry(data){
     country = data.results[0].components['ISO_3166-1_alpha-3'] ;
     getCountryData();
}

//using alpha code get user country
function getCountryData(){
    // console.log(country);
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => res.json())
    .then(data => getCountryOptionData(data))
    .catch(err => console.log(err));

}

//it will give multiple option to select there particular county
//create li item and also use remove method that is usefull if we select another option so we have to remove before selected option data
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
    
//here i created two array with key and value to get data of particular country
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
        // console.log(dataTopic[i] , dataTopicValue[i]);
    }
    neighbourCountries(data.borders);
    // console.log(data.borders);
  
}

//through this we get there neighbour countries and there data
function neighbourCountries(data){
    
    data.forEach(elem => {
        fetchCountry(elem);
        
    });
}

//so we got neighbour countries alpha code now we fetch country details using alpha code
function fetchCountry(elem){
    // console.log(elem ,'Your data');
    fetch(`https://restcountries.eu/rest/v2/alpha/${elem}`)
    .then(res => res.json())
    .then(data => neighbourCountryCard(data))
    .catch(err => console.log(err));

}

function neighbourCountryCard(data){
    setNeighbourContryData(data);
    
    // let lat = data.latlng[0];
    // let lng = data.latlng[1];
    // initMap(lat,lng);
    // console.log(data , 'Your got your border data');
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

/**
 * Should take time
 * should return promise
 * setTimeout
 */

// function setTimeOutAsPromise(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Timeout Complete!');
//         }, ms);
//     });
// }

// let a = setTimeOutAsPromise(30);
// a.then(data => callback());




// async function get(id) {
//     let a = await fetch();
//     let b = await a.json();
//     return b;
// }



// try {
//  let b = await get(2345);
// } catch {

// }
