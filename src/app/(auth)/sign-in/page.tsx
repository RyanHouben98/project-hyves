"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6),
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };
  return (
    <main className="bg-gray-200 w-full h-screen">
      <div className="container mx-auto h-full flex flex-col gap-4 items-center justify-center">
        <h1 className="text-3xl">Project Hyves</h1>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Sign in with your personal account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@email.com"
                          type="email"
                          {...field}
                        />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Sign in</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <CardDescription>
              No account yet? <Link href="/sign-up">Create one here</Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
