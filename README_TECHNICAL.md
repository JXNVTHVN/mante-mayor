# Titan Maintenance System (Titan Ops) - Full Documentation

## 🚀 Tecnologías Principales
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Base de Datos**: SQLite con Prisma ORM (v6.2.1)
- **Autenticación**: NextAuth.js v4 + Bcrypt
- **UI Engine**: Framer Motion + Recharts + Lucide Icons

## 🏷️ Arquitectura de Datos
- **Equipment**: Gestión de horómetro y estados operativos.
- **WorkOrder**: Ciclo de vida de mantenimiento con prioridades 1-4.
- **Part**: Inventario con alertas automáticas de reorden.
- **MaintenanceLog**: Historial inmutable para cumplimiento y auditoría.

## 🏗️ Patrones de Diseño (High-End UX)
- **Glassmorphism**: Estética moderna basada en desenfoques y transparencias.
- **Side Drawers**: Gestión de datos sin pérdida de contexto (Formularios laterales).
- **Server Actions**: Mutaciones de datos seguras y ultra-rápidas directamente al servidor.

## 🔒 Capas de Seguridad
- Middleware global de protección de rutas (`proxy.ts`).
- Validación de sesiones en Server Components y Server Actions.
- Cifrado de contraseñas con factor de coste industrial.

## 🛠️ Guía de DevOps y Mantenimiento
- **Actualizar Modelos**: `npx prisma generate`
- **Reset de Datos**: `npx prisma db push --force-reset` seguido de `npx prisma db seed`.
- **Inspección Visual de BD**: `npx prisma studio`.

---
*Documentación técnica avanzada generada por Antigravity.*
