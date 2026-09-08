import type { Character } from "../../types";

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="flex w-full gap-5">
      <img
        src={character.image_url}
        alt={`Portrait of ${character.name}`}
        className="h-auto w-1/2 self-start rounded-sm object-cover shadow-[0_2px_12px_rgba(31,36,48,0.12)]"
      />
      <div className="flex flex-1 flex-col font-book">
        <h3 className="mb-2 text-xl text-[#1f2430]">{character.name}</h3>
        <p className="flex-1 text-[0.95rem] leading-relaxed text-[#6b7280]">
          {character.description}
        </p>
      </div>
    </article>
  );
}

export default CharacterCard;
