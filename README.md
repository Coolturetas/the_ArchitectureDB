# the_architectureDB

## Description

## Routes (back-end)

#### Auth routes:

| **Method** | **Route** | **Description**                                              |
| ---------- | --------- | :----------------------------------------------------------- |
| GET        | /login    | Renders login form view.                                     |
| POST       | /login    | Sends login form data to the server.                         |
| GET        | /signup   | Renders signup form view.                                    |
| POST       | /signup   | Sends sign up info to the server and creates user in the DB. |

#### Routes:

| **Method** | **Route** | **Description**                           |
| ---------- | --------- | :---------------------------------------- |
| GET        | /         | Main page route. Renders home index view. |

#### Raw data routes:

| **Method** | **Route**           | **Description**                         |
|------------|---------------------|-----------------------------------------|
| GET        | /api/works          | Returns all Work documents as JSON      |
| GET        | /api/works/:id      | Returns a specific Work as JSON         |
| GET        | /api/architects     | Returns all Architect documents as JSON |
| GET        | /api/architects/:id | Returns a specific Architect as JSON    |
| GET        | /api/trend          | Returns all Trend documents as JSON     |
| GET        | /api/trend/:id      | Returns a specific Trend as JSON        |

#### Works Routes:

| **Method** | **Works Route** | **Description**                           |
| ---------- | --------------- | :---------------------------------------- |
| GET        | /works          | Main works page route. Renders all works. |
| GET        | /works/add      | Renders form to add new                   |
| POST       | /works/add      | Creates new work                          |
| GET        | /works/edit/:id | Renders form to edit                      |
| POST       | /works/edit/:id | Edit specified work                       |

#### Architects Routes:

| **Method** | **Architects Route**   | **Description**                                    |
| ---------- | ---------------------- | :------------------------------------------------- |
| POST       | /works/delete/:id      | Deletes specified work                             |
| GET        | /architects            | Main architecs page route. Renders all architects. |
| POST       | /architects/create     | Creates new architect                              |
| GET        | /architects/view/:id   | Shows especified architect                         |
| GET        | /architects/edit/:id   | Renders form to edit                               |
| POST       | /architects/edit/:id   | Edit specified architect                           |
| POST       | /architects/delete/:id | Deletes specified architect                        |

#### Trend Routes:

| **Method** | **Trend Route**   | **Description**                                          |
| ---------- | ----------------- | :------------------------------------------------------- |
| GET        | /trend            | Main architectural trend page route. Renders all trends. |
| POST       | /trend/add        | Creates new trend                                        |
| GET        | /trend/view/:id   | Shows especified trend                                   |
| GET        | /trend/edit/:id   | Renders form to edit                                     |
| POST       | /trend/edit/:id   | Edit specified trend                                     |
| POST       | /trend/delete/:id | Deletes specified trend                                  |

#### Comment Routes:

| **Method** | **Comment Route**                   | **Description**                                        |
| ---------- | ----------------------------------- | :----------------------------------------------------- |
| POST       | /architects/post-comment/:id        | Creates new comment on selected architect              |
| POST       | /architects/post-comment/delete/:id | Delets owner's comment on selected architect           |
| GET        | /architects/post-comment/edit/:id   | Renders form to edit own comment on selected architect |
| POST       | /architects/post-comment/edit/:id   | Edits own comment on selected architect                |
| POST       | /works/post-comment/:id             | Creates new comment on selected work                   |
| POST       | /works/post-comment/delete/:id      | Delets owner's comment on selected work                |
| GET        | /works/post-comment/edit/:id        | Renders form to edit own comment on selected work      |
| POST       | /works/post-comment/edit/:id        | Edits own comment on selected work                     |
| POST       | /trend/post-comment/:id             | Creates new comment on selected trend                  |
| POST       | /trend/post-comment/delete/:id      | Delets owner's comment on selected trend               |
| GET        | /trend/post-comment/edit/:id        | Renders form to edit own comment on selected trend     |
| POST       | /trend/post-comment/edit/:id        | Edits own comment on selected trend                    |

## Models

Architects Schema:

```javascript
  {
	name: { type: String, required: true, unique: true },
	country: String,
	flagshipWork: String,
	description: String,
	works: Array,
	photo: String,
	isVerified: { type: Boolean, default: false },
}

```

Architectural Trend Schema:

```javascript
{
	name: String,
	picTrend: {
		type: String,
		default: 'https://res.cloudinary.com/dxf11hxhh/image/upload/v1587913924/theArchitectureDB/default_dh4el6.jpg',
	},

	country: String,
	description: String,
	bestWork: String,
	year: Number,
	isVerified: { type: Boolean, default: false },
},
{
	timestamps: true,
}

```

Architectural Works:

```javascript
{
	trend: {
		type: Schema.Types.ObjectId,
		ref: 'trend',
	},
	architect: {
		type: Schema.Types.ObjectId,
		ref: 'Architect',
	},
	name: String,
	where: String,
	finished: Number,
	picWork: {
		type: String,
		default: 'https://res.cloudinary.com/dxf11hxhh/image/upload/v1587913924/theArchitectureDB/default_dh4el6.jpg',
	},
	description: String,
	workType: String,
},
{
	timestamps: true,
}

```

User:

```javascript
{
	username: String,
	password: String,
	status: {
		type: String,
		enum: ['Pending Confirmation', 'Active'],
		default: 'Pending Confirmation',
	},
	confirmationCode: String,
	email: String,
	role: {
		type: String,
		enum: ['admin', 'editor', 'colaborator'],
		default: 'colaborator',
	},
}
```

Posts:

```javascript
{
	subject: String,
	content: String,
	creatorId: { type: Schema.Types.ObjectId, ref: 'user' },
	postedIn: String,
},
{
	timestamps: true,
}
```
