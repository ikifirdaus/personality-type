export function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  );
}
