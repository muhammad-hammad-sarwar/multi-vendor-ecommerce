interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong while fetching the data.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
      <h2 className="text-lg font-semibold text-red-700">
        Failed to Fetch Data
      </h2>

      <p className="mt-2 max-w-md text-sm text-red-600">{message}</p>
    </div>
  );
}
