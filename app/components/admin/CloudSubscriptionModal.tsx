// app/components/admin/CloudSubscriptionModal.tsx

import { useState } from "react";
import { Checkbox } from "../checkbox";

interface Subscription {
  id: number;
  account: string;
  item: string;
  type: string;
  price: number; // Added price based on your image
  date: string;
}

interface CloudSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptions: Subscription[];
}

export function CloudSubscriptionModal({
  isOpen,
  onClose,
  subscriptions,
}: CloudSubscriptionModalProps) {
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<number[]>([]);

  if (!isOpen) {
    return null;
  }

  const handleSelectSubscription = (id: number) => {
    setSelectedSubscriptions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((subId) => subId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubscriptions.length === subscriptions.length && subscriptions.length > 0) {
      setSelectedSubscriptions([]);
    } else {
      setSelectedSubscriptions(subscriptions.map((sub) => sub.id));
    }
  };

  const totalSelectedAmount = subscriptions
    .filter((sub) => selectedSubscriptions.includes(sub.id))
    .reduce((sum, sub) => sum + sub.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-gray-900/50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col z-50">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
          <h2 className="text-xl font-bold">클라우드 구독 목록</h2>
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
              총 {subscriptions.length}건
            </span>
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
                      checked={selectedSubscriptions.length === subscriptions.length && subscriptions.length > 0}
                      onChange={handleSelectAll}
                    />
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
                    상품명
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    구분
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    금액
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    구독일자
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Checkbox 
                        checked={selectedSubscriptions.includes(sub.id)}
                        onChange={() => handleSelectSubscription(sub.id)}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                      {sub.account}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                      {sub.item}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                      {sub.type}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                      ₩ {sub.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                      {sub.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 rounded-b-lg flex justify-center text-sm font-semibold text-gray-700">
          <span>
            총 금액 ={" "}
            <span className="text-blue-600">
              {totalSelectedAmount.toLocaleString()}원
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}