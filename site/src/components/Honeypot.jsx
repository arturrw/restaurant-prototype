/* An input real visitors never see or reach, but a script that fills every
   field it finds will. Kept in the DOM (not display:none) since some bots
   skip hidden inputs — off-screen positioning fools those too. */
export default function Honeypot({ value, onChange, name = 'company' }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-5000px', width: 1, height: 1, overflow: 'hidden' }}
    >
      <label htmlFor={name}>Leave this field blank</label>
      <input
        id={name}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
