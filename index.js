const API = 'https://656c512fe1e03bfd572e2fab.mockapi.io/map';
// Получение локации
ymaps.ready(function(){
    let geolocation = new Object;

    geolocation.latitude = ymaps.geolocation.latitude;
    geolocation.longitude = ymaps.geolocation.longitude;
    geolocation.city = ymaps.geolocation.city;
    geolocation.country = ymaps.geolocation.country;
    geolocation.region = ymaps.geolocation.region;
    
    function fetchMapPost() {
        fetch(API, {
            method: 'POST', 
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(geolocation)
        })
        .then(res=> {
            if(res.ok) {
                return res.json();
            }
        })
        .catch(error=> {
            console.log(error);
        });
    }

    function fetchMapPut() {
        fetch(`${API}/1`, {
            method: 'PUT', 
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({latitude: ymaps.geolocation.latitude , longitude: ymaps.geolocation.longitude})
        }).then(res=>{
            if(res.ok) {
                return res.json();
            }
        }).catch(error=> {
            console.log(error);
        })
    }

    if(geolocation.latitude && geolocation.longitude) {
        // fetchMapPost();
    }

    let interval = setInterval(()=> {
        fetchMapPut()
        console.log('set interval')
    },35000)
});