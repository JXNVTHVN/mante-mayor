import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EquipmentClient from '@/components/equipment/EquipmentClient';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const EquipmentListPage = async () => {
  const equipment = await prisma.equipment.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <DashboardLayout title="Gestión de Equipos">
      <EquipmentClient initialEquipment={equipment} />
    </DashboardLayout>
  );
};

export default EquipmentListPage;
