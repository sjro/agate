/* eslint-disable react/jsx-no-bind */

import PropTypes from 'prop-types';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {mergeComponentMetadata} from '@enact/storybook-utils';

import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panels, Panel, BreadcrumbPanels} from '@enact/agate/Panels';
import kind from '@enact/core/kind';
import Route from "@enact/ui/Routable/Route";
import Routable, {Link} from "@enact/ui/Routable";
import {SlideLeftArranger} from "@enact/ui/ViewManager";
import Item from "../../../../Item";

Panels.displayName = 'Panels';
const Config = mergeComponentMetadata('Panels', Panels);

const FirstPanel = kind({
	name: 'FirstPanel',

	propTypes: {
		onClick: PropTypes.func
	},

	render: ({onClick, ...rest}) => (
		<Panel {...rest}>
			<Header title="First Panel" />
			<Button onClick={onClick}>Click me</Button>
			<Link path={"/app/home2/settings6"}>Settings6</Link>
		</Panel>
	)
});

const SecondPanel = kind({
	name: 'SecondPanel',

	propTypes: {
		onClick: PropTypes.func
	},

	render: ({onClick, ...rest}) => (
		<Panel {...rest}>
			<Header title="Second Panel" />
			<Item onClick={() => onClick("third")}>To third</Item>
			<Item onClick={() => onClick("fourth")}>To fourth</Item>
		</Panel>
	)
});

const ThirdPanel = kind({
	name: 'ThirdPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="ThirdPanel Panel" />
			<Button>Click me</Button>
		</Panel>
	)
});

const FourthPanel = kind({
	name: 'FourthPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="FourthPanel Panel" />
			<Button>Click me</Button>
		</Panel>
	)
});

const RoutablePanels = Routable({navigate: 'onBack'}, Panels)
const BasicRoutablePanels = () => {
	const [path, setPath] = React.useState("/app");
	const goTo = (path) => setPath(path);

	const onFirstPanel = (ev) => setPath( 'app');
	const	onSecondPanel= (ev ) => setPath('app/home');
	const	onThirdPanel= (ev ) => setPath('app/home/settings1');
	const	onFourthPanel= (ev ) => setPath('app/home/settings2');

	const onSecondPanelClick = (path) => {
		if (path === "third") {
			setPath('app/home/settings1');
		} else  setPath('app/home/settings2')
	}

	const onBack = () => {

	}


	return (
		<div>
			<Button>Click me</Button>

		<RoutablePanels path={path} arranger={SlideLeftArranger} onBack={onFirstPanel}>
			<Route path="app" component={FirstPanel} title="About Routable Panels Pattern" onClick={onSecondPanel}>
				<Route path="home" component={SecondPanel} onClick={onSecondPanelClick}>
					<Route path="settings1" component={ThirdPanel} onClick={onSecondPanel} />
					<Route path="settings2" component={FourthPanel} onClick={onSecondPanel}/>
				</Route>
				<Route path="home1" component={SecondPanel}>
					<Route path="settings3" component={ThirdPanel} />
				</Route>
				<Route path="home2" component={SecondPanel}>
					<Route path="settings4" component={ThirdPanel} />
				</Route>
			</Route>
			<Route path="admin" component={FirstPanel} />
			<Route path="help" component={FirstPanel} />
		</RoutablePanels>
		</div>
	);
};

storiesOf('Agate', module)
	.add(
		'RoutablePanels',
		() => (<BasicRoutablePanels />),
		{
			props: {
				noScroller: true,
				noPanels: true
			},
			text: 'The basic RoutablePanels'
		}
	);