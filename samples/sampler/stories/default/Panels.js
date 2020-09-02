/* eslint-disable react/jsx-no-bind */

import PropTypes from 'prop-types';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';

import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panels, Panel} from '@enact/agate/Panels';
import kind from '@enact/core/kind';
import {clamp} from '@enact/core/util';
import Item from "@enact/agate/Item";
import IncrementSlider from "@enact/agate/IncrementSlider";

Panels.displayName = 'Panels';
const Config = mergeComponentMetadata('Panels', Panels);

// const Settings = () => {
// 	return   (
// 		<Panel >
// 			<Header title="0. Settings" />
// 			{/*<Button onClick={onClickForward}>Forward</Button>*/}
//
// 			<div>
// 				<Item onClick={goToProfiles}>1. Profiles</Item>
// 				<Item onClick={goToDeviceSettings}>2. Device Settings</Item>
// 				<Item onClick={goToSound}>3. Sound</Item>
// 			</div>
// 		</Panel>
// 	)
// };

const Profiles = kind({
	name: '1. Profiles',

	propTypes: {
		onClickBackward: PropTypes.func,
		onClickForward: PropTypes.func
	},

	render: ({onClickBackward, onClickForward, ...props}) => (
		<Panel {...props}>
			<Header title="Profiles" />
			<Button onClick={onClickBackward}>Backward</Button>
			<Button onClick={onClickForward}>Forward</Button>

			<div>
				<Item onClick={onClickForward}>1.1 Laura</Item>
				<Item onClick={onClickForward}>1.2 Angela</Item>
				<Item onClick={onClickForward}>1.3 Christian</Item>
			</div>
		</Panel>
	)
});

const DeviceSettings = kind({
	name: '2. Device Settings',

	propTypes: {
		onClickBackward: PropTypes.func,
		onClickForward: PropTypes.func
	},

	render: ({onClickBackward, onClickForward, ...props}) => (
		<Panel {...props}>
			<Header title="2. Device Settings" />
			<Button onClick={onClickBackward}>Backward</Button>
			<Button onClick={onClickForward}>Forward</Button>

			<div>
				<Item onClick={onClickForward}>2.1 Devices</Item>
				<Item onClick={onClickForward}>2.2 Projection</Item>
				<Item onClick={onClickForward}>2.3 Vehicle Name</Item>
			</div>
		</Panel>
	)
});

const Devices = kind({
	name: '2.1 Devices',

	propTypes: {
		onClickBackward: PropTypes.func,
		onClickForward: PropTypes.func
	},

	render: ({onClickBackward, onClickForward, ...props}) => (
		<Panel {...props}>
			<Header title="2.1 Devices" />
			<Button onClick={onClickBackward}>Backward</Button>

			<div>
				<Item onClick={onClickForward}>2.1.1 Laptop</Item>
				<Item onClick={onClickForward}>2.1.2 Tablet</Item>
				<Item onClick={onClickForward}>2.1.3 Phone</Item>
			</div>
		</Panel>
	)
});

const Sound = kind({
	name: '3. Sound',

	propTypes: {
		onClickBackward: PropTypes.func,
		onClickForward: PropTypes.func
	},

	render: ({onClickBackward, onClickForward, ...props}) => (
		<Panel {...props}>
			<Header title="3. Sound" />
			<Button onClick={onClickBackward}>Backward</Button>
			<Button onClick={onClickForward}>Forward</Button>

			<div>
				<IncrementSlider></IncrementSlider>
			</div>
		</Panel>
	)
});

const BasicPanels = () => {
	const [shouldShiftIndexes, setShouldShiftIndexes] = React.useState(false);
	const [index, setIndex] = React.useState(0);
	const [rightIndex, setRightIndex] = React.useState(1);
	const goNext = () => setIndex(clamp(0, 3, index + 1));
	const goPrevious = () => setIndex(clamp(0, 3, index - 1));

	const goToProfiles = () => { setShouldShiftIndexes(!shouldShiftIndexes); setRightIndex(1)};
	const goToDeviceSettings = () => { setShouldShiftIndexes(!shouldShiftIndexes); setRightIndex(2)};
	const goToSound = () => setIndex(1);


	return (
		<Panels
			index={index}
			rightIndex={rightIndex}
			shouldShiftIndexes={shouldShiftIndexes}
			noAnimation={boolean('noAnimation', Config, false)}
			noCloseButton={boolean('noCloseButton', Config, false)}
			onApplicationClose={action('onClose')}
			onBack={goPrevious}
			sideBySide={boolean('sideBySide', Config, true)}
			//onSelectBreadcrumb={goPrevious}
		>

			<Panel id={0}>
				<Header title="0. Settings" />
				{/*<Button onClick={onClickForward}>Forward</Button>*/}

				<div>
					<Item onClick={goToProfiles}>1. Profiles</Item>
					<Item onClick={goToDeviceSettings}>2. Device Settings</Item>
					<Item onClick={goToSound}>3. Sound</Item>
				</div>
			</Panel>


			<Profiles onClickForward={goNext} onClickBackward={goPrevious} id={1} parentId={0} />
			<DeviceSettings onClickBackward={goPrevious} onClickForward={goNext} id={2} parentId={0} />
			<Sound onClickForward={goNext} onClickBackward={goPrevious} id={3} parentId={0} />
		</Panels>
	);
};

storiesOf('Agate', module)
	.add(
		'Panels',
		() => (<BasicPanels />),
		{
			props: {
				noScroller: true,
				noPanels: true
			},
			text: 'The basic Panels'
		}
	);
