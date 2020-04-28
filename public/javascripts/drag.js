function dragStart(ev) {
	ev.dataTransfer.effectAllowed = 'move'
	ev.dataTransfer.setData('Text', ev.target.getAttribute('id'))
	ev.dataTransfer.setDragImage(ev.target, 50, 50)
	return true
}

function dragEnter(ev) {
	event.preventDefault()
	return true
}
function dragOver(ev) {
	event.preventDefault()
}

function dragDrop(ev) {
	var data = ev.dataTransfer.getData('Text')
	ev.target.appendChild(document.getElementById(data))
	ev.stopPropagation()
	return false
}
