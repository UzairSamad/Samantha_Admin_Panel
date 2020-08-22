const driverStatus = (theme) => ({
  root: {
    padding: "10px 8px 5px 8px",
    boxShadow:'0px 3px lightgrey'
  },
  mainGridSpacing: {
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  imageSpacing: {
    // marginLeft: '5px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  bookingStatus: {
    margin: "auto",
    color: "#019323",
    fontWeight: 600,
    paddingRight: "10px",
  },
  extralarge: {
    width: "85px",
    height: "85px",
  },
  driverDetailContainer: {
    paddingLeft: "10px",
  },
  nameButton: {
    width: "100%",
    background: "white",
    border: "1px solid #04AA32",
    padding: "6px 16px",
    fontWeight: 'normal',
    fontSize: '15px',
    fontFamily: 'Open Sans',
    textTransform: 'capitalize',
    borderRadius: '5px',
    color: '#02AA31 !important',
    textAlign: "left",
      // '& .MuiButton-label':{
      //   justifyContent: "flex-start"
      // }
  },
  button_text_spacing: {
    marginTop: "15px",
  },
  bookingNo: {
    color: "#4A4A4A",
  },
});

const buttonStyle = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "23px",
  lineHeight: "31px",
};

const typographyStyle = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "20px",
  lineHeight: "27px",
};

export { driverStatus, buttonStyle, typographyStyle };
