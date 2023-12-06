import { addList } from '@/app/actions/list.action';
import { FormField } from '@/components/formField';
import { Button } from '@/components/ui/button';

export default function AddList({
  params: { spaceId }
}: {
  params: { spaceId: string };
}) {
  return (
    <div>
      <form action={addList}>
        <FormField type="text" label="Name" name="name" />
        <FormField
          hidden
          type="text"
          name="spaceId"
          defaultValue={spaceId}
          readOnly
        />
        <Button className="w-full mt-4">Submit</Button>
      </form>
    </div>
  );
}
