// Brand underscore, used in place of a leading "_".
// Blinks by default (terminal-cursor style); pass `static` where a steady mark
// reads better — e.g. repeated across a list of cards.
export default function Cursor({ static: isStatic = false }) {
  return <span className={isStatic ? undefined : 'animate-blink'}>_</span>
}
