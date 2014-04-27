Universe.Fixtures.Planet = [
	{
		name: 'Tilion',
		type: 'terrestrial',
		position: {
			x: 102,
			y: 48
		}
	},
	{
		name: 'Balo',
		type: 'stony',
		position: {
			x: 50,
			y: 160
		}
	},
	{
		name: 'Mirus',
		type: 'aqueous',
		position: {
			x: 192,
			y: 105
		},
		active: true,
		player: null,
		building: [
			{
				extend: 1
			},
			// {
			// 	extend: 2
			// },
			// {
			// 	extend: 2
			// }
		]
	}
];

// ---

Universe.Fixtures.Player = [
	{
		id: 1,
		name: 'Player A'
	},
	{
		id: 2,
		name: 'Player B'
	}
];

// ---

Universe.Fixtures.Building = [
	{
		id: 1,
		name: 'Bodenstation'
	},
	{
		id: 2,
		name: 'Lager'
	}
];