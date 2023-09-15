"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import Image from "next/image";
import { Button } from "@/components";
import { useSession } from "next-auth/react";
import convertToSlug from "@/lib/slug-converter";
import toast from "react-hot-toast";
import toolbarOptions from "@/lib/toolbar-options";

const Draft = () => {
  const { data: session } = useSession();
  const [value, setValue] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [linkOpen, setLinkOpen] = useState(true);
  const [fileOpen, setFileOpen] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);
  const [imgPreviewUrl, setImgPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[] | []>([]);
  const [description, setDescription] = useState("");
  const router = useRouter();

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

    const slug = convertToSlug(title);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          imgUrl,
          content: value,
          description,
          tags,
          userId: session?.user.id,
          readCounter: 0,
          slug,
        }),
      });

      const data = await res.json();

      toast.success(data, {
        duration: 3000,
      });

      router.refresh();
    } catch (error) {
      toast.error(error as string, { duration: 3000 });
    }
  };

  return (
    <form
      onSubmit={handleForm}
      className='wrapper my-5 px-3 flex flex-col overflow-hidden'
    >
      <label htmlFor='image'>Image Cover</label>
      <div className='flex gap-3 my-3'>
        <button
          type='button'
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
          type='button'
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
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='py-1 text-2xl font-semibold bg-transparent border-none outline-none'
      />
      <textarea
        placeholder='Write short description about your post (max 200 characters)'
        className='py-1 text-lg bg-transparent border-none outline-none mt-3 min-h-[120px]'
        onChange={(e) => setDescription(e.target.value.slice(0, 200))}
        value={description}
      />
      <small className='font-semibold mb-3'>{description.length} / 200</small>
      <div className='my-5 flex flex-col gap-3'>
        <div className='flex items-center gap-3'>
          {tags.map((tag) => (
            <div
              key={tag}
              className='bg-gray-600 text-white px-3 py-1 rounded-sm w-fit flex items-center gap-2'
            >
              {tag}
              <button
                onClick={() =>
                  setTags(tags.filter((tagName) => tagName !== tag))
                }
                className='bg-gray-200 rounded-full text-gray-700'
              >
                <X height={20} width={20} />
              </button>
            </div>
          ))}
        </div>
        <div>
          <input
            type='text'
            placeholder='input tag here'
            onChange={(e) => setTag(e.target.value)}
            className='py-1 px-2 text-basis bg-gray-200 dark:bg-gray-900 border-none outline-none'
          />
          <button
            type='button'
            onClick={() => setTags((prevTags) => [...prevTags, tag])}
            className='bg-blue-600 text-white px-3 py-1'
          >
            Add tag
          </button>
        </div>
      </div>
      <ReactQuill
        placeholder='Share your ideas...'
        theme='bubble'
        value={value}
        onChange={setValue}
        className='dark:placeholder:text-white'
        modules={{ toolbar: toolbarOptions }}
      />
      <Button
        text='publish'
        className='ml-auto bg-blue-600 text-white px-5 rounded-full hover:bg-blue-500'
      />
    </form>
  );
};

export default Draft;
