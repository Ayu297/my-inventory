import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; 

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return alert("Nama kategori tidak boleh kosong!");

    try {
      const response = await axiosInstance.post("/categories", newCategory);
      setCategories([...categories, response.data]); 
      setNewCategory({ name: "" }); 
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Apakah yakin ingin menghapus kategori ini?")) return;

    try {
      await axiosInstance.delete(`/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Category List</h2>

      {/* Form Tambah Kategori */}
      <form onSubmit={handleAddCategory} className="mb-6 flex space-x-3">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Enter category name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ name: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </form>

      {/* Tabel Kategori */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">Category Name</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="border">
                  <td className="border p-3">{category.id}</td>
                  <td className="border p-3">{category.name}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-3">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
