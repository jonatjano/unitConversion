export default Unit => {

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
		static CONVERSION = new Map()
	}

	Unit.radian = class radian extends Unit {
		static symbol = "rad"
		static COMPONENTS = []
		static CONVERSION = new Map()
	}

	Unit.steradian = class steradian extends Unit {
		static symbol = "sr"
		static COMPONENTS = []
		static CONVERSION = new Map()
	}

	Unit.newton = class newton extends Unit {
		static symbol = "N"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.pascal = class pascal extends Unit {
		static symbol = "Pa"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.meter, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.joule = class joule extends Unit {
		static symbol = "J"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.meter},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.watt = class watt extends Unit {
		static symbol = "W"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.meter},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.coulomb = class coulomb extends Unit {
		static symbol = "C"
		static COMPONENTS = [
			{unit: Unit.ampere},
			{unit: Unit.second}
		]
		static CONVERSION = new Map()
	}

	Unit.volt = class volt extends Unit {
		static symbol = "V"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.meter},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.ampere, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.farad = class farad extends Unit {
		static symbol = "F"
		static COMPONENTS = [
			{unit: Unit.kilogram, divide: true},
			{unit: Unit.meter, divide: true},
			{unit: Unit.meter, divide: true},
			{unit: Unit.second},
			{unit: Unit.second},
			{unit: Unit.second},
			{unit: Unit.second},
			{unit: Unit.ampere},
			{unit: Unit.ampere}
		]
		static CONVERSION = new Map()
	}

	Unit.ohm = class ohm extends Unit {
		static symbol = "Ω"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.meter},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.ampere, divide: true},
			{unit: Unit.ampere, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.siemens = class siemens extends Unit {
		static symbol = "S"
		static COMPONENTS = [
			{unit: Unit.kilogram, divide: true},
			{unit: Unit.meter, divide: true},
			{unit: Unit.meter, divide: true},
			{unit: Unit.second},
			{unit: Unit.second},
			{unit: Unit.second},
			{unit: Unit.ampere},
			{unit: Unit.ampere}
		]
		static CONVERSION = new Map()
	}

	Unit.weber = class weber extends Unit {
		static symbol = "Wb"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.meter},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.ampere, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.tesla = class tesla extends Unit {
		static symbol = "T"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.ampere, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.henry = class henry extends Unit {
		static symbol = "H"
		static COMPONENTS = [
			{unit: Unit.kilogram},
			{unit: Unit.meter},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
			{unit: Unit.ampere, divide: true},
			{unit: Unit.ampere, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.lumen = class lumen extends Unit {
		static symbol = "lm"
		static COMPONENTS = [
			{unit: Unit.candela}
		]
		static CONVERSION = new Map()
	}

	Unit.lux = class lux extends Unit {
		static symbol = "lx"
		static COMPONENTS = [
			{unit: Unit.candela},
			{unit: Unit.meter, divide: true},
			{unit: Unit.meter, divide: true},
		]
		static CONVERSION = new Map()
	}

	Unit.becquerel = class becquerel extends Unit {
		static symbol = "Bq"
		static COMPONENTS = [
			{unit: Unit.second, divide: true}
		]
		static CONVERSION = new Map()
	}

	Unit.gray = class gray extends Unit {
		static symbol = "Gy"
		static COMPONENTS = [
			{unit: Unit.meter},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
		]
		static CONVERSION = new Map()
	}

	Unit.sievert = class sievert extends Unit {
		static symbol = "Sv"
		static COMPONENTS = [
			{unit: Unit.meter},
			{unit: Unit.meter},
			{unit: Unit.second, divide: true},
			{unit: Unit.second, divide: true},
		]
		static CONVERSION = new Map()
	}

	Unit.katal = class katal extends Unit {
		static symbol = "kat"
		static COMPONENTS = [
			{unit: Unit.mole},
			{unit: Unit.second, divide: true},
		]
		static CONVERSION = new Map()
	}

	const specialConversion = new Map([
		[Unit.radian, [{unit: Unit.meter}, {unit: Unit.meter, divide: true}]],
		[Unit.steradian, [{unit: Unit.meter}, {unit: Unit.meter}, {unit: Unit.meter, divide: true}, {
			unit: Unit.meter,
			divide: true
		}]],
		[Unit.lumen, [{unit: Unit.candela}, {unit: Unit.meter}, {unit: Unit.meter}, {
			unit: Unit.meter,
			divide: true
		}, {unit: Unit.meter, divide: true}]]
	])

}
