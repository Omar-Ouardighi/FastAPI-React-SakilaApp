import { useState } from "react";
import {Column as ColumnType, User} from "@/components/DragDrop/types"
import { Column } from "@/components/DragDrop/Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";


const COLUMNS: ColumnType[] = [
  {id: 'ACTIVE' , title: 'Active'},
  {id: 'NON_ACTIVE' , title: 'Non-Active'}
]

const INITIAL_USERS: User[] = [
  {id: 'user1', status: 'ACTIVE', name: 'John Doe', lastActive: Date.now()},
  {id: 'user2', status: 'NON_ACTIVE', name: 'Jane Smith', lastActive: Date.now()},
  {id: 'user3', status: 'ACTIVE', name: 'Michael Johnson', lastActive: Date.now()},
  {id: 'user4', status: 'NON_ACTIVE', name: 'Emily Davis', lastActive: Date.now()},
  {id: 'user5', status: 'ACTIVE', name: 'William Taylor', lastActive: Date.now()},
  {id: 'user6', status: 'NON_ACTIVE', name: 'Sarah Lee', lastActive: Date.now()}
]

export default function UsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS)

  function handleDragEnd(event:DragEndEvent) {
    const {active, over} = event;
    if (!over) return;

    const userId = active.id as string;
    const newStatus = over.id as User['status']

    setUsers(() => 
      users.map((user) =>
      user.id === userId ? {...user, status:newStatus, lastActive: Date.now()} : user )
    );
  }

  return (
    <div className="p-4">
      <div className="flex gap-8 fill-white justify-center">
        <DndContext onDragEnd={handleDragEnd} >
        {
          COLUMNS.map((column) => {
            return (
            <Column 
            key={column.id}  
            column={column}
            users={users.filter((user) => user.status === column.id)}/>)
          })
        }
        </DndContext>
        
      </div>

    </div>
  )
}

