import { prisma } from '@/lib/prisma';

import { ListComponent } from './components/ListCompoent';
import { SpaceItemParams } from '../../../page';

type ListItemParams = SpaceItemParams & {
  listId: string;
};

const isCompleted = (currentDate: Date | null) => {
  if (currentDate === null) return false;

  const diff =
    (new Date(currentDate).getTime() - new Date().getTime()) /
    1000 /
    60 /
    60 /
    24;

  const isCompleted = diff < 1;

  return isCompleted;
};

export default async function List({ params }: { params: ListItemParams }) {
  const items = await prisma.listItem.findMany({
    where: {
      list: { id: params.listId }
    },
    include: { creator: { select: { name: true } } }
  });

  const { ongoingItems, completedItems } = items.reduce<{
    ongoingItems: typeof items;
    completedItems: typeof items;
  }>(
    (acc, item) => {
      if (isCompleted(item.completedAt)) {
        acc.completedItems.push(item);

        return acc;
      }

      acc.ongoingItems.push(item);

      return acc;
    },
    { ongoingItems: [], completedItems: [] }
  );

  return (
    <>
      <ListComponent
        type="ONGOING"
        items={ongoingItems}
        listId={params.listId}
        spaceId={params.spaceId}
        title="Ongoing"
      />

      <ListComponent
        type="COMPLETED"
        items={completedItems}
        listId={params.listId}
        spaceId={params.spaceId}
        title="Completed"
      />

      {/* <ul className="flex flex-col gap-4 mt-4 max-w-[450px]"> */}
      {/*   {ongoingItems?.map((item) => { */}
      {/*     const isDaily = item.type === 'DAILY'; */}
      {/**/}
      {/*     return ( */}
      {/*       <li */}
      {/*         key={item.id} */}
      {/*         className="flex gap-4 items-center justify-between border" */}
      {/*       > */}
      {/*         <div className="flex gap-4 items-center"> */}
      {/*           <Toggle title="toggle recursive state" pressed={isDaily}> */}
      {/*             <Image */}
      {/*               src={recurringIcon} */}
      {/*               alt="recurring icon" */}
      {/*               width={24} */}
      {/*               height={24} */}
      {/*               className={`${isDaily ? 'opacity-100' : 'opacity-20'}`} */}
      {/*             /> */}
      {/*           </Toggle> */}
      {/*           <Label className="text-sm mb-0"> */}
      {/*             {item.name}{' '} */}
      {/*             <span className="text-xs text-gray-400"> */}
      {/*               (By {item.creator.name?.split(' ')[0]}) */}
      {/*             </span> */}
      {/*           </Label> */}
      {/*         </div> */}
      {/*         <div className="flex gap-2"> */}
      {/*           <form */}
      {/*             action={async (formData) => { */}
      {/*               'use server'; */}
      {/*               formData.append('listId', params.listId); */}
      {/*               formData.append('listItemId', item.id); */}
      {/*               formData.append('spaceId', params.spaceId); */}
      {/**/}
      {/*               await markItemAsComplete(formData); */}
      {/*             }} */}
      {/*           > */}
      {/*             <Toggle type="submit" aria-label="complete"> */}
      {/*               &#x2713; */}
      {/*             </Toggle> */}
      {/*           </form> */}
      {/*           <form */}
      {/*             action={async (formData) => { */}
      {/*               'use server'; */}
      {/*               formData.append('listId', params.listId); */}
      {/*               formData.append('listItemId', item.id); */}
      {/*               formData.append('spaceId', params.spaceId); */}
      {/*               formData.append('completedAt', Date.now().toString()); */}
      {/**/}
      {/*               await deleteListItem(formData); */}
      {/*             }} */}
      {/*           > */}
      {/*             <Toggle type="submit" aria-label="remove"> */}
      {/*               &#x292B; */}
      {/*             </Toggle> */}
      {/*           </form> */}
      {/*         </div> */}
      {/*       </li> */}
      {/*     ); */}
      {/*   })} */}
      {/* </ul> */}
    </>
  );
}
