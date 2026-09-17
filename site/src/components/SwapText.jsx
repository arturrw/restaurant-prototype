/* On hover, the original line slides up and out while an identical
   copy slides up into its place from below — CSS-only, driven by the
   parent link's :hover so it needs no JS or animation library. */
export default function SwapText({ children, as: Tag = 'span', className = '', ...rest }) {
  return (
    <Tag className={['swap', className].filter(Boolean).join(' ')} {...rest}>
      <span className="swap-track">
        <span className="swap-line">{children}</span>
        <span className="swap-line" aria-hidden="true">{children}</span>
      </span>
    </Tag>
  );
}
