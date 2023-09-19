"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as cheerio from "cheerio";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddSpeciesDialog from "./add-species-dialog";

type FormData = string;

export default function SearchBar({ userId }: { userId: string }) {
  const form = useForm({
    mode: "onSubmit",
  });

  const [speciesDescription, setSpeciesDescription] = useState<string>("");
  const [speciesImgUrl, setSpeciesImgUrl] = useState("");

  // GET with fetch API
  const onSubmit = async (input: FormData) => {
    const cleanedInput = input.replace(/ /g, "_");
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/html/${cleanedInput}?redirect=false&stash=false`,
    );
    const data = await response.text();
    const $ = cheerio.load(data);

    const descriptionElement = $("p:first");
    const descriptionElementText = descriptionElement.text();
    setSpeciesDescription(descriptionElementText);

    const imgElement = $("img:first");
    const imgUrl = imgElement.attr("src");
    setSpeciesImgUrl(imgUrl ?? "");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={() => onSubmit}>
          <div className="grid w-full items-center gap-4">
            <FormField
              control={form.control}
              name="scientific_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scientific Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Cavia porcellus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button type="submit" className="ml-1 mr-1 flex-auto">
                Search
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <AddSpeciesDialog userId={userId} desc={speciesDescription} img={speciesImgUrl} />
    </>
  );
}
