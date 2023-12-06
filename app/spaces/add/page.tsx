import { addSpace } from '@/app/actions/space.actions';
import { FormField } from '@/components/formField';
import { Button } from '@/components/ui/button';

export default async function NewSpace() {
  return (
    <div>
      <h2>ADD NEW SPACE</h2>

      <form action={addSpace}>
        <FormField type="text" label="Name" name="name" />
        {/* <FormField type="text" name="userId" hidden readOnly defaultValue={session?.user.} /> */}
        <Button className="w-full mt-4">Submit</Button>
      </form>
    </div>
  );
}
