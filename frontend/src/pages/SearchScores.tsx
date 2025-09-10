import { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { API_BASE_URL } from "../constants";


export default function UserRegistration() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [score, setScore] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setScore(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/check-score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sbd: registrationNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.sbd?.[0] || "Lỗi khi tra cứu điểm");
      }

      const data = await response.json();
      setScore(data);
    } catch (err: any) {
      setError(err.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    { key: 'toan', label: 'Math' },
    { key: 'ngu_van', label: 'Literature' },
    { key: 'ngoai_ngu', label: 'English' },
    { key: 'vat_li', label: 'Physics' },
    { key: 'hoa_hoc', label: 'Chemistry' },
    { key: 'sinh_hoc', label: 'Biology' },
    { key: 'lich_su', label: 'History' },
    { key: 'dia_li', label: 'Geography' },
    { key: 'gdcd', label: 'Civic Education' }
  ];

  return (
    <div>
      <PageMeta title="User Registration" description="User Registration Page" />
      <PageBreadcrumb pageTitle="User Registration" />

      <div className="space-y-6">
        {/* User Registration Section */}
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">
            User Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="registrationNumber"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Registration Number:
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="registrationNumber"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="Enter registration number"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </form>
        </div>

        {/* Detailed Scores Section */}
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
            Detailed Scores
          </h2>

          {score ? (
            <div className="mt-6">
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Result</h3>
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Registration Number:</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{score.sbd}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <div key={subject.key} className="flex items-center justify-between py-2 px-3 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {subject.label}:
                      </span>
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        {score[subject.key] || "Not Taken"}
                      </span>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between py-2 px-3 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Foreign Language Code:
                    </span>
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      {score.ma_ngoai_ngu || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Detailed view of search scores will appear here after submission!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}