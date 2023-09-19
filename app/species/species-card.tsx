import type { Database } from "@/lib/schema";
import Image from "next/image";
import EditSpeciesDialog from "./edit-species-dialog";
import SpeciesDetailsDialog from "./species-details-dialog";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({ userId, species }: { userId: string; species: Species }) {
  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      <SpeciesDetailsDialog key={species.id} {...species} />
      {userId == species.author ? <EditSpeciesDialog key={species.id} species={species} userId={userId} /> : <></>}
    </div>
  );
}
