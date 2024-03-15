import DeleteProduct from "@/app/deleteProduct";
import UpdateProduct from "@/app/updateProduct";
import { cleanUrl, isValidUrl } from "@/libs/helper";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

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
  const product: Product = await getProductDetail(Number(params.id));

  if (!product) return;
  let imageUrl = product?.images?.[0];
  if (!isValidUrl(imageUrl)) {
    imageUrl = cleanUrl(imageUrl);
  }

  return (
    <div className="py-10 px-10">
      <Link href="/">
        <button className="btn btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Link>
      <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto">
        <figure>
          <Image src={imageUrl} width={500} height={500} alt="Product" />
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
