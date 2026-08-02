import {
  X,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Printer,
} from "lucide-react";

import * as XLSX from "xlsx";

export default function SampleReportModal({
  isOpen,
  onClose,
  sample,
  testResults,
}) {
  if (!isOpen) return null;

  const passCount = testResults.filter(t => t.status === "Pass").length;
  const failCount = testResults.filter(t => t.status === "Fail").length;
  const warningCount = testResults.filter(t => t.status === "Warning").length;

  const handleExportToExcel = () => {
    const excelData = testResults.map(test => ({
      "Test ID": test.id,
      "Test Name":
        test.testName +
        (test.retestNumber ? ` (Retest ${test.retestNumber})` : ""),
      Result: test.result,
      Unit: test.unit,
      Limit: test.limit,
      Status: test.status,
      Method: test.method || "-",
      "Retest Number": test.retestNumber || 0,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    ws["!cols"] = [
      { wch: 10 },
      { wch: 30 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 10 },
      { wch: 20 },
      { wch: 12 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Test Results");

    const sampleInfo = [
      ["Sample Information"],
      ["Sample ID", sample.id],
      ["Sample Letter", sample.sampleLetter],
      ["Type", sample.type],
      ["Collection Time", sample.collectionTime],
      ["Status", sample.status],
      ["COC Number", sample.cocNumber],
      [],
      ["Test Results Summary"],
      ["Total Tests", testResults.length],
      ["Passed", passCount],
      ["Failed", failCount],
      ["Warnings", warningCount],
    ];

    const ws2 = XLSX.utils.aoa_to_sheet(sampleInfo);
    XLSX.utils.book_append_sheet(wb, ws2, "Sample Info");

    XLSX.writeFile(
      wb,
      `${sample.id}_Test_Results_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusIcon = status => {
    switch (status) {
      case "Pass":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "Fail":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "Warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = status => {
    switch (status) {
      case "Pass":
        return "bg-green-100 text-green-700";
      case "Fail":
        return "bg-red-100 text-red-700";
      case "Warning":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Testing":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-slate-300">
        {/* Header - Hidden when printing */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600 bg-[#1c1f26] print:hidden">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Test Results Report
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition shadow-lg"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleExportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition shadow-lg"
            >
              <Download className="w-4 h-4" />
              Export to Excel
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-slate-600 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-grid-pattern">
          <div className="max-w-5xl mx-auto">
            {/* Report Header */}
            <div className="text-center mb-4 print:mb-3">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Water Quality Test Report
              </h1>
              <p className="text-slate-700">
                Generated on{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Sample Information */}
            <div className="bg-[#C0D0DF] border border-slate-300 rounded-lg p-6 mb-4 print:mb-3">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Sample Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-slate-600 mb-1">Sample ID</p>
                  <p className="font-semibold text-slate-900">{sample.id}</p>
                </div>
                <div>
                  <p className="text-base text-slate-600 mb-1">Sample Letter</p>
                  <p className="font-semibold text-slate-900">
                    {sample.sampleLetter}
                  </p>
                </div>
                <div>
                  <p className="text-base text-slate-600 mb-1">Type</p>
                  <p className="font-semibold text-slate-900">{sample.type}</p>
                </div>
                <div>
                  <p className="text-base text-slate-600 mb-1">
                    Collection Time
                  </p>
                  <p className="font-semibold text-slate-900">
                    {sample.collectionTime}
                  </p>
                </div>
                <div>
                  <p className="text-base text-slate-600 mb-1">Status</p>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-medium ${getStatusBadgeClass(sample.status)}`}
                  >
                    {getStatusIcon(sample.status)}
                    {sample.status}
                  </span>
                </div>
                <div>
                  <p className="text-base text-slate-600 mb-1">COC Number</p>
                  <p className="font-semibold text-slate-900">
                    {sample.cocNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Test Summary */}
            <div className="grid grid-cols-4 gap-4 mb-4 print:mb-3">
              <div className="bg-white border-2 border-slate-300 rounded-lg p-4 text-center">
                <p className="text-base text-slate-600 mb-1">Total Tests</p>
                <p className="text-3xl font-bold text-slate-900">
                  {testResults.length}
                </p>
              </div>
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4 text-center">
                <p className="text-base text-green-700 mb-1">Passed</p>
                <p className="text-3xl font-bold text-green-700">{passCount}</p>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 text-center">
                <p className="text-base text-yellow-700 mb-1">Warnings</p>
                <p className="text-3xl font-bold text-yellow-700">
                  {warningCount}
                </p>
              </div>
              <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 text-center">
                <p className="text-base text-red-700 mb-1">Failed</p>
                <p className="text-3xl font-bold text-red-700">{failCount}</p>
              </div>
            </div>

            {/* Test Results Table */}
            <div className="mb-4 print:mb-3">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Detailed Test Results
              </h2>
              <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
                <table className="w-full">
                  <thead className="bg-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-base font-semibold text-slate-900">
                        Test Name
                      </th>
                      <th className="px-4 py-3 text-left text-base font-semibold text-slate-900">
                        Result
                      </th>
                      <th className="px-4 py-3 text-left text-base font-semibold text-slate-900">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-left text-base font-semibold text-slate-900">
                        Limit
                      </th>
                      <th className="px-4 py-3 text-left text-base font-semibold text-slate-900">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-base font-semibold text-slate-900">
                        Method
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {testResults.map((test, index) => (
                      <tr
                        key={test.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        <td className="px-4 py-3 text-base text-slate-700">
                          {test.testName}
                          {test.retestNumber && (
                            <span className="ml-2 text-sm text-blue-600 font-medium">
                              (Retest {test.retestNumber})
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-base font-medium text-slate-900">
                          {test.result}
                        </td>
                        <td className="px-4 py-3 text-base text-slate-600">
                          {test.unit}
                        </td>
                        <td className="px-4 py-3 text-base text-slate-600">
                          {test.limit}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(test.status)}`}
                          >
                            {getStatusIcon(test.status)}
                            {test.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-base text-slate-600">
                          {test.method || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 print:mb-0">
              <h3 className="font-semibold text-blue-900 mb-2">Notes</h3>
              <ul className="text-base text-blue-800 space-y-1 list-disc list-inside">
                <li>
                  All tests were conducted according to standard laboratory
                  procedures
                </li>
                <li>
                  Results are based on the samples as received at the laboratory
                </li>
                <li>
                  This report should not be reproduced except in full without
                  written approval
                </li>
                <li>
                  Test methods comply with applicable regulatory standards
                </li>
              </ul>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-base text-gray-600">
              <p>Laboratory Information Management System (LIMS)</p>
              <p>Report generated on {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
