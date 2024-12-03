import { useState } from "react";
import {Column as ColumnType, User} from "@/components/DragDrop/types"
import { Column } from "@/components/DragDrop/Column";


const COLUMNS: ColumnType[] = [
  {id: 'ACTIVE' , title: 'Active'},
  {id: 'NON_ACTIVE' , title: 'Non-Active'}
]

const INITIAL_USERS: User[] = [
  {id: 'user1', status: 'ACTIVE', name: 'John Doe'},
  {id: 'user2', status: 'NON_ACTIVE', name: 'Jane Smith'},
  {id: 'user3', status: 'ACTIVE', name: 'Michael Johnson'},
  {id: 'user4', status: 'NON_ACTIVE', name: 'Emily Davis'},
  {id: 'user5', status: 'ACTIVE', name: 'William Taylor'},
  {id: 'user6', status: 'NON_ACTIVE', name: 'Sarah Lee'}
]

export default function UsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS)
  return (
    <div className="p-4">
      <div className="flex gap-8 fill-white justify-center">
        {
          COLUMNS.map((column) => {
            return (
            <Column 
            key={column.id}  
            column={column}
            users={users.filter((user) => user.status === column.id)}/>)
          })
        }
      </div>

    </div>
  )
}

