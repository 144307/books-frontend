import type { Character } from "../../types";
import CharacterCard from "../CharacterCard/CharacterCard";

const CARD_BG = ["bg-[#faf7f0]", "bg-[#efe4d1]"];

interface CharactersSectionProps {
  characters: Character[];
  order: number;
}

function CharactersSection({ characters, order }: CharactersSectionProps) {
  return (
    <section
      className={`w-full font-book ${
        order % 2 === 1 ? "bg-[#f7f4ee]" : "bg-[#f4ecd8]"
      }`}
    >
      <h2 className="mt-16 mb-6 text-center text-[1.6rem] text-[#1f2430]">
        Персонажи
      </h2>
      <div className="flex flex-col items-stretch">
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            bg={CARD_BG[index % CARD_BG.length]}
          ></CharacterCard>
        ))}
      </div>
    </section>
  );
}

export default CharactersSection;
