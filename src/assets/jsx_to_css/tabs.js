import {
  primaryColor,
  tableColor,
  whiteColor,
  lightGreyColor,
} from './constants';

const TabsStyle = (theme) => ({
  root: {
    width: '100%',
  },
  appBarStyle: {
    boxShadow: 'none !important',
  },
  tab: {
    // backgroundColor:'green',
  },
  _tabsStyle: {
    '& .MuiTabs-fixed .MuiTabs-scroller': {
      indicator: {
        backgroundColor: `${whiteColor} !important`,
      },
      '& .indicator': {
        backgroundColor: `${whiteColor} !important`,
      },
      '.MuiTabs-indicator': {
        backgroundColor: `${whiteColor} !important`,
      },
      '& .MuiTabs-indicator': {
        backgroundColor: `${whiteColor} !important`,
      },
    },
  },
  activeTab: {
    backgroundColor: `${whiteColor} !important`,
    color: primaryColor,
    width: '50vw !important',   
    fontSize: '20px',
    lineHeight: '41px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderBottom: `5px solid ${primaryColor}`,
  },
  deactiveTab: {
    backgroundColor: `${lightGreyColor} !important`,
    color: 'black',
    width: '50vw !important',   
    fontWeight: 500,
    fontSize: '16px',
    borderLeft: `1px solid ${tableColor}`,
    borderTop: `1px solid ${tableColor}`,
    borderBottom: `1px solid ${tableColor}`,
  },
  loader: {
    width: '60px !important',
    height: '60px !important',
    position: 'absolute',
    left: '45%',
    top: '50%',
    color: primaryColor,
  },
});

export { TabsStyle };
