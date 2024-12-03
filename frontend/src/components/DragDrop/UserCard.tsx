import { User } from "./types";


type UserCardProps = {
    user: User,
}


export default function UserCard( {user} : UserCardProps) {
  return (
    <div className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md">
    <h3 className="font-medium text-neutral-100">{user.name}</h3>
  </div>
  )
}
