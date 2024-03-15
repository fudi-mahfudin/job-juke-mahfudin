import DeleteProduct from "@/app/deleteProduct";
import UpdateProduct from "@/app/updateProduct";
import { Product } from "@/types/product";

async function getProductDetail(id: number) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  // return <div>Product {params.id}</div>;
  const product: Product = await getProductDetail(Number(params.id));

  if (!product) return;

  return (
    <div className="py-10 px-10">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={JSON.parse(product.images)} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <div className="mr-1">
              <UpdateProduct {...product} />
            </div>

            <DeleteProduct {...product} />
          </div>
        </div>
      </div>
    </div>
  );
}
