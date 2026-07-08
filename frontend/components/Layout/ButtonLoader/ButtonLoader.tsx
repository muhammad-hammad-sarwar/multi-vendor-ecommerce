export default function ButtonLoader() {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
      <span className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-white animate-bounce" />
    </div>
  );
}
