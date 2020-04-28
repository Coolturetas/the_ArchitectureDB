const mongoose = require('mongoose')
const Architect = require('../models/architect.model')
const Trend = require('../models/trend.model')
const Work = require('../models/work.model')

mongoose.connect(`mongodb://localhost/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })

Architect.collection.drop()
Trend.collection.drop()
Work.collection.drop()

const archWork = [
	{
		trend: {
			name: 'Modernismo',
			picTrend: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587882737/theArchitectureDB/sagrada%20familia.jpg.jpg',
			description: 'Las características que en general permiten reconocer al modernismo son:',
			country: 'Cataluña, España',
			bestWork: 'Sagrada Familia de Barcelona',
			year: '1883',
		},
		architect: {
			name: 'Antonio Gaudi',
			country: 'España',
			flagshipWork: 'Sagrada Familia de Barcelona',
			photo: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587882444/theArchitectureDB/Gaudi.jpg.jpg',
		},
		name: 'Parque Güell',
		finished: '1926',
		where: 'Barcelona, España',
		description:
			'El parque Güell (parc Güell en catalán y Park Güell en su denominación original) es un parque público con jardines y elementos arquitectónicos situado en la parte superior de la ciudad de Barcelona (España), en las estribaciones de la sierra de Collserola.',
		workType: 'Parque',
		picWork: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587882992/theArchitectureDB/parque%20guell.jpg.jpg',
	},
]

// Promise.all(coasters.map((coaster) => Park.create(coaster.park).then((park) => park.name)))
// 	.then(() => coasters.map((coaster) => Park.findOne({ name: coaster.park.name }).then((park) => Object.assign({}, coaster, { park: park._id }))))
// 	.then((findParks) => Promise.all(findParks).then((coasters) => coasters.map((coaster) => Coaster.create(coaster))))
// 	.then((savedCoasters) =>
// 		Promise.all(savedCoasters)
// 			.then((coasters) => coasters.forEach((coaster) => console.log(`Montaña rusa ${coaster.name} creada`)))
// 			.then(() => mongoose.connection.close())
// 	)
// 	.catch((error) => console.log('Error: ', error))
