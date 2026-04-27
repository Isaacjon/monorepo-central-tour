"use client"

import { useState } from "react"
import { FileUpload } from "ui"

export function FileUploadShowcase() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-muted-foreground text-sm font-medium">
        File upload (Figma example)
      </p>
      <FileUpload onFilesChange={setFiles} />
      {files.length > 0 ? (
        <p className="text-muted-foreground text-sm">
          Selected: {files.map((file) => file.name).join(", ")}
        </p>
      ) : null}
    </div>
  )
}
