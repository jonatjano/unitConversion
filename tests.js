import Unit from "./Unit.js"
const expect = chai.expect

await Unit.registerSIBaseUnits()
await Unit.registerSIDerivedUnits()

/*
describe("constants exists", () => {
	// https://en.wikipedia.org/wiki/International_System_of_Units
	it("hyperfine transition frequency of Cs", () => {
		expect(Unit.constants.c).to.exists
		expect(Unit.constants.c).to.equals(299_792_458)
		expect(Unit.constants.c.unit.symbol).to.equals("m.s-1")
	})
	it("speed of light", () => {
		expect(Unit.constants.c).to.exists
		expect(Unit.constants.c).to.equals(299_792_458)
		expect(Unit.constants.c.unit.symbol).to.equals("m.s-1")
	})
	it("speed of light", () => {
		expect(Unit.constants.c).to.exists
		expect(Unit.constants.c.value).to.equals(299_792_458)
		expect(Unit.constants.c.symbol).to.equals("m.s-1")
	})
	it("speed of light", () => {
		expect(Unit.constants.c).to.exists
		expect(Unit.constants.c.value).to.equals(299_792_458)
		expect(Unit.constants.c.symbol).to.equals("m.s-1")
	})
	it("speed of light", () => {
		expect(Unit.constants.c).to.exists
		expect(Unit.constants.c.value).to.equals(299_792_458)
		expect(Unit.constants.c.symbol).to.equals("m.s-1")
	})
	it("speed of light", () => {
		expect(Unit.constants.c).to.exists
		expect(Unit.constants.c.value).to.equals(299_792_458)
		expect(Unit.constants.c.symbol).to.equals("m.s-1")
	})
	it("speed of light", () => {
		expect(Unit.constants.c).to.exists
		expect(Unit.constants.c.value).to.equals(299_792_458)
		expect(Unit.constants.c.symbol).to.equals("m.s-1")
	})
})
*/

describe("base units exists", () => {
	describe("SI", () => {
		describe("length", () => {
			it("meter", () => {
				expect(Unit.meter).to.exists
				expect(Unit.meter.COMPONENTS).to.deep.equals([{unit: Unit.meter}])
			})
		})

		describe("mass", () => {
			it("gram", () => {
				expect(Unit.gram).to.exists
				expect(Unit.gram.COMPONENTS).to.deep.equals([{unit: Unit.gram}])
			})
		})

		describe("electric current", () => {
			it("ampere", () => {
				expect(Unit.ampere).to.exists
				expect(Unit.ampere.COMPONENTS).to.deep.equals([{unit: Unit.ampere}])
			})
		})

		describe("amount of substance", () => {
			it("mole", () => {
				expect(Unit.mole).to.exists
				expect(Unit.mole.COMPONENTS).to.deep.equals([{unit: Unit.mole}])
			})
		})

		describe("luminous intensity", () => {
			it("candela", () => {
				expect(Unit.candela).to.exists
				expect(Unit.candela.COMPONENTS).to.deep.equals([{unit: Unit.candela}])
			})
		})

		describe("time", () => {
			it("second", () => {
				expect(Unit.second).to.exists
				expect(Unit.second.COMPONENTS).to.deep.equals([{unit: Unit.second}])
			})
		})

		describe("temperature", () => {
			it("K", () => {
				expect(Unit.kelvin).to.exists
				expect(Unit.kelvin.COMPONENTS).to.deep.equals([{unit: Unit.kelvin}])
			})
		})
	})

	describe("non-SI", () => {
		describe("length", () => {
			it("yard", () => {
				expect(Unit.yd).to.not.exists
				expect(Unit.yard).to.exists
				expect(Unit.yard.canConvertTo(Unit.meter)).to.be.true
			})
		})

		describe("time", () => {
			it("minute", () => {
				expect(Unit.min).to.not.exists
				expect(Unit.minute).to.exists
				expect(Unit.minute.canConvertTo(Unit.second)).to.be.true
			})
			it("hour", () => {
				expect(Unit.h).to.not.exists
				expect(Unit.hour).to.exists
				expect(Unit.hour.canConvertTo(Unit.second)).to.be.true
			})
			it("day", () => {
				expect(Unit.d).to.not.exists
				expect(Unit.day).to.exists
				expect(Unit.day.canConvertTo(Unit.second)).to.be.true
			})
			it("week", () => {
				expect(Unit.w).to.not.exists
				expect(Unit.week).to.exists
				expect(Unit.week.canConvertTo(Unit.second)).to.be.true
			})
		})

		describe("temperature", () => {
			it("°F", () => {
				expect(Unit["°F"]).to.not.exists
				expect(Unit.fahrenheit).to.exists
				expect(Unit.fahrenheit.canConvertTo(Unit.kelvin)).to.be.true
			})
		})
	})
})

