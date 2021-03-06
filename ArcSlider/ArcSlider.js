/**
 * Agate styled arc slider components and behaviors.
 *
 * @example
 * <ArcSlider />
 *
 * @module agate/ArcSlider
 * @exports ArcSlider
 * @exports ArcSliderBase
 * @exports ArcSliderDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import ri from '@enact/ui/resolution';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Arc from '../Arc';
import {angleToPosition} from '../Arc/utils';
import Skinnable from '../Skinnable';

import ArcSliderBehaviorDecorator from './ArcSliderBehaviorDecorator';
import {valueToAngle} from './utils';

import css from './ArcSlider.module.less';

/**
 * An arc slider component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [ArcSlider]{@link agate/ArcSlider.ArcSlider}.
 *
 * @class ArcSliderBase
 * @memberof agate/ArcSlider
 * @ui
 * @public
 */
const ArcSliderBase = kind({
	name: 'ArcSlider',

	propTypes: /** @lends agate/ArcSlider.ArcSliderBase.prototype */ {
		/**
		 * The color of the background arc.
		 *
		 * @type {String}
		 * @default #000000
		 * @public
		 */
		backgroundColor: PropTypes.string,

		/**
		 * Function that generates a reference to the arc svg.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * The end angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle.
		 *
		 * @type {Number}
		 * @default 250
		 * @public
		 */
		endAngle: PropTypes.number,

		/**
		 * The color of the foreground arc.
		 *
		 * @type {String}
		 * @default #0000ff
		 * @public
		 */
		foregroundColor: PropTypes.string,

		/**
		 * The maximum value of the slider and should be greater than min.
		 *
		 * @type {Number}
		 * @default 100
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of the slider.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		min: PropTypes.number,

		/**
		 * The radius of the arc circle.
		 *
		 * @type {Number}
		 * @default 150
		 * @public
		 */
		radius: PropTypes.number,

		/**
		 * Nodes to be inserted in the center of the ArcSlider.
		 *
		 * @type {Node}
		 * @public
		 */
		slotCenter: PropTypes.node,

		/**
		 * The start angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360.
		 *
		 * @type {Number}
		 * @default 30
		 * @public
		 */
		startAngle: PropTypes.number,

		/**
		 * The amount to increment or decrement the value.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * The stroke width of the arc slider.
		 *
		 * @type {Number}
		 * @default 6
		 * @public
		 */
		strokeWidth: PropTypes.number,

		/**
		 * The value of the slider.
		 *
		 * Defaults to the value of `min`.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		backgroundColor: '#000000',
		endAngle: 250,
		foregroundColor: '#0000ff',
		max: 100,
		min: 0,
		radius: 150,
		startAngle: 30,
		step: 1,
		strokeWidth: 6
	},

	styles: {
		css,
		className: 'arcSlider'
	},

	computed: {
		size : ({radius, strokeWidth}) => (radius * 2 - strokeWidth),
		style: ({radius, style}) => {
			const size = ri.scaleToRem(radius * 2);
			return {...style, height: size, width: size};
		}
	},

	render: ({backgroundColor, componentRef, endAngle, foregroundColor, max, min, radius, size, slotCenter, startAngle, strokeWidth, value, ...rest}) => {
		const valueAngle = valueToAngle(value, min, max, startAngle, endAngle);
		const knobPosition = angleToPosition(valueAngle, radius - (strokeWidth / 2), size);

		delete rest.step;

		return (
			<div {...rest}>
				<Arc
					className={css.arc}
					color={backgroundColor}
					endAngle={endAngle}
					radius={radius}
					startAngle={valueAngle}
					strokeWidth={strokeWidth}
				/>
				<Arc
					className={css.arc}
					color={foregroundColor}
					endAngle={valueAngle}
					radius={radius}
					startAngle={startAngle}
					strokeWidth={strokeWidth}
					pointerEvents="auto"
					componentRef={componentRef}
				>
					<circle
						cx={knobPosition.x}
						cy={knobPosition.y}
						fill={foregroundColor}
						r={ri.scaleToRem(15)}
					/>
				</Arc>
				<div className={css.valueDisplay}>
					{slotCenter}
				</div>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ArcSliderBase]{@link agate/ArcSlider.ArcSliderBase} components.
 *
 * @hoc
 * @memberof agate/ArcSlider
 * @mixes agate/ArcSlider.ArcSliderBehaviorDecorator
 * @mixes ui/Touchable.Touchable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ArcSliderDecorator = compose(
	Pure,
	ArcSliderBehaviorDecorator,
	Touchable,
	Skinnable
);

/**
 * An arc slider component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <ArcSlider backgroundColor="blue" endAngle={200} foregroundColor="red" radius={150} startAngle={0} step={2} />
 * ```
 *
 * @class ArcSlider
 * @memberof agate/ArcSlider
 * @extends agate/ArcSlider.ArcSliderBase
 * @mixes agate/ArcSlider.ArcSliderDecorator
 * @ui
 * @public
 */
const ArcSlider = ArcSliderDecorator(ArcSliderBase);

export default ArcSlider;
export {
	ArcSlider,
	ArcSliderBase,
	ArcSliderDecorator
};
