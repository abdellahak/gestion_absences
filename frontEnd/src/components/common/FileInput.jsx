import { useState, useRef, useEffect } from "react";
import {
  FaUpload,
  FaFile,
  FaTimes,
  FaCheck,
  FaImage,
  FaFilePdf,
  FaEye,
} from "react-icons/fa";

export default function FileInput({
  id,
  name,
  accept = "application/pdf,image/*",
  error,
  value,
  onChange,
  placeholder = "Choisir un fichier",
  className = "",
  required = false,
  currentFile = null,
  showCurrentFile = false,
  maxSize = 2 * 1024 * 1024, // 2MB default
  showPreview = true,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Cleanup preview URL when component unmounts or file changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const isImageFile = (file) => {
    return file && file.type && file.type.startsWith("image/");
  };

  const isPdfFile = (file) => {
    return (
      file &&
      (file.type === "application/pdf" ||
        file.name?.toLowerCase().endsWith(".pdf"))
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `La taille du fichier dépasse ${formatFileSize(maxSize)}`;
    }

    const acceptedTypes = accept.split(",").map((type) => type.trim());
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    const isAccepted = acceptedTypes.some(
      (type) =>
        file.type === type ||
        type === fileExtension ||
        (type.includes("/*") && file.type.startsWith(type.split("/")[0]))
    );

    if (!isAccepted) {
      return "Type de fichier non accepté";
    }

    return null;
  };

  const handleFileSelect = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      // You might want to show this error to the user
      console.error(validationError);
      return;
    }

    setSelectedFile(file);

    // Create preview URL for images
    if (isImageFile(file)) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    // Create a mock event for compatibility
    const mockEvent = {
      target: {
        files: [file],
        value: file.name,
      },
    };
    onChange(mockEvent);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    const mockEvent = {
      target: {
        files: [],
        value: "",
      },
    };
    onChange(mockEvent);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (file) => {
    if (typeof file === "string") {
      // For current files (string paths)
      const extension = file.split(".").pop()?.toLowerCase();
      if (["pdf"].includes(extension))
        return <FaFilePdf className="text-red-500 text-lg" />;
      if (["jpg", "jpeg", "png", "gif"].includes(extension))
        return <FaImage className="text-blue-500 text-lg" />;
      return <FaFile className="text-gray-500 text-lg" />;
    } else {
      // For File objects
      if (isPdfFile(file))
        return <FaFilePdf className="text-red-500 text-lg" />;
      if (isImageFile(file))
        return <FaImage className="text-blue-500 text-lg" />;
      return <FaFile className="text-gray-500 text-lg" />;
    }
  };

  const displayFile = selectedFile || (showCurrentFile && currentFile);

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        name={name}
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        required={required}
      />

      {/* Current file display (for updates) */}
      {showCurrentFile && currentFile && !selectedFile && (
        <div className="mb-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getFileIcon(currentFile)}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Fichier actuel
                </p>
                <p className="text-xs text-gray-600">{currentFile}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
            >
              Remplacer
            </button>
          </div>
        </div>
      )}

      {/* File Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer overflow-hidden
          ${
            isDragOver
              ? "border-brand-500 bg-brand-50 shadow-lg scale-[1.02]"
              : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:border-brand-400 hover:bg-brand-50 hover:shadow-md"
          }
          ${displayFile ? "p-4" : "p-8"}
        `}
        onClick={handleBrowseClick}
      >
        {displayFile ? (
          // Selected file display
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getFileIcon(displayFile)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {displayFile.name || displayFile}
                  </p>
                  {displayFile.size && (
                    <p className="text-xs text-gray-500">
                      {formatFileSize(displayFile.size)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {previewUrl && showPreview && isImageFile(displayFile) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowImagePreview(true);
                    }}
                    className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Aperçu"
                  >
                    <FaEye className="text-sm" />
                  </button>
                )}
                <div className="p-1.5 text-green-500 bg-green-50 rounded-lg">
                  <FaCheck className="text-sm" />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            {/* Image preview */}
            {previewUrl && isImageFile(displayFile) && showPreview && (
              <div className="mt-3 relative">
                <img
                  src={previewUrl}
                  alt="Aperçu"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity rounded-lg"></div>
              </div>
            )}
          </div>
        ) : (
          // Empty state
          <div className="text-center">
            <div
              className={`mx-auto h-16 w-16 flex items-center justify-center rounded-full mb-4 transition-all duration-300 ${
                isDragOver ? "bg-brand-100 scale-110" : "bg-gray-100"
              }`}
            >
              <FaUpload
                className={`h-8 w-8 transition-colors duration-300 ${
                  isDragOver ? "text-brand-600" : "text-gray-400"
                }`}
              />
            </div>
            <div className="space-y-2">
              <p
                className={`text-base font-medium transition-colors duration-300 ${
                  isDragOver ? "text-brand-600" : "text-gray-900"
                }`}
              >
                {isDragOver ? "Déposez le fichier ici" : placeholder}
              </p>
              <p className="text-sm text-gray-500">
                Glissez-déposez votre fichier ou cliquez pour parcourir
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>PDF, JPG, PNG</span>
                <span>•</span>
                <span>Max {formatFileSize(maxSize)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center gap-2">
            <FaTimes className="text-xs" />
            {error}
          </p>
        </div>
      )}

      {/* Image Preview Modal */}
      {showImagePreview && previewUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImagePreview(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={previewUrl}
              alt="Aperçu du fichier"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowImagePreview(false)}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-600 hover:text-gray-800 transition-all"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
