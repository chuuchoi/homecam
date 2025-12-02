// app/components/admin/DeveloperListModal.tsx
import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { Checkbox } from "../checkbox";

interface Developer {
  id: number;
  email: string;
  registrationDate: string;
  registeredModels: number;
  communityActivity: number;
  status: string;
}

interface DeveloperListModalProps {
  isOpen: boolean;
  onClose: () => void;
  developers: Developer[];
}

export function DeveloperListModal({
  isOpen,
  onClose,
  developers
}: DeveloperListModalProps) {
  const [selectedDevelopers, setSelectedDevelopers] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedDevelopers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((developerId) => developerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDevelopers(developers.map((dev) => dev.id));
    } else {
      setSelectedDevelopers([]);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-3000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-2000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              // beforeEnter={()=>{alert('start enter')}}
              enter="ease-out duration-1000"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              // beforeLeave={()=>{alert('start leave')}}
              leave="ease-in duration-2000"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                <div className="bg-[#3B82F6] text-white p-4 flex justify-between items-center rounded-t-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-bold leading-6 text-white"
                  >
                    개발자 리스트
                  </DialogTitle>
                  <button
                    type="button"
                    className="text-white hover:bg-blue-600 rounded-full p-1"
                    onClick={onClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-800">
                      총 {developers.length}명
                    </span>
                    <div className="flex space-x-2">
                      <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>등록일순</option>
                        <option>최신순</option>
                        <option>오래된순</option>
                      </select>
                      <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>상태</option>
                        <option>활동중</option>
                        <option>정지</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto max-h-96 custom-scrollbar">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            <Checkbox 
                              onChange={handleSelectAll}
                              checked={
                                selectedDevelopers.length ===
                                developers.length &&
                                developers.length > 0
                              }
                            />
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            계정
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            등록일자
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            등록 모델
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            커뮤니티 활동
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            상태
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          ></th>{" "}
                          {/* For arrow icon */}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {developers.map((developer) => (
                          <tr key={developer.id}>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <Checkbox 
                                checked={selectedDevelopers.includes(
                                  developer.id
                                )}
                                onChange={() => handleCheckboxChange(developer.id)}
                              />
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                              {developer.email}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                              {developer.registrationDate}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                              {developer.registeredModels}건
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                              {developer.communityActivity}건
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`font-semibold ${
                                  developer.status === "활동중"
                                    ? "text-blue-500"
                                    : "text-red-500"
                                }`}
                              >
                                {developer.status}
                              </span>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-400">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block"
                              >
                                <path
                                  d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center space-x-4">
                  <button
                    type="button"
                    className="inline-flex w-auto justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:text-sm"
                    onClick={() => {
                      alert(
                        `선택된 개발자 활동 해제: ${selectedDevelopers.join(
                          ", "
                        )}`
                      );
                      onClose();
                    }}
                  >
                    정지해제
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-auto justify-center rounded-md border border-transparent bg-yellow-500 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:text-sm"
                    onClick={() => {
                      alert(
                        `선택된 개발자 정지: ${selectedDevelopers.join(", ")}`
                      );
                      onClose();
                    }}
                  >
                    정지
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-auto justify-center rounded-md border border-transparent bg-red-500 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:text-sm"
                    onClick={() => {
                      alert(
                        `선택된 개발자 말소: ${selectedDevelopers.join(", ")}`
                      );
                      onClose();
                    }}
                  >
                    말소
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}