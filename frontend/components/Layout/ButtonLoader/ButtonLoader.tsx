import clsx from "clsx";

export default function ButtonLoader({ bg = "bg-white" }: { bg?: string }) {
  return (
    <div className="flex items-center justify-center gap-1">
      <span
        className={clsx(
          "h-2 w-2 rounded-full animate-bounce [animation-delay:-0.3s]",
          bg,
        )}
      />
      <span
        className={clsx(
          "h-2 w-2 rounded-full animate-bounce [animation-delay:-0.15s]",
          bg,
        )}
      />
      <span className={clsx("h-2 w-2 rounded-full animate-bounce", bg)} />
    </div>
  );
}
