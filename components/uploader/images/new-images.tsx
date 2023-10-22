import { UploadProductImages } from "@/lib/storage-operations";
import { FC, useEffect, useState } from "react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { Skeleton } from "../../ui/skeleton";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "../../ui/separator";
import { useImageModal } from "@/hooks/use-image-modal";
import { TOUR_IMAGE } from "@/lib/keys";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";

const UploadNewImages: FC<{
  selectedImages: string[];
  setSelectedImages: (select: string[]) => void;
}> = ({ selectedImages, setSelectedImages }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setLoading(imageList.length);
    const results = await UploadProductImages(imageList as any[], TOUR_IMAGE);
    setLoading(0);
    setImages(results.filter((x) => x.file).map((x) => x.file) as never[]);
    setUploadedImages(
      results.filter((x) => x.image).map((x) => x.image) as string[]
    );
  };

  useEffect(() => {
    return () => {
      setSelectedImages([]);
    };
  }, []);

  const getImageLink = (imagePath: string) =>
    `${process.env.NEXT_PUBLIC_IMAGE_URL!}/${imagePath}`;

  return (
    <div className=" w-full">
      <ReactImageUploading multiple value={images} onChange={onChange}>
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <div
              className="relative w-full h-32  mb-5  bg-gray-100 rounded-lg shadow-inner"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <label
                htmlFor="file-upload"
                className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
              >
                <p className="text-xs  text-gray-500">
                  File should be of format .png, .jpg, .jpeg or .webp
                </p>
                <p className="text-xs  text-gray-500 mt-2">
                  File maximum size is 300Kb
                </p>
                <svg
                  className="z-10 w-8 h-8 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                </svg>
              </label>
            </div>
            <ScrollArea className="h-[395px] rounded-md border  grid grid-cols-6 gap-4 p-3">
              {loading > 0 &&
                Array.from(new Array(loading)).map((i) => (
                  <div
                    key={i}
                    className="image-item border border-dashed rounded-xl relative"
                  >
                    <Skeleton className="w-full rounded-xl h-36" />
                  </div>
                ))}
              {uploadedImages?.map((image, index) => (
                <Card key={index} classNames={{ base: "h-fit" }}>
                  <CardHeader className="p-0">
                    <Image
                      shadow="none"
                      width={1000}
                      height={1000}
                      loading="lazy"
                      isBlurred
                      isZoomed
                      src={getImageLink(image)}
                      alt=""
                      classNames={{
                        zoomedWrapper: "rounded-b-none",
                      }}
                      className="w-full rounded-none h-36"
                    />
                  </CardHeader>
                  <CardBody>
                    {selectedImages?.includes(getImageLink(image)) ? (
                      <Button
                        size={"sm"}
                        className="my-2"
                        variant={"bordered"}
                        color="danger"
                        onClick={() => {
                          setSelectedImages([
                            ...selectedImages.filter((x) => x !== image),
                          ]);
                        }}
                      >
                        Unselect Image
                      </Button>
                    ) : (
                      <Button
                        size={"sm"}
                        className="my-2"
                        variant={"bordered"}
                        color="primary"
                        onClick={() => {
                          setSelectedImages([
                            ...selectedImages,
                            getImageLink(image),
                          ]);
                        }}
                      >
                        Select Image
                      </Button>
                    )}
                    {selectedImages?.includes(getImageLink(image)) && (
                      <Button
                        type="button"
                        isIconOnly
                        className="absolute top-2 right-2 bg-green-600  rounded-full  "
                        size="sm"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </Button>
                    )}
                  </CardBody>
                </Card>
              ))}
            </ScrollArea>
          </div>
        )}
      </ReactImageUploading>
    </div>
  );
};

export default UploadNewImages;
