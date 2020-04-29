const workMap = document.getElementById('workMap')
const workId = document.getElementById('workId').innerText

let renderedMapSingle
let markersWork = []
let markerWork

function pinSingleMarker(place, targetMap) {
	const geocoder = new google.maps.Geocoder()
	geocoder.geocode({ address: place.address }, (results, status) => {
		if (status === 'OK') {
			targetMap.setCenter(results[0].geometry.location)
			markerWork = new google.maps.Marker({
				map: targetMap,
				position: results[0].geometry.location,
				title: place.name,
			})
			markersWork.push(markerWork)
		} else {
			console.log("Geocode wasn't successful: ", status)
		}
	})
}

function getSinglePlace() {
  axios
    .get(`/api/works/${workId}`)
    .then((result) => {
      pinSingleMarker(result.data.work, renderedMapSingle)
    })
    .catch((err) => {
      console.log(err)
    })
}

function startMapSingle() {
	const ironhackBCN = {
		lat: 41.3977381,
		lng: 2.190471916,
	}
	renderedMap = new google.maps.Map(workMap, {
		zoom: 15,
		center: ironhackBCN,
	})
	getSinglePlace()
}

startMapSingle()
