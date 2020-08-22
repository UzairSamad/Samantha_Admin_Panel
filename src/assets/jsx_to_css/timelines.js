import { primaryColor } from "./constants";

const timelines = (theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  stepStyle: {
    color: "red",
  },
  stepPadding: {
    padding: "10px",
  },
  stepLabeStyle: {
    "& .MuiStepLabel-iconContainer": {
      "& .MuiStepIcon-root.MuiStepIcon-completed": {
        color: primaryColor,
      },
      "& .MuiStepConnector-vertical": {
        padding: "0 0 0",
      },
    },
  },
  lableDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "10px",
  },
  loaderDiv: {
    position: "relative",
    height: "50px",
  },
  loader: {
    width: "30px !important",
    height: "30px !important",
    position: "absolute",
    left: "50%",
    top: "15px",
    color: primaryColor,
  },
});

const titleStyle = {
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "22px",
  lineHeight: "30px",
  textTransform: "capitalize",
};

const captionStyle = {
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "18px",
  lineHeight: "21px",
};

export { timelines, titleStyle, captionStyle };
