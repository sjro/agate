import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ArcSlider, {ArcSliderBase} from '@enact/agate/ArcSlider';

ArcSlider.displayName = 'ArcSlider';
const Config = mergeComponentMetadata('ArcSlider', ArcSliderBase, ArcSlider);

// Set up some defaults for colors and radius
const prop = {
	colors: ['', '#000000', '#fdc902', '#986aad', '#0000ff'],
	radius: [120, 150]
};

storiesOf('Agate', module)
	.add(
		'ArcSlider',
		() => (
			<ArcSlider
				backgroundColor={select('backgroundColor', prop.colors, Config)}
				disabled={boolean('disabled', Config)}
				endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
				foregroundColor={select('foregroundColor', prop.colors, Config)}
				max={number('max', Config)}
				min={number('min', Config)}
				onChange={action('onChange')}
				onDown={action('onDown')}
				onDrag={action('onDrag')}
				onDragEnd={action('onDragEnd')}
				onDragStart={action('onDragStart')}
				radius={select('radius', prop.radius, Config)}
				startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
				step={number('step', Config)}
				strokeWidth={number('strokeWidth', Config)}
			/>
		),
		{
			text: 'The basic ArcSlider'
		}
	);
