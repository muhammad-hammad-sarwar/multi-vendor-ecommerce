"use client";

export default function ShopPageLoader() {
  return (
    <section className="min-h-screen bg-gray-100 px-10 py-10 animate-pulse">
      <div className="mx-auto flex max-w-7xl gap-8">
        {/* Sidebar */}

        <aside className="w-80 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="h-36 w-36 rounded-full bg-gray-200" />

            <div className="mt-6 h-7 w-40 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-28 rounded bg-gray-100" />
          </div>

          <div className="mt-10 space-y-7">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item}>
                <div className="mb-2 h-4 w-24 rounded bg-gray-300" />

                <div className="h-5 w-full rounded bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-3">
            <div className="h-12 rounded-xl bg-gray-300" />
            <div className="h-12 rounded-xl bg-gray-300" />
          </div>
        </aside>

        {/* Main */}

        <main className="flex-1">
          {/* Header */}

          <div className="mb-8 flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex gap-3">
              <div className="h-11 w-36 rounded-xl bg-gray-300" />
              <div className="h-11 w-36 rounded-xl bg-gray-200" />
              <div className="h-11 w-36 rounded-xl bg-gray-200" />
            </div>

            <div className="h-11 w-40 rounded-xl bg-gray-300" />
          </div>

          {/* Cards */}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <div className="h-56 bg-gray-200" />

                <div className="p-5">
                  <div className="h-6 w-2/3 rounded bg-gray-300" />

                  <div className="mt-5 flex justify-between">
                    <div>
                      <div className="h-3 w-12 rounded bg-gray-200" />
                      <div className="mt-2 h-5 w-16 rounded bg-gray-300" />
                    </div>

                    <div>
                      <div className="h-3 w-12 rounded bg-gray-200" />
                      <div className="mt-2 h-5 w-12 rounded bg-gray-300" />
                    </div>
                  </div>

                  <div className="mt-6 h-11 rounded-xl bg-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
