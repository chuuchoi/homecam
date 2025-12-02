// app/lib/axios.ts
import axios from "axios";
type AxiosResponseType = | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
// Axios 인스턴스 생성
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL, // API의 기본 URL
  baseURL: undefined, //자기 자신
  timeout: 20000, // 요청 제한 시간 (ms)
  withCredentials: true, // 요청 시 쿠키 포함
  //formData 사용 시 브라우저가 자동으로 적절한 Content-Type을 설정하므로 Content-Type을 명시하지 않거나, 조건적으로 설정해야 함
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// 요청 인터셉터
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 요청 전에 토큰 등을 설정할 수 있습니다.
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // API 응답 상태와 데이터를 콘솔에 출력
    if (import.meta.env.DEV) {
      console.log('API Response Status:', response.status);
      console.log('API Response Data:', response.data);
    }
    return response.data; // 필요한 경우 응답 데이터를 가공
  },
  (error) => {
    // 에러 응답도 콘솔에 출력
    if (import.meta.env.DEV) {
      console.error('API Error Status:', error.response?.status);
      console.error('API Error Data:', error.response?.data);
    }
    return Promise.reject(error);
  }
);


// GET 요청 함수
// Axios를 사용할 때 이미지 데이터를 바이너리(Blob)로 받아야 한다면 responseType: "blob"을 추가해야 합니다
export const getData = async <T = any>(endpoint: string, params = {}, responseType = "json" as AxiosResponseType): Promise<T> => {
  try {
    const res = await axiosInstance.get<T>(endpoint, { params, responseType });
    return res as T;
  } catch (error) {
    // console.log('⛔ Axios 요청 오류 발생 ⛔');

    // if (error.response) {
    //   console.log('📌 서버 응답 데이터:', error.response.data); // 서버 응답 메시지 출력
    //   console.log('📌 HTTP 상태 코드:', error.response.status);
    //   throw error;
    // } else if (error.request) {
    //   console.log('📌 요청이 전송되었지만 응답이 없음:', error.request);
    // } else {
    //   console.log('📌 요청 설정 중 오류 발생:', error.message);
    // }
    throw error;
  }
};

// POST 요청 함수
export const postData = async <T>(endpoint: any, data: any, config?: any): Promise<T> => {
  try {
    const res = await axiosInstance.post<T>(endpoint, data, config);
    return res as T;
  } catch (error) {
    throw error;
  }
};

// PUT 요청 함수
export const putData = async <T>(endpoint: any, data: any): Promise<T> => {
  try {
    const res = await axiosInstance.put<T>(endpoint, data);
    return res as T;
  } catch (error) {
    throw error;
  }
};

// DELETE 요청 함수
export const deleteData = async <T>(endpoint: any, params = {}): Promise<T> => {
  try {
    const res = await axiosInstance.delete<T>(endpoint, { params });
    return res as T;
  } catch (error) {
    throw error;
  }
};
