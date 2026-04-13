import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed (Prisma 6 Standard)...')
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // 1. Create Users
  await prisma.user.upsert({
    where: { email: 'admin@titan.com' },
    update: {},
    create: {
      email: 'admin@titan.com',
      name: 'Administrador Titan',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // 2. Create Equipment
  const equipmentData = [
    {
      name: 'Excavadora Hidráulica',
      brand: 'Caterpillar',
      model: '320 GC',
      serialNumber: 'CAT320GC001',
      year: 2022,
      status: 'OPERATIONAL',
      currentHours: 12450.5,
      latitude: 19.4326,
      longitude: -99.1332,
    },
    {
      name: 'Bulldozer',
      brand: 'Komatsu',
      model: 'D65EX-18',
      serialNumber: 'KOMD65002',
      year: 2021,
      status: 'MAINTENANCE',
      currentHours: 8200.0,
      latitude: 19.4350,
      longitude: -99.1400,
    },
  ]

  for (const eq of equipmentData) {
    await prisma.equipment.upsert({
      where: { serialNumber: eq.serialNumber },
      update: {},
      create: eq,
    })
  }

  // 3. Create Spare Parts (Inventory)
  const partsData = [
    {
      name: 'Filtro de Aceite CAT',
      partNumber: '1R-1808',
      description: 'Filtro de aceite de motor para serie 320',
      stock: 12,
      minStock: 5,
      price: 45.50,
    },
    {
      name: 'Manguera Hidráulica 1/2"',
      partNumber: 'H-500-12',
      description: 'Manguera de alta presión reforzada',
      stock: 3,
      minStock: 10,
      price: 120.00,
    },
    {
      name: 'Sensor de Presión',
      partNumber: 'S-9921',
      description: 'Sensor de presión de bomba principal',
      stock: 2,
      minStock: 2,
      price: 340.00,
    },
    {
      name: 'Aceite Hidráulico SAE 10W',
      partNumber: 'OIL-10W-B',
      description: 'Cubeta de 19L de aceite hidráulico',
      stock: 25,
      minStock: 8,
      price: 110.00,
    },
  ]

  for (const p of partsData) {
    await prisma.part.upsert({
      where: { partNumber: p.partNumber },
      update: {},
      create: p,
    })
  }

  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error('Seed Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
