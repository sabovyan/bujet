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
    return 'Invalid form data';
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

const listItemInteractionSchema = z.object({
  listItemId: z.string(),
  listId: z.string(),
  spaceId: z.string()
});

export const deleteListItem = async (formData: FormData) => {
  const parsed = listItemInteractionSchema.safeParse({
    listItemId: formData.get('listItemId'),
    listId: formData.get('listId'),
    spaceId: formData.get('spaceId')
  });

  if (!parsed.success) {
    return 'Invalid form data';
  }

  const { listId, listItemId, spaceId } = parsed.data;

  await prisma.listItem.delete({
    where: { id: listItemId }
  });

  revalidatePath(`/space/${spaceId}/list/${listId}/list`);
};

const updateListItemSchema = listItemInteractionSchema.merge(
  z.object({
    isComplete: z.string().nullable()
  })
);

export const toggleCompleteStatus = async (formData: FormData) => {
  const parsed = updateListItemSchema.safeParse({
    listItemId: formData.get('listItemId'),
    listId: formData.get('listId'),
    spaceId: formData.get('spaceId'),
    isComplete: formData.get('isComplete')
  });

  if (!parsed.success) {
    return 'Invalid form data';
  }

  const { listId, listItemId, spaceId, isComplete } = parsed.data;

  await prisma.listItem.update({
    where: { id: listItemId },
    data: {
      completedAt: isComplete ? new Date() : null
    }
  });

  revalidatePath(`/space/${spaceId}/list/${listId}/list`);
};

const toggleRepeatStatusSchema = listItemInteractionSchema.merge(
  z.object({
    repeat: z.enum(['DAILY', 'ONCE'])
  })
);

export const toggleRepeatStatus = async (formData: FormData) => {
  const parsed = toggleRepeatStatusSchema.safeParse({
    listItemId: formData.get('listItemId'),
    listId: formData.get('listId'),
    spaceId: formData.get('spaceId'),
    repeat: formData.get('repeat')
  });

  if (!parsed.success) {
    return 'Invalid form data';
  }

  const { listId, listItemId, spaceId, repeat } = parsed.data;

  await prisma.listItem.update({
    where: { id: listItemId },
    data: {
      type: repeat
    }
  });

  revalidatePath(`/space/${spaceId}/list/${listId}/list`);
};
