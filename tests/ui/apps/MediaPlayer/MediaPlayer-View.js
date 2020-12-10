import Heading from '../../../../Heading';
import MediaPlayer from '../../../../MediaPlayer';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const audioFiles = [
	'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3',
	'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Oceanic-Dawn-160.mp3',
	'https://sampleswap.org/mp3/artist/26546/benzoul_lovevoodoo-160.mp3',
	'https://sampleswap.org/mp3/artist/19139/MarkNine_In-my-Place-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Dont-Forget-To-Be-Yourself-160.mp3'
];

const app = (props) => <div {...props}>
	<div style={{height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
		<div>
			<Heading>Media Player Default</Heading>
			<MediaPlayer id="mediaPlayerDefault">
				{
					audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
				}
			</MediaPlayer>
		</div>
		<div>
			<Heading>Media Player Disabled</Heading>
			<MediaPlayer disabled id="mediaPlayerDisabled">
				{
					audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
				}
			</MediaPlayer>
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
