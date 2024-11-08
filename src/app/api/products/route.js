import Product from "@/lib/models/Product";
import connectToDb from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const products = await Product.find();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Could not find products " + error.message }),
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    await connectToDb();
    const newProduct = new Product(
      body
    );
    await newProduct.save();
    return new NextResponse(
      JSON.stringify({ message: "Product created", product: newProduct }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "error creating OPOPOPOP " + error.message }),
      { status: 500 }
    );
  }
};

export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { productId, name, price, measurement, image } = body;

    await connectToDb();

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { name, price, measurement, image },
      { new: true }
    );

    if (!updatedProduct)
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 400 }
      );

    return new NextResponse(
      JSON.stringify({
        message: "Products is updated",
        product: updatedProduct,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "error in catch block : " + error.message }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return new NextResponse(JSON.stringify({ message: "id is required" }), {
        status: 400,
      });
    }

    await connectToDb();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return new NextResponse(JSON.stringify({ message: "Product not found" }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error deleting product: " + error.message}),
      { status: 400 }
    );
  }
};
