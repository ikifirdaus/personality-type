// components/Button/ButtonSubmit.tsx
export function ButtonSubmit({
  children,
  loading = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
        loading ? "opacity-80 cursor-not-allowed" : ""
      }`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {loading ? "Submitting..." : children}
    </button>
  );
}
