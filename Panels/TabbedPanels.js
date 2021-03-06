import {adaptEvent, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Changeable} from '@enact/ui/Changeable';
import {Cell, Layout} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import {shape} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import Skinnable from '../Skinnable';
import TabGroup from '../TabGroup';

import Panels from './Panels';

import componentCss from './TabbedPanels.module.less';

/**
 * Tabbed Panels component.
 *
 * Usage:
 * ```
 * <TabbedPanels
 *   orientation={'vertical'}
 *   tabs={[
 *     {title: 'Panel1', icon: 'netbook'},
 *     {title: 'Panel2', icon: 'aircirculation'}
 *   ]}
 * >
 *   <Panel>Hello Panel 1</Panel>
 *   <Panel>Hello Panel 2</Panel>
 * </TabbedPanels>
 * ```
 *
 * @class TabbedPanels
 * @memberof agate/Panels
 * @ui
 * @public
 */
const TabbedPanelsBase = kind({
	name: 'TabbedPanels',
	propTypes: /** @lends agate/Panels.TabbedPanels.prototype */ {
		afterTabs: PropTypes.node,
		arranger: shape,
		beforeTabs: PropTypes.node,
		closeButtonAriaLabel: PropTypes.string,
		css: PropTypes.object,
		duration: PropTypes.number,
		index: PropTypes.number,
		noAnimation: PropTypes.bool,
		noCloseButton: PropTypes.bool,
		onApplicationClose: PropTypes.func,
		onBack: PropTypes.func,
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),
		tabPosition: PropTypes.string,
		tabs: PropTypes.array
	},
	defaultProps: {
		index: 0,
		noCloseButton: false,
		tabPosition: 'before'
	},
	styles: {
		css: componentCss,
		className: 'tabbedPanels enact-fit'
	},
	handlers: {
		onSelect: handle(
			adaptEvent(({selected}) => ({index: selected}), forward('onSelect'))
		)
	},
	computed: {
		children: ({children, tabs}) => {
			// if there are children use them
			if (children) {
				return children;
			}
			// otherwise try to make children from the tabs' view and viewProps
			if (tabs) {
				return tabs.map((tab, index) => {
					const {view: View, viewProps} = tab;
					return <View key={index} {...viewProps} />;
				});
			}
		},
		className: ({css, orientation, styler, tabPosition}) => styler.append(tabPosition === 'after' ? css.reverse : '', orientation === 'vertical' ? css.column : ''),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical'
	},
	render: ({
		afterTabs,
		arranger,
		beforeTabs,
		children,
		closeButtonAriaLabel,
		css,
		duration,
		index,
		noAnimation,
		noCloseButton,
		onApplicationClose,
		onBack,
		onSelect,
		tabOrientation,
		tabPosition,
		tabs,
		...rest
	}) => {
		return (
			<Layout {...rest}>
				<Cell shrink>
					<TabGroup
						afterTabs={afterTabs}
						beforeTabs={beforeTabs}
						className={css.tabs}
						onSelect={onSelect}
						orientation={tabOrientation}
						tabs={tabs}
						tabPosition={tabPosition}
						selectedIndex={index}
					/>
				</Cell>
				<Cell
					arranger={arranger}
					className={css.panels}
					closeButtonAriaLabel={closeButtonAriaLabel}
					component={Panels}
					duration={duration}
					noAnimation={noAnimation}
					noCloseButton={noCloseButton}
					onApplicationClose={onApplicationClose}
					onBack={onBack}
					orientation={tabOrientation}
					index={index}
				>
					{children}
				</Cell>
			</Layout>
		);
	}
});

// Currently not documenting the base output since it's not exported from index.js
const TabbedPanels = Slottable(
	{slots: ['tabs', 'afterTabs', 'beforeTabs']},
	Changeable(
		{prop: 'index', change: 'onSelect'},
		Skinnable(TabbedPanelsBase)
	)
);

export default TabbedPanels;
export {
	TabbedPanels,
	TabbedPanelsBase
};
