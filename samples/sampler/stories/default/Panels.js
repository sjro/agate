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

Panels.displayName = 'Panels';
const Config = mergeComponentMetadata('Panels', Panels);

const FirstPanel = kind({
	name: 'FirstPanel',

	propTypes: {
		onClickForward: PropTypes.func
	},

	render: ({onClickForward, ...rest}) => (
		<Panel {...rest}>
			<Header title="First Panel" />
			<Button onClick={onClickForward}>Forward</Button>
		</Panel>
	)
});

const SecondPanel = kind({
	name: 'SecondPanel',

	propTypes: {
		onClickBackward: PropTypes.func,
		onClickForward: PropTypes.func
	},

	render: ({onClickBackward, onClickForward, ...props}) => (
		<Panel {...props}>
			<Header title="Second Panel" />
			<Button onClick={onClickBackward}>Backward</Button>
			<Button onClick={onClickForward}>Forward</Button>
		</Panel>
	)
});

const ThirdPanel = kind({
	name: 'ThirdPanel',

	propTypes: {
		onClickBackward: PropTypes.func
	},

	render: ({onClickBackward, ...props}) => (
		<Panel {...props}>
			<Header title="Third Panel" />
			<Button onClick={onClickBackward}>Backward</Button>
		</Panel>
	)
});

const BasicPanels = () => {
	const [index, setIndex] = React.useState(0);
	const goNext = () => setIndex(clamp(0, 2, index + 1));
	const goPrevious = () => setIndex(clamp(0, 2, index - 1));

	return (
		<Panels
			index={index}
			noAnimation={boolean('noAnimation', Config, false)}
			noCloseButton={boolean('noCloseButton', Config, false)}
			onApplicationClose={action('onClose')}
			onBack={goPrevious}
			sideBySide={boolean('sideBySide', Config, false)}
		>
			<FirstPanel onClickForward={goNext} />
			<SecondPanel onClickForward={goNext} onClickBackward={goPrevious} />
			<ThirdPanel onClickBackward={goPrevious} />
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
