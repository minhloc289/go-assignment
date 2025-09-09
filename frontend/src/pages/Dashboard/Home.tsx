import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  const [top10, setTop10] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/top10-group-a");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu top 10");
        }
        const data = await response.json();
        setTop10(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTop10();
  }, []);

  const getRankColor = (rank: number) => {
    if (rank <= 3) return "text-yellow-600 font-bold";
    if (rank <= 5) return "text-blue-600 font-semibold";
    return "text-gray-600";
  };

  return (
    <div>
      <PageMeta
        title="Dashboard | G-Scores"
        description="Dashboard page for G-Scores - Student Grade Management System"
      />
      <PageBreadcrumb pageTitle="Dashboard" />


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

        {/* Top 10 Group A Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Top 10 students of group A
              </h2>
              <p className="text-gray-600 mt-1">
                Student with the highest total score in block A (Math, Physics, Chemistry)
              </p>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-gray-500">Đang tải dữ liệu top 10...</p>
              </div>
            </div>
          ) : top10.length > 0 ? (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Registration Number
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Math
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Physics
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Chemistry
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {top10.map((student, index) => (
                      <tr 
                        key={student.sbd} 
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-lg ${getRankColor(index + 1)}`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {student.sbd}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            student.toan >= 8 
                              ? 'bg-green-100 text-green-800' 
                              : student.toan >= 6.5 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {student.toan || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            student.vat_li >= 8 
                              ? 'bg-green-100 text-green-800' 
                              : student.vat_li >= 6.5 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {student.vat_li || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            student.hoa_hoc >= 8 
                              ? 'bg-green-100 text-green-800' 
                              : student.hoa_hoc >= 6.5 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {student.hoa_hoc || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {student.total || 'N/A'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-gray-500">Không có dữ liệu top 10</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}