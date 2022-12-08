import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import "./index.module.scss";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const EditableImage = ({ defaultFileList, onSuccess, onRemove }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileList, setFileList] = useState([]);
  const t = useTranslations("Messages");

  useEffect(() => {
    if (defaultFileList && defaultFileList.length > 0) {
      setIsUploaded(true);
    }
  }, []);

  const isValidImageType = (file) => {
    return (
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp"
    );
  };

  const isValidImageSize = (file) => {
    return file.size / 1024 / 1024 < 3; // < 3MB
  };

  const validateImage = (file) => {
    const isValidImageType = isValidImageType(file);
    if (!isValidImageType) {
      message.error(t("FileTypeNotSupported"));
    }

    const isLt5M = isValidImageSize(file);
    if (!isLt5M) {
      message.error(t("FileSizeExceedsTheLimit"));
    }

    return isValidImageType && isLt5M;
  };

  const handleBeforeUpload = (file) => {
    return validateImage(file);
  };

  const onEditableImageChange = (info) => {
    setFileList([...info.fileList]);

    if (info.file.status === "removed") {
      setIsUploaded(false);
      return;
    }
    setIsUploading(false);
    setIsUploaded(true);

    message.success(`${info.file.name} ${t("FileUploadedSuccessfully")}`);
    if (onSuccess) onSuccess(info.file);
  };

  const uploadProps = {
    action: "/api/hello",
    accept: ".png, .jpg, .jpeg, .webp",
    beforeUpload: handleBeforeUpload,
  };

  return (
    <div>
      <div>
        {defaultFileList && defaultFileList.length > 0 ? (
          <Upload
            {...uploadProps}
            listType="picture-card"
            defaultFileList={defaultFileList}
            onChange={onEditableImageChange}
            onRemove={onRemove}
          >
            {isUploaded || isUploading ? null : <PlusOutlined />}
          </Upload>
        ) : (
          <Upload
            {...uploadProps}
            listType="picture-card"
            defaultFileList={[]}
            onChange={onEditableImageChange}
            onRemove={onRemove}
          >
            {isUploaded || isUploading ? null : <PlusOutlined />}
          </Upload>
        )}
      </div>
    </div>
  );
};

export default EditableImage;
