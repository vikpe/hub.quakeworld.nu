export const Debug = ({ value }) => {
  return (
    <div className="text-xs font-mono text-left">
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};
