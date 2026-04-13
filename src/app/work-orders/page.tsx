import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WorkOrdersClient from '@/components/work-orders/WorkOrdersClient';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const WorkOrdersPage = async () => {
  // Fetch Work Orders with relationships
  const workOrders = await prisma.workOrder.findMany({
    include: {
      equipment: true,
      assignedTo: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  // Fetch Equipment list for the creation form
  const equipmentList = await prisma.equipment.findMany({
    select: {
      id: true,
      name: true,
      serialNumber: true,
    },
    orderBy: { name: 'asc' }
  });

  return (
    <DashboardLayout title="Órdenes de Trabajo">
      <WorkOrdersClient 
        initialWorkOrders={workOrders} 
        equipmentList={equipmentList} 
      />
    </DashboardLayout>
  );
};

export default WorkOrdersPage;
