import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import AppNavHorizontalCollapse from './horizontal/AppNavHorizontalCollapse';
import AppNavHorizontalGroup from './horizontal/AppNavHorizontalGroup';
import AppNavHorizontalItem from './horizontal/AppNavHorizontalItem';
import AppNavHorizontalLink from './horizontal/AppNavHorizontalLink';

import AppNavVerticalCollapse from './vertical/AppNavVerticalCollapse';
import AppNavVerticalGroup from './vertical/AppNavVerticalGroup';
import AppNavVerticalItem from './vertical/AppNavVerticalItem';
import AppNavVerticalLink from './vertical/AppNavVerticalLink';

import AppNavItem, { registerComponent } from './AppNavItem';


registerComponent('vertical-group', AppNavVerticalGroup);
registerComponent('vertical-collapse', AppNavVerticalCollapse);
registerComponent('vertical-item', AppNavVerticalItem);
registerComponent('vertical-link', AppNavVerticalLink);

registerComponent('horizontal-group', AppNavHorizontalGroup);
registerComponent('horizontal-collapse', AppNavHorizontalCollapse);
registerComponent('horizontal-item', AppNavHorizontalItem);
registerComponent('horizontal-link', AppNavHorizontalLink);

registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

const useStyles = makeStyles(theme => ({
	navigation: {
		'& .list-item': {
			'&:hover': {
				backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
			},
			'&:focus:not(.active)': {
				backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
			}
		}
	},
	verticalNavigation: {
		'&.active-square-list': {
			'& .list-item, & .active.list-item': {
				width: '100%',
				borderRadius: '0'
			}
		},
		'&.dense': {
			'& .list-item': {
				paddingTop: 0,
				paddingBottom: 0,
				height: 32
			}
		}
	},
	horizontalNavigation: {
		'&.active-square-list': {
			'& .list-item': {
				borderRadius: '0'
			}
		},
		'& .list-item': {
			padding: '8px 12px 8px 12px',
			height: 40,
			minHeight: 40,
			'&.level-0': {
				height: 44,
				minHeight: 44
			},
			'& .list-item-text': {
				padding: '0 0 0 0px'
			}
		}
	},
	'@global': {
		'.popper-navigation-list': {
			'& .list-item': {
				padding: '8px 12px 8px 12px',
				height: 40,
				minHeight: 40,
				'& .list-item-text': {
					padding: '0 0 0 0px'
				}
			},
			'&.dense': {
				'& .list-item': {
					minHeight: 2,
					height: 2,
					'& .list-item-text': {
						padding: '0 0 0 0px'
					}
				}
			}
		}
	}
}));

function AppNavigation(props) {
	const classes = useStyles(props);
	const { navigation, layout, active, dense, className } = props;

	const verticalNav = (
		<List
			className={clsx(
				'navigation whitespace-no-wrap',
				classes.navigation,
				classes.verticalNavigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<AppNavItem key={_item.id} type={`vertical-${_item.type}`} item={_item} nestedLevel={0} />
			))}
		</List>
	);

	const horizontalNav = (
		<List
			className={clsx(
				'navigation whitespace-no-wrap flex p-0',
				classes.navigation,
				classes.horizontalNavigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<AppNavItem
					key={_item.id}
					type={`horizontal-${_item.type}`}
					item={_item}
					nestedLevel={0}
					dense={dense}
				/>
			))}
		</List>
	);

	if (navigation.length > 0) {
		switch (layout) {
			case 'horizontal': {
				return horizontalNav;
			}
			case 'vertical':
			default: {
				return verticalNav;
			}
		}
	} else {
		return null;
	}
}

AppNavigation.propTypes = {
	navigation: PropTypes.array.isRequired
};

AppNavigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(AppNavigation);
