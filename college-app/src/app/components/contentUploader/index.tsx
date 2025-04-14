"use client";
    
import Icon from "@mdi/react";
import React, { useMemo, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { mdiChevronDown, mdiCloudUploadOutline } from "@mdi/js";
// import { uploadFile, uploadFileCloudinary } from '@services/file.service';
import classNames from "classnames";
import { Spinner } from "../spinner";
import { Label } from "@/components/ui/label";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

interface IFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  lastModifiedDate: string;
}

interface IContentUploader {
  id?: string;
  className?: string;
  label?: string;
  sublabel?: string;
  imageUrl?: string;
  required?: boolean;
  storageLocation?: string;
  variant?: "default" | "profile" | "settings";
  loading?: boolean;
  guidelines?: any[];
  onUploadSuccess?: (downloadUrl: string | null, imageFile?: IFile) => void;
  onUploadError?: (error: string) => void;
  shapeVariant?: "round" | "tile" | "curved";
  businessId?: string;
  onFileChange?: (file: File) => void;
  immediateUpload?: boolean;
}
const AvatarUploader: React.FC<IContentUploader> = ({
  id,
  imageUrl,
  label,
  required,
  variant = "default",
  loading,
  onUploadSuccess,
  onUploadError,
  shapeVariant,
  guidelines,
  businessId,
  onFileChange,
  immediateUpload = true, // for backward compatibility
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const handleChange = async (newFile: File) => {
    setFile(newFile);
    if (!immediateUpload) {
      onFileChange?.(newFile);
    } else {
      try {
        setUploading(true);
        // const resp = await uploadFile(newFile, businessId);
        // const url = resp.file;
        // onUploadSuccess(url, resp);
      } catch (error) {
        // onUploadError(error?.message);
      } finally {
        setUploading(false);
      }
    }
  };
  const busy = loading || uploading;
  const displayImageUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : imageUrl),
    [file, imageUrl]
  );
  if (variant === "profile") {
    return (
      <div className="overflow-hidden">
        <FileUploader
          className="flex justify-center"
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label=""
          disabled={busy}
          maxSize={2}
        //   onSizeError={() => toast.error("The uploaded image is too large")}
        >
          <div className={classNames("relative", busy && " opacity-50")}>
            {busy && (
              <div className="absolute top-0 bottom-0 left-0 right-0 grid place-items-center z-10 ">
                <Spinner />
              </div>
            )}
            {/* <Avatar
              size={"32"}
              className="border-2 border-primary"
              avatarImage={displayImageUrl || "/assets/img/user.svg"}
              bgColor="bg-black-dark"
              variant={shapeVariant}
            /> */}
            <img src={displayImageUrl} alt="uploaded image" />
          </div>

          <p
            className={classNames(
              "text-sm  hover:underline text-primary text-center mt-2",
              busy ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            )}
          >
            Change
          </p>
        </FileUploader>
      </div>
    );
  }

  return (
    <div>
      {label && (
        <Label title={label} />
      )}
      <div className=" border-dotted border-2 rounded-2xl py-12">
        <div className="overflow-hidden">
          <FileUploader
            className="flex justify-center"
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            label="Upload Artwork here"
            maxSize={10}
            // onSizeError={() => toast.error("The uploaded image is too large")}
          >
            <div className="flex items-center justify-center cursor-pointer">
              <div className="flex flex-col items-center ">
                {displayImageUrl ? (
                  <img src={displayImageUrl} alt="uploaded image" />
                ) : (
                  <Icon
                    className="text-dark bg-[#F0F2F5] p-3 rounded-full"
                    size={2.5}
                    path={mdiCloudUploadOutline}
                  ></Icon>
                )}
                <h6 className="font-semibold text-sm mt-3 ">
                  <span className="text-error">Click to upload here </span>
                  <span className="">or drag and drop</span>
                </h6>
                <p className="text-xs mt-1 text-grey-14 font-normal">
                  SVG, PNG or JPG (max. 800x400px)
                </p>{" "}
                {busy && <Spinner className="mt-3" />}
              </div>
            </div>
          </FileUploader>
        </div>
      </div>
      {/* <ol className="ml-4 my-0 flex flex-col">
        {guidelines?.map((guideline) => (
          <li
            key={guideline.title}
            className="text-sm mt-2  text-grey-14 font-normal "
          >
            {guideline.title}
          </li>
        ))}
      </ol> */}
    </div>
  );
};

export default AvatarUploader;
