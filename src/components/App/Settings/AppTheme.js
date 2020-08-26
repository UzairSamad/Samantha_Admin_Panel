import { lightBlue, red } from '@material-ui/core/colors';

const skyBlue = {
	50: '#ecfbff',
	100: '#d0f4fe',
	200: '#b0edfd',
	300: '#90e5fc',
	400: '#79e0fc',
	500: '#e73859',
	600: '#59d6fa',
	700: '#4fd0fa',
	800: '#45cbf9',
	900: '#33c2f8',
	A100: '#ffffff',
	A200: '#ffffff',
	A400: '#d7f3ff',
	A700: '#beecff'
};

const appDark = {
	50: '#e3e6e8',
	100: '#bac0c5',
	200: '#8c969f',
	300: '#5e6c78',
	400: '#3c4d5b',
	500: '#fc2254',
	600: '#162838',
	700: '#aa0027',
	800: '#0e1c28',
	900: '#08111b',
	A100: '#5b9aff',
	A200: '#287bff',
	A400: '#005ef4',
	A700: '#0054da'
};

const themesConfig = {
	default: {
		palette: {
			type: 'light',
			primary: appDark,
			secondary: {
				light: skyBlue[100],
				main: skyBlue[500],
				dark: skyBlue[900]
			},
			background: {
				paper: '#FFFFFF',
				default: '#F7F7F7'
			},
			error: red
		},
		status: {
			danger: 'orange'
		}
	},
	legacy: {
		palette: {
			type: 'light',
			primary: appDark,
			secondary: {
				light: lightBlue[400],
				main: lightBlue[600],
				dark: lightBlue[700]
			},
			background: {
				paper: '#FFFFFF',
				default: '#F7F7F7'
			},
			error: red
		},
		status: {
			danger: 'orange'
		}
	},
	sunset: {
		palette: {
			type: 'light',
			primary: {
				light: '#FF908B',
				main: '#D0605E',
				dark: '#9B3134'
			},
			secondary: {
				light: '#C76A1D',
				main: '#FF994C',
				dark: '#FFCA7B',
				contrastText: '#FFF'
			},
			background: {
				paper: '#FFFFFF',
				default: '#F7F7F7'
			},
			error: red
		},
		status: {
			danger: 'orange'
		}
	},
	greeny: {
		palette: {
			type: 'light',
			primary: {
				light: '#6CABD4',
				main: '#387CA3',
				dark: '#005074'
			},
			secondary: {
				light: '#89F6CF',
				main: '#55C39E',
				dark: '#159270',
				contrastText: '#FFF'
			},
			background: {
				paper: '#FFFFFF',
				default: '#F7F7F7'
			},
			error: red
		},
		status: {
			danger: 'orange'
		}
	},
	beach: {
		palette: {
			type: 'light',
			primary: {
				light: '#C4D8DD',
				main: '#93A7AB',
				dark: '#65787C',
				contrastText: '#FFF'
			},
			secondary: {
				light: '#FFB281',
				main: '#F18153',
				dark: '#BA5228',
				contrastText: '#FFF'
			},
			background: {
				paper: '#FFFFFF',
				default: '#F7F7F7'
			}
		}
	},
	tech: {
		palette: {
			type: 'light',
			primary: {
				light: '#87EFFF',
				main: '#4DBCE9',
				dark: '#008CB7',
				contrastText: '#FFF'
			},
			secondary: {
				light: '#FFFF83',
				main: '#D1E751',
				dark: '#9DB516'
			},
			background: {
				paper: '#FFFFFF',
				default: '#F7F7F7'
			}
		}
	},
	sweetHues: {
		palette: {
			type: 'light',
			primary: {
				light: '#D5C1EB',
				main: '#A391B9',
				dark: '#746389',
				contrastText: '#FFF'
			},
			secondary: {
				light: '#90AFD4',
				main: '#6080A3',
				dark: '#325474'
			},
			background: {
				paper: '#FFFFFF',
				default: '#F7F7F7'
			}
		}
	},
	defaultDark: {
		palette: {
			type: 'dark',
			primary: appDark,
			secondary: {
				light: skyBlue[100],
				main: skyBlue[500],
				dark: skyBlue[900]
			},
			background: {
				paper: '#1E2125',
				default: '#121212'
			},
			error: red
		},
		status: {
			danger: 'orange'
		}
	},
	deepOcean: {
		palette: {
			type: 'dark',
			primary: {
				light: '#8F53E7',
				main: '#5A24B4',
				dark: '#1E0083'
			},
			secondary: {
				light: '#FF61FF',
				main: '#FE00E9',
				dark: '#C600B6',
				contrastText: '#FFF'
			},
			background: {
				paper: '#1E2125',
				default: '#121212'
			}
		}
	},
	slate: {
		palette: {
			type: 'dark',
			primary: {
				light: '#86FFF7',
				main: '#4ECDC4',
				dark: '#009B94'
			},
			secondary: {
				light: '#FF9D99',
				main: '#FF6B6B',
				dark: '#C73840',
				contrastText: '#FFF'
			},
			background: {
				paper: '#1E2125',
				default: '#121212'
			}
		}
	}
};

export default themesConfig;
