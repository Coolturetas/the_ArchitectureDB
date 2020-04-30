document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('Bienvenidos a the_ArchitectureDB')
  },
  false
)

const directionsService = new google.maps.DirectionsService()
let directionsRenderer = new google.maps.DirectionsRenderer()

const workMap = document.getElementById('workMap')
const mapButtons = document.querySelectorAll('.show-map')
const routeCalc = document.getElementById('routeCalc')

let renderedMap
let workId
let markers = []
let waypointAddresses = []
let waypoints = []
let marker
let selectedMode
let urlStart
let origin
let destination
let urlWaypoints

function generateRouteUrl() {
  urlStart = `https://www.google.com/maps/dir/?api=1&`
  origin = `origin=${encodeURIComponent(waypointAddresses[1])}`
  destination = `destination=${encodeURIComponent(
    waypointAddresses[waypointAddresses.length - 1]
  )}`

  urlWaypoints = 'waypoints='

  for (let i = 1; i < waypointAddresses.length - 1; i++) {
    console.log(encodeURIComponent(waypointAddresses[i]))
    urlWaypoints += encodeURIComponent(waypointAddresses[i])
    i < waypointAddresses.length - 2 ? urlWaypoints += encodeURIComponent(`|`) : null
  }

  return urlStart + origin + '&' + destination + '&' + urlWaypoints
}

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map)
  }
  if (directionsRenderer) {
    directionsRenderer.setMap(null)
    directionsRenderer = null
  }
}

function deleteMarkers() {
  setMapOnAll(null)
  markers = []
  waypointAddresses = []
  waypoints = []
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
      waypointAddresses.push(result.data.work.address)
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
    styles: mapStyles.silver,
  })
}

function calculateRoutes() {
  for (let i = 0; i < markers.length; i++) {
    waypoints.push({
      location: waypointAddresses[i],
      stopover: true,
    })
  }

  selectedMode = document.getElementById('travel-mode').value

  directionsService.route(
    {
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: selectedMode,
    },
    (response, status) => {
      if (status === 'OK') {
        directionsRenderer = new google.maps.DirectionsRenderer()
        directionsRenderer.setMap(renderedMap)
        directionsRenderer.setDirections(response)
        const route = response.routes[0]
        console.log(generateRouteUrl())
      } else {
        console.log(status)
      }
    }
  )
}

startMapMulti()

for (let i = 0; i < mapButtons.length; i++) {
  mapButtons[i].addEventListener('click', () => {
    workId = mapButtons[i].dataset.id
    axios
      .get(`/api/list/mylists/${workId}`)
      .then((result) => {
        getListElement()
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

routeCalc.addEventListener('click', () => calculateRoutes())
