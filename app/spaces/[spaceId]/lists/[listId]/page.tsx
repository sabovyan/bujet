import { SpaceItemParams } from '../../page';

type ListItemParams = SpaceItemParams & {
  listId: string;
};
export default function ListItem({ params }: { params: ListItemParams }) {
  console.log(params);
  return (
    <div>
      <h1>{params.spaceId}</h1>
    </div>
  );
}