describe("derivated units", () => {
	it("works", () => {
		const test = class test extends Unit {
			static symbol = "ts"
			static COMPONENTS = [{unit: test}]
			static CONVERSION = new Map()
		}
		const derivated = Unit.generateDerivated(test, [
			{name: "milli", symbol: "m", factor: 0.001},
			{name: "Mega", symbol: "M", factor: 1000},
			{name: "tat", symbol: "ta", factor: 500, isFullName: true}
		])
		expect(derivated.millitest).to.exists
		expect(derivated.mts).to.not.exists
		expect(derivated.Megatest).to.exists
		expect(derivated.Mts).to.not.exists

		expect(derivated.tat).to.exists
		expect(derivated.ta).to.not.exists
		expect(derivated.tattest).to.not.exists
		expect(derivated.tats).to.not.exists
	})

	it("SI base 10 prefixes", () => {
		const test = class test extends Unit {
			static symbol = "ts"
			static COMPONENTS = [{unit: test}]
			static CONVERSION = new Map()
		}
		const derivated = Unit.generateDerivated(test, Unit.DECIMAL_UNITS)
		expect(derivated.yts).to.not.exists
		expect(derivated.yoctotest).to.exists
		expect(derivated.zts).to.not.exists
		expect(derivated.zaptotest).to.exists
		expect(derivated.ats).to.not.exists
		expect(derivated.attotest).to.exists
		expect(derivated.fts).to.not.exists
		expect(derivated.femtotest).to.exists
		expect(derivated.pts).to.not.exists
		expect(derivated.picotest).to.exists
		expect(derivated.nts).to.not.exists
		expect(derivated.nanotest).to.exists
		expect(derivated["µts"]).to.not.exists
		expect(derivated.microtest).to.exists
		expect(derivated.mts).to.not.exists
		expect(derivated.millitest).to.exists
		expect(derivated.cts).to.not.exists
		expect(derivated.centitest).to.exists
		expect(derivated.dts).to.not.exists
		expect(derivated.decitest).to.exists

		expect(derivated.dats).to.not.exists
		expect(derivated.decatest).to.exists
		expect(derivated.hts).to.not.exists
		expect(derivated.hectotest).to.exists
		expect(derivated.kts).to.not.exists
		expect(derivated.kilotest).to.exists
		expect(derivated.Mts).to.not.exists
		expect(derivated.megatest).to.exists
		expect(derivated.Gts).to.not.exists
		expect(derivated.gigatest).to.exists
		expect(derivated.Tts).to.not.exists
		expect(derivated.teratest).to.exists
		expect(derivated.Pts).to.not.exists
		expect(derivated.petatest).to.exists
		expect(derivated.Ets).to.not.exists
		expect(derivated.exatest).to.exists
		expect(derivated.Zts).to.not.exists
		expect(derivated.zettatest).to.exists
		expect(derivated.Yts).to.not.exists
		expect(derivated.yottatest).to.exists
	})

	describe("SI named Units", () => {
		// https://en.wikipedia.org/wiki/SI_derived_unit
		it("hertz", () => {
			expect(Unit.Hz).to.not.exists
			expect(Unit.hertz).to.exists
			expect(Unit.hertz.COMPONENTS).to.have.deep.members([
				{unit: Unit.second, divide: true}
			])
		})
		it("radian", () => {
			expect(Unit.rad).to.not.exists
			expect(Unit.radian).to.exists
			expect(Unit.radian.COMPONENTS.length).to.equals(0)
		})
		it("steradian", () => {
			expect(Unit.sr).to.not.exists
			expect(Unit.steradian).to.exists
			expect(Unit.steradian.COMPONENTS.length).to.equals(0)
		})
		it("newton", () => {
			expect(Unit.N).to.not.exists
			expect(Unit.newton).to.exists
			expect(Unit.newton.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true}
			])
		})
		it("pascal", () => {
			expect(Unit.Pa).to.not.exists
			expect(Unit.pascal).to.exists
			expect(Unit.pascal.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.meter, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true}
			])
		})
		it("joule", () => {
			expect(Unit.J).to.not.exists
			expect(Unit.joule).to.exists
			expect(Unit.joule.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.meter},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true}
			])
		})
		it("watt", () => {
			expect(Unit.W).to.not.exists
			expect(Unit.watt).to.exists
			expect(Unit.watt.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.meter},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true}
			])
		})
		it("coulomb", () => {
			expect(Unit.C).to.not.exists
			expect(Unit.coulomb).to.exists
			expect(Unit.coulomb.COMPONENTS).to.have.deep.members([
				{unit: Unit.ampere},
				{unit: Unit.second}
			])
		})
		it("volt", () => {
			expect(Unit.V).to.not.exists
			expect(Unit.volt).to.exists
			expect(Unit.volt.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.meter},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.ampere, divide: true}
			])
		})
		it("farad", () => {
			expect(Unit.F).to.not.exists
			expect(Unit.farad).to.exists
			expect(Unit.farad.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram, divide: true},
				{unit: Unit.meter, divide: true},
				{unit: Unit.meter, divide: true},

				{unit: Unit.second},
				{unit: Unit.second},
				{unit: Unit.second},
				{unit: Unit.second},

				{unit: Unit.ampere},
				{unit: Unit.ampere}
			])
		})
		it("ohm", () => {
			expect(Unit["Ω"]).to.not.exists
			expect(Unit.ohm).to.exists
			expect(Unit.ohm.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.meter},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.ampere, divide: true},
				{unit: Unit.ampere, divide: true}
			])
		})
		it("siemens", () => {
			expect(Unit.S).to.not.exists
			expect(Unit.siemens).to.exists
			expect(Unit.siemens.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram, divide: true},
				{unit: Unit.meter, divide: true},
				{unit: Unit.meter, divide: true},
				{unit: Unit.second},
				{unit: Unit.second},
				{unit: Unit.second},
				{unit: Unit.ampere},
				{unit: Unit.ampere}
			])
		})
		it("weber", () => {
			expect(Unit.Wb).to.not.exists
			expect(Unit.weber).to.exists
			expect(Unit.weber.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.meter},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.ampere, divide: true}
			])
		})
		it("tesla", () => {
			expect(Unit.T).to.not.exists
			expect(Unit.tesla).to.exists
			expect(Unit.tesla.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.ampere, divide: true}
			])
		})
		it("henry", () => {
			expect(Unit.H).to.not.exists
			expect(Unit.henry).to.exists
			expect(Unit.henry.COMPONENTS).to.have.deep.members([
				{unit: Unit.kilogram},
				{unit: Unit.meter},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
				{unit: Unit.ampere, divide: true},
				{unit: Unit.ampere, divide: true}
			])
		})
		it("°C", () => {
			expect(Unit["°C"]).to.not.exists
			expect(Unit.celsius).to.exists
			expect(Unit.celsius.canConvertTo(Unit.kelvin)).to.be.true
		})
		it("lumen", () => {
			expect(Unit.lm).to.not.exists
			expect(Unit.lumen).to.exists
			expect(Unit.lumen.COMPONENTS).to.have.deep.members([
				{unit: Unit.candela}
			])
			expect(Unit.lumen.canConvertTo(Unit.candela)).to.be.true
		})
		it("lux", () => {
			expect(Unit.lx).to.not.exists
			expect(Unit.lux).to.exists
			expect(Unit.lux.COMPONENTS).to.have.deep.members([
				{unit: Unit.candela},
				{unit: Unit.meter, divide: true},
				{unit: Unit.meter, divide: true},
			])
		})
		it("becquerel", () => {
			expect(Unit.Bq).to.not.exists
			expect(Unit.becquerel).to.exists
			expect(Unit.becquerel.COMPONENTS).to.have.deep.members([
				{unit: Unit.second, divide: true}
			])
		})
		it("gray", () => {
			expect(Unit.Gy).to.not.exists
			expect(Unit.gray).to.exists
			expect(Unit.gray.COMPONENTS).to.have.deep.members([
				{unit: Unit.meter},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
			])
		})
		it("sievert", () => {
			expect(Unit.Sv).to.not.exists
			expect(Unit.sievert).to.exists
			expect(Unit.sievert.COMPONENTS).to.have.deep.members([
				{unit: Unit.meter},
				{unit: Unit.meter},
				{unit: Unit.second, divide: true},
				{unit: Unit.second, divide: true},
			])
		})
		it("katal", () => {
			expect(Unit.kat).to.not.exists
			expect(Unit.katal).to.exists
			expect(Unit.katal.COMPONENTS).to.have.deep.members([
				{unit: Unit.mole},
				{unit: Unit.second, divide: true},
			])
		})
	})
})

