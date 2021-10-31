export default Unit => {

	/*
	 * Distance
	 */

	Unit.meter = class meter extends Unit {
		static symbol = "m"
		static COMPONENTS = [{unit: meter}]
		static CONVERSION = new Map()
	}
// Unit.m = Unit.meter
	Unit.addToBaseUnits(Unit.generateDerivated(Unit.meter, Unit.DECIMAL_UNITS))

	Unit.yard = class yard extends Unit {
		static symbol = "yd"
		static COMPONENTS = [{unit: yard}]
		static CONVERSION = new Map()
	}
// Unit.yd = Unit.yard
	Unit.meter.addConversion(Unit.yard, x => x * 1.09361)
	Unit.yard.addConversion(Unit.meter, x => x / 1.09361)

	Unit.addToBaseUnits(Unit.generateDerivated(Unit.yard, [
		{name: "feet", symbol: "ft", factor: 1/3, isFullName: true},
		{name: "inch", symbol: "in", factor: 1/36, isFullName: true},
	]))

	/*
	 * Mass
	 */

	Unit.gram = class gram extends Unit {
		static symbol = "g"
		static COMPONENTS = [{unit: gram}]
		static CONVERSION = new Map()
	}
// Unit.g = Unit.gram
	Unit.addToBaseUnits(Unit.generateDerivated(Unit.gram, Unit.DECIMAL_UNITS))

	/*
	 * Mass
	 */

	Unit.ampere = class ampere extends Unit {
		static symbol = "A"
		static COMPONENTS = [{unit: ampere}]
		static CONVERSION = new Map()
	}
// Unit.A = Unit.ampere
	Unit.addToBaseUnits(Unit.generateDerivated(Unit.ampere, Unit.DECIMAL_UNITS))

	/*
	 * amount of substance
	 */

	Unit.mole = class mole extends Unit {
		static symbol = "mol"
		static COMPONENTS = [{unit: mole}]
		static CONVERSION = new Map()
	}
// Unit.mol = Unit.mole
	Unit.addToBaseUnits(Unit.generateDerivated(Unit.mole, Unit.DECIMAL_UNITS))

	/*
	 * luminous intensity
	 */

	Unit.candela = class candela extends Unit {
		static symbol = "cd"
		static COMPONENTS = [{unit: candela}]
		static CONVERSION = new Map()
	}
// Unit.cd = Unit.candela
	Unit.addToBaseUnits(Unit.generateDerivated(Unit.candela, Unit.DECIMAL_UNITS))

	/*
	 * Time
	 */
	Unit.second = class second extends Unit {
		static symbol = "s"
		static COMPONENTS = [{unit: second}]
		static CONVERSION = new Map()
	}
// Unit.s = Unit.second
	Unit.addToBaseUnits(Unit.generateDerivated(Unit.second, [
		{name: "minute", symbol: "min", factor: 60, isFullName: true},
		{name: "hour", symbol: "h", factor: 60 * 60, isFullName: true},
		{name: "day", symbol: "d", factor: 60 * 60 * 24, isFullName: true},
		{name: "week", symbol: "w", factor: 60 * 60 * 24 * 7, isFullName: true},
	]))

	/*
	 * Temperature
	 */

	Unit.celsius = class celsius extends Unit {
		static symbol = "°C"
		static COMPONENTS = [{unit: celsius}]
		static CONVERSION = new Map()
	}
// Unit["°C"] = Unit.celsius
	Unit.fahrenheit = class fahrenheit extends Unit.celsius {
		static symbol = "°F"
		static COMPONENTS = [{unit: fahrenheit}]
		static CONVERSION = new Map()
	}
// Unit["°F"] = Unit.fahrenheit
	Unit.celsius.addConversion(Unit.fahrenheit, x => (x * 9 / 5) + 32, x => x * 9 / 5)
	Unit.fahrenheit.addConversion(Unit.celsius, x => (x - 32) * 5 / 9, x => x * 5 / 9)

	Unit.kelvin = class kelvin extends Unit.celsius {
		static symbol = "K"
		static COMPONENTS = [{unit: kelvin}]
		static CONVERSION = new Map()
	}
// Unit.K = Unit.kelvin
	Unit.celsius.addConversion(Unit.kelvin, x => x + 273.15, x => x)
	Unit.kelvin.addConversion(Unit.celsius, x => x - 273.15, x => x)
}
