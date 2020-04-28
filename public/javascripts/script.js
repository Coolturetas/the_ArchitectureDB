document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!')
  },
  false
)

const workMap = document.getElementById('workMap')
const workId = document.getElementById('workId').innerText

let renderedMap
let markers = []
let marker

function pinMarker(place, targetMap) {
  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({address: place.address}, (results, status) => {
    if (status === "OK") {
      targetMap.setCenter(results[0].geometry.location)
      marker = new google.maps.Marker({
        map: targetMap,
        position: results[0].geometry.location,
        title: place.name
      })
      markers.push(marker)
    } else {
      console.log("Geocode wasn't successful: ", status)
    }
  })
}

function getPlaces() {
  axios
    .get(`/api/works/${workId}`)
    .then((result) => {
      pinMarker(result.data.work, renderedMap)
    })
    .catch((err) => {
      console.log(err)
    })
}

function startMap() {
  const ironhackBCN = {
    lat: 41.3977381,
    lng: 2.190471916,
  }
  renderedMap = new google.maps.Map(workMap, {
    zoom: 15,
    center: ironhackBCN,
  })
  getPlaces()
}

startMap()
