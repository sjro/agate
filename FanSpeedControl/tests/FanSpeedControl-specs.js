import {mount} from 'enzyme';
import React from 'react';
import FanSpeedControl from '../FanSpeedControl';

describe('FanSpeedControl Specs', () => {
	test('should change value when clicking on a certain arc segment', () => {
		const handleChange = jest.fn();
		const fanSpeedControl = mount(
			<FanSpeedControl
				onChange={handleChange}
				min={1}
				max={10}
			/>
		);
		// find second Arc and click on it
		fanSpeedControl.find('Arc').at(1).find('path').at(1).simulate('click');

		const expected = 2;
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);

		// find fourth Arc and click on it
		fanSpeedControl.find('Arc').at(3).find('path').at(1).simulate('click');

		const secondExpected = 4;
		const secondActual = handleChange.mock.calls[1][0].value;
		expect(secondActual).toBe(secondExpected);

		// find tenth Arc and click on it
		fanSpeedControl.find('Arc').at(9).find('path').at(1).simulate('click');

		const thirdExpected = 10;
		const thirdActual = handleChange.mock.calls[2][0].value;
		expect(thirdActual).toBe(thirdExpected);
	});

	test('should not call onChange handler when disabled', () => {
		const handleChange = jest.fn();
		const fanSpeedControl = mount(
			<FanSpeedControl
				disabled
				onChange={handleChange}
				min={1}
				max={10}
			/>
		);
		// find second Arc and click on it
		fanSpeedControl.find('Arc').at(1).find('path').at(1).simulate('click');

		const expected = 0;
		const actual = handleChange.mock.calls.length;
		expect(actual).toBe(expected);
	});
});
