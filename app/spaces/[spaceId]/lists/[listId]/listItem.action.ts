'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const createListItemSchema = z.object({
  name: z.string().min(1),
  listId: z.string(),
  spaceId: z.string()
});

export async function createListItem(formData: FormData) {
  const session = await auth();
  const parsed = createListItemSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  if (!session) {
    redirect('/login');
  }

  const { name, listId, spaceId } = parsed.data;

  await prisma.listItem.create({
    data: {
      name,
      list: { connect: { id: listId } },
      creator: { connect: { id: session.user.id } }
    }
  });

  revalidatePath(`/space/${spaceId}/list/${listId}/list`);
}

const deleteListItemSchema = z.object({
  listItemId: z.string(),
  listId: z.string(),
  spaceId: z.string()
});

export const deleteListItem = async (formData: FormData) => {
  const parsed = deleteListItemSchema.safeParse({
    listItemId: formData.get('listItemId'),
    listId: formData.get('listId'),
    spaceId: formData.get('spaceId')
  });

  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  const { listId, listItemId, spaceId } = parsed.data;

  await prisma.listItem.delete({
    where: { id: listItemId }
  });

  revalidatePath(`/space/${spaceId}/list/${listId}/list`);
};
