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
			}
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

// ---

Universe.Fixtures.Resource = [
	{
		id: 1,
		name: 'Erzvorkommen'
	},
	{
		id: 2,
		name: 'Roh-Erz'
	},
	{
		id: 3,
		name: 'Stahl'
	}
];