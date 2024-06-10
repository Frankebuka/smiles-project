export default function Search() {
  return (
    <div>
      <label
        htmlFor="search"
        className="ml-px block pl-4 text-black text-2xl mt-6 font-semibold"
      >
        Search
      </label>
      <div className="relative mt-1 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-full h-10 border-gray-300 px-4 pr-16 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search Name"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-3.5 pointer-events-auto cursor-pointer">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
}
