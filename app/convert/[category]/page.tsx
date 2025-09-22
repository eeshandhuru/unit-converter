import { notFound } from "next/navigation"
import { UnitConverter } from "@/components/unit-converter"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
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

const categories = {
  length: {
    title: "Length Converter",
    description: "Convert between different length measurements",
  },
  weight: {
    title: "Weight Converter",
    description: "Convert between different weight measurements",
  },
  temperature: {
    title: "Temperature Converter",
    description: "Convert between different temperature scales",
  },
  volume: {
    title: "Volume Converter",
    description: "Convert between different volume measurements",
  },
  time: {
    title: "Time Converter",
    description: "Convert between different time mesaurements",
  },
  energy: {
    title: "Energy Converter",
    description: "Convert between different energy measurements",
  },
  angle: {
    title: "Angle Converter",
    description: "Convert between different angle measurements",
  },
  area: {
    title: "Area Converter",
    description: "Convert between different area measurements",
  },
  data: {
    title: "Data Converter",
    description: "Convert between different data storage measurements",
  },
  density: {
    title: "Density Converter",
    description: "Convert between different density measurements",
  },
  force: {
    title: "Force Converter",
    description: "Convert between different force measurements",
  },
  units: {
    title: "Unitary Converter",
    description: "Convert between different unitary measurements",
  },
  speed: {
    title: "Speed Converter",
    description: "Convert between different speed measurements",
  },
  power: {
    title: "Power Converter",
    description: "Convert between different power measurements",
  },
  pressure: {
    title: "Pressure Converter",
    description: "Convert between different pressure measurements",
  },
  frequency: {
    title: "Frequency Converter",
    description: "Convert between different frequency measurements",
  },
  sound: {
    title: "Sound Level Converter",
    description: "Convert between different sound level mesurements",
  },
  illuminance: {
    title: "Illuminance Converter",
    description: "Convert between different illuminance measurements",
  },
}

interface PageProps {
  params: {
    category: string
  }
}


export async function generateMetadata({ params }: PageProps) {
  const category = categories[params.category as keyof typeof categories]

  if (!category) {
    return {
      title: "Category Not Found - Smart Unit Converter",
    }
  }

  
  const iconComponents = {
    length: Ruler,
    weight: Weight,
    temperature: Thermometer,
    volume: Beaker,
    time: Clock,
    energy: Zap,
    angle: RotateCcw,
    area: Square,
    data: HardDrive,
    density: Layers,
    force: Fence,
    units: Hash,
    speed: Gauge,
    power: Battery,
    pressure: BarChart3,
    frequency: SineWaveIcon,
    sound: Volume2,
    illuminance: Lightbulb,
  }

  const iconSvgMap: Record<string, string> = {
    length:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z'/%3E%3Cpath d='m14.5 12.5 2-2'/%3E%3Cpath d='m11.5 9.5 2-2'/%3E%3Cpath d='m8.5 6.5 2-2'/%3E%3Cpath d='m17.5 15.5 2-2'/%3E%3C/svg%3E",
    weight:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Ccircle cx='12' cy='5' r='3'/%3E%3Cpath d='m6.5 15 a7.5 7.5 0 0 0 11 0'/%3E%3Cpath d='m12 8 v4'/%3E%3C/svg%3E",
    temperature:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'/%3E%3C/svg%3E",
    volume:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M5 13V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7'/%3E%3Cpath d='M5 13l4 6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l4-6'/%3E%3Cpath d='M9 5V3'/%3E%3Cpath d='M15 5V3'/%3E%3C/svg%3E",
    time: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpolyline points='12,6 12,12 16,14'/%3E%3C/svg%3E",
    energy:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpolygon points='13,2 3,14 12,14 11,22 21,10 12,10 13,2'/%3E%3C/svg%3E",
    angle:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'/%3E%3Cpath d='M3 3v5h5'/%3E%3C/svg%3E",
    area: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Crect width='18' height='18' x='3' y='3' rx='2'/%3E%3C/svg%3E",
    data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cline x1='22' x2='2' y1='12' y2='12'/%3E%3Cpath d='M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z'/%3E%3Cline x1='6' x2='6.01' y1='16' y2='16'/%3E%3Cline x1='10' x2='10.01' y1='16' y2='16'/%3E%3C/svg%3E",
    density:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'/%3E%3Cpath d='M2 17l10 5 10-5'/%3E%3Cpath d='M2 12l10 5 10-5'/%3E%3C/svg%3E",
    force:
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z'/%3E%3Cpath d='M6 8h4'/%3E%3Cpath d='M6 18h4'/%3E%3Cpath d='m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z'/%3E%3Cpath d='M14 8h4'/%3E%3Cpath d='M14 18h4'/%3E%3Cpath d='m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z'/%3E%3C/svg%3E",
    units:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M4 9h16'/%3E%3Cpath d='M4 15h16'/%3E%3Cpath d='M10 3L8 21'/%3E%3Cpath d='M16 3l-2 18'/%3E%3C/svg%3E",
    speed:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M3 18v-6a9 9 0 0 1 18 0v6'/%3E%3Cpath d='M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2'/%3E%3Cpath d='M9 12l2 2 4-4'/%3E%3C/svg%3E",
    power:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Crect width='16' height='10' x='2' y='7' rx='2' ry='2'/%3E%3Cline x1='22' x2='22' y1='11' y2='13'/%3E%3Cline x1='6' x2='6' y1='11' y2='13'/%3E%3Cline x1='10' x2='10' y1='11' y2='13'/%3E%3Cline x1='14' x2='14' y1='11' y2='13'/%3E%3C/svg%3E",
    pressure:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M3 3v18h18'/%3E%3Cpath d='M18 17V9'/%3E%3Cpath d='M13 17V5'/%3E%3Cpath d='M8 17v-3'/%3E%3C/svg%3E",
    frequency:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M2 12h4l3-9 6 18 3-9h4'/%3E%3C/svg%3E",
    sound:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpolygon points='11,5 6,9 2,9 2,15 6,15 11,19 11,5'/%3E%3Cpath d='M15.54 8.46a5 5 0 0 1 0 7.07'/%3E%3Cpath d='M19.07 4.93a10 10 0 0 1 0 14.14'/%3E%3C/svg%3E",
    illuminance:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'/%3E%3Cpath d='M9 18h6'/%3E%3Cpath d='M10 22h4'/%3E%3C/svg%3E",
  }

  return {
    title: `${category.title} - Smart Unit Converter`,
    description: category.description,
    icons: {
      icon: iconSvgMap[params.category],
    },
  }
}

export default function ConvertPage({ params }: PageProps) {
  const category = categories[params.category as keyof typeof categories]

  if (!category) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-balance mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {category.title}
            </h1>
            <p className="text-muted-foreground text-lg">{category.description}</p>
          </div>
        </div>

        <UnitConverter category={params.category} />
      </div>
    </main>
  )
}
