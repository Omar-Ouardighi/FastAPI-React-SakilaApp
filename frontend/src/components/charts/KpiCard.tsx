
interface KPICardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export  function KPICard({ title, value, icon }: KPICardProps) {
  return (
    <div className="rounded-xl bg-whiteshadow border-zinc-800 bg-zinc-950 backdrop-blur-sm p-8 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{title}</p>
        {icon}
      </div>
      
      <div className="mt-2">
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
} 
