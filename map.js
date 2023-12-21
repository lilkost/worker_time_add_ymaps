// map API
const API = 'https://656c512fe1e03bfd572e2fab.mockapi.io/map';
// center map
let center = [1,1];
//function init map
function init() {
    // иницирование
	let map = new ymaps.Map('map', {
		center: center,
		zoom: 20
	});
    // центрирование карты по текущему положению пользователя
    ymaps.geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true,
    }).then(function (result) {
        map.setCenter(result.geoObjects.get(0).geometry.getCoordinates(), 13, {duration: 300});
    });

    // удаление кнопок на карте HTML
	map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    // данные
    let m = [
        {
          "id": "1",
          "name":"default default",
          "latitude": 56.326799,
          "longitude": 44.00652,
          "city": "defaul",
          "country": "defaul",
          "region": "defaul"
        }
    ];
    // вызов данных с сервера
    let fetchItems = async () => {
        try {
            const responce = await fetch(API, {method: 'GET', headers: {'content-type':'application/json'}});
            const listitem = await responce.json();
            if(!responce.ok) throw Error('Error API get responce')
            console.log(m)
            // массивы для создания
            let placemarkArray = []
            let placemark1Array = []
            // функция вызова
            function createPlacemark () {
                placemarkArray.forEach(item=>{
                    map.geoObjects.add(item);
                })
                placemark1Array.forEach(item=> {
                    map.geoObjects.add(item)
                })
            }
            // создание
            if(listitem) {
                listitem.forEach((item, index)=> {
                    placemark = new ymaps.Placemark([item.latitude, item.longitude], {}, {
                        iconLayout: 'default#image',
                        iconImageHref: './map-dots.svg',
                        iconImageSize: [40, 40],
                        iconImageOffset: [-19, -44]
                    });
                    placemarkArray.push(placemark)
                    let d = new Date()
                    placemark1 = new ymaps.Placemark([item.latitude, item.longitude], {
                        balloonContent: `
                            <div class="balloon" style="font-size: 12px">
                                <div class="ballon__name" style="color:#1C274C;">ID: ${item.id}, ${item?.name}</div>
                                <div class="balloon__city" style="color: #797979;">${item.city},</div>
                                <div class="balloon__region" style="color: #797979;">${item.region},</div>
                                <div class="balloon__country" style="color: #797979;">${item.country}</div>
                                <div class="balloon__time style="color: #1c274C">Обновленно: ${d.getHours()}:${d.getMinutes() < 10 ? '0'+d.getMinutes(): d.getMinutes()}</div>
                            </div>
                        `
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: './map-dots.svg',
                        iconImageSize: [40, 40],
                        iconImageOffset: [-19, -44]
                    });
                    placemark1Array.push(placemark1)
                })
            }
            else {
                m.forEach((item, index)=> {
                    placemark = new ymaps.Placemark([item.latitude, item.longitude], {}, {
                        iconLayout: 'default#image',
                        iconImageHref: './map-dots.svg',
                        iconImageSize: [40, 40],
                        iconImageOffset: [-19, -44]
                    });
                    placemarkArray.push(placemark)
            
                    placemark1 = new ymaps.Placemark([item.latitude, item.longitude], {
                        balloonContent: `
                            <div class="balloon" style="font-size: 12px">
                                <div class="ballon__name">ID: ${item.id}, ${item?.name}</div>
                                <div class="balloon__city">${item.city},</div>
                                <div class="balloon__region">${item.region},</div>
                                <div class="balloon__country">${item.country}</div>
                            </div>
                        
                        `
                    }, {
                                iconLayout: 'default#image',
                                iconImageHref: './map-dots.svg',
                                iconImageSize: [40, 40],
                                iconImageOffset: [-19, -44]
                    });
                    placemark1Array.push(placemark1)
                })
            }
            // вызов функции вызова
            createPlacemark() 
        }
        catch(error){
            console.log(error)
        }
        finally{
            console.log('finaly')
        }
    }
    setTimeout(()=> {
        (async()=>fetchItems())()
    },100);
    // перерендер
    let interval = setInterval(()=> {
        setTimeout(()=> {
            (async()=>fetchItems())()
        },100)
        console.log('15000 function')
    },35000);
}
// init map
ymaps.ready(function() {
    init()

    let intervalRender = setInterval(()=> {
        document.querySelector('#map').innerHTML = ''
        init();
    }, 25000)
});