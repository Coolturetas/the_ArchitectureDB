const wish = document.getElementById('to-wish')
const visit = document.getElementById('to-visited')

const saveChanges = document.getElementById('send-changes')

new Sortable(wish, {
	group: 'shared', // set both lists to same group
	animation: 150,
})
new Sortable(visit, {
	group: 'shared',
	animation: 150,
})

const updateVisit = () => {
	let list = document.querySelector('.visit-list')
	let cards = list.querySelectorAll('.card-id')
	let worksArray = []
	cards.forEach((elm) => worksArray.push(elm.value))
	console.log(worksArray)

	return axios.post(`http://localhost:3000/api/user/visitedList/likes`, { likesId: worksArray })
}
const updateWish = () => {
	let list = document.querySelector('.wish-list')
	let cards = list.querySelectorAll('.card-id')
	let worksArray = []
	cards.forEach((elm) => worksArray.push(elm.value))
	console.log(worksArray)

	return axios.post(`http://localhost:3000/api/user/wishList/likes`, { likesId: worksArray })
}

saveChanges.addEventListener('click', () => {
	updateWish()
	// .then(() => updateLikes())
	// .then(() => window.location.push())
	// .catch((err) => new Error(err))
})
