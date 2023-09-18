"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesDetailsDialog(species: Species) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full" onClick={() => setOpen(true)}>
          <Icons.add className="mr-3 h-5 w-5" />
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <div className="min-w-72 flex flex-col rounded border-2 p-3 shadow">
            {species.image && (
              <div className="relative h-40 w-full sm:h-80">
                <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
              <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
              <div className="text-md font-normal">
                <span className="font-bold">Kingdom: </span>
                {species.kingdom}
              </div>
              {species.total_population ? (
                <div className="text-md font-normal">
                  <span className="font-bold">Total Population: </span>
                  {species.total_population}
                </div>
              ) : (
                <></>
              )}
              <p>{species.description ? species.description : ""}</p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
