function DateNavigator({ currentDate, setCurrentDate }) {
  function changeDate(days) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  }
  const buttonStyle =
    "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50";

  return (
    <section className="mb-6 flex items-center justify-center gap-3">
      <button onClick={() => changeDate(-7)} className={buttonStyle}>
        -7일
      </button>

      <button onClick={() => changeDate(-1)} className={buttonStyle}>
        ◀
      </button>

      <button onClick={() => changeDate(1)} className={buttonStyle}>
        ▶
      </button>

      <button onClick={() => changeDate(7)} className={buttonStyle}>
        +7일
      </button>
    </section>
  );
}

export default DateNavigator;
