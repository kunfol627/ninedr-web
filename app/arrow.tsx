type Direction = 'up-right' | 'down-right' | 'right' | 'left' | 'up' | 'down';

const paths: Record<Direction, string> = {
  'up-right': 'M5 19 19 5M5 5h14v14',
  'down-right': 'M5 5 19 19M5 19h14V5',
  right: 'M3 12h18M14 5l7 7-7 7',
  left: 'M21 12H3M10 5l-7 7 7 7',
  up: 'M12 21V3M5 10l7-7 7 7',
  down: 'M12 3v18M5 14l7 7 7-7',
};

/** Vector artwork keeps arrows identical across desktop and mobile fonts. */
export default function Arrow({ direction = 'up-right' }: { direction?: Direction }) {
  return <svg className="ui-arrow" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" focusable="false"><path d={paths[direction]} /></svg>;
}
