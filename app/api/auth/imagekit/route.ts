import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imageKit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imageKit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  try {
    const authenticationParameters =
        imageKit.getAuthenticationParameters();

    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit authentication error:", error);

    return NextResponse.json(
        { error: "Failed to generate ImageKit authentication parameters" },
        { status: 500 }
    );
  }
}