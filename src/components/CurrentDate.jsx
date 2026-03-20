function CurrentDate({ currentDate }) {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <p className="text-lg font-semibold text-slate-700">
        {year}년 {month}월 {day}일
      </p>
    </div>
  );
}

export default CurrentDate;
