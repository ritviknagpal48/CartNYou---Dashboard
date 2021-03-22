const classes = {
  wrapper: "",
  header: "w-full pr-14 pl-4 py-3 flex flex-row items-center justify-between",
  title: "text-2xl text-gray-600  hidden md:block font-sans-apple-system",
};

const Dashboard = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header} style={{ background: "#f2f3f3" }}>
        <div className={classes.title}>Dashboard</div>
      </div>
    </div>
  );
};

export default Dashboard;
