# the_architectureDB

## Description

## Routes (back-end)

#### Auth routes (public):

| **Method** | **Route** | **Description**                                              | Request - Body         |
| ---------- | --------- | :----------------------------------------------------------- | ---------------------- |
| GET        | /         | Main page route. Renders home index view.                    |                        |
| GET        | /login    | Renders login form view.                                     |                        |
| POST       | /login    | Sends login form data to the server.                         | { username, password } |
| GET        | /signup   | Renders signup form view.                                    |                        |
| POST       | /signup   | Sends sign up info to the server and creates user in the DB. | { }                    |

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
