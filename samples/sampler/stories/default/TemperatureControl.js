import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

const prop = {
	unit: ['Celsius', 'Fahrenheit']
};

TemperatureControl.displayName = 'TemperatureControl';
const Config = mergeComponentMetadata('TemperatureControl', TemperatureControlBase, TemperatureControl);

storiesOf('Agate', module)
	.add(
		'TemperatureControl',
		() => (
			<TemperatureControl
				disabled={boolean('disabled', Config)}
				max={number('max', Config)}
				min={number('min', Config)}
				onChange={action('onChange')}
				unit={select('unit', prop.unit, Config)}
			/>
		),
		{
			text: 'Temperature Control'
		}
	);
