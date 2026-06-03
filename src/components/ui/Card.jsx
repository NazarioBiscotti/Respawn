export default function Card({ children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      {children}
    </div>
  );
}