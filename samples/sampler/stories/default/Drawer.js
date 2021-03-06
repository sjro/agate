import {action} from '@enact/storybook-utils/addons/actions';
import BodyText from '@enact/ui/BodyText';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import convert from 'color-convert';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Drawer, {DrawerBase} from '@enact/agate/Drawer';
import Heading, {HeadingBase} from '@enact/agate/Heading';

import css from './Drawer.module.less';

Drawer.displayName = 'Drawer';
const Config = mergeComponentMetadata('Drawer', Drawer, DrawerBase);
const HeadingConfig = mergeComponentMetadata('Heading', Heading, HeadingBase);

const StoryOptions = {
	groupId: 'Story Options'
};

const headingValues = {
	colors: ['', '#E6444B', '#FDC902', '#986AAD', '#4E75E1', '#30CC83', '#44C8D5', '#47439B', '#2D32A6', '#4E75E1'],
	sizes: ['', 'title', 'subtitle', 'large', 'medium', 'small', 'tiny'],
	spacings: ['', 'auto', 'title', 'large', 'medium', 'small', 'none']
};

const {colors: drawerColors} = headingValues;

const opacityRange = {
	range: true,
	min: 0,
	max: 1,
	step: 0.1
};

const convertToRGBa = (hex, opacity) => `rgba(${convert.hex.rgb(hex)},${opacity})`;

storiesOf('Agate', module)
	.add(
		'Drawer',
		() => {
			const noDrawerAnimation = boolean('noAnimation', Config); // moved out of component to force order of knobs in the story
			const drawerBackgroundColor = select('Drawer background color', drawerColors, StoryOptions);
			const drawerBackgroundOpacity = number('Drawer background opacity', StoryOptions, opacityRange, 0.85);
			const drawerStyle = {};

			if (drawerBackgroundColor && drawerBackgroundOpacity) {
				drawerStyle.background = convertToRGBa(drawerBackgroundColor, drawerBackgroundOpacity);
			}

			return (
				<BodyText>
					Use the <em>open</em> knob to show or hide the Drawer.<br />
					<br />
					<span className={css.galliumNote}>
						The styling in the Gallium skin does not set a background color for the Drawer,
						therefore it will inherit the value that &lt;body&gt; has.  In some cases it
						may be difficult to see the contents clearly.<br />
						<br />
						You can override the background color for the Drawer in the Story Options or
						choose a different skin (or night mode🌛) from the Global Knobs to see!
					</span>
					<Drawer
						noAnimation={noDrawerAnimation}
						onHide={action('onHide')}
						open={boolean('open', Config)}
						style={drawerStyle}
					>
						<header>
							<Heading
								color={select('color', headingValues.colors, HeadingConfig, '')}
								showLine={boolean('showLine', HeadingConfig)}
								size={select('size', headingValues.sizes, HeadingConfig, '')}
								spacing={select('spacing', headingValues.spacings, HeadingConfig, '')}
							>
								{text('header', Config, '[insert witty header text]')}
							</Heading>
						</header>
						<BodyText>
							This Drawer is using a <a href="./?path=/story/agate--heading">Heading</a> component
							in the <em>header</em> slot and plain text for the <em>footer</em> slot.<br />
							<br />
							The Heading props can be adjusted in Story Options.
						</BodyText>
						<footer>
							{text('footer', Config, '')}
						</footer>
					</Drawer>
				</BodyText>
			);
		},
		{
			text: 'The basic Drawer'
		}
	);
