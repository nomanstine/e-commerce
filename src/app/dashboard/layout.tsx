import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | E-Commerce",
  description: "Manage your e-commerce store, upload products, and customize settings",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
