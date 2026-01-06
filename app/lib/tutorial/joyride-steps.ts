import type { Placement } from 'react-joyride';
import { FRAME_DATA } from '../constants';
import { getLastKeyedString } from '../utils';

export const steps = [
  {
    target: '[data-neodev-frame=template]',
    content:
      'This is the template frame. This frame contains all the blocks you need in NeoDev!',
  },
  {
    target: `[data-neodev-frame=${JSON.parse(localStorage.getItem(FRAME_DATA) ?? `[{"id":"-"},{"id":"${getLastKeyedString('frame')}"}]`)[1].id}]`,
    content:
      'This is the main frame. This is where you should place your blocks when building websites. Try dragging a block from the template frame to this frame!',
  },
  {
    target: `[data-id="${JSON.parse(localStorage.getItem(FRAME_DATA) ?? `[{"id":"-"},{"id":"${getLastKeyedString('frame')}","blocks":[{"id":"0"}]}]`)[1].blocks[0].id}"]`,
    content: 'Try clicking on this block! It should have a green border when clicked.',
  },
  {
    target: '[data-neodev-info-panel]',
    content: 'This is the info panel. Located here is the documentation, properties, and code preview.',
  },
  {
    target: '.neodev-docs',
    content: 'The documentation panel (or docs panel for short) contains all the information you need about NeoDev. You can find this in expanded view in https://neodev-cict.vercel.app/docs',
  },
  {
    target: '.neodev-properties',
    content: 'The properties panel displays what you could change in a block to create different results.',
  },
  {
    target: '.neodev-code-preview',
    content: '[Experts Only] The code preview panel shows what your NeoDev project would look like in production code.',
  },
  {
    target: '#preview',
    content: 'This is the Preview panel. This is how your website will look when built! Try changing something in the properties to see changes in action.'
  },
  
];
