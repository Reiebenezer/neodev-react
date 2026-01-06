import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('playground', 'routes/playground.tsx'),
    route('docs', 'routes/docs/layout.tsx', [
      index('routes/docs/index.tsx'),
      route('welcome', 'routes/docs/welcome.tsx'),
      route('interface', 'routes/docs/interface.tsx'),

      route('frames-and-blocks', 'routes/docs/frames-and-blocks.tsx'),
      route('style-blocks', 'routes/docs/style-blocks.tsx'),

      route('imports', 'routes/docs/frame-imports.tsx'),
      route('keyboard', 'routes/docs/keyboard.tsx'),
    ]),
  ]),

  route('preview', 'routes/preview.tsx'),
] satisfies RouteConfig;
