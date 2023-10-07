"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FC, useState } from "react";
import { submitForm } from "@/lib/fetchers";
import { ICustomer, eCustomerStatus } from "@/interface/Customer";
import { useNotification } from "../ui/notification";
import { submitEventForm } from "@/lib/gtm";
import { usePathname } from "next/navigation";
const ContactForm: FC<{ tourId: number }> = ({ tourId }) => {
  const [date, setDate] = useState<Date>();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { error, success } = useNotification();
  const handleSubmitForm = async (data: ICustomer) => {
    setSubmitting(true);
    data.phoneNumber = String(data.phoneNumber);
    if (date) {
      data.notes += `(التاريخ المتوقع للسفر ${format(date, "PPP")})`;
    }

    const result = await submitForm(data);
    if (result.success) {
      success("سنقوم بالتواصل معك قريباَ");
      submitEventForm(pathname);
    } else {
      error("حدث خطأ ما.. الرجاء المحاولة مجدداً");
    }
    setSubmitting(false);
    setOpen(false);
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      phoneNumber: "",
      name: "",
      contactMethod: "",
      tourId: tourId,
      notes: "",
      createdDate: null,
      email: "",
      id: 0,
      modifiedDate: null,
      status: eCustomerStatus.Pending,
    },
    onSubmit: handleSubmitForm,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Schema,
  });

  return (
    <Dialog
      onOpenChange={() => {
        resetForm();
        setOpen(!open);
      }}
      open={open}
    >
      <DialogTrigger>
        <Button size={"sm"} variant={"secondary"}>
          طريقة الحجز
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-right mb-4 mt-8">
          <DialogTitle className="text-center font-primary">
            أترك معلوماتك ليتم التواصل معك
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <Input
            name="name"
            placeholder="الإسم الكريم"
            id="name"
            dir="rtl"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          <span className="text-[10px] text-red-500">
            {touched.name && errors.name}
          </span>
          <Input
            name="phoneNumber"
            placeholder="رقم التواصل"
            className="text-left placeholder:text-right"
            dir="ltr"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          <span className="text-[10px] text-red-500">
            {touched.phoneNumber && errors.phoneNumber}
          </span>

          <Select
            disabled={isSubmitting}
            onValueChange={(e) => setFieldValue("contactMethod", e)}
            name="contactMethod"
          >
            <SelectTrigger className="w-full" dir="rtl">
              <SelectValue placeholder="طريقة التواصل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Whatsapp" dir="rtl">
                واتس اب
              </SelectItem>
              <SelectItem value="Call" dir="rtl">
                تلفون
              </SelectItem>
            </SelectContent>
          </Select>
          <span className="text-[10px] text-red-500">
            {touched.contactMethod && errors.contactMethod}
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={isSubmitting}
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-right font-normal",
                  !date && "text-muted-foreground"
                )}
                dir="rtl"
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>التاريخ التقريبي للسفر</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            name="note"
            dir="rtl"
            placeholder="ملاحظات اخرى"
            disabled={isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline ml-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
            إرســال
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
const Schema = yup.object().shape({
  name: yup.string().required("الرجاء إدخال الإسم"),
  phoneNumber: yup.string().required("الرجاء إدخال رقم الجوال"),
  contactMethod: yup
    .string()
    .nullable()
    .required("الرجاء إختيار طريقة التواصل"),
});
