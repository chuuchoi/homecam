// app/routes/m/add-device/name.tsx
import { useNavigate, useParams, useSearchParams } from "react-router"; // useSearchParams 추가
import { BackIcon } from "~/components/icons";
import Calendar from "react-calendar";
import moment from "moment";
import styles from "./Calendar.module.css";

export function meta({ }) {
  return [
    { title: "홈캠" },
    { name: "description", content: "Homecam home" },
  ];
}

export default function ReplayCalendar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  // 파라미터가 있으면 해당 날짜, 없으면 오늘 날짜 (moment 객체 -> JS Date 변환) Calendar 컴포넌트의 value는 기본 JS Date 객체를 받습니다.
  const selectedDate = dateParam
    ? moment(dateParam, 'YYYY-MM-DD').toDate()
    : new Date();

  return (
    <div className="w-full bg-[#121212] text-white min-h-screen pt-6">
      <header className="w-full px-4 py-2.5 flex items-center gap-1 relative mb-2">
        <div className="aspect-square flex items-center justify-center absolute top-0 left-0 h-full cursor-pointer"
          onClick={() => { navigate(-1) }}>
          <BackIcon className="w-5 h-5" />
        </div>
        <div className="font-bold text-lg flex items-center justify-center w-full gap-1">
          캘린더
        </div>
      </header>

      <main className="px-4">
        <Calendar
          className={styles.customCalendar}
          calendarType="gregory"
          view="month"
          // value를 설정하면 자동으로 그 날짜가 선택된 상태(active)가 되고 해당 월로 이동합니다.
          value={selectedDate}

          // tileClassName={({ date, view }) => {
          //   if (view === 'month') {
          //     if (moment(date).isSame(selectedDate, 'day')) {
          //       return styles.today;
          //     }
          //   }
          //   return null;
          // }}

          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString("en", { weekday: 'short' }).toUpperCase()
          }
          formatDay={(_, date) => date.getDate().toString()}
          navigationLabel={({ date }) =>
            `${moment(date).format('MMMM YYYY')}`
          }

          onClickDay={(value) => {
            const newDate = moment(value).format('YYYY-MM-DD');
            navigate(`/m/device/${id}/replay?date=${newDate}`, { replace: true });
          }}

        />
      </main>
    </div>
  );
}