import { useState } from 'react';

const MultiSelect = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (value) => {
    const updated = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];

    onChange(updated);
  };

  const selectAll = () => onChange(options);
  const clearAll = () => onChange([]);

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-lg px-4 py-2 bg-white cursor-pointer"
      >
        {selected.length === 0
          ? `Select ${label}`
          : `${selected.length} selected`}
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg p-3">

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-2 px-2 py-1 border rounded"
          />

          {/* Options */}
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.map(option => (
              <label key={option} className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-3 text-sm">
            <button onClick={selectAll} className="text-blue-600">
              Select All
            </button>
            <button onClick={clearAll} className="text-red-600">
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
