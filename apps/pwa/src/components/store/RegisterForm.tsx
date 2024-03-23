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
import axios from 'axios';
import { setUserId } from "@/lib/account";

const formSchema = z.object({
  accountId: z.string().min(1, { message: "Please select account of store" }),
  password: z.string().min(1, { message: "Please set password of store" }),
  confirm: z.string().min(1, { message: "Please set password again" }),
});

export default function RegisterForm({
  className,
  setSigned,
  setWallet
}: {
  className?: string;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  setWallet: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountId: "",
      password: "",
      confirm: ""
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      }
    }

    const body = {
      data: timestamp.toString()
    }

    axios.post(`http://localhost:8787/register/${values.accountId}`, body, config)
      .then(function (response) {
        console.log(response);
        setUserId(values.accountId)
        setIsLoading(false);
        setSigned(true)
        setWallet(response.data.id)
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      }).finally(() => {
        setIsLoading(false);
      });

  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 py-4"
        >
          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>Account
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>Password
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>Confirm Password
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
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
            {isLoading ? <Spinner /> : "Register"}
          </Button>
        </form>
      </Form>
    </>
  );
}
