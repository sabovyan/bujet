'use server';

// import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const addListSchema = z.object({
  name: z.string(),
  spaceId: z.string()
});

export const addList = async (formData: FormData) => {
  const { name, spaceId } = addListSchema.parse({
    name: formData.get('name'),
    spaceId: formData.get('spaceId')
  });

  const session = await auth();

  const newList = await prisma.list.create({
    data: {
      name,
      Space: { connect: { id: spaceId } },
      creator: { connect: { id: session?.user.id } }
    },
    select: { id: true }
  });

  // revalidateTag(`/spaces/${spaceId}`);
  redirect(`/spaces/${spaceId}/lists/${newList.id}`);
};

const changeFaveSchema = z.object({
  listId: z.string(),
  favorite: z.boolean()
});

export const changeFaveStatus = async (formData: FormData) => {
  const { listId: id, favorite } = changeFaveSchema.parse({
    listId: formData.get('listId'),
    spaceId: formData.get('spaceId'),
    favorite: formData.get('favorite') === 'on'
  });

  await prisma.list.update({
    where: { id },
    data: { favorite: favorite }
  });
};