describe("compound units", () => {
	describe("multiplication", () => {
		describe("between base units", () => {
			it("can create km.h", () => {
				const kmPerH = Unit.kilometer.multiply(Unit.hour)
				expect(kmPerH.COMPONENTS).to.have.deep.members([{unit: Unit.kilometer},{unit: Unit.hour}])
			})
			it("can create m.s", () => {
				const mPerS = Unit.meter.multiply(Unit.second)
				expect(mPerS.COMPONENTS).to.have.deep.members([{unit: Unit.meter},{unit: Unit.second}])
			})
		})
		describe("between compound units", () => {
			it("can multiply km.h and K.h", () => {
				const kmPerH = Unit.kilometer.multiply(Unit.hour)
				const kPerH = Unit.kelvin.multiply(Unit.hour)
				const result = kmPerH.multiply(kPerH)
				expect(result.COMPONENTS).to.have.deep.members([{unit: Unit.kilometer},{unit: Unit.hour},{unit: Unit.kelvin},{unit: Unit.hour}])
			})
		})
	})

	describe("power", () => {
		describe("on base units", () => {
			it("can create m3", () => {
				const m3 = Unit.meter.pow(3)
				expect(m3.COMPONENTS).to.have.deep.members([{unit: Unit.meter},{unit: Unit.meter},{unit: Unit.meter}])
			})
			it("can create km3", () => {
				const km3 = Unit.kilometer.pow(3)
				expect(km3.COMPONENTS).to.have.deep.members([{unit: Unit.kilometer},{unit: Unit.kilometer},{unit: Unit.kilometer}])
			})
		})
		describe("on compound units", () => {
			it("can pow km.h to 3", () => {
				const kmPerH = Unit.kilometer.multiply(Unit.hour)
				const squared = kmPerH.pow(3)
				expect(squared.COMPONENTS).to.have.deep.members([
					{unit: Unit.kilometer},{unit: Unit.hour},
					{unit: Unit.kilometer},{unit: Unit.hour},
					{unit: Unit.kilometer},{unit: Unit.hour}
				])
			})
		})
	})

	describe("division", () => {
		describe("between base units", () => {
			it("can create km/h", () => {
				const kmPerH = Unit.kilometer.divide(Unit.hour)
				expect(kmPerH.COMPONENTS).to.have.deep.members([{unit: Unit.kilometer},{unit: Unit.hour, divide: true}])
			})
			it("can create m/s", () => {
				const mPerS = Unit.meter.divide(Unit.second)
				expect(mPerS.COMPONENTS).to.have.deep.members([{unit: Unit.meter},{unit: Unit.second, divide: true}])
			})
		})
		describe("between compound units", () => {
			it("can divide km.h by K.h", () => {
				const kmPerH = Unit.kilometer.multiply(Unit.hour)
				const kPerH = Unit.kelvin.multiply(Unit.hour)
				const result = kmPerH.divide(kPerH)
				expect(result.COMPONENTS).to.deep.equals([{unit: Unit.kilometer},{unit: Unit.kelvin, divide: true}])
			})
		})
	})

	it("snap to knows units if snap param is true", () => {
		expect.fail("unit snapping is NYI ")
	})

	it("can't compound if compatible unit already in components", () => {
		expect(() => Unit.meter.multiply(Unit.kilometer)).to.throw(TypeError)
	})
})

