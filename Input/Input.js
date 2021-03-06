/**
 * Agate styled input components.
 *
 * @example
 * <Input placeholder="Enter text here" />
 *
 * @module agate/Input
 * @exports Input
 * @exports InputBase
 * @exports InputDecorator
 */

import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import InputDecoratorIcon from './InputDecoratorIcon';
import InputSpotlightDecorator from './InputSpotlightDecorator';
import {extractInputProps} from './util';

import componentCss from './Input.module.less';

/**
 * An input component
 *
 * @class InputBase
 * @memberof agate/Input
 * @ui
 * @public
 */
const InputBase = kind({
	name: 'Input',

	propTypes: /** @lends agate/Input.InputBase.prototype */ {

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `decorator` - The root class name
		 * * `input` - The <input> class name
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Disables Input and makes it non-interactive.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Blurs the input when the "enter" key is pressed.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		dismissOnEnter: PropTypes.bool,

		/**
		 * Adds a `focused` class to the input decorator.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		focused: PropTypes.bool,

		/**
		 * The icon to be placed at the end of the input.
		 *
		 * @see {@link agate/Icon.Icon}
		 * @type {String}
		 * @public
		 */
		iconAfter: PropTypes.string,

		/**
		 * The icon to be placed at the beginning of the input.
		 *
		 * @see {@link agate/Icon.Icon}
		 * @type {String}
		 * @public
		 */
		iconBefore: PropTypes.string,

		/**
		 * Indicates [value]{@link agate/Input.InputBase.value} is invalid and shows
		 * [invalidMessage]{@link agate/Input.InputBase.invalidMessage}, if set.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		invalid: PropTypes.bool,

		/**
		 * The tooltip text to be displayed when the input is
		 * [invalid]{@link agate/Input.InputBase.invalid}.
		 *
		 * If this value is *falsy*, the tooltip will not be shown.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		invalidMessage: PropTypes.string,

		/**
		 * Called when blurred.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onBlur: PropTypes.func,

		/**
		 * Called when the input value is changed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Called when clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * Called when focused.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onFocus: PropTypes.func,

		/**
		 * Called when a key is pressed down.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onKeyDown: PropTypes.func,

		/**
		 * Text to display when [value]{@link agate/Input.InputBase.value} is not set.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * Indicates the content's text direction is right-to-left.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * The size of the input field icon.
		 *
		 * @type {('small'|'large')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large']),

		/**
		 * The type of input.
		 *
		 * Accepted values correspond to the standard HTML5 input types.
		 *
		 * @type {String}
		 * @see [MDN input types doc]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types}
		 * @default 'text'
		 * @public
		 */
		type: PropTypes.string,

		/**
		 * The value of the input.
		 *
		 * @type {String|Number}
		 * @public
		 */
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		disabled: false,
		dismissOnEnter: false,
		invalid: false,
		placeholder: '',
		type: 'text'
	},

	styles: {
		css: componentCss,
		className: 'decorator',
		publicClassNames: ['decorator', 'input']
	},

	handlers: {
		onChange: (ev, {onChange}) => {
			if (onChange) {
				onChange({value: ev.target.value});
			}
		}
	},

	computed: {
		// 'aria-label': ({placeholder, type, value}) => {
		// 	const title = (value == null || value === '') ? placeholder : '';
		// 	return calcAriaLabel(title, type, value);
		// },
		className: ({focused, invalid, styler}) => styler.append({focused, invalid}),
		// ensure we have a value so the internal <input> is always controlled
		value: ({value}) => typeof value === 'number' ? value : (value || '')
	},

	render: ({css, disabled, iconAfter, iconBefore, onChange, placeholder, size, type, value, ...rest}) => {
		const inputProps = extractInputProps(rest);
		delete rest.dismissOnEnter;
		delete rest.focused;
		delete rest.invalid;
		delete rest.invalidMessage;
		delete rest.rtl;

		return (
			<div {...rest} aria-disabled={disabled} disabled={disabled}>
				<InputDecoratorIcon position="before" size={size}>
					{iconBefore}
				</InputDecoratorIcon>
				<input
					{...inputProps}
					aria-disabled={disabled}
					className={css.input}
					disabled={disabled}
					onChange={onChange}
					placeholder={placeholder}
					tabIndex={-1}
					type={type}
					value={value}
				/>
				<InputDecoratorIcon position="after" size={size}>
					{iconAfter}
				</InputDecoratorIcon>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [InputBase]{@link agate/Input.InputBase} components.
 *
 * @hoc
 * @memberof agate/Input
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const InputDecorator = compose(
	Pure,
	Changeable,
	InputSpotlightDecorator,
	Skinnable
);

/**
 * A Spottable, Agate styled input component with embedded icon support.
 *
 * By default, `Input` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the component,
 * supply a value to `value` at creation time and update it in response to `onChange` events.
 *
 * @class Input
 * @memberof agate/Input
 * @extends agate/Input.InputBase
 * @mixes agate/Input.InputDecorator
 * @ui
 * @public
 */
const Input = InputDecorator(InputBase);

export default Input;
export {
	extractInputProps,
	Input,
	InputBase,
	InputDecorator
};
