import _ from 'lodash';

export default class AppUtils {

    static setRoutes(config, defaultAuth) {
        let routes = [...config.routes];

        routes = routes.map(route => {
            let auth = config.auth || config.auth === null ? config.auth : defaultAuth || null;
            auth = route.auth || route.auth === null ? route.auth : auth;
            const settings = _.merge({}, config.settings, route.settings);

            return {
                ...route,
                settings,
                auth
            };
        });

        return [...routes];
    }

    static generateRoutesFromConfigs(configs, defaultAuth) {
        let allRoutes = [];
        configs.forEach(config => {
            allRoutes = [...allRoutes, ...this.setRoutes(config, defaultAuth)];
        });
        return allRoutes;
    }

    static updateNavItem(nav, id, item) {
		return nav.map(_item => {
			if (_item.id === id) {
				return _.merge({}, _item, item);
			}

			if (_item.children) {
				return _.merge({}, _item, {
					children: this.updateNavItem(_item.children, id, item)
				});
			}

			return _.merge({}, _item);
		});
	}

	static removeNavItem(nav, id) {
		return nav
			.map(_item => {
				if (_item.id === id) {
					return null;
				}

				if (_item.children) {
					return _.merge({}, _.omit(_item, ['children']), {
						children: this.removeNavItem(_item.children, id)
					});
				}

				return _.merge({}, _item);
			})
			.filter(s => s);
	}

	static prependNavItem(nav, item, parentId) {
		if (!parentId) {
			return [item, ...nav];
		}

		return nav.map(_item => {
			if (_item.id === parentId && _item.children) {
				return {
					_item,
					children: [item, ..._item.children]
				};
			}

			if (_item.children) {
				return _.merge({}, _item, {
					children: this.prependNavItem(_item.children, item, parentId)
				});
			}

			return _.merge({}, _item);
		});
	}

	static appendNavItem(nav, item, parentId) {
		if (!parentId) {
			return [...nav, item];
		}

		return nav.map(_item => {
			if (_item.id === parentId && _item.children) {
				return {
					_item,
					children: [..._item.children, item]
				};
			}

			if (_item.children) {
				return _.merge({}, _item, {
					children: this.appendNavItem(_item.children, item, parentId)
				});
			}

			return _.merge({}, _item);
		});
	}
}