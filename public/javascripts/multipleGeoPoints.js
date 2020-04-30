document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('Bienvenidos a the_ArchitectureDB')
  },
  false
)

const workMap = document.getElementById('workMap')
const mapButtons = document.querySelectorAll('.show-map')

let renderedMap
let workId
let markers = []
let marker

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map)
  }
}

function deleteMarkers() {
  setMapOnAll(null)
  markers = []
}

function pinMarker(place, targetMap) {
  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({ address: place.address }, (results, status) => {
    if (status === 'OK') {
      targetMap.setCenter(results[0].geometry.location)
      marker = new google.maps.Marker({
        map: targetMap,
        position: results[0].geometry.location,
        title: place.name,
      })
      markers.push(marker)
    } else {
      console.log("Geocode wasn't successful: ", status)
    }
  })
}

function getWorkAddress(id) {
  axios
    .get(`api/works/${id}`)
    .then((result) => {
      console.log(result)
      pinMarker(result.data.work, renderedMap)
    })
    .catch((err) => {
      console.log(err)
    })
}

function getListElement() {
  axios
    .get(`/api/list/mylists/${workId}`)
    .then((result) => {
      deleteMarkers()
      result.data.list.likesId.forEach((elm) => {
        getWorkAddress(elm)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

function startMapMulti() {
  const ironhackBCN = {
    lat: 41.3977381,
    lng: 2.190471916,
  }
  renderedMap = new google.maps.Map(workMap, {
    zoom: 15,
    center: ironhackBCN,
    styles: mapStyles.silver
  })
}

startMapMulti()

for (let i = 0; i < mapButtons.length; i++) {
  mapButtons[i].addEventListener('click', () => {
    workId = mapButtons[i].dataset.id
    axios
      .get(`/api/list/mylists/${workId}`)
      .then((result) => {
        console.log(result.data.list.likesId)
        getListElement()
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
