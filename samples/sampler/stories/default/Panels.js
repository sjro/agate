
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Panels, Panel, TabbedPanels} from '@enact/agate/Panels';
import Skinnable from "../../../../Skinnable";
import Icon from "../../../../Icon";
import Item from "../../../../Item";
import Button from "../../../../Button";
import Image from "../../../../Image";
import Header from "../../../../Header";
import {VirtualGridList} from "../../../../VirtualList";
import BodyText from "../../../../BodyText";
import compose from "ramda/src/compose";

const Config = mergeComponentMetadata('Panels', Panels, Panel);

storiesOf('Agate', module)
	.add(
		'Panels',
		() => {

			// const [panelIndex, setIndex] = React.useState(Config.defaultProps.index  || 0);
			// const onBeforeTabs = (e) => {
			// 	setIndex(Math.max(panelIndex - 1, 0));
			// 	action('onSelect')(e);
			// };
			// const onSelect = (e) => {
			// 	setIndex(e.index);
			// 	action('onSelect')(e);
			// };
			//
			// const onAfterTabs = () => {
			// 	setIndex(Math.min(panelIndex + 1, 2));
			// };
			// return (
			// 	<Panels
			// 		// backButtonBackgroundOpacity="transparent"
			// 		// closeButtonBackgroundOpacity="transparent"
			// 		//index={1}
			// 		// noAnimation={undefined}
			// 		// noBackButton={undefined}
			// 		onSelect={onSelect} // eslint-disable-line react/jsx-no-bind
			// 		noCloseButton
			// 		onBack={action('onBack')}
			// 		onClose={action('onClose')}
			// 		onTransition={action('onTransition')}
			// 		onWillTransition={action('onWillTransition')}
			// 	>
			// 		<Panel>
			// 			<Header title="Panel with Items">
			// 				<Button
			// 					icon="arrowlargeright"
			// 					iconFlip="auto"
			// 					onClick={onSelect}
			// 					size="small"
			// 					slot="slotAfter"
			// 				/>
			// 			</Header>



						const initialState = 0;
						const [panelIndex, setState] = React.useState(initialState);
						const forward = () => setState(panelIndex + 1);
						const backward = () => setState(panelIndex - 1);

						const handleBack = compose(backward, action('onBack'));
						return (
						<Panels
							backButtonBackgroundOpacity={select('backButtonBackgroundOpacity', ['opaque', 'transparent'], Config, 'transparent')}
							closeButtonBackgroundOpacity={select('closeButtonBackgroundOpacity', ['opaque', 'transparent'], Config, 'transparent')}
							index={panelIndex}
							noAnimation={boolean('noAnimation', Panels, false)}
							noBackButton={boolean('noBackButton', Panels, false)}
							noCloseButton={boolean('noCloseButton', Panels, false)}
							onBack={handleBack}
							onClose={action('onClose')}
							onTransition={action('onTransition')}
							onWillTransition={action('onWillTransition')}
						>
							<Panel>
								<Header title="Panel with Items">
									<Button
										icon="arrowlargeright"
										iconFlip="auto"
										size="small"
										slot="slotAfter"
										onClick={forward} // eslint-disable-line react/jsx-no-bind
									/>
								</Header>
						<BodyText>
							Example text inside an Panel Body
						</BodyText>
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
					</Panel>
					<Panel>
						<Header title="Panel with VirtualGridList">
							<Button
								icon="arrowlargeright"
								iconFlip="auto"
								onClick={action('onBack')}
								size="small"
								slot="slotAfter"
							/>
						</Header>
						{/*<VirtualGridList*/}
						{/*	cbScrollTo={function noRefCheck(){}}*/}
						{/*	data-spotlight-container-disabled={false}*/}
						{/*	dataSize={100}*/}
						{/*	direction="vertical"*/}
						{/*	horizontalScrollbar="auto"*/}
						{/*	itemRenderer={function noRefCheck(){}}*/}
						{/*	itemSize={{*/}
						{/*		minHeight: 270,*/}
						{/*		minWidth: 320*/}
						{/*	}}*/}
						{/*	noAffordance={false}*/}
						{/*	noScrollByDrag={false}*/}
						{/*	noScrollByWheel={false}*/}
						{/*	onScroll={function noRefCheck(){}}*/}
						{/*	onScrollStart={function noRefCheck(){}}*/}
						{/*	onScrollStop={function noRefCheck(){}}*/}
						{/*	overscrollEffectOn={{*/}
						{/*		arrowKey: false,*/}
						{/*		drag: false,*/}
						{/*		pageKey: false,*/}
						{/*		track: false,*/}
						{/*		wheel: true*/}
						{/*	}}*/}
						{/*	pageScroll={false}*/}
						{/*	role="list"*/}
						{/*	scrollMode="native"*/}
						{/*	verticalScrollbar="auto"*/}
						{/*	wrap={false}*/}
						{/*/>*/}
					</Panel>
				</Panels>

			);
		},
		{
			text: 'Basic usage of Picker'
		}
	);


