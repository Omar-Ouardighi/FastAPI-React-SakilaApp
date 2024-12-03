import { useDroppable } from '@dnd-kit/core';
import { Column as ColumnType, User } from './types';
import UserCard from './UserCard';

type ColumnProps = {
  column: ColumnType;
  users: User[];
};

export function Column({ column, users }: ColumnProps) {
    const {setNodeRef} = useDroppable({
      id : column.id
    });
  
    return (
      <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
        <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
        <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
          {users
            .sort((a, b) => b.lastActive - a.lastActive)
            .map(user => {
              return <UserCard key={user.id} user={user}/>
            })}
        </div>
      </div>
    );
  }