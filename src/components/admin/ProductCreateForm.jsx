"use client";
import { useState } from "react";
import RichTextEditor from "../RichTextEditor";
import GlobalToast from "@/components/GlobalToast";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function ProductCreateForm() {
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    idealFor: "Fashion",
    brand: "",
    type: "",
    stock: "",
    images: [],
    sizes: [],
    color: "",
    clothType: "",
    jewelleryType: "",
    jewelleryColor: "",
  });

  const uploadImages = async () => {
    const urls = [];
    for (let file of files) {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      urls.push(json.url);
    }
    return urls;
  };

const handleSubmit = async () => {
  setLoading(true);
  try {
    const imageUrls = await uploadImages();

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        images: imageUrls,
        price: +form.price,
        stock: +form.stock,
      }),
    });

    const result = await res.json();
    console.log("Saved response:", result);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-4 max-w-2xl">
        <select
        value={form.idealFor}
        className="border w-full p-2"
        onChange={(e) => {
          const value = e.target.value;
          setForm({
            ...form,
            idealFor: value,
            sizes: [],
            clothType: "",
            jewelleryType: "",
            jewelleryColor: "",
          });
        }}
      >
        <option>Fashion</option>
        <option>Jewellery</option>
      </select>


      {form.idealFor === "Fashion" && (
        <>
          <label>Sizes</label>
          <select
            multiple
            className="border w-full p-2"
            onChange={(e) =>
              setForm({
                ...form,
                sizes: Array.from(e.target.selectedOptions).map((o) => o.value),
              })
            }
          >
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>

          <select
            value={form.clothType}
            className="border w-full p-2"
            onChange={(e) =>
              setForm({ ...form, clothType: e.target.value })
            }
          >
            <option value="">Select Cloth Type</option>
            <option>Co-ord Set</option>
            <option>Top</option>
            <option>Dress</option>
            <option>Saree</option>
            <option>Pants</option>
          </select>
        </>
      )}

      {form.idealFor === "Jewellery" && (
        <>
          <select
            value={form.jewelleryType}
            className="border w-full p-2"
            onChange={(e) =>
              setForm({ ...form, jewelleryType: e.target.value })
            }
          >
            <option value="">Select Jewellery Type</option>
            <option>Ring</option>
            <option>Set</option>
            <option>Bracelet</option>
            <option>Earrings</option>
          </select>

          <select
            value={form.jewelleryColor}
            className="border w-full p-2"
            onChange={(e) =>
              setForm({ ...form, jewelleryColor: e.target.value })
            }
          >
            <option value="">Select Colour</option>
            <option>Silver</option>
            <option>Gold</option>
          </select>
        </>
      )}


        <input
        placeholder="Color"
        className="border w-full p-2 capitalize"
        value={form.color}
        onChange={(e) => setForm({ ...form, color: e.target.value })}
      />

      <input
        placeholder="Name"
        className="border w-full p-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <label className="block text-sm font-">Description</label>
      <RichTextEditor
        value={form.description}
        onChange={(value) => setForm({ ...form, description: value })}
      />

      <input
        placeholder="Brand"
        className="border w-full p-2"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
      />
      {/* <input
        placeholder="Type"
        className="border w-full p-2"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      /> */}
      <input
        placeholder="Price"
        type="number"
        className="border w-full p-2"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Stock"
        type="number"
        className="border w-full p-2"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      

    

    
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          setFiles(Array.from(e.target.files).slice(0, 10))
        }
        className="border w-full p-2"
      />

      <div className="grid grid-cols-5 gap-2">
        {files.map((file, i) => (
          <img
            key={i}
            src={URL.createObjectURL(file)}
            alt=""
            className="h-20 w-full object-cover rounded"
          />
        ))}
      </div>

      <button
        className="bg-pink-500 rounded text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Product"}
      </button>

      {toast && <GlobalToast {...toast} />}
    </div>
  );
}
