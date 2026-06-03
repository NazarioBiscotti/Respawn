export default function Badge({ children }) {
  return (
    <span className="px-2 py-1 text-xs rounded-full border border-white/10 text-white/70 bg-white/5">
      {children}
    </span>
  );
}