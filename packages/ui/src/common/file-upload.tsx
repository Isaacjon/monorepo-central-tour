"use client"

import type { Accept } from "react-dropzone"
import { useDropzone } from "react-dropzone"

import UploadIcon from "../assets/icons/upload.svg"
import { cn } from "../lib/utils"

const defaultDescription = "SVG, PNG, JPG или GIF (макс. 800x400px)"
const defaultAccept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/svg+xml": [".svg"],
}

export type FileUploadProps = {
  onFilesChange?: (files: File[]) => void
  title?: string
  titleSuffix?: string
  description?: string
  accept?: Accept
  maxSize?: number
  multiple?: boolean
  disabled?: boolean
  className?: string
}

export function FileUpload({
  onFilesChange,
  title = "Нажмите чтобы загрузить",
  titleSuffix = "или перетаскивать",
  description = defaultDescription,
  accept = defaultAccept,
  maxSize = 2 * 1024 * 1024,
  multiple = false,
  disabled = false,
  className,
}: FileUploadProps) {
  const { getRootProps, getInputProps, open, isDragActive, isDragReject } =
    useDropzone({
      onDrop: (acceptedFiles) => onFilesChange?.(acceptedFiles),
      accept,
      maxSize,
      multiple,
      disabled,
      noClick: true,
      noKeyboard: true,
    })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-c-gray-200 bg-background flex h-[66px] w-[416px] items-center gap-3 rounded-xl border p-3 transition-colors",
        isDragActive && "border-primary bg-primary/5",
        isDragReject && "border-destructive bg-destructive/5",
        disabled && "cursor-not-allowed opacity-70",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex h-[42px] min-w-0 flex-1 flex-col justify-center gap-0.5">
        <p className="truncate text-center text-sm leading-5">
          <span className="text-primary font-semibold">{title}</span>{" "}
          <span className="text-c-gray-600 font-normal">{titleSuffix}</span>
        </p>
        <p className="text-c-gray-600 truncate text-center text-xs leading-[18px] font-normal">
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={open}
        disabled={disabled}
        aria-label="Open file upload dialog"
        className="border-c-gray-200 hover:bg-muted bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border p-2 text-black shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-visible:shadow-[0px_0px_0px_4px_color-mix(in_srgb,var(--color-primary)_24%,transparent)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
      >
        <UploadIcon className="size-4" />
      </button>
    </div>
  )
}
