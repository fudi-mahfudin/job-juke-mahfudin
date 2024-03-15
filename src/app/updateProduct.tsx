"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/types/product";
import { cleanUrl } from "@/libs/helper";

export default function UpdateProduct(product: Product) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImageUrl] = useState(cleanUrl(product.images[0]));
  const [category, setCategory] = useState<number | undefined>(
    product.category.id
  );
  const [description, setDescription] = useState(product.description);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function getCategories() {
      const res = await fetch(`https://api.escuelajs.co/api/v1/categories`);

      const fetchedCategories: Category[] = await res.json();
      if (fetchedCategories) {
        setCategories(fetchedCategories);
      }
    }

    getCategories();
  }, []);

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`https://api.escuelajs.co/api/v1/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        categoryId: category,
        images: [imageUrl],
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
                className="select select-bordered w-full max-w-xs"
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold">Description</label>
              <textarea
                value={description}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered"
                placeholder="Description"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Image Link</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input w-full input-bordered"
                placeholder="https://api.lorem.space/image/fashion?w=640&h=480&r=4278"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
