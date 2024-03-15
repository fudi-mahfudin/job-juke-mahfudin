import type { Product } from "@/types/product";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import Link from "next/link";

async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Product() {
  const products: Product[] = await getProducts();

  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddProduct />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product name</th>
            <th>price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <Link href={`/products/${product.id}`} className="link">
                  {product.title}
                </Link>
              </td>
              <td>{product.price}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateProduct {...product} />
                </div>

                <DeleteProduct {...product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
