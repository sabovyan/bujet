'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  name: z.string(),
  spaceId: z.string()
});

export const addList = async (formData: FormData) => {
  const { name, spaceId } = schema.parse({
    name: formData.get('name'),
    spaceId: formData.get('spaceId')
  });

  const session = await auth();

  const newList = await prisma.list.create({
    data: {
      name,
      Space: {
        connect: {
          id: spaceId
        }
      },
      creator: {
        connect: {
          id: session?.user.id
        }
      }
    },
    select: {
      id: true
    }
  });

  revalidateTag(`/spaces/${spaceId}`);

  redirect(`/spaces/${spaceId}/lists/${newList.id}`);
};
