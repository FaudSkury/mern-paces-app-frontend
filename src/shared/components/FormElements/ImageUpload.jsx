import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import classes from "./ImageUpload.module.css";
import formClasses from "./Input.module.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={formClasses["form-control"]}>
      <input
        ref={filePickerRef}
        id={props.id}
        type="file"
        style={{ display: "none" }}
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className={`${classes["image-upload"]} ${props.center && "center"}`}>
        <div className={classes["image-upload__preview"]}>
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please Pick an image</p>}
        </div>
      </div>
      <Button type="button" onClick={pickImageHandler}>
        PICK IMAGE
      </Button>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
