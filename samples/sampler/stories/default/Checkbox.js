import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Checkbox, {CheckboxBase} from '@enact/agate/Checkbox';

import iconNames from './icons';

Checkbox.displayName = 'Checkbox';
const Config = mergeComponentMetadata('Checkbox', CheckboxBase, Checkbox);

storiesOf('Agate', module)
	.add(
		'Checkbox',
		() => {
			return (
				<Checkbox
					disabled={boolean('disabled', Config)}
					indeterminate={boolean('indeterminate', Config)}
					indeterminateIcon={select('indeterminateIcon', ['', ...iconNames], Config)}
					onToggle={action('onToggle')}
				>
					{select('children', ['', ...iconNames], Config)}
				</Checkbox>
			);
		},
		{
			text: 'The basic Checkbox'
		}
	);
