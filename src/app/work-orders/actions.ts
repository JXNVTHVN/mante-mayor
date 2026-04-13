'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createWorkOrder(formData: FormData) {
  const equipmentId = formData.get('equipmentId') as string;
  const description = formData.get('description') as string;
  const priority = parseInt(formData.get('priority') as string);
  const status = 'PENDING';

  // Generate a professional WO number
  const count = await prisma.workOrder.count();
  const orderNumber = `WO-${new Date().getFullYear()}-${(count + 1).toString().padStart(3, '0')}`;

  if (!equipmentId || !description) {
    return { success: false, error: 'Equipo y descripción son requeridos.' };
  }

  try {
    await prisma.workOrder.create({
      data: {
        orderNumber,
        description,
        priority,
        status,
        equipment: {
          connect: { id: equipmentId }
        }
      },
    });

    revalidatePath('/work-orders');
    revalidatePath('/dashboard');
    revalidatePath('/equipment');
    return { success: true };
  } catch (error: any) {
    console.error('WO Error:', error);
    return { success: false, error: 'Ocurrió un error al crear la orden de trabajo.' };
  }
}
