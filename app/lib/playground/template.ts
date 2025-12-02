import Vector from '@reiebenezer/ts-utils/vector';
import {
  createTemplateBlock,
  createBlock,
  createStyleTemplateBlock,
} from './Block';
import type { PlaygroundContextProps } from './context';
import { createFrame } from './Frame';
import { uniqueKeyedString as id } from '../utils';
import { Choice } from '../generics/properties/Choice';
import { Color } from '@reiebenezer/ts-utils/color';
import { type ProvidedFonts } from '../font-loader';

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
          fontFamily: Choice<ProvidedFonts>(
            [
              'Poppins',
              'Inter',
              'Arial',
              'Montserrat',
              'Times New Roman',
              'Merriweather',
              'Playfair Display',
              'Oswald',
              'Bebas Neue',
              'Indie Flower',
              'Caveat',
              'Satisfy',
              'Great Vibes',
            ],
            'Poppins'
          ),
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
          fontFamily: Choice<ProvidedFonts>(
            [
              'Poppins',
              'Inter',
              'Arial',
              'Montserrat',
              'Times New Roman',
              'Merriweather',
              'Playfair Display',
              'Oswald',
              'Bebas Neue',
              'Indie Flower',
              'Caveat',
              'Satisfy',
              'Great Vibes',
            ],
            'Poppins'
          ),
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
          fontFamily: Choice<ProvidedFonts>(
            [
              'Poppins',
              'Inter',
              'Arial',
              'Montserrat',
              'Times New Roman',
              'Merriweather',
              'Playfair Display',
              'Oswald',
              'Bebas Neue',
              'Indie Flower',
              'Caveat',
              'Satisfy',
              'Great Vibes',
            ],
            'Poppins'
          ),
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
          fontFamily: Choice<ProvidedFonts>(
            [
              'Poppins',
              'Inter',
              'Arial',
              'Montserrat',
              'Times New Roman',
              'Merriweather',
              'Playfair Display',
              'Oswald',
              'Bebas Neue',
              'Indie Flower',
              'Caveat',
              'Satisfy',
              'Great Vibes',
            ],
            'Poppins'
          ),
          fontSize: 24,
          fontWeight: Choice(['normal', 'bold'], 'bold'),
        },
      }),

      // a
      createTemplateBlock('Link', 'a', {
        text: {
          content: 'Link',
          href: 'https://github.com/Reiebenezer/neodev-react',
        },
        style: {
          fontFamily: Choice<ProvidedFonts>(
            [
              'Poppins',
              'Inter',
              'Arial',
              'Montserrat',
              'Times New Roman',
              'Merriweather',
              'Playfair Display',
              'Oswald',
              'Bebas Neue',
              'Indie Flower',
              'Caveat',
              'Satisfy',
              'Great Vibes',
            ],
            'Poppins'
          ),
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

      // ------------------------------------------------------------------------------------
      // STYLES
      // ------------------------------------------------------------------------------------

      // background color
      createStyleTemplateBlock('Background Color', {
        backgroundColor: Color('#004eff'),
      }),
      createStyleTemplateBlock('Text Color', { color: Color('#004eff') }),
      createStyleTemplateBlock('Line Spacing', { lineHeight: 1.5 }),
      createStyleTemplateBlock('Text Alignment', {
        textAlign: Choice(['left', 'center', 'right'], 'left'),
      }),
      createStyleTemplateBlock('Width', { width: 360 }),
      createStyleTemplateBlock('Height', { height: 360 }),

      createStyleTemplateBlock('Margin (All Sides)', { margin: 16 }),
      createStyleTemplateBlock('Left Margin', { marginLeft: 16 }),
      createStyleTemplateBlock('Top Margin', { marginTop: 16 }),
      createStyleTemplateBlock('Right Margin', { marginRight: 16 }),
      createStyleTemplateBlock('Bottom Margin', { marginBottom: 16 }),

      createStyleTemplateBlock('Padding (All Sides)', { padding: 16 }),
      createStyleTemplateBlock('Left Padding', { paddingLeft: 16 }),
      createStyleTemplateBlock('Top Padding', { paddingTop: 16 }),
      createStyleTemplateBlock('Right Padding', { paddingRight: 16 }),
      createStyleTemplateBlock('Bottom Padding', { paddingBottom: 16 }),

      createStyleTemplateBlock('Alignment', {
        display: Choice(['grid', 'flex'], 'flex'),
        flexDirection: Choice(
          ['row', 'column', 'row-reverse', 'column-reverse'],
          'row'
        ),
        justifyContent: Choice(['start', 'center', 'end'], 'center'),
        alignItems: Choice(['start', 'center', 'end'], 'center'),
      }),
    ],
    Vector.from(20, 80),
    'Template Frame'
  ),

  createFrame(
    id('frame'),
    [
      // h1
      createBlock('Main Title', 'h1', {
        text: {
          content: 'Hello NeoDev User!',
        },
        style: {
          fontFamily: Choice<ProvidedFonts>(
            [
              'Poppins',
              'Inter',
              'Arial',
              'Montserrat',
              'Times New Roman',
              'Merriweather',
              'Playfair Display',
              'Oswald',
              'Bebas Neue',
              'Indie Flower',
              'Caveat',
              'Satisfy',
              'Great Vibes',
            ],
            'Inter'
          ),
          fontSize: 40,
          fontWeight: Choice(['normal', 'bold'], 'bold'),
        },
      }),
      // p
      createBlock('Paragaph Text', 'p', {
        text: {
          content:
            'Try dragging different blocks from the template frame to the Main frame, or click on my block to change my properties!',
        },
        style: {
          fontFamily: Choice<ProvidedFonts>(
            [
              'Poppins',
              'Inter',
              'Arial',
              'Montserrat',
              'Times New Roman',
              'Merriweather',
              'Playfair Display',
              'Oswald',
              'Bebas Neue',
              'Indie Flower',
              'Caveat',
              'Satisfy',
              'Great Vibes',
            ],
            'Inter'
          ),
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
