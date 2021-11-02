import Unit from "./Unit.js";

/*
 * Distance
 */
const meter = class meter extends Unit {
	static symbol = "m"
	static COMPONENTS = [{unit: meter}]
	static CONVERSION = new Map()
}

/*
 * Mass
 */
const gram = class gram extends Unit {
	static symbol = "g"
	static COMPONENTS = [{unit: gram}]
	static CONVERSION = new Map()
}

/*
 * Mass
 */
const ampere = class ampere extends Unit {
	static symbol = "A"
	static COMPONENTS = [{unit: ampere}]
	static CONVERSION = new Map()
}

/*
 * amount of substance
 */
const mole = class mole extends Unit {
	static symbol = "mol"
	static COMPONENTS = [{unit: mole}]
	static CONVERSION = new Map()
}

/*
 * luminous intensity
 */
const candela = class candela extends Unit {
	static symbol = "cd"
	static COMPONENTS = [{unit: candela}]
	static CONVERSION = new Map()
}

/*
 * Time
 */
const second = class second extends Unit {
	static symbol = "s"
	static COMPONENTS = [{unit: second}]
	static CONVERSION = new Map()
}

/*
 * Temperature
 */
const kelvin = class kelvin extends Unit {
	static symbol = "K"
	static COMPONENTS = [{unit: kelvin}]
	static CONVERSION = new Map()
}

export default {
	meter,
	...Unit.generateDerivated(meter, Unit.DECIMAL_UNITS),

	gram,
	...Unit.generateDerivated(gram, Unit.DECIMAL_UNITS),

	ampere,
	...Unit.generateDerivated(ampere, Unit.DECIMAL_UNITS),

	mole,
	...Unit.generateDerivated(mole, Unit.DECIMAL_UNITS),

	candela,
	...Unit.generateDerivated(candela, Unit.DECIMAL_UNITS),

	second,
	...Unit.generateDerivated(second, [
		{name: "minute", symbol: "min", factor: 60, isFullName: true},
		{name: "hour", symbol: "h", factor: 60 * 60, isFullName: true},
		{name: "day", symbol: "d", factor: 60 * 60 * 24, isFullName: true},
		{name: "week", symbol: "w", factor: 60 * 60 * 24 * 7, isFullName: true},
	]),

	kelvin
}
