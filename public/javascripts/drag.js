const wish = document.getElementById('to-wish')
const visit = document.getElementById('to-visited')

const hiddenId = document.getElementById('occult-id').value
const movingCard = document.getElementsByClassName('like')

const getId = () => console.log(hiddenId)

new Sortable(wish, {
	group: 'shared', // set both lists to same group
	animation: 150,
})


new Sortable(visit, {
	group: 'shared',
	animation: 150,
})

//Changing type of list
const getVisited = () => {
	axios
		.get(`/api/user/visitedList`)
		.then((response) => console.log(response.data.list))
		.catch((err) => new Error(err))
}
const getWish = () => {
	axios
		.get(`/api/user/wishList`)
		.then((response) => console.log(response.data.list))
		.catch((err) => new Error(err))
}

// getVisited()
// getWish()
