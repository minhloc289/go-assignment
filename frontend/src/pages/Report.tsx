import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define interfaces for better type safety
interface Stats {
  [subject: string]: {
    [label: string]: number;
  };
}

interface ApiResponse {
  stats: Stats;
  labels: string[];
}

export default function Report() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/report");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu báo cáo");
        }
        const data: ApiResponse = await response.json();
        setStats(data.stats);
        setLabels(data.labels);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchReport();
  }, []);

  const subjectTranslations: Record<string, string> = {
    toan: "Math",
    ngu_van: "Literature",
    ngoai_ngu: "English",
    vat_li: "Physics",
    hoa_hoc: "Chemistry",
    sinh_hoc: "Biology",
    lich_su: "History",
    dia_li: "Geography",
    gdcd: "Civic Education",
  };

  const colors = [
    'rgba(59, 130, 246, 0.8)',   // Blue (Math)
    'rgba(16, 185, 129, 0.8)',   // Emerald Green (Literature)
    'rgba(239, 68, 68, 0.8)',    // Red (English)
    'rgba(245, 158, 11, 0.8)',   // Orange (Physics)
    'rgba(139, 92, 246, 0.8)',   // Purple (Chemistry)
    'rgba(236, 72, 153, 0.8)',   // Pink (Biology)
    'rgba(2, 132, 199, 0.8)',    // Sky Blue (History)
    'rgba(20, 184, 166, 0.8)',   // Teal (Geography)
    'rgba(202, 138, 4, 0.8)',    // Golden Brown (Civic Education)
  ];

  const chartData = {
    labels: labels,
    datasets: stats
      ? Object.keys(stats).map((subject, index) => ({
          label: subjectTranslations[subject] || subject, 
          data: labels.map((label) => stats[subject][label] || 0),
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length].replace("0.8", "1"),
          borderWidth: 1,
          borderRadius: 4,
        }))
      : [],
  };

  // Fix TypeScript errors by properly typing chartOptions
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'bold',
          }
        }
      },
      title: {
        display: true,
        text: 'Statistics of number of students by subject score',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: 20,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        title: {
          display: true,
          text: 'Number of candidates',
          font: {
            size: 12,
            weight: 'bold',
          }
        },
        ticks: {
          font: {
            size: 11,
          }
        }
      },
    },
  };

  return (
    <div>
      <PageMeta
        title="Report | G-Scores"
        description="Report page for G-Scores - Student Grade Management System"
      />
      <PageBreadcrumb pageTitle="Report" />

      <div className="space-y-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Statistics Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Score statistics
              </h2>
              <p className="text-gray-600 mt-1">
                Distribution of students by subject score
              </p>
            </div>
          </div>
          
          {stats ? (
            <div className="h-96">
              <Bar options={chartOptions} data={chartData} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading statistics...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}