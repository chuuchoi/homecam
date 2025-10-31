import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// 더미 데이터 (국가별 다운로드 수를 나타냄)
const dummyCountryData = [
  { name: '미국', downloads: 4000 },
  { name: '한국', downloads: 6000 },
  { name: '일본', downloads: 5000 },
  { name: '중국', downloads: 7000 },
  { name: '기타', downloads: 3000 },
];

export default function CountryDownloadChart() {
  return (
    <div className="h-64"> {/* 차트의 높이를 조절할 수 있습니다 */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">국가별 다운로드</h2>
      <ResponsiveContainer width="100%" height="100%" initialDimension={{width:320, height:200}}>
        <BarChart
          data={dummyCountryData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          {/* 이미지에는 배경 그리드가 없으므로 주석 처리 */}
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" tickLine={false} />
          <YAxis  />
          <Tooltip /> {/* 마우스 오버 시 데이터 표시 */}
          <Bar
            dataKey="downloads"
            fill="#6495ED" // 이미지와 유사한 파란색 계열
            barSize={40} // 막대 너비 조절
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}