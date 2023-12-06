'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  name: z.string()
});

export const addSpace = async (formData: FormData) => {
  const parsed = schema.parse({
    name: formData.get('name')
  });

  const session = await auth();

  const space = await prisma.space.create({
    data: {
      name: parsed.name,
      creator: {
        connect: {
          id: session?.user.id
        }
      }
    }
  });

  revalidateTag('/spaces');

  redirect(`/spaces/${space.id}`);
};
