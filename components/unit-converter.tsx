"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Zap } from "lucide-react"

interface UnitCategory {
  name: string
  units: { [key: string]: { name: string; factor: number; symbol: string } }
}

const unitCategories: { [key: string]: UnitCategory } = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meter", factor: 1, symbol: "m" },
      kilometer: { name: "Kilometer", factor: 1000, symbol: "km" },
      centimeter: { name: "Centimeter", factor: 0.01, symbol: "cm" },
      millimeter: { name: "Millimeter", factor: 0.001, symbol: "mm" },
      micron: { name: "Micrometer/Micron", factor: 1e-6, symbol: "μm" },
      nanometer: { name: "Nanometer", factor: 1e-9, symbol: "nm" },
      picometer: { name: "Picometer", factor: 1e-12, symbol: "pm" },
      angstrom: { name: "Angstrom", factor: 1e-10, symbol: "Å" },
      mil: { name: "Mil", factor: 0.0254e-3, symbol: "mil" },
      twip: { name: "Twip", factor: 0.0254 / 1440, symbol: "twip"},
      point: { name: "Point", factor: 0.0254 / 72, symbol: "pt"},
      poppyseed: { name: "Poppyseed", factor: 0.0254 / 15, symbol: "pseed" },
      line: { name: "Line", factor: 0.0254 / 12, symbol: "lin" },
      barleycorn: { name: "Barleycorn", factor: 0.0254 / 3, symbol: "bcorn" },
      digit: { name: "Digit", factor: 0.0254 * 0.75, symbol: "dig" },
      finger: { name: "Finger", factor: 0.0254 * 0.875, symbol: "fin" },
      inch: { name: "Inch", factor: 0.0254, symbol: "in" },
      nail: { name: "Nail", factor: 0.9144 / 16, symbol: "nl" },
      palm: { name: "Palm", factor: 0.0762, symbol: "pm" },
      hand: { name: "Hand", factor: 0.1016, symbol: "hh" },
      shaftment: { name: "Shaftment", factor: 0.1524, symbol: "smt" },
      span: { name: "Span", factor: 0.2286, symbol: "spn" },
      foot: { name: "Foot", factor: 0.3048, symbol: "ft" },
      horse: { name: "Horse Length", factor: 2.4384, symbol: "hl" },
      cubit: { name: "Cubit", factor: 0.4572, symbol: "cbt" },
      yard: { name: "Yard", factor: 0.9144, symbol: "yd" },
      ell: { name: "Ell", factor: 0.9144 * 1.25, symbol: "ell" },
      skein: { name: "Skein", factor: 0.9144 * 120, symbol: "skn" },
      hank: { name: "Hank", factor: 0.9144 * 720, symbol: "hnk" },
      spindle: { name: "Spindle", factor: 0.9144 * 14400, symbol: "spdl" },
      chain: { name: "Chain", factor: 0.9144 * 22, symbol: "ch" },
      link: { name: "Link", factor: 0.9144 * 0.22, symbol: "lnk" },
      rod: { name: "Rod", factor: 0.9144 * 5.5, symbol: "rod" },
      furlong: { name: "Furlong", factor: 0.9144 * 220, symbol: "fur" },
      mile: { name: "Mile", factor: 0.9144 * 1760, symbol: "mi" },
      league: { name: "League", factor: 0.9144 * 5280, symbol: "lea" },
      fathom: { name: "Fathom", factor: 1.852, symbol: "ftm" },
      cable: { name: "Cable", factor: 185.2, symbol: "cbl" },
      naut_mile: { name: "Nautical Mile", factor: 1852, symbol: "nmi" },
      astrounit: { name: "Astronomical Unit", factor: 149597870700, symbol: "AU" },
      parsec: { name: "Parsec", factor: 149597870700 * 180 * 60 * 60 / Math.PI, symbol: "AU" },
      light_year: { name: "Light Year", factor: 299792458 * 60 * 60 * 24 * 365.2425, symbol: "ly" },
      gaj: { name: "Gaj", factor: 0.9144, symbol: "gaj" },
      kos: { name: "Kos", factor: 0.9144 * 1760 * 2.25, symbol: "kos" },
      yojan: { name: "Yojan", factor: 0.9144 * 1760 * 9, symbol: "yojan" },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilogram", factor: 1, symbol: "kg" },
      gram: { name: "Gram", factor: 0.001, symbol: "g" },
      milligram: { name: "Milligram", factor: 1e-6, symbol: "mg" },
      microgram: { name: "Microgram", factor: 1e-9, symbol: "μg" },
      quintal: { name: "Quintal", factor: 100, symbol: "qui" },
      tonne: { name: "Tonne", factor: 1000, symbol: "t" },
      grain: { name: "Grain", factor: 0.0283495 / 437.5, symbol: "grn" },
      pennyweight: { name: "Pennyweight", factor: 0.024, symbol: "dwt"}, 
      troy_ounce: { name: "Troy Ounce", factor: 0.48, symbol: "ozt"}, 
      troy_pound: { name: "Troy Pound", factor: 5.76, symbol: "lbt"}, 
      dram: { name: "Dram", factor: 0.0283495 / 16, symbol: "dr" },
      ounce: { name: "Ounce", factor: 0.0283495, symbol: "oz" },
      pound: { name: "Pound", factor: 0.0283495 * 16, symbol: "lb" },
      stone: { name: "Stone", factor: 0.0283495 * 16 * 14, symbol: "st" },
      quarter: { name: "Quarter", factor: 0.0283495 * 16 * 28, symbol: "qtr" },
      short_hundredweight: { name: "Short Hundredweight", factor: 0.0283495 * 16 * 100, symbol: "scwt" },
      short_ton: { name: "Short Ton", factor: 0.0283495 * 16 * 2000, symbol: "ston" },
      long_hundredweight: { name: "Long Hundredweight", factor: 0.0283495 * 16 * 112, symbol: "lcwt" },
      long_ton: { name: "Long Ton", factor: 0.0283495 * 16 * 2240, symbol: "lton" },

      tola: { name: "Tola", factor: 0.01, symbol: "tola" },
      masha: { name: "Masha", factor: 0.01 / 12, symbol: "masha" },
      ratti: { name: "Ratti", factor: 0.01 / 96, symbol: "ratti" },
      seer: { name: "Seer", factor: 0.8, symbol: "seer" },
      maund: { name: "Maund", factor: 32, symbol: "maund" },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius", factor: 1, symbol: "°C" },
      fahrenheit: { name: "Fahrenheit", factor: 1, symbol: "°F" },
      kelvin: { name: "Kelvin", factor: 1, symbol: "K" },
      rankine: { name: "Rankine", factor: 1, symbol: "°Ra" },
      romer: { name: "Romer", factor: 1, symbol: "°Ro" },
      newton: { name: "Newton", factor: 1, symbol: "°N" },
      delisle: { name: "Delisle", factor: 1, symbol: "°D" },
      reaumur: { name: "Reaumur", factor: 1, symbol: "°Re" },
    },
  },
  volume: {
    name: "Volume",
    units: {
      liter: { name: "Liter", factor: 1, symbol: "L" },
      milliliter: { name: "Milliliter/Cubic Centimeter", factor: 0.001, symbol: "mL,cc,cu. cm" },
      cubic_meter: { name: "Cubic Meter", factor: 1000, symbol: "cu. m" },
      cubic_inch: { name: "Cubic Inch", factor: 0.254 ** 3, symbol: "cu. in" },
      cubic_foot: { name: "Cubic Foot", factor: 3.048 ** 3, symbol: "cu. ft" },
      cubic_yard: { name: "Cubic Yard", factor: 9.144 ** 3, symbol: "cu. yd" },
      acre_foot: { name: "Acre Foot", factor: (3.048 ** 3) * 43560, symbol: "acre ft" },
      mole_gas: { name: "Mole (Gas)", factor: 22.4, symbol: "mole" },
      
      gallon_uk: { name: "Gallon (UK)", factor: (0.254 ** 3) * 231 * 1.20095, symbol: "gal (UK)" },
      barrel_uk: { name: "Barrel (UK)", factor: (0.254 ** 3) * 231 * 1.20095 * 31.5, symbol: "bbl (UK)" },
      hogshead_uk: { name: "Hogshead (UK)", factor: (0.254 ** 3) * 231 * 1.20095 * 63, symbol: "hog (UK)" },
      pottle_uk: { name: "Pottle (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 2, symbol: "pot (UK)" },
      quart_uk: { name: "Quart (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 4, symbol: "qt (UK)" },
      pint_uk: { name: "Pint (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 8, symbol: "pt (UK)" },
      cup_uk: { name: "Cup (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 16, symbol: "c (UK)" },
      gill_uk: { name: "Gill (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 32, symbol: "gi (UK)" },
      jack_uk: { name: "Jack (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 64, symbol: "jack (UK)" },
      jig_shot_uk: { name: "Jig/Shot (UK)", factor: (0.254 ** 3) * 231 * 1.20095 * 1.5 / 128, symbol: "jig (UK)" },
      fluid_ounce_uk: { name: "Fluid Ounce (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 128, symbol: "fl. oz (UK)" },
      tablespoon_uk: { name: "Tablespoon (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 256, symbol: "tbsp (UK)" },
      teaspoon_uk: { name: "Teaspoon (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 768, symbol: "tsp (UK)" },
      fluid_dram_uk: { name: "Fluid Dram (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / 1024, symbol: "fl. dr (UK)" },
      minim_uk: { name: "Minim (UK)", factor: (0.254 ** 3) * 231 * 1.20095 / (1024 * 60), symbol: "min (UK)" },

      fluid_gallon_us: { name: "Fluid Gallon (US)", factor: (0.254 ** 3) * 231, symbol: "fl. gal (US)" },
      fluid_barrel_us: { name: "Fluid Barrel (US)", factor: (0.254 ** 3) * 231 * 31.5, symbol: "fl. bbl (US)" },
      oil_barrel_us: { name: "Oil Barrel (US)", factor: (0.254 ** 3) * 231 * 42, symbol: "oil bbl (US)" },
      fluid_hogshead_us: { name: "Fluid Hogshead (US)", factor: (0.254 ** 3) * 231 * 63, symbol: "fl. hog (US)" },
      fluid_pottle_us: { name: "Fluid Pottle (US)", factor: (0.254 ** 3) * 231 / 2, symbol: "fl. pot (US)" },
      fluid_quart_us: { name: "Fluid Quart (US)", factor: (0.254 ** 3) * 231 / 4, symbol: "fl. qt (US)" },
      fluid_pint_us: { name: "Fluid Pint (US)", factor: (0.254 ** 3) * 231 / 8, symbol: "fl. pt (US)" },
      fluid_cup_us: { name: "Fluid Cup (US)", factor: (0.254 ** 3) * 231 / 16, symbol: "fl. cup (US)" },
      fluid_gill_us: { name: "Fluid Gill (US)", factor: (0.254 ** 3) * 231 / 32, symbol: "fl. gi (US)" },
      fluid_jack_us: { name: "Fluid Jack (US)", factor: (0.254 ** 3) * 231 / 64, symbol: "fl. jack (US)" },
      fluid_jig_shot_us: { name: "Fluid Jig/Shot (US)", factor: (0.254 ** 3) * 231 * 1.5 / 128, symbol: "fl. jig (US)" },
      fluid_ounce_us: { name: "Fluid Ounce (US)", factor: (0.254 ** 3) * 231 / 128, symbol: "fl. oz (US)" },
      fluid_tablespoon_us: { name: "Fluid Tablespoon (US)", factor: (0.254 ** 3) * 231 / 256, symbol: "fl. tbsp (US)" },
      fluid_teaspoon_us: { name: "Fluid Teaspoon (US)", factor: (0.254 ** 3) * 231 / 768, symbol: "fl. tsp (US)" },
      fluid_dram_us: { name: "Fluid Dram (US)", factor: (0.254 ** 3) * 231 / 1024, symbol: "fl. dr (US)" },
      fluid_minim_us: { name: "Fluid Minim (US)", factor: (0.254 ** 3) * 231 / (1024 * 60), symbol: "fl. min (US)" },
      
      dry_barrel_us: { name: "Dry Barrel (US)", factor: (0.254 ** 3) * 7056, symbol: "dry bbl (US)" },
      dry_bushel_us: { name: "Dry Bushel (US)", factor: (0.254 ** 3) * 7056 * 8 / 26.25, symbol: "dry bu (US)" },
      dry_peck_us: { name: "Dry Peck (US)", factor: (0.254 ** 3) * 7056 * 2 / 26.25, symbol: "dry pk (US)" },
      dry_gallon_us: { name: "Dry Gallon (US)", factor: (0.254 ** 3) * 7056 / 26.25, symbol: "dry gal (US)" },
      dry_pottle_us: { name: "Dry Pottle (US)", factor: (0.254 ** 3) * 7056 / 52.5, symbol: "dry pot (US)" },
      dry_quart_us: { name: "Dry Quart (US)", factor: (0.254 ** 3) * 7056 / 105, symbol: "dry qt (US)" },
      dry_pint_us: { name: "Dry Pint (US)", factor: (0.254 ** 3) * 7056 / 210, symbol: "dry pt (US)" },
    },
  },
  time: {
    name: "Time",
    units: {
      second: { name: "Second", factor: 1, symbol: "s" },
      millisecond: { name: "Millisecond", factor: 1e-3, symbol: "ms" },
      microsecond: { name: "Microsecond", factor: 1e-6, symbol: "μs" },
      shake: { name: "Shake", factor: 1e-8, symbol: "shake" },
      nanosecond: { name: "Nanosecond", factor: 1e-9, symbol: "ns" },
      picosecond: { name: "Picosecond", factor: 1e-12, symbol: "ps" },
      moment: { name: "Moment", factor: 90, symbol: "mmt" },
      minute: { name: "Minute", factor: 60, symbol: "min" },
      hour: { name: "Hour", factor: 3600, symbol: "h" },
      day: { name: "Day", factor: 86400, symbol: "d" },
      week: { name: "Week", factor: 604800, symbol: "wk" },
      fortnight: { name: "Fortnight", factor: 1209600, symbol: "fnt" },
      lunar_month: { name: "Lunar Month", factor: 86400 * 29.5, symbol: "lun mo" },
      month: { name: "Month", factor: 86400 * 365.2425 / 12, symbol: "mo" },
      lunar_year: { name: "Lunar Year", factor: 86400 * 354, symbol: "lun yr" },
      common_year: { name: "Common Year", factor: 86400 * 365, symbol: "com yr" },
      year: { name: "Gregorian Year", factor: 86400 * 365.2425, symbol: "yr" },
      leap_year: { name: "Leap Year", factor: 86400 * 366, symbol: "l yr" },
      olympiad: { name: "Olympiad", factor: 86400 * 1461, symbol: "ol" },
      decade: { name: "Decade", factor: 86400 * 3652.425, symbol: "dec" },
      silver_jubilee: { name: "Silver Jubilee", factor: 86400 * 365.2425 * 25, symbol: "slv jb" },
      golden_jubilee: { name: "Golden Jubilee", factor: 86400 * 365.2425 * 50, symbol: "gld jb" },
      diamond_jubilee: { name: "Diamond Jubilee", factor: 86400 * 365.2425 * 60, symbol: "dia jb" },
      platinum_jubilee: { name: "Platinum Jubilee", factor: 86400 * 365.2425 * 75, symbol: "plt jb" },
      century: { name: "Century", factor: 86400 * 36524.25, symbol: "cent" },
      millenium: { name: "Millenium", factor: 86400 * 365242.5, symbol: "mill" },
      eon: { name: "Eon", factor: 86400 * 365.2425e9, symbol: "eon" },
      
      truti: { name: "Truti", factor: 1 / (324e5), symbol: "truti" },
      renu: { name: "Renu", factor: 1 / (54e4), symbol: "renu" },
      lav: { name: "Lav", factor: 1 / 9000.0, symbol: "lav" },
      likshak: { name: "Likshak", factor: 1 / 150.0, symbol: "likshak" },
      vipal_lipta: { name: "Vipal/Lipta", factor: 0.4, symbol: "lipta" },
      pran: { name: "Pran", factor: 4, symbol: "pran" },
      vighati_vinadi_pal: { name: "Vighati/Vinadi/Pal", factor: 24, symbol: "pal" },
      ghati_nadi_danda: { name: "Ghati/Nadi/Danda", factor: 1440, symbol: "ghati" },
      muhurta_kshana: { name: "Muhurta/Kshana", factor: 2880, symbol: "muh" },
      
      surya_truti: { name: "Surya Truti", factor: 1.6 / (18 * 30 * 100), symbol: "s. truti"},
      tatpara: { name: "Tatpara", factor: 1.6 / (18 * 30), symbol: "tat"},
      nimesha: { name: "Nimesha", factor: 1.6 / 18, symbol: "nim"},
      kaashtha: { name: "Kaashta", factor: 1.6, symbol: "ksht"},
      kala: { name: "Kala", factor: 48, symbol: "kala"},

      paramanu: { name: "Vedic Lava", factor: 1.28 / 48600, symbol: "v. ksht"},
      anu: { name: "Vedic Lava", factor: 1.28 / 24300, symbol: "v. ksht"},
      trasarenu: { name: "Trasarenu", factor: 1.28 / 8100, symbol: "v. ksht"},
      vedic_truti: { name: "Vedic Truti", factor: 1.28 / 2700, symbol: "v. truti"},
      vedha: { name: "Vedha", factor: 1.28 / 27, symbol: "vedha"},
      vedic_lava: { name: "Vedic Lava", factor: 1.28 / 9, symbol: "v. ksht"},
      vedic_nimesha: { name: "Vedic Nimesha", factor: 1.28 / 3, symbol: "v. ksht"},
      vedic_kshana: { name: "Vedic Kshana", factor: 1.28, symbol: "v. kshn"},
      vedic_kaashtha: { name: "Vedic Kaashtha", factor: 6.4, symbol: "v. ksht"},
      laghu: { name: "Laghu", factor: 96, symbol: "laghu"}, 

      yaama: { name: "Yaama", factor: 10800, symbol: "yaam"},
      ahoratram_tithi: { name: "Ahoratram/Tithi", factor: 86400, symbol: "d" },
      paksha: { name: "Paksha", factor: 86400 * 14.75, symbol: "pksh" },
      hindu_month: { name: "Hindu Month", factor: 86400 * 29.5, symbol: "mo"},
      ritu: { name: "Ritu", factor: 86400 * 59, symbol: "ritu"},
      aayana: { name: "Aayana", factor: 86400 * 177, symbol: "aayana"},
      hindu_year: { name: "Hindu Year", factor: 86400 * 354, symbol: "yr"},
      kalpa: { name: "Kalpa", factor: 86400 * 354 * 4.32e9, symbol: "klp"}
    },
  },
  energy: {
    name: "Energy",
    units: {
      joule: { name: "Joule", factor: 1, symbol: "J" },
      erg: { name: "Erg", factor: 1e-7, symbol: "erg"},
      kilojoule: { name: "Kilojoule", factor: 1000, symbol: "kJ" },
      calorie: { name: "Calorie", factor: 4.184, symbol: "cal" },
      kilocalorie: { name: "Kilocalorie", factor: 4184, symbol: "kcal" },
      milliwatt_hour: { name: "Milliwatt Hour", factor: 3.6, symbol: "mWh" },
      watt_hour: { name: "Watt Hour", factor: 3.6e3, symbol: "Wh" },
      kilowatt_hour: { name: "Kilowatt Hour", factor: 3.6e6, symbol: "kWh" },
      megawatt_hour: { name: "Megawatt Hour", factor: 3.6e9, symbol: "MWh" },
      gigawatt_hour: { name: "Gigawatt Hour", factor: 3.6e12, symbol: "GWh" },
      btu: { name: "BTU", factor: 1055.06, symbol: "BTU" },
      electron_volt: { name: "Electron Volt", factor: 1.602e-19, symbol: "eV" },
    },
  },
  angle: {
    name: "Angle",
    units: {
      degree: { name: "Degree", factor: 1, symbol: "°" },
      radian: { name: "Radian", factor: 180 / Math.PI, symbol: "rad" },
      gradian: { name: "Gradian", factor: 0.9, symbol: "grad" },
      sign: { name: "Sign", factor: 30, symbol: "sign" },
      octant: { name: "Octant", factor: 45, symbol: "oct" },
      hextant: { name: "Sextant", factor: 60, symbol: "hex" },
      quadrant: { name: "Quadrant", factor: 90, symbol: "quad" },
      turn: { name: "Turn", factor: 360, symbol: "turn" },
      mil_nato: { name: "Mil (NATO)", factor: 0.05625, symbol: "mil"},
      mil_soviet_union: { name: "Mil (Soviet Union)", factor: 0.06, symbol: "mil"},
      mil_sweden: { name: "Mil (Sweden)", factor: 4.0 / 70, symbol: "mil"},
      arcminute: { name: "Arcminute", factor: 1 / 60.0, symbol: "\'" },
      arcsecond: { name: "Arcsecond", factor: 1 / 3600.0, symbol: "\"" },
    },
  },
  area: {
    name: "Area",
    units: {
      square_meter: { name: "Square Meter", factor: 1, symbol: "sq. m" },
      square_kilometer: { name: "Square Kilometer", factor: 1e6, symbol: "sq. km" },
      square_centimeter: { name: "Square Centimeter", factor: 1e-4, symbol: "sq. cm" },
      square_millimeter: { name: "Square Millimeter", factor: 1e-6, symbol: "sq. mm" },
      barn: { name: "Barn", factor: 1e-28, symbol: "barn" },
      perch: { name: "Perch", factor: (0.9144 ** 2) * 30.25, symbol: "perch" },
      rood: { name: "Rood", factor: (0.9144 ** 2) * 1210, symbol: "rood" },
      guntha: { name: "Guntha", factor: (0.9144 ** 2) * 121, symbol: "guntha" },
      acre: { name: "Acre", factor: (0.9144 ** 2) * 4840, symbol: "acre" },
      square_chain: { name: "Square Chain", factor: (0.9144 ** 2) * 484, symbol: "sq. ch" },
      survey_township: { name: "Survey Township", factor: (0.9144 * 10560) ** 2, symbol: "twp" },
      square_league: { name: "Square League", factor: (0.9144 * 5280) ** 2, symbol: "sq. lea" },
      square_mile: { name: "Square Mile / Section", factor: (0.9144 * 1760) ** 2, symbol: "sq. mile" },
      square_yard: { name: "Square Yard", factor: 0.9144 ** 2, symbol: "sq. yd" },
      square_foot: { name: "Square Foot", factor: 0.3048 ** 2, symbol: "sq. ft" },
      square_inch: { name: "Square Inch", factor: 0.0254 ** 2, symbol: "sq. in" },
      square_mil: { name: "Square Mil", factor: (0.0254 ** 2) * 1e-6, symbol: "sq. in" },
      are: { name: "Are", factor: 100, symbol: "are" },
      hectare: { name: "Hectare", factor: 10000, symbol: "ha" },
    },
  },
  data: {
    name: "Data",
    units: {
      byte: { name: "Byte", factor: 1, symbol: "B" },
      word: { name: "Word", factor: 2, symbol: "Wd" },
      dword: { name: "QWord", factor: 4, symbol: "DWd" },
      qword: { name: "DWord", factor: 8, symbol: "QWd" },
      kilobyte: { name: "Kilobyte", factor: 2 ** 10, symbol: "KB" },
      megabyte: { name: "Megabyte", factor: 2 ** 20, symbol: "MB" },
      gigabyte: { name: "Gigabyte", factor: 2 ** 30, symbol: "GB" },
      terabyte: { name: "Terabyte", factor: 2 ** 40, symbol: "TB" },
      petabyte: { name: "Petabyte", factor: 2 ** 50, symbol: "PB" },
      exabyte: { name: "Exabyte", factor: 2 ** 60, symbol: "EB" },
      zettabyte: { name: "Zettabyte", factor: 2 ** 70, symbol: "ZB" },
      yottabyte: { name: "Yottabyte", factor: 2 ** 80, symbol: "YB" },
      bit: { name: "Bit", factor: 0.125, symbol: "bit" },
      nibble: { name: "Nibble", factor: 0.5, symbol: "nibble" },
      kilobit: { name: "Kilobit", factor: 2 ** 7, symbol: "Kbit" },
      megabit: { name: "Megabit", factor: 2 ** 17, symbol: "Mbit" },
      gigabit: { name: "Gigabit", factor: 2 ** 27, symbol: "Gbit" },
      terabit: { name: "Terabit", factor: 2 ** 37, symbol: "Tbit" },
      petabit: { name: "Petabit", factor: 2 ** 47, symbol: "Pbit" },
      exabit: { name: "Exabit", factor: 2 ** 57, symbol: "Ebit" },
      zettabit: { name: "Zettabit", factor: 2 ** 67, symbol: "Zbit" },
      yottabit: { name: "Yottabit", factor: 2 ** 77, symbol: "Ybit" },
    },
  },
  density: {
    name: "Density",
    units: {
      kg_per_m3: { name: "Kilogram per Cubic Meter", factor: 1, symbol: "kg/m³" },
      g_per_cm3: { name: "Gram per Cubic Centimeter", factor: 1000, symbol: "g/cm³" },
      lb_per_ft3: { name: "Pound per Cubic Foot", factor: (0.0283495 * 16)/(0.3048 ** 3), symbol: "lb/ft³" },
      oz_per_in3: { name: "Ounce per Cubic Inch", factor: 0.0283495/(0.0254 ** 3), symbol: "oz/in³" },
      kg_per_l: { name: "Kilogram per Liter", factor: 1000, symbol: "kg/L" },
    },
  },
  force: {
    name: "Force",
    units: {
      newton: { name: "Newton", factor: 1, symbol: "N" },
      kilonewton: { name: "Kilonewton", factor: 1000, symbol: "kN" },
      pound_force: { name: "Pound-force", factor: 9.08665 * (0.0283495 * 16), symbol: "lbf" },
      ounce_force: { name: "Ounce-force", factor: 9.08665 * 0.0283495, symbol: "ozf" },
      dyne: { name: "Dyne", factor: 0.00001, symbol: "dyn" },
      gram_force: { name: "Gram-force", factor: 9.80665e-3, symbol: "gf" },
      kilogram_force: { name: "Kilogram-force", factor: 9.80665, symbol: "kgf" },
    },
  },
  units: {
    name: "Units",
    units: {
      piece: { name: "Piece", factor: 1, symbol: "pc" },
      dozen: { name: "Dozen", factor: 12, symbol: "dz" },
      gross: { name: "Gross", factor: 144, symbol: "gr" },
      great_gross: { name: "Great Gross", factor: 1728, symbol: "ggr" },
      score: { name: "Score", factor: 20, symbol: "score" },
      mole: { name: "Mole", factor: 6.023e23, symbol: "mole" },
    },
  },
  speed: {
    name: "Speed",
    units: {
      meter_per_second: { name: "Meter per Second", factor: 1, symbol: "m/s" },
      kilometer_per_hour: { name: "Kilometer per Hour", factor: 1 / 3.6, symbol: "km/h" },
      mile_per_hour: { name: "Mile per Hour", factor: (0.0254 * 12 * 3 * 1760) / 3600, symbol: "mph" },
      knot: { name: "Knot", factor: 1.852 / 3.6, symbol: "kn" },
      foot_per_second: { name: "Foot per Second", factor: 0.3048, symbol: "ft/s" },
    },
  },
  power: {
    name: "Power",
    units: {
      watt: { name: "Watt", factor: 1, symbol: "W" },
      kilowatt: { name: "Kilowatt", factor: 1000, symbol: "kW" },
      megawatt: { name: "Megawatt", factor: 1e6, symbol: "MW" },
      gigawatt: { name: "Gigawatt", factor: 1e9, symbol: "GW" },
      horsepower: { name: "Horsepower", factor: 746, symbol: "hp" },
      btu_per_hour: { name: "BTU per Hour", factor: 0.293072, symbol: "BTU/h" },
      calorie_per_second: { name: "Calorie per Second", factor: 4.184, symbol: "cal/s" },
    },
  },
  pressure: {
    name: "Pressure",
    units: {
      pascal: { name: "Pascal", factor: 1, symbol: "Pa" },
      kilopascal: { name: "Kilopascal", factor: 1000, symbol: "kPa" },
      bar: { name: "Bar", factor: 100000, symbol: "bar" },
      atmosphere: { name: "Atmosphere", factor: 101325, symbol: "atm" },
      psi: { name: "Pound per Square Inch", factor: 6894.76, symbol: "psi" },
      torr_mmhg: { name: "Torr / Mercury Millimeter", factor: 133.322, symbol: "Torr, mmHg" },
    },
  },
  frequency: {
    name: "Frequency",
    units: {
      hertz: { name: "Hertz", factor: 1, symbol: "Hz" },
      kilohertz: { name: "Kilohertz", factor: 1000, symbol: "kHz" },
      megahertz: { name: "Megahertz", factor: 1000000, symbol: "MHz" },
      gigahertz: { name: "Gigahertz", factor: 1000000000, symbol: "GHz" },
      terahertz: { name: "Terahertz", factor: 1000000000000, symbol: "THz" },
      rpm: { name: "Revolutions per Minute", factor: 1 / 60, symbol: "rpm" },
    },
  },
  sound: {
    name: "Sound Level",
    units: {
      decibel: { name: "Decibel", factor: 1, symbol: "dB" },
      bel: { name: "Bel", factor: 10, symbol: "B" },
      neper: { name: "Neper", factor: 20 * Math.log10(Math.E), symbol: "Np" },
    },
  },
  illuminance: {
    name: "Illuminance",
    units: {
      lux: { name: "Lux", factor: 1, symbol: "lx" },
      foot_candle: { name: "Foot-candle", factor: 10.764, symbol: "fc" },
      phot: { name: "Phot", factor: 10000, symbol: "ph" },
      nox: { name: "Nox", factor: 0.001, symbol: "nox" },
    },
  },
}

interface UnitConverterProps {
  category: string
}

export function UnitConverter({ category }: UnitConverterProps) {
  const selectedCategory = category
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [result, setResult] = useState("")
  const [recentConversions, setRecentConversions] = useState<string[]>([])

  useEffect(() => {
    if (unitCategories[selectedCategory]) {
      const units = Object.keys(unitCategories[selectedCategory].units)
      setFromUnit(units[0])
      setToUnit(units[1] || units[0])
      setInputValue("")
      setResult("")
      setRecentConversions([])
    }
  }, [selectedCategory])

  const convertValue = (value: number, from: string, to: string, category: string): number => {
    if (category === "temperature") {
      // Special handling for temperature conversions
      if (from === "celsius") {
        switch (to) {
          case "fahrenheit":
            return (value * 1.8) + 32;
        
          case "kelvin":
            return value + 273.15;
        
          case "rankine":
            return (value + 273.15) * 1.8;
        
          case "romer":
            return (value * 0.525) + 7.5;
        
          case "newton":
            return (value * 0.33);
        
          case "delisle":
            return (100 - value) * 1.5;
        
          case "reaumur":
            return (value * 0.8);
        
          default:
            return value;
        }
      } else if (to === "celsius") {
        switch (from) {
          case "fahrenheit":
            return (value - 32) / 1.8;
        
          case "kelvin":
            return value - 273.15;
        
          case "rankine":
            return (value / 1.8) - 273.15;
        
          case "romer":
            return (value - 7.5) / 0.525;
        
          case "newton":
            return (value / 0.33);
        
          case "delisle":
            return (100 - (value / 1.5));
        
          case "reaumur":
            return (value / 0.8);
        
          default:
            return value;
        }
      } 
      else {
        var temp = convertValue(value, from, "celsius", "temperature");
        return convertValue(temp, "celsius", to, "temperature");
      }
    } else {
      // Standard factor-based conversion
      const fromFactor = unitCategories[category].units[from].factor
      const toFactor = unitCategories[category].units[to].factor
      return (value * fromFactor) / toFactor
    }
  }

  useEffect(() => {
    if (inputValue && !isNaN(Number(inputValue)) && fromUnit && toUnit) {
      const converted = convertValue(Number(inputValue), fromUnit, toUnit, selectedCategory)
      setResult(converted.toFixed(10).replace(/\.?0+$/, ""))

      // Add to recent conversions
      const conversion = `${inputValue} ${unitCategories[selectedCategory].units[fromUnit].symbol} = ${converted.toFixed(2)} ${unitCategories[selectedCategory].units[toUnit].symbol}`
      setRecentConversions((prev) => [conversion, ...prev.slice(0, 4)])
    } else {
      setResult("")
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setInputValue(inputValue)
  }

  if (!unitCategories[selectedCategory]) {
    return (
      <Card className="border-2 border-destructive/20">
        <CardContent className="p-8 text-center">
          <p className="text-destructive">Category "{selectedCategory}" not found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Converter */}
      <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            {unitCategories[selectedCategory].name} Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {/* From Unit */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">From</label>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="text-lg min-h-12 w-full break-all"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitCategories[selectedCategory].units).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="h-12 w-12 rounded-full border-2 border-primary/20 hover:border-primary/40 bg-transparent"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">To</label>
              <div className="space-y-2">
                <div className="min-h-12 px-3 py-2 bg-muted rounded-md border flex items-center text-lg font-mono w-full break-all">
                  <span
                    className="w-full"
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {result || "0"}
                  </span>
                </div>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitCategories[selectedCategory].units).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name} ({unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary break-all">
                  <span
                    className="inline-block w-full"
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {inputValue} {unitCategories[selectedCategory].units[fromUnit].symbol} = {result}{" "}
                    {unitCategories[selectedCategory].units[toUnit].symbol}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
