import Vector from '@reiebenezer/ts-utils/vector';
import { createTemplateBlock, createBlock } from './Block';
import type { PlaygroundContextProps } from './context';
import { createFrame } from './Frame';
import { uniqueKeyedString as id } from '../utils';
import { Choice } from '../generics/properties/Choice';

const templateFrames: PlaygroundContextProps['frames'] = [
  // The template frame. This is copy-only, so any elements here are not removed.
  createFrame(
    'template',
    [
      // p
      createTemplateBlock('Paragaph Text', 'p', {
        text: {
          content: 'Hello NeoDev!',
        },
        style: {
          fontSize: 16,
          fontWeight: Choice(['normal', 'bold'], 'normal'),
        },
      }),

      // h1
      createTemplateBlock('Main Title', 'h1', {
        text: {
          content: 'Main Title',
        },
        style: {
          fontSize: 40,
          fontWeight: Choice(['normal', 'bold'], 'bold'),
        },
      }),

      // h2
      createTemplateBlock('Section Title', 'h2', {
        text: {
          content: 'Section Title',
        },
        style: {
          fontSize: 32,
          fontWeight: Choice(['normal', 'bold'], 'bold'),
        },
      }),

      // h3
      createTemplateBlock('Subtitle', 'h3', {
        text: {
          content: 'Subtitle',
        },
        style: {
          fontSize: 24,
          fontWeight: Choice(['normal', 'bold'], 'bold'),
        },
      }),

      // a
      createTemplateBlock('Link', 'a', {
        text: {
          content: 'Link',
          href: 'https://github.com/Reiebenezer/Neodev',
        },
        style: {
          fontSize: 16,
          fontWeight: Choice(['normal', 'bold'], 'normal'),
          textDecoration: Choice([
            'none',
            'underline',
            'overline',
            'line-through',
            'blink',
          ]),
        },
      }),

      // img
      createTemplateBlock('image', 'img', {
        image: {
          src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
          alt: 'body of water surrounded by trees (from Unsplash.com)',
        },
      }),
    ],
    Vector.from(20, 80),
    'Template Frame'
  ),

  createFrame(
    id('frame'),
    [
      createBlock('Paragaph Text', 'p', {
        text: {
          content: 'Hello NeoDev!',
        },

        style: {
          fontSize: 16,
          fontWeight: Choice(['normal', 'bold'], 'normal'),
        },
      }),
    ],
    Vector.from(350, 80),
    'Main'
  ),
];

export default templateFrames;
