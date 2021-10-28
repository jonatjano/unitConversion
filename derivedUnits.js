specialConversion = new Map([
	[Unit.radian, [{unit: Unit.meter}, {unit: Unit.meter, divide: true}]],
	[Unit.steradian, [{unit: Unit.meter}, {unit: Unit.meter}, {unit: Unit.meter, divide: true}, {unit: Unit.meter, divide: true}]],
	[Unit.lumen, [{unit: Unit.candela}, {unit: Unit.meter}, {unit: Unit.meter}, {unit: Unit.meter, divide: true}, {unit: Unit.meter, divide: true}]]
])
/*
Unit.meter = class meter extends Unit {
	static symbol = "m"
	static COMPONENTS = [{unit: meter}]
	static CONVERSION = new Map()
}
Unit.m = Unit.meter
Unit.addToBaseUnits(Unit.generateDerivated(Unit.meter, Unit.DECIMAL_UNITS))
*/

Unit.hertz = class hertz extends Unit {
	static symbol = "Hz"
	static COMPONENTS = [{unit: Unit.second, divide: true}]
}

Unit.radian = class radian extends Unit {
	static symbol = "rad"
	static COMPONENTS = []
}

Unit.steradian = class steradian extends Unit {
	static symbol = "sr"
	static COMPONENTS = []
}

Unit.newton = class newton extends Unit {
	static symbol = "N"
	static COMPONENTS = [
		{unit: Unit.kilogram}, 
		{unit: Unit.meter}, 
		{unit: Unit.second, divide: true}, 
		{unit: Unit.second, divide: true}
	]
}

Unit.pascal = class pascal extends Unit {
	static symbol = "Pa"
	static COMPONENTS = [
		{unit: Unit.kilogram}, 
		{unit: Unit.meter, divide: true}, 
		{unit: Unit.second, divide: true}, 
		{unit: Unit.second, divide: true}
	]
}
