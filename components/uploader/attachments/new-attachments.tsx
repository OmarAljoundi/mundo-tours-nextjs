import {
  ListAllAttachmentsInBucket,
  PushAttachments,
} from "@/lib/storage-operations";
import { FC, useState } from "react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { Skeleton } from "../../ui/skeleton";
import { Check, CheckCircle, FileText, X } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useImageModal } from "@/hooks/use-image-modal";
import { Button, Card, CardBody } from "@nextui-org/react";
import { ExternalFile } from "@/types/custom";
import { useQueries, useQuery } from "react-query";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/lib/helpers";

const UploadNewAttachments: FC<{
  selectedAttachments: ExternalFile[];
  setselectedAttachments: (select: ExternalFile[]) => void;
}> = ({ selectedAttachments, setselectedAttachments }) => {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(0);
  const [uploadedAttachments, setUploadedAttachments] = useState<
    ExternalFile[]
  >([]);

  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setLoading(imageList.length);
    const results = await PushAttachments(imageList.map((x) => x.file!));
    setLoading(0);
    setAttachments(results.filter((x) => x.file).map((x) => x.file) as never[]);
    results.filter((x) => x.file).map((x) => x.file) as never[];
    setUploadedAttachments(
      results
        .filter((x) => x.path)
        .map((x) => {
          return {
            path: x.path!,
            name: x.name!,
          };
        })
    );
  };

  const { data, isLoading } = useQuery(
    ["attachmnets_selected", uploadedAttachments],
    async () => {
      const res = await ListAllAttachmentsInBucket(100, 0);
      return res;
    },
    {
      refetchInterval: false,
      select(data) {
        const names = uploadedAttachments.map((x) => x.name);
        return data?.filter((x: any) => names.includes(x.name));
      },
    }
  );

  const convertToExternalFile = (fileObject: any): ExternalFile => {
    const [_, name] = (fileObject.name as string).split("/");
    return {
      name,
      path: fileObject.name,
    };
  };

  return (
    <div className=" w-full">
      <ReactImageUploading
        multiple
        value={attachments}
        onChange={onChange}
        acceptType={["docx", "pdf"]}
        allowNonImageType={true}
      >
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
                  File should be of format .pdf or .doc
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
            <ScrollArea className="h-[400px] ">
              <div className="rounded-md border  grid grid-cols-6 gap-4 p-4">
                {(isLoading || loading > 0) &&
                  Array.from(new Array(loading)).map((i) => (
                    <div
                      key={i}
                      className="image-item border border-dashed rounded-xl relative"
                    >
                      <Skeleton className="w-full rounded-xl h-36" />
                    </div>
                  ))}
                {data?.map((file: any, index: any) => (
                  <Card key={index}>
                    <CardBody>
                      <FileText />
                      <span className="max-w-[75%] truncate mt-3">
                        {file.name}
                      </span>
                      <span className="text-xs">
                        {formatBytes(file?.metadata?.size ?? 0, 2)}
                      </span>
                      {selectedAttachments?.find((x) => x.name == file.name) ? (
                        <Button
                          size={"sm"}
                          className="my-2"
                          variant={"bordered"}
                          color="danger"
                          onClick={() => {
                            setselectedAttachments([
                              ...selectedAttachments.filter(
                                (x) => x.name !== file.name
                              ),
                            ]);
                          }}
                        >
                          Unselect File
                        </Button>
                      ) : (
                        <Button
                          size={"sm"}
                          className="my-2"
                          variant={"bordered"}
                          color="primary"
                          onClick={() => {
                            setselectedAttachments([
                              ...selectedAttachments,
                              file,
                            ]);
                          }}
                        >
                          Select File
                        </Button>
                      )}

                      {selectedAttachments?.find(
                        (x) => x.name === file.name
                      ) && (
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
              </div>
            </ScrollArea>
          </div>
        )}
      </ReactImageUploading>
    </div>
  );
};

export default UploadNewAttachments;
