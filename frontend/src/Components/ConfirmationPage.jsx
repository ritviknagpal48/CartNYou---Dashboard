import { Result, Button } from "antd";

const classes = {
  wrapper: "",
};

export const ConfirmationPage = () => {
  return (
    <Result
      className={classes.wrapper}
      status={"200"}
      title={"Yaaayyy! Your Email has been verified."}
      subTitle={
        "If you were unable to login, Please try again. If you still face issues, We are there to help."
      }
      extra={[<Button type={"primary"}>Login</Button>]}
    />
  );
};
