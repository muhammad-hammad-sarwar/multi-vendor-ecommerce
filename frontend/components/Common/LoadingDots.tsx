interface LoadingDotsProps {
  text?: string;
}

const LoadingDots = ({ text = "Loading..." }: LoadingDotsProps) => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3">
          <span className="h-4 w-4 rounded-full bg-green-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-4 w-4 rounded-full bg-green-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-4 w-4 rounded-full bg-emerald-600 animate-bounce" />
        </div>

        <p className="text-sm font-medium text-gray-500">{text}</p>
      </div>
    </div>
  );
};

export default LoadingDots;
