import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
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
import axios from 'axios';

const formSchema = z.object({
  receiver: z.string().min(1, { message: "Please set receiver" }),
  amount: z.string().min(1, { message: "Please set amount of TWD" }),
});

export default function PayForm({
  className,
}: {
  className?: string;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      }
    }
    const body = {
      data: values.amount.toString()
    }
    // ✅ This will be type-safe and validated.
    axios.post(`https://hiraijin.kidneyweakx.workers.dev/pay/${values.receiver}`, body, config)
      .then(function (response) {
        console.log(response);
        setOpenDialog(true)
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setOpenDialog(true)
        setIsLoading(false);
      }).finally(() => {
        setOpenDialog(true)
        setIsLoading(false);
      });
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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[250px]">
          <div>
            <DialogHeader>
              <div className="grid gap-4 py-4 items-center justify-center">
                <div className="flex flex-row space-x-1">
                  <>
                    <div>Success</div>
                  </>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    console.log(`Remove localStorage`)
                  }}>OK
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
