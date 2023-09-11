"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import Image from "next/image";

const Draft = () => {
  const [value, setValue] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [linkOpen, setLinkOpen] = useState(true);
  const [fileOpen, setFileOpen] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);
  const [imgPreviewUrl, setImgPreviewUrl] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [
      { align: null },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ image: true }],
    [{ link: true }],
    ["clean"], // remove formatting button
  ];

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fr = new FileReader();
    const fileSelected = e.target.files;

    if (fileSelected) {
      fr.readAsDataURL(fileSelected[0]);
      fr.onload = (readerEvent) => {
        setImgPreviewUrl(readerEvent.target?.result as string);
      };
    }
  };

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleForm} className='wrapper my-5 px-3 flex flex-col'>
      <label htmlFor='image'>Image Cover</label>
      <div className='flex gap-3 my-3'>
        <button
          className={`${
            linkOpen ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-900"
          } px-5 py-1 rounded-full`}
          onClick={() => {
            setLinkOpen(true);
            setFileOpen(false);
          }}
        >
          Link
        </button>
        <button
          onClick={() => {
            setLinkOpen(false);
            setFileOpen(true);
          }}
          className={`${
            fileOpen ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-900"
          } px-5 py-1 rounded-full`}
        >
          File
        </button>
      </div>
      <input
        type='url'
        hidden={!linkOpen}
        placeholder='http://example-image.com'
        className='mb-4 py-2 text-base bg-gray-100 dark:bg-gray-900 rounded-sm px-3 font-semibold bg-transparent border-none outline-none'
      />
      <div
        className={`w-full h-[350px] p-5 bg-gray-100 dark:bg-gray-900 rounded-lg mb-4 ${
          fileOpen ? "block" : "hidden"
        }`}
      >
        <input
          type='file'
          accept='image/jpeg, image/png, image/webp, image/svg, image/gif, image/tiff'
          ref={inputFileRef}
          onChange={handleImageFile}
          hidden
        />
        <div
          onClick={() => inputFileRef.current?.click()}
          className='w-full h-full relative border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center cursor-pointer'
        >
          {imgPreviewUrl ? (
            <Image
              src={imgPreviewUrl}
              alt='preview'
              fill
              className='object-contain'
            />
          ) : (
            <div className='flex flex-col justify-center items-center text-gray-500'>
              <Upload />
              <p>Click Here to Upload Image</p>
            </div>
          )}
          {imgPreviewUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImgPreviewUrl("");
                setFile(null);
              }}
              className='absolute top-3 right-3 p-2 rounded-full bg-gray-50 text-gray-300 dark:text-white dark:bg-gray-800'
            >
              <X />
            </button>
          )}
        </div>
      </div>
      <input
        type='text'
        placeholder='Title'
        className='py-1 text-2xl font-semibold bg-transparent border-none outline-none'
      />
      <ReactQuill
        placeholder='Share your ideas...'
        theme='bubble'
        value={value}
        onChange={setValue}
        className='dark:placeholder:text-white'
        modules={{ toolbar: toolbarOptions }}
      />
    </form>
  );
};

export default Draft;
