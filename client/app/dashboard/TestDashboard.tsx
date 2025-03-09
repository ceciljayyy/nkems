"use client";
import React from "react";
import { useGetDashboardMetricsQuery } from "@/state/api";

const TestDashboard = () => {
  const { data, isLoading, error } = useGetDashboardMetricsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default TestDashboard;
