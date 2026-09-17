/** Hidden field meant only for bots. Real users never see or fill it. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div className="hp" aria-hidden="true">
      <label htmlFor={id}>Website</label>
      <input
        id={id}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
