"use client";
import React, { useRef, useState } from "react";
import { Image, ImageKitProvider, upload } from "@imagekit/next";
import config from "@/lib/config";
import Imagekit from "imagekit";
import { toast } from "@/components/ui/toast";
const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    // const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    const response = await fetch("/api/auth/imagekit");

    // if (!response.ok) {
    //   const errorText = await response.text();
    //   throw new Error(`Request failed with status ${error.Text}`);
    // }
    if (!response.ok) {
      const errorText = await response.text();
      console.error("ImageKit API error:", errorText);
      throw new Error(`Request failed: ${response.status} - ${errorText}`);
    }
    const data = await response.json();

    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{}>(null);

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.add({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onError = (error: unknown) => {
    console.error("Upload failed:", error);

    toast.add({
      title: "Upload failed",
      description: "Please try again later.",
      variant: "destructive",
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <input
        type="file"
        ref={ikUploadRef}
        className="hidden"
        accept="image/*"
        onChange={async (e) => {
          const selectedFile = e.target.files?.[0];
          if (!selectedFile) return;

          try {
            const { signature, expire, token } = await authenticator();

            const result = await upload({
              file: selectedFile,
              fileName: selectedFile.name,
              publicKey,
              signature,
              expire,
              token,
            });

            onSuccess(result);
          } catch (error) {
            onError(error);
          } finally {
            e.target.value = "";
          }
        }}
      />
      <button
        className="upload-btn cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <Image
          src={file.filePath}
          alt="Uploaded image"
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
