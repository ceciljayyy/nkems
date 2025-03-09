"use client";
import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import  StatCard  from "./StatCard";

const Dashboard = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
    xl:overflow-auto gap-10 pb-4 custom-grid-rows"
    >
     <CardPopularProducts/>
     <CardSalesSummary/>
     <CardPurchaseSummary/>
     <CardExpenseSummary/>
     <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        dateRange="Last 7 days"
        details={[
          {title: "Customer Growth",
             amount: "₵136.76", 
             changePercentage: 110,
             IconComponent: TrendingUp},

             {title: "Expenses",
              amount: "₵10.00", 
              changePercentage: -43,
              IconComponent: TrendingDown},
              
        ]}
        
     />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="Last 7 days"
        details={[
          {title: "Dues",
             amount: "₵300.00", 
             changePercentage: 77,
             IconComponent: TrendingUp},

             {title: "Pending Orders",
              amount: "₵910.00", 
              changePercentage: -43,
              IconComponent: TrendingDown},
              
        ]}
        
     />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="Last 7 days"
        details={[
          {title: "Sales",
             amount: "₵636.96", 
             changePercentage: 31,
             IconComponent: TrendingUp},

             {title: "Discount",
              amount: "₵30.00", 
              changePercentage: -31,
              IconComponent: TrendingDown},
              
        ]}
        
     />
    </div>
 }; 


export default Dashboard