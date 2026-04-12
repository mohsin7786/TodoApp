export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-5">
          <div className="flex items-start gap-4">
            <div className="skeleton w-6 h-6 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-5 w-3/4 rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
              <div className="flex gap-2"><div className="skeleton h-6 w-16 rounded-full" /><div className="skeleton h-6 w-20 rounded-full" /></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
