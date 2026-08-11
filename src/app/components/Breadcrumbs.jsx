"use client";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function Breadcrumbs({ items }) {
  const router = useRouter();

  // Determine the back navigation path
  const getBackPath = () => {
    if (items.length === 0) {
      // From COC List (Home), no back button needed, but we'll show it going to dashboard
      return "/dashboard";
    } else if (items.length === 1) {
      // From COC Detail page, go back to dashboard
      return "/dashboard";
    } else if (items.length === 2) {
      // From Sample Detail page, go back to COC Detail
      return items[0].path || "/dashboard";
    } else if (items.length >= 3) {
      // From Test Result Detail page, go back to Sample Detail
      return items[1].path || "/dashboard";
    }
    return "/dashboard";
  };

  return (
    <nav className="flex items-center gap-2 text-sm mb-3">
      {/* Back Button - Hidden on Home page */}
      {items.length > 0 && (
        <button
          onClick={() => router.push(getBackPath())}
          className="flex items-center justify-center w-8 h-8 text-gray-600 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-200 rounded-lg transition"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {/* Home Icon */}
      <button
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
        title="Home"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.path ? (
            <button
              onClick={() => router.push(item.path)}
              className="text-gray-600 dark:text-gray-200 hover:text-blue-600 transition font-medium"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-500 dark:text-gray-200 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
