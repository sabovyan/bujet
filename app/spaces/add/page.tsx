import { FormField } from '@/components/formField';
import { Button } from '@/components/ui/button';

export default function NewSpace() {
  return (
    <div>
      <h1>ADD NEW SPACE</h1>

      <form>
        <FormField type="text" label="Name" name="name" />
        <FormField type="number" label="Price" name="price" />
        <FormField
          type="date"
          label="Date"
          name="date"
          defaultValue={new Date().toLocaleDateString('en-CA')}
        />
        <Button className="w-full mt-3">Submit</Button>
      </form>
    </div>
  );
}
