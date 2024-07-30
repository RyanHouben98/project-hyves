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
import z from "zod";
import action from "./(actions)/action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  emailAddress: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
});

export default function SignUpPage() {
  const { toast } = useToast();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (values.password !== values.confirmPassword) {
      toast({
        title: "Oops, something went wrong!",
        description: "The passwords do not match.",
      });
    }

    try {
      const result = await action(values);

      if (result && !result.status) {
        toast({
          title: "Oops, something went wrong!",
          description: result.message,
        });

        return;
      }

      push("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="bg-gray-200 w-full h-screen">
      <div className="container mx-auto h-full flex flex-col gap-4 items-center justify-center">
        <h1 className="text-3xl">Project Hyves</h1>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create a new personal account</CardTitle>
            <CardDescription>
              Creating a new account is quick and easy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <div className="grid grid-cols-2 gap-2">
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Sign up</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <CardDescription>
              Already created an account?{" "}
              <Link href="/sign-in">Sign in here</Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
