import type { Character } from "../../types";
import CharacterCard from "../CharacterCard/CharacterCard";

interface CharactersSectionProps {
  characters: Character[];
  order: number;
}

function CharactersSection({ characters, order }: CharactersSectionProps) {
  return (
    <section
      className={`px-6 pt-4 pb-8 font-book ${
        order % 2 === 1 ? "bg-[#f7f4ee]" : "bg-[#f4ecd8]"
      }`}
    >
      <h2 className="mt-12 mb-6 text-center text-[1.6rem] text-[#1f2430]">
        Characters
      </h2>
      <div className="page-width grid grid-cols-1 gap-12 px-6 md:grid-cols-2">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
          ></CharacterCard>
        ))}
      </div>
    </section>
  );
}

export default CharactersSection;
