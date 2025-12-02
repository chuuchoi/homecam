// app/components/admin/SalesSettlementModal.tsx
import React, { useState } from "react";
import { Checkbox } from "../checkbox";

interface SettlementRequest {
  id: number;
  requestDate: string;
  account: string;
  requestedAmount: number;
  commission: number;
  finalAmount: number;
  details?: {
    item: string;
    requestedAmount: number;
    commission: number;
    finalAmount: number;
  }[];
}

interface SalesSettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: SettlementRequest[];
}

export function SalesSettlementModal({
  isOpen,
  onClose,
  requests,
}: SalesSettlementModalProps) {
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  // State to manage which request's details are expanded
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleSelectRequest = (id: number) => {
    setSelectedRequests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((requestId) => requestId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === requests.length && requests.length > 0) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(requests.map((req) => req.id));
    }
  };

  const handleToggleDetails = (requestId: number) => {
    setExpandedRequestId((prevId) => (prevId === requestId ? null : requestId));
  };

  const totalSelectedRequestedAmount = requests
    .filter((req) => selectedRequests.includes(req.id))
    .reduce((sum, req) => sum + req.requestedAmount, 0);

  const totalSelectedCommission = requests
    .filter((req) => selectedRequests.includes(req.id))
    .reduce((sum, req) => sum + req.commission, 0);

  const totalSelectedFinalAmount = requests
    .filter((req) => selectedRequests.includes(req.id))
    .reduce((sum, req) => sum + req.finalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-gray-900/50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col z-50">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
          <h2 className="text-xl font-bold">수익 정산 요청 목록</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 grow overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800">
              총 {requests.length}건
            </span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">
              정산하기
            </button>
          </div>

          <div className="overflow-x-auto h-[calc(90vh-200px)]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <Checkbox
                      checked={selectedRequests.length === requests.length && requests.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    정산 요청일
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    계정
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    정산 요청금액
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    수수료
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    최종 정산금액
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    상세내역
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <React.Fragment key={request.id}>
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Checkbox
                          checked={selectedRequests.includes(request.id)}
                          onChange={() => handleSelectRequest(request.id)}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                        {request.requestDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                        {request.account}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                        ₩ {request.requestedAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                        ₩ {request.commission.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                        ₩ {request.finalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                        <button
                          onClick={() => handleToggleDetails(request.id)}
                          className={`text-white text-xs px-3 py-1 rounded-md ${
                            expandedRequestId === request.id
                              ? "bg-gray-500 hover:bg-gray-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {expandedRequestId === request.id ? "접기" : "상세보기"}
                        </button>
                      </td>
                    </tr>
                    {expandedRequestId === request.id && request.details && (
                      <tr>
                        <td colSpan={7} className="p-0 border-b border-gray-200">
                          <div className="bg-blue-50 bg-opacity-50 py-2 pl-12 pr-4">
                            <table className="min-w-full">
                              <tbody>
                                {request.details.map((detail, detailIndex) => (
                                  <tr key={`${request.id}-detail-${detailIndex}`}>
                                    <td className="py-2 pl-4 text-sm text-gray-700 w-[16.66%]">
                                      {/* Empty for checkbox column alignment */}
                                    </td>
                                    <td className="py-2 text-sm text-gray-700 w-[16.66%]">
                                      {/* Empty for date column alignment */}
                                    </td>
                                    <td className="py-2 text-sm text-gray-700 w-[16.66%]">
                                      {detail.item}
                                    </td>
                                    <td className="py-2 text-sm text-gray-700 w-[16.66%]">
                                      ₩ {detail.requestedAmount.toLocaleString()}
                                    </td>
                                    <td className="py-2 text-sm text-gray-700 w-[16.66%]">
                                      ₩ {detail.commission.toLocaleString()}
                                    </td>
                                    <td className="py-2 text-sm text-gray-700 w-[16.66%]">
                                      ₩ {detail.finalAmount.toLocaleString()}
                                    </td>
                                    <td className="py-2 text-sm text-gray-700 w-[16.66%]">
                                      {/* Empty for detail button column alignment */}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 rounded-b-lg flex justify-around text-sm font-semibold text-gray-700">
          <span>
            정산 요청금액 ={" "}
            <span className="text-blue-600">
              {totalSelectedRequestedAmount.toLocaleString()}원
            </span>
          </span>
          <span>
            수수료 ={" "}
            <span className="text-blue-600">
              {totalSelectedCommission.toLocaleString()}원
            </span>
          </span>
          <span>
            최종 정산금액 ={" "}
            <span className="text-blue-600">
              {totalSelectedFinalAmount.toLocaleString()}원
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}