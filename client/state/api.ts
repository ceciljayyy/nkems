
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Interface for Dashboard Metrics

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number,
  stockQuantity: number,
  rating?: number;

}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaserSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCatergorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

// Create an API slice with RTK Query

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),  
  tagTypes: ['DashboardMetrics', "Products"],

  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }), 
      getProducts: builder.query<Product[],string | void>({   
        query: (search) => ({
          url:'/products',
          params: search ? { search } : {} ,
        }),
        providesTags: ['Products'],
      }),

      createProduct: builder.mutation<Product, NewProduct>({
        query: (NewProduct) => ({
          url:'/products',
          method: 'POST',
          body: NewProduct,
    
        }),
        invalidatesTags: ['Products'], //anytime we update the products, we want to invalidate the cache(list of products) so we will automatically send another api reqwuest to grab the  new lists of p[roducts]

  }),
  }),
});

export const { useGetDashboardMetricsQuery , 
  useGetProductsQuery,
   useCreateProductMutation,} = api;
