import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { Spinner } from "../Spinner";
import { useEffect, useState } from "react";

const formSchema = z.object({
  receiver: z.string().min(1, { message: "Please set receiver" }),
  amount: z.string().min(1, { message: "Please set amount of TWD" }),
});

export default function PayForm({
  className,
}: {
  className?: string;
}) {
  const [types, setTypes] = useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {

  }, []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: "",
      amount: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    //TODO: Add receiver via api

    setIsLoading(false);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 py-4"
        >
          <FormField
            control={form.control}
            name="receiver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>Receiver
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>Amount (TWD)
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mx-auto mb-6 mt-4 h-12 w-[90%]"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Pay"}
          </Button>
        </form>
      </Form>
    </>
  );
}
