const wish = document.getElementById('to-wish')
const visit = document.getElementById('to-visited')

const hiddenList = document.querySelector('.listId').value
const hiddenCard = document.querySelector('.card-id').value

const saveChanges = document.getElementById('send-changes')

new Sortable(wish, {
	group: 'shared', // set both lists to same group
	animation: 150,
})
new Sortable(visit, {
	group: 'shared',
	animation: 150,
})

const updateLists = () => {
	let list = document.querySelector('.list')
	let cards = list.querySelectorAll('.card-id')
	let worksArray = []
	cards.forEach((elm) => worksArray.push(elm.value))
	console.log(worksArray)
	let listToChange = []

	axios
		.post(`/api/user/visitedList`)
		.then((data) => console.log(data))
		// .then((response) => response.data.likesId)
		// .then((ready) => ready.forEach((elm) => listToChange.push(elm)))
		.catch((err) => console.log('nada'))
}

saveChanges.addEventListener('click', updateLists)
