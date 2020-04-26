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
	{
		trend: {
			name: 'Renacimiento Italiano',
			picTrend: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587883191/theArchitectureDB/Santa%20Maria%20del%20Fiore.jpg.jpg',
			description: 'La Arquitectura del Renacimiento estuvo bastante relacionada con una visión del mundo durante ese período sostenida en dos pilares esenciales: el clasicismo y el humanismo.',
			country: 'Italia',
			bestWork: 'Cúpula de Santa María del Fiore',
			year: '1446',
		},
		architect: {
			name: "Donato d'Angelo Bramante",
			country: 'Roma, Italia',
			flagshipWork: 'Diseño y cimentaciones de la Basílica de San Pedro',
			photo: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587883380/theArchitectureDB/bramante.jpg.jpg',
		},
		name: 'Templete de San Pietro in Montorio',
		finished: '1510',
		where: 'Roma, Italia',
		description:
			'La edificación es de planta circular e imita a los martyria orientales, pues de hecho es un martyrium. Dispone de una columnata que envuelve a la cella, cubierta por una cúpula semiesférica. Esta columnata conforma un peristilo. También hay una clara referencia a la cultura griega en la forma circular, como un tholos griego.',
		workType: 'Religiosa',
		picWork: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587883486/theArchitectureDB/001Tempietto-San-Pietro-in-Montorio-Rome.jpg.jpg',
	},
	{
		trend: {
			name: 'Contemporánea',
			picTrend: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587883668/theArchitectureDB/pabellon%20aleman.jpg.jpg',
			description:
				'La arquitectura moderna surge a partir de los cambios sociales y culturales producidos por la revolución industrial. Se comienzan a utilizar nuevos materiales en las construcciones y edificios; hierro, hormigón y acero. Empieza un proceso de construcción en altura, desde los edificios industriales hasta llegar a rascacielos. Otro aspecto de la arquitectura en el siglo XX es el abandono de ornamentos en pos de una arquitectura funcional. Algunos de los arquitectos más conocidos fueron Le Corbusier y Walter Gropius (director de la Bauhaus)',
			country: 'Europa',
			bestWork: 'Pabellón Alemán de Barcelona',
			year: '1945',
		},
		architect: {
			name: 'Nieto & Sobejano',
			country: 'España',
			flagshipWork: 'Mercado de Barceló de Madrid',
			photo: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587883917/theArchitectureDB/Nieto%20y%20SObejano.jpg.jpg',
		},
		name: 'Palacio de congresos de Mérida',
		finished: '2004',
		where: 'Mérida, Badajoz',
		description:
			'El edificio está concebido como una pieza unitaria, vaciada en su interior para conformar un nuevo espacio público. Este nuevo espacio público lo constituye una gran terraza sobreelevada desde donde poder disfrutar de las vistas. La plataforma actúa como espacio común y de acceso de los dos auditorios y la zona de congresos y exposiciones. Esta configuración permitie la independencia de ambos, posibilitando el uso simultáneo del edificio como auditorio y palacio de congresos y exposiciones.',
		workType: 'Edificio público',
		picWork: 'http://res.cloudinary.com/dxf11hxhh/image/upload/v1587884042/theArchitectureDB/palacio%20de%20congresos%20de%20merida.jpg.jpg',
	},
]

Promise.all(coasters.map((coaster) => Park.create(coaster.park).then((park) => park.name)))
	.then(() => coasters.map((coaster) => Park.findOne({ name: coaster.park.name }).then((park) => Object.assign({}, coaster, { park: park._id }))))
	.then((findParks) => Promise.all(findParks).then((coasters) => coasters.map((coaster) => Coaster.create(coaster))))
	.then((savedCoasters) =>
		Promise.all(savedCoasters)
			.then((coasters) => coasters.forEach((coaster) => console.log(`Montaña rusa ${coaster.name} creada`)))
			.then(() => mongoose.connection.close())
	)
	.catch((error) => console.log('Error: ', error))
