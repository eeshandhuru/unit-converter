import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Ruler,
  Weight,
  Thermometer,
  Beaker,
  Clock,
  Zap,
  RotateCcw,
  Square,
  HardDrive,
  Layers,
  Fence,
  Hash,
  Gauge,
  Battery,
  BarChart3,
  Volume2,
  Lightbulb,
} from "lucide-react"
import { SineWaveIcon } from "@/components/sine-wave-icon"

const categories = [
  {
    id: "length",
    title: "Length",
    description: "Convert between meters, feet, inches, and more",
    icon: Ruler,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "weight",
    title: "Weight",
    description: "Convert between kilograms, pounds, ounces, and more",
    icon: Weight,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "temperature",
    title: "Temperature",
    description: "Convert between Celsius, Fahrenheit, and Kelvin",
    icon: Thermometer,
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "volume",
    title: "Volume",
    description: "Convert between liters, gallons, cups, and more",
    icon: Beaker,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "time",
    title: "Time",
    description: "Convert between seconds, minutes, hours, and more",
    icon: Clock,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: "energy",
    title: "Energy",
    description: "Convert between joules, calories, watts, and more",
    icon: Zap,
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    id: "angle",
    title: "Angle",
    description: "Convert between degrees, radians, gradians, and more",
    icon: RotateCcw,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    id: "area",
    title: "Area",
    description: "Convert between square meters, acres, hectares, and more",
    icon: Square,
    gradient: "from-lime-500 to-green-500",
  },
  {
    id: "data",
    title: "Data",
    description: "Convert between bytes, kilobytes, megabytes, and more",
    icon: HardDrive,
    gradient: "from-slate-500 to-gray-500",
  },
  {
    id: "density",
    title: "Density",
    description: "Convert between kg/m³, g/cm³, lb/ft³, and more",
    icon: Layers,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "force",
    title: "Force",
    description: "Convert between newtons, pounds-force, dynes, and more",
    icon: Fence,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: "units",
    title: "Units",
    description: "Convert between dozen, gross, score, and more",
    icon: Hash,
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    id: "speed",
    title: "Speed",
    description: "Convert between m/s, km/h, mph, knots, and more",
    icon: Gauge,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "power",
    title: "Power",
    description: "Convert between watts, horsepower, BTU/h, and more",
    icon: Battery,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "pressure",
    title: "Pressure",
    description: "Convert between pascals, bar, psi, atm, and more",
    icon: BarChart3,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "frequency",
    title: "Frequency",
    description: "Convert between hertz, kilohertz, megahertz, and more",
    icon: SineWaveIcon,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "sound",
    title: "Sound Level",
    description: "Convert between decibels, bels, nepers, and more",
    icon: Volume2,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "illuminance",
    title: "Illuminance",
    description: "Convert between lux, foot-candles, phots, and more",
    icon: Lightbulb,
    gradient: "from-yellow-400 to-orange-400",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-balance mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Smart Unit Converter
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Choose a category to start converting between different units with intelligent suggestions and real-time
            calculations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={`/convert/${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      Click to convert →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
