export function MessageSkeleton() {
  return (
    <div className="space-y-5 p-5 animate-pulse">
      <div className="flex justify-start">
        <div className="h-8 w-52 rounded-2xl rounded-bl-sm bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex justify-end">
        <div className="h-8 w-40 rounded-2xl rounded-br-sm bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex justify-start">
        <div className="h-8 w-64 rounded-2xl rounded-bl-sm bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex justify-end">
        <div className="h-8 w-56 rounded-2xl rounded-br-sm bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
