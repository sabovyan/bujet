import { revalidateTag } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';
import { z } from 'zod';

import { FormField } from '@/components/formField';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  name: z.string()
});

export default function AddList({
  params: { spaceId }
}: {
  params: { spaceId: string };
}) {
  return (
    <div>
      <form
        action={async (formData: FormData) => {
          'use server';
          try {
            const parsed = schema.parse({
              name: formData.get('name')
            });
            const session = await auth();

            const newList = await prisma.list.create({
              data: {
                name: parsed.name,
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
              }
            });

            revalidateTag(`/spaces/${spaceId}`);

            redirect(`/spaces/${spaceId}/lists/${newList.id}`);
          } catch (err) {
            console.log(err);
            console.error('OOOPS');
          }
        }}
      >
        <FormField type="text" label="Name" name="name" />
        <Button className="w-full mt-4">Submit</Button>
      </form>
    </div>
  );
}
