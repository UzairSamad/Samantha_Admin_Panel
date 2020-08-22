const bookingStatus = (theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  mainGridSpacing: {
    paddingTop: '5px',
    paddingBottom: '5px',
  },

  imageContainer: {
    border: '2px solid #C0BEBE',
    borderRadius: '1000px',
    background: '#FAFAFA',
  },
  bykeaBikeImage: {
    width: '40px',
    height: '34px',
    padding: '10px',
  },

  bookingStatus: {
    margin: 'auto',
    color: '#019323',
    fontWeight: 600,
    paddingRight: '10px',
  },
  nameButton: {
    width: '100%',
    background: 'white',
    color: 'green',
    border: '1px solid #04AA32',
  },
});

export { bookingStatus };
