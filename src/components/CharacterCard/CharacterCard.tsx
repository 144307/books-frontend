import type { Character } from "../../types";

interface CharacterCardProps {
  character: Character;
  bg?: string;
}

function CharacterCard({ character, bg = "bg-[#faf7f0]" }: CharacterCardProps) {
  return (
    <article className={`w-full py-6 ${bg}`}>
      <div className="page-width px-6">
        <div className="flex h-auto w-full flex-col items-stretch gap-8 sm:flex-row">
          <img
            src={character.image_url}
            alt={`Портрет ${character.name}`}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-sm object-cover shadow-[0_2px_12px_rgba(31,36,48,0.12)] sm:w-48 sm:shrink-0"
          />
          <div className="flex min-w-0 flex-1 flex-col font-book">
            <h3 className="pb-4 text-3xl font-bold text-[#1f2430] sm:text-4xl">
              {character.name}
            </h3>
            <p className="text-[18px] leading-relaxed text-[#6b7280]">
              {character.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CharacterCard;
