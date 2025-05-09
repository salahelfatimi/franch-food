import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/utils/uploadthing";
import { redirect } from "next/dist/server/api-utils";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));
  const category = formData.get("category");
  const customOptionsRaw = formData.get("customOptions");
  const file = formData.get("image");
  if (!name || !description || !category || !price || !customOptionsRaw || !file) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  try {
    const imageUrl = await utapi.uploadFiles(file);
    const customOptions = JSON.parse(customOptionsRaw);
    const product = await prisma.product.create({
      data: {
      name,
      description,
      price,
      category,
      imageUrl: imageUrl.data.ufsUrl,
      imageKey : imageUrl.data.key,
      customOptions: {
        create: customOptions.map((option) => ({
          name: option.name,
          price: parseFloat(option.price),
        })),
      },
      },
    });
    return NextResponse.json(product);
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }
}


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    if (id) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
          customOptions: true,
        },
      });
      if (!product) {
        return NextResponse.json({ error: "Product not found." }, { status: 404 });
      }
      return NextResponse.json(product);
    }else {
    const products = await prisma.product.findMany({
      include: {
        customOptions: true,
      },
    });
    return NextResponse.json(products);
    }
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = await searchParams.get("id");
  const imageKey = await searchParams.get("imageKey");
  console.log("Image Key:", imageKey);
  if (!id) {
    return NextResponse.json({ error: "Missing product ID." }, { status: 400 });
  }
  try {
    await prisma.customOption.deleteMany({
      where: { productId: parseInt(id) },
    });
    await utapi.deleteFiles(imageKey);
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Product deleted successfully." });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }
}

export async function PUT(req) {
  const formData = await req.formData();
  const id = formData.get("id");
  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));
  const category = formData.get("category");
  const customOptionsRaw = formData.get("customOptions");
  const file = formData.get("image");
  const imageUrl = formData.get("imageUrl");

  console.log(formData);

  // Validate required fields
  if (!id || !name || !description || !category || !price || !customOptionsRaw) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    // Handle image upload or use existing image URL
    const imageUrlData = file && file !== "undefined" ? (await utapi.uploadFiles(file)).data.ufsUrl : imageUrl;

    // Parse custom options
    const customOptions = JSON.parse(customOptionsRaw);

    // Update the product
    await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        category,
        imageUrl: imageUrlData,
        customOptions: {
          deleteMany: {}, // Delete existing custom options
          create: customOptions.map((option) => ({
            name: option.name,
            price: parseFloat(option.price),
          })),
        },
      },
    });

    return NextResponse.json({ message: "Product updated successfully." });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }
}

