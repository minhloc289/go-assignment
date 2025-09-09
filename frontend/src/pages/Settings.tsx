import { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

export default function Settings() {
  const [formData, setFormData] = useState({
    siteName: "Golden Owl Test",
    adminEmail: "admin@example.com",
    timezone: "UTC+7",
    language: "en",
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    autoSave: true
  });

  const handleInputChange = (e : any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleReset = () => {
    setFormData({
      siteName: "Golden Owl Test",
      adminEmail: "admin@example.com",
      timezone: "UTC+7",
      language: "en",
      emailNotifications: true,
      pushNotifications: false,
      darkMode: false,
      autoSave: true
    });
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Settings" />
      
      <div className="space-y-6">
        {/* General Settings Section */}
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">
            General Settings
          </h2>
          
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label 
                  htmlFor="siteName" 
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label 
                  htmlFor="adminEmail" 
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Admin Email
                </label>
                <input
                  type="email"
                  id="adminEmail"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label 
                  htmlFor="timezone" 
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="UTC+7">UTC+7 (Ho Chi Minh City)</option>
                  <option value="UTC+0">UTC+0 (London)</option>
                  <option value="UTC-5">UTC-5 (New York)</option>
                  <option value="UTC+9">UTC+9 (Tokyo)</option>
                </select>
              </div>

              <div>
                <label 
                  htmlFor="language" 
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="vi">Tiếng Việt</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Reset
          </button>
          <button
            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}