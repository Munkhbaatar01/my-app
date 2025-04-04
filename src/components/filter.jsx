import { useState } from "react";

export default function Filter({ onFilterChange }) {
    const [filters, setFilters] = useState({
        name: "",
        color: "",
        minPrice: "",
        maxPrice: "",
    });

    const handleChange = (sel) => {
        const { name, value } = sel.target;
        const newFilters = { ...filters, [name]: value };
        const minPrice = newFilters.minPrice !== "" ? Number(newFilters.minPrice) : 0;
        const maxPrice = newFilters.maxPrice !== "" ? Number(newFilters.maxPrice) : Infinity;

        setFilters(newFilters);
        onFilterChange({ ...newFilters, priceRange: [minPrice, maxPrice] });  
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleChange}
                    placeholder="Search by name"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 mb-1">Select Color</label>
                <select
                    name="color"
                    value={filters.color}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Select a color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                    <option value="black">Black</option>
                    <option value="pink">Pink</option>
                    <option value="orange">Orange</option>
                    <option value="brown">Brown</option>
                    <option value="gray">Gray</option>
                    <option value="cyan">Cyan</option>
                    <option value="indigo">Indigo</option>
                </select>
            </div>
            <div className="flex-1 min-w-[150px]">
                <label className="block text-gray-700 mb-1">Min Price</label>
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice || ""}
                    onChange={handleChange}
                    placeholder="Min price"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="flex-1 min-w-[150px]">
                <label className="block text-gray-700 mb-1">Max Price</label>
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice || ""}
                    onChange={handleChange}
                    placeholder="Max price"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
        </div>
    );
}
