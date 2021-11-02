/**
 * @typedef {Object} DerivedUnitSpecification
 * @property {string} name
 * @property {string} symbol
 * @property {number} factor
 * @property {boolean} [isFullName]
 */

/**
 * @typedef {Object} UnitComponent
 * @property {typeof Unit} unit
 * @property {boolean} [divide]
 */

export default class Unit {
	/**
	 * @param {string} subModuleName
	 * @return {URL}
	 */
	static #getSubModuleUrl(subModuleName) {
		const url = new URL(import.meta.url)
		url.pathname = `/${subModuleName}.js`
		return url
	}

	/**
	 * @param {string | URL} modulePath
	 * @return {Promise<void>}
	 */
	static loadUnitFromModule(modulePath) {
		return import(modulePath).then(({default: newUnits}) => Unit.registerUnits(newUnits))
	}

	/**
	 * @return {Promise<void>}
	 */
	static loadSIBaseUnits() {
		return this.loadUnitFromModule(this.#getSubModuleUrl("SIBaseUnits"))
	}
	/**
	 * @return {Promise<void>}
	 */
	static loadSIDerivedUnits() {
		return this.loadUnitFromModule(this.#getSubModuleUrl("SIDerivedUnits"))
	}

	/**
	 * @type {number}
	 */
	value = 1
	/**
	 * @type {UnitComponent[]}
	 */
	static COMPONENTS = []
	/**
	 * @type {Map<typeof Unit, {convert: (number) => number, factor: (number) => number}>}
	 */
	static CONVERSION

	/**
	 * @type {DerivedUnitSpecification[]}
	 */
	static BIGGER_DECIMAL_UNITS = [
		{name: "deca", symbol: "da", factor: 1e1},
		{name: "hecto", symbol: "h", factor: 1e2},
		{name: "kilo", symbol: "k", factor: 1e3},
		{name: "mega", symbol: "M", factor: 1e6},
		{name: "giga", symbol: "G", factor: 1e9},
		{name: "tera", symbol: "T", factor: 1e12},
		{name: "peta", symbol: "P", factor: 1e15},
		{name: "exa", symbol: "E", factor: 1e18},
		{name: "zetta", symbol: "Z", factor: 1e21},
		{name: "yotta", symbol: "Y", factor: 1e24}
	]

	/**
	 * @type {DerivedUnitSpecification[]}
	 */
	static DECIMAL_UNITS = [
		{name: "yocto", symbol: "y", factor: 1e-24},
		{name: "zapto", symbol: "z", factor: 1e-21},
		{name: "atto", symbol: "a", factor: 1e-18},
		{name: "femto", symbol: "f", factor: 1e-15},
		{name: "pico", symbol: "p", factor: 1e-12},
		{name: "nano", symbol: "n", factor: 1e-9},
		{name: "micro", symbol: "µ", factor: 1e-6},
		{name: "milli", symbol: "m", factor: 1e-3},
		{name: "centi", symbol: "c", factor: 1e-2},
		{name: "deci", symbol: "d", factor: 1e-1},
		...Unit.BIGGER_DECIMAL_UNITS
	]

	/**
	 * @param {number} value
	 */
	constructor(value = 1) {
		this.value = value
	}

	/**
	 * generate new units based on the new unit using the provided derived unit specifications
	 * @param {typeof Unit} baseUnit
	 * @param {DerivedUnitSpecification[]} prefixList
	 * @return {Array<typeof Unit>} the newly created units
	 */
	static generateDerivated(baseUnit, prefixList) {
		if (! baseUnit.prototype instanceof Unit || baseUnit === Unit) {
			throw new TypeError(`${baseUnit} must be a subclass of ${Unit}`)
		}

		const output = Object.create(null)
		prefixList.forEach(prefix => {
			const symbol = prefix.isFullName ? prefix.symbol : prefix.symbol + baseUnit.symbol
			const name = prefix.isFullName ? prefix.name : prefix.name + baseUnit.name
			const tmp = {
				[name]: class extends baseUnit {
					static symbol = symbol
					static CONVERSION = new Map()
					static FACTOR = prefix.factor
					static COMPONENTS = [{unit: this}]
				}
			}
			output[name] = tmp[name]
			output[name].addConversion(baseUnit, x => x * prefix.factor)
			baseUnit.addConversion(output[name], x => x / prefix.factor)
		})
		return output
	}

	/**
	 * add units as attribute of Unit for easy access (optional doesn't change how they work)
	 * @param {{[key: string]: typeof Unit}} units
	 */
	static registerUnits(units) {
		Object.entries(units).forEach(([key, value]) => {Unit[key] = value})
	}

	/**
	 * add a conversion from this unit to the targeted one
	 * @param {typeof Unit} unit target unit of the conversion
	 * @param {(number) => number} convert conversion function used when converting from between the two units themselves
	 * @param {(number) => number} [factor=convert] conversion function used when converting between units compounded of the two units
	 *
	 * @example
	 * Unit.celsius.addConversion(Unit.fahrenheit, x => (x * 9 / 5) + 32, x => x * 9 / 5)
	 * // convert param does the full conversion with the addition,
	 * // while factor only does the multiplication part
	 */
	static addConversion(unit, convert, factor = convert) {
		this.CONVERSION.set(unit, {convert, factor})
	}

	/**
	 * create a new Unit by multiplying current unit with the given one
	 * @param {typeof Unit} unit
	 * @param {string} [name] name of the new unit
	 * @param {string} [symbol] symbol the new unit, if unset will be generated using symbols of components
	 * @return {typeof Unit} the newly created unit
	 */
	static multiply(unit, name = undefined, symbol = undefined) {
		const components = [
			...[...this.COMPONENTS, ...unit.COMPONENTS]
				.reduce((acc,comp) => {
					if (acc.has(comp.unit)) {
						acc.set(comp.unit, acc.get(comp.unit) + (comp.divide ? -1 : 1))
					} else {
						acc.set(comp.unit, comp.divide ? -1 : 1)
					}
					return acc
				}, new Map())
				.entries()
		].filter(([unit, count]) => count !== 0)
			.reduce((acc, [unit, count]) => {
				if(count > 0) {
					for(let i = 0; i < count; i++) {
						acc.push({unit})
					}
				} else {
					for(let i = 0; i > count; i--) {
						acc.push({unit, divide: true})
					}
				}
				return acc
			},[])

		for (let i = 0; i < components.length; i++) {
			for (let j = i; j < components.length; j++) {
				if (components[i].unit !== components[j].unit &&
					components[i].unit.canConvertTo(components[j].unit)
				) {
					throw new TypeError("A compound unit can't have different components for the same kind of data (e.g. meter and yard)")
				}
			}
		}

		// TODO why is this not used ? why is name never override if not set ?
		symbol = symbol ?? name ?? [
			...components
				.reduce((acc,comp) => {
					if (acc.has(comp.unit)) {
						acc.set(comp.unit, acc.get(comp.unit) + (comp.isNegative ? -1 : 1))
					} else {
						acc.set(comp.unit, comp.divide ? -1 : 1)
					}
					return acc
				}, new Map())
				.entries()
		]
			.sort((a,b) => b[1] - a[1])
			.map(comp => comp[1] !== 0 ? `${comp[0].symbol}${comp[1] !== 1 ? comp[1] : ""}` : "")
			.join(".")

		const tmp = {
			[name]: class extends Unit {
				static symbol = symbol
				static COMPONENTS = components
			}
		}
		return tmp[name]
	}

	/**
	 * divide the unit by another unit
	 * @param {typeof Unit} unit
	 * @param {string} [name] same as name param from {@link Unit#multiply}
	 * @param {string} [symbol] same as symbol param from {@link Unit#multiply}
	 * @return {typeof Unit} the newly created unit
	 */
	static divide(unit, name = undefined, symbol = undefined) {
		const newComponents = unit.COMPONENTS.map(comp => ({ unit: comp.unit, divide: ! comp.divising }))

 		return this.multiply(class extends Unit {static COMPONENTS = newComponents}, name, symbol)
	}

	/**
	 * elevate current unit to the specifier power
	 * @param {number} power
	 * @param {string} [name] same as name param from {@link Unit#multiply}
	 * @param {string} [symbol] same as symbol param from {@link Unit#multiply}
	 * @return {typeof Unit} the newly created unit
	 */
	static pow(power = 2, name = undefined, symbol = undefined) {
		const newComponents = []
		for (let i = 0; i < power - 1; i++) {
			newComponents.push(...this.COMPONENTS)
		}
		return this.multiply(class extends Unit {static COMPONENTS = newComponents}, name, symbol)
	}

	/**
	 * find the list of Unit you can convert current unit to, using this.CONVERSION
	 * @see Unit#addConversion
	 * @deprecated doesn't work for compound conversion nor derivated unit conversion
	 * @return {{unit: typeof Unit, path: Array<typeof Unit>}[]}
	 */
	static get expandedConversionList() {
		const toVisit = [{unit: this, path: []}]
		const visited = []
		while (toVisit.length !== 0) {
			const current = toVisit.shift()
			visited.push(current)
			;[...current.unit.CONVERSION.entries()]
				.map(conversion => conversion[0])
				.filter(conversionTarget => ! visited.some(visitRecord => visitRecord.unit === conversionTarget))
				.forEach(conversionTarget => toVisit.push({unit: conversionTarget, path: [...current.path, conversionTarget]}))
		}
		return visited
	}

	/**
	 * test if unit can be converted to targetedUnit using {@link Unit#expandedConversionList}
	 * @deprecated doesn't work for compound conversion nor derivated unit conversion
	 * @param {typeof Unit} targetedUnit
	 * @return {boolean}
	 */
	static canConvertTo(targetedUnit) {
		return this.expandedConversionList.map(conversionPath => conversionPath.unit).includes(targetedUnit)
	}

	/**
	 * return conversion steps from current unit to targetedUnit using {@link Unit#expandedConversionList}
	 * @deprecated doesn't work for compound conversion nor derivated unit conversion
	 * @param {typeof Unit} targetedUnit
	 * @return {Array<typeof Unit>}
	 */
	static conversionPathTo(targetedUnit) {
		return this.expandedConversionList.find(conversionPath => conversionPath.unit === targetedUnit)?.path
	}

	/**
	 * find convertible pairs between components of units
	 * @param {Object} from a subclass of Unit
	 * @param {Object} to a subclass of Unit
	 * @throws {TypeError} if no conversion is possible
	 * @return {{opposite: boolean, pairs: {origin: UnitComponent, target: UnitComponent }[]}} the pair list and if the target unit is opposite of the source
	 */
	static #conversionComponentsPairs(from, to) {
		try {
			const toComponents = [...to.COMPONENTS]
			return {
				opposite: false,
				pairs: from.COMPONENTS.reduce((pairs, origin) => {
					const targetIndex = toComponents.findIndex(comp => comp.divide === origin.divide && comp.unit.canConvertTo(origin.unit))
					if (targetIndex === -1) {
						throw new TypeError(`No conversion known between ${from.name} and ${to.name}`)
					}
					const target = toComponents.splice(targetIndex, 1)[0]
					pairs.push({origin, target})
					return pairs
				}, [])
			}
		} catch (e) {
			const toComponents = [...to.COMPONENTS]
			return {
				opposite: true,
				pairs: from.COMPONENTS.reduce((pairs, origin) => {
					const targetIndex = toComponents.findIndex(comp => comp.divide !== origin.divide && comp.unit.canConvertTo(origin.unit))
					if (targetIndex === -1) {
						throw new TypeError(`No conversion known between ${from.name} and ${to.name}`)
					}
					const target = toComponents.splice(targetIndex, 1)[0]
					pairs.push({origin, target})
					return pairs
				}, [])
			}
		}
	}

	/**
	 * @return {string}
	 */
	toString() {
		return `${this.value}${this.constructor.symbol}`
	}

	/**
	 * convert the value to another unit
	 * @param {typeof Unit} targetedUnit
	 * @return {Unit}
	 */
	to(targetedUnit) {
		if (this.constructor.COMPONENTS.length !== targetedUnit.COMPONENTS.length) {
			throw new TypeError(`No conversion known between ${this.constructor.name} and ${targetedUnit.name}`)
		}

		// 1) find pairs
		const pairs = Unit.#conversionComponentsPairs(this.constructor, targetedUnit)

		// 3) calculate factor
		let baseValue = this.value
		pairs.pairs.forEach(({origin, target}) => {
			let compValue = 1
			origin.unit.conversionPathTo(target.unit).reduce((current, intermediate) => {
				compValue = current.CONVERSION.get(intermediate).factor(compValue)
				return intermediate
			}, origin.unit)
			if (origin.divide) {
				baseValue /= compValue
			} else {
				baseValue *= compValue
			}
		})
		// 4) create new TargetUnit(value * factor)
		const finalValue = pairs.opposite ? 1 / baseValue : baseValue
		return new targetedUnit(finalValue)
	}
}
