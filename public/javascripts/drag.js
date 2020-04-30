import Sortable from 'sortablejs'

const wish = document.getElementById('to-wish')
const visit = document.getElementById('to-visit')

new Sortable(wish, {
	group: 'shared', // set both lists to same group
	animation: 150,
})

new Sortable(visit, {
	group: 'shared',
	animation: 150,
})
