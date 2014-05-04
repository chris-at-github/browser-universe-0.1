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
	},
	{
		id: 3,
		name: 'Erzmine',
		description: '<p>Toffee oat cake topping donut sesame snaps. Unerdwear.com pie tootsie roll dragée tootsie roll fruitcake. Cotton candy cake toffee jelly.</p><p>Topping sweet apple pie sesame snaps jelly dragée. Chupa chups croissant wafer caramels. Dragée pie candy biscuit sweet roll bear claw. Gummi bears chocolate bar tiramisu.</p>'
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