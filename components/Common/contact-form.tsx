"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { useQuery } from "react-query";
import { getTours } from "@/lib/fetchers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const ContactForm = () => {
  const [date, setDate] = useState<Date>();

  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmitForm = async (data: any) => {
    setSubmitting(true);
    if (date) {
      data.note += `(التاريخ المتوقع للسفر ${format(date, "PPP")})`;
    }
    setTimeout(() => {
      console.log(data);
      setSubmitting(false);
    }, 500);
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      phoneNumber: "",
      name: "",
      contactMethod: "",
      tourId: "",
      note: "",
    },
    onSubmit: handleSubmitForm,
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <Dialog onOpenChange={() => resetForm()}>
      <DialogTrigger>
        <Button size={"sm"}>طريقة الحجز</Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="contact_us" className="w-full mt-4">
          <TabsList className="w-full flex">
            <TabsTrigger value="contact_us" className="w-full">
              تواصل معنا
            </TabsTrigger>
            <TabsTrigger value="talk_to_us" className="w-full">
              تحدث الينا
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact_us">
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
                إرســال
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="talk_to_us">
            Change your password here.
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
