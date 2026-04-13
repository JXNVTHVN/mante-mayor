'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createEquipment(formData: FormData) {
  const name = formData.get('name') as string;
  const brand = formData.get('brand') as string;
  const model = formData.get('model') as string;
  const serialNumber = formData.get('serialNumber') as string;
  const year = parseInt(formData.get('year') as string);
  const currentHours = parseFloat(formData.get('currentHours') as string);
  const status = formData.get('status') as string;

  if (!name || !serialNumber) {
    return { success: false, error: 'Nombre y Número de Serie son requeridos.' };
  }

  try {
    await prisma.equipment.create({
      data: {
        name,
        brand,
        model,
        serialNumber,
        year,
        currentHours,
        status,
      },
    });

    revalidatePath('/equipment');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: 'El número de serie ya existe.' };
    }
    return { success: false, error: 'Ocurrió un error al guardar en la base de datos.' };
  }
}
