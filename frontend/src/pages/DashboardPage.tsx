import { DollarSign, Users, Hourglass, Film } from "lucide-react";
import { KPICard } from "@/components/charts/KpiCard";
import { CategoriesChart } from "@/components/charts/CategoriesChart";
import { useState, useEffect } from "react";
import { TopCustomersChart } from "@/components/charts/TopCustomersChart";
import { LanguageChart } from "@/components/charts/LanguageChart";

interface KPIData {
  revenue: number;
  total_rentals: number;
  average_rental_duration_days: number;
  most_rented_film: {
    title: string;
    rental_count: number;
  };
}

export default function DashboardPage() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await fetch('http://localhost:8000/kpis');
        const data = await response.json();
        setKpiData(data);
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      }
    };

    fetchKPIs();
  }, []);

  if (!kpiData) return <div>Loading...</div>;


  return (
    <div className="space-y-6 ">
      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value={`$${kpiData.revenue.toFixed(2)}`}
          icon={<DollarSign className="h-4 w-4 text-gray-400" />}
        />
        
        <KPICard
          title="Total Rentals"
          value={kpiData.total_rentals.toLocaleString()}
          icon={<Users className="h-4 w-4 text-gray-400" />}
        />
        
        <KPICard
          title="Average Rental Duration"
          value={`${kpiData.average_rental_duration_days.toFixed(1)} days`}
          icon={<Hourglass  className="h-4 w-4 text-gray-400" />}
        />
        
        <KPICard
          title="Most Rented Film"
          value={`${kpiData.most_rented_film.title} (${kpiData.most_rented_film.rental_count} rentals)`}
          icon={<Film className="h-4 w-4 text-gray-400" />}
        />
      </div>


      <div className="grid md:grid-cols-3 gap-4" >
      <LanguageChart/>
      <CategoriesChart/>
      <TopCustomersChart/>
      </div>


      
    </div>
  );
};

