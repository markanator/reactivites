import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
};

const PhotoWidgetCropper = ({ imagePreview, setCropper }: Props) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: "300", width: "100%" }}
      initialAspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
};

export default PhotoWidgetCropper;
