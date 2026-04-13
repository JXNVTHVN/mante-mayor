const { PrismaClient } = require('@prisma/client')
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
const Database = require('better-sqlite3')
const bcrypt = require('bcryptjs')
const path = require('path')

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const db = new Database(dbPath)
const adapter = new PrismaBetterSqlite3(db)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Starting seed...')
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
  await prisma.equipment.upsert({
    where: { serialNumber: 'CAT320GC001' },
    update: {},
    create: {
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
  })

  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error('Seed Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    try { await prisma.$disconnect() } catch(e) {}
  })
