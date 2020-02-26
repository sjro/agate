import utilEvent from '@enact/ui/useScroll/utilEvent';
import {useEffect} from 'react';

const usePreventScroll = (props, instances, context) => {
	const {scrollContentRef} = instances;
	const {scrollMode} = context;

	// Hooks

	useEffect(() => {
		const {rtl} = props;
		const containerNode = scrollContentRef.current;

		if (scrollMode === 'translate' && containerNode) {
			const preventScroll = () => {
				containerNode.scrollTop = 0;
				containerNode.scrollLeft = rtl ? containerNode.scrollWidth : 0;
			};

			utilEvent('scroll').addEventListener(containerNode, preventScroll);

			return () => {
				// remove a function for preventing native scrolling by Spotlight
				utilEvent('scroll').removeEventListener(containerNode, preventScroll);
			};
		}
	}, [props, scrollMode]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default usePreventScroll;
export {
	usePreventScroll
};