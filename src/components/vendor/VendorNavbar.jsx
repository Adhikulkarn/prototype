import { NavLink } from "react-router-dom";

export default function VendorNavbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-purple-600">
        Vendor Panel
      </h1>

      <div className="flex gap-6 text-sm">
        <NavLink
          to="/vendor"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/vendor/create"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }
        >
          Create Campaign
        </NavLink>

        <NavLink
          to="/vendor/products"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }
        >
          My Products
        </NavLink>

        <NavLink
          to="/vendor/analytics"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }
        >
          Analytics
        </NavLink>
      </div>
    </div>
  );
}
