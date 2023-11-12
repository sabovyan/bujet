'use client';

import { FormField, NativeSelect } from '../formField';
import { Button } from '../ui/button';
import { AddExpenseSheet } from './AddExpense.sheet';
import { AddExpenseDialog } from './AddExpense.dialog';
import { saveExpense } from './AddExpense.server';

const addExpenseText = {
  title: 'Another One ?',
  open: '+',
  cancel: 'Cancel',
  submit: 'Submit',
  categoryLabel: 'Category'
};

type Props = {
  deviceType: 'mobile' | 'desktop';
};

export function AddExpense({ deviceType = 'desktop' }: Props) {
  if (deviceType === 'mobile') {
    return (
      <AddExpenseSheet title={addExpenseText.title}>
        <AddExpenseForm />
      </AddExpenseSheet>
    );
  }

  return (
    <AddExpenseDialog title={addExpenseText.title}>
      <AddExpenseForm />
    </AddExpenseDialog>
  );
}

function AddExpenseForm() {
  const options = [
    { value: 'food', label: 'Food' },
    { value: 'cigarettes', label: 'Cigarttes' }
  ];

  return (
    <form
      action={saveExpense}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   const formData = new FormData(e.currentTarget);
      //   const formProps = Object.fromEntries(formData);
      //   console.log(formProps);
      //
      //   // e.currentTarget.reset()
      // }}
    >
      <FormField type="text" label="Name" name="name" />
      <FormField type="number" label="Price" name="price" />
      <FormField
        type="date"
        label="Date"
        name="date"
        defaultValue={new Date().toLocaleDateString('en-CA')}
      />
      <NativeSelect
        name="category"
        options={options}
        label={addExpenseText.categoryLabel}
      />
      <Button className="w-full mt-3">{addExpenseText.submit}</Button>
    </form>
  );
}