describe("conversion", () => {
	it("between derivated units", () => {
		const distance = new Unit.meter(1)
		expect(distance.to(Unit.centimeter).value).to.closeTo(100, 0.0001)
		expect(distance.to(Unit.kilometer).value).to.closeTo(0.001, 0.0001)
		const asCm = new Unit.centimeter(10)
		const asKm = asCm.to(Unit.kilometer)
		expect(asKm.value).to.equals(0.0001)
	})

	it("between unit and 1/unit (hertz <-> second)", () => {
		const frequency = new Unit.hertz()
		expect(frequency.to(Unit.second).value).to.be.closeTo(1, 0.0001)
		const time = new Unit.second(100)
		expect(time.to(Unit.hertz).value).to.be.closeTo(0.01, 0.0001)
	})

	it("between compatible units", () => {
		const distance = new Unit.meter(1)
		expect(distance.to(Unit.yard).value).to.closeTo(1.09361, 0.0001)
		const distance2 = new Unit.centimeter(1)
		expect(distance2.to(Unit.inch).value).to.closeTo(0.393701, 0.0001)
	})

	describe("between compound units", () => {
		it("fails if components quantity are not compatible", () => {
			const m3 = Unit.meter.pow(3)
			const m2 = Unit.meter.pow(2)
			const volume = new m3(42)
			expect(() => volume.to(m2)).to.throw(TypeError)
		})

		it("fails if components are not compatible", () => {
			const m2 = Unit.meter.pow(2)
			const s2 = Unit.second.pow(2)
			const area = new m2(42)
			expect(() => area.to(s2)).to.throw(TypeError)
		})

		it("can convert m3 to dm3", () => {
			const m3 = Unit.meter.pow(3)
			const dm3 = Unit.decimeter.pow(3)
			const volume = new m3(42)
			const converted = volume.to(dm3)
			expect(converted.value).to.closeTo(42000, 0.0001)
			expect(converted).to.be.an.instanceof(dm3)
		})

		it("can convert km/h to m/s", () => {
			const kmPerH = Unit.kilometer.divide(Unit.hour)
			const mPerS = Unit.meter.divide(Unit.second)
			const speed = new kmPerH(42)
			const converted = speed.to(mPerS)
			expect(converted.value).to.closeTo(11.6667, 0.0001)
			expect(converted).to.be.an.instanceof(mPerS)
		})

		it("can convert °C/h to °F/h", () => {
			const CpH = Unit.celsius.divide(Unit.hour)
			const FpH = Unit.fahrenheit.divide(Unit.hour)
			const origin = new CpH(1)
			const converted = origin.to(FpH)
			expect(converted.value).to.closeTo(1.8, 0.0001)
			expect(converted).to.be.an.instanceof(FpH)
		})

		it("between unit and 1/unit (m/s <-> s/m)", () => {
			const mPerS = Unit.meter.divide(Unit.second)
			const sPerM = Unit.second.divide(Unit.meter)
			expect((new mPerS(1)).to(sPerM).value).to.be.closeTo(1, 0.0001)
			expect((new sPerM(100)).to(mPerS).value).to.be.closeTo(0.01, 0.0001)
		})

		it("can convert km/h to s/m", () => {
			const kmPerH = Unit.kilometer.divide(Unit.hour)
			const sPerM = Unit.second.divide(Unit.meter)
			const speed = new kmPerH(42)
			const converted = speed.to(sPerM)
			expect(converted.value).to.closeTo(0.0857, 0.0001)
			expect(converted).to.be.an.instanceof(sPerM)
		})

		it("can't convert km/h to m.s", () => {
			const kmPerH = Unit.kilometer.divide(Unit.hour)
			const sPerM = Unit.second.multiply(Unit.meter)
			const speed = new kmPerH(42)
			expect(() => speed.to(sPerM)).to.throw(TypeError)
		})
		// TODO add more tests https://hextobinary.com/unit/
	})
})
