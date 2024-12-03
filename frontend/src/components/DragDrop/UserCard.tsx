import { useDraggable } from "@dnd-kit/core";
import { User } from "./types";


type UserCardProps = {
    user: User,
}


export default function UserCard( {user} : UserCardProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: user.id
    })

    const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div 
    ref={setNodeRef} 
    {...listeners} 
    {...attributes}
    className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
    style={style}
    >
        <h3 className="font-medium text-neutral-100">{user.name}</h3>
    </div>
  )
}
