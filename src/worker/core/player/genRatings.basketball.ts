import genFuzz from "./genFuzz.ts";
import heightToRating from "./heightToRating.ts";
import limitRating from "./limitRating.ts";
import { helpers, random } from "../../util/index.ts";
import type {
	PlayerRatings,
	RatingKey,
} from "../../../common/types.basketball.ts";
import { archetypeModifiers } from "./archetypes.ts";
import type { Archetype } from "./archetypes.ts";

const typeFactors: Record<
	"point" | "wing" | "big",
	Partial<Record<RatingKey, number>>
> = {
	point: {
		jmp: 1.65,
		spd: 1.65,
		drb: 1.5,
		pss: 1.5,
		ft: 1.4,
		fg: 1.4,
		tp: 1.4,
		oiq: 1.2,
		endu: 1.4,
	},
	wing: {
		drb: 1.2,
		dnk: 1.5,
		jmp: 1.4,
		spd: 1.4,
		ft: 1.2,
		fg: 1.2,
		tp: 1.2,
	},
	big: {
		stre: 1.2,
		ins: 1.6,
		dnk: 1.5,
		reb: 1.4,
		ft: 0.8,
		fg: 0.8,
		tp: 0.8,
		diq: 1.2,
	},
};

const athleticismRatings = new Set(["stre", "spd", "jmp", "endu", "dnk"]);
const shootingRatings = new Set(["ft", "fg", "tp"]);
const skillRatings = new Set(["oiq", "diq", "drb", "pss", "reb"]); // ins purposely left out

type ArchetypeTier = "gold" | "silver" | "bronze";

function tierMultiplier(tier: ArchetypeTier) {
	if (tier === "gold") return 1.35;
	if (tier === "silver") return 1.15;
	return 1.0;
}

function applyArchetype(
	key: RatingKey,
	archetype: Archetype,
	tier: ArchetypeTier,
) {
	const mod = archetypeModifiers[archetype]?.[key] ?? 1;
	return 1 + (mod - 1) * tierMultiplier(tier);
}

const genRatings = (
	season: number,
	scoutingLevel: number,
): {
	heightInInches: number;
	ratings: PlayerRatings;
} => {
	// realHeight is drawn from a custom probability distribution and then offset by a fraction of an inch either way
	let heightInInches = random.heightDist() + Math.random() - 0.5; // Fraction of an inch

	const wingspanAdjust = heightInInches + random.randInt(-1, 1); // hgt 0-100 corresponds to height 5'6" to 7'9" (Anything taller or shorter than the extremes will just get 100/0)

	const hgt = heightToRating(wingspanAdjust);
	heightInInches = Math.round(heightInInches); // Pick type of player (point, wing, or big) based on height

	const randType = Math.random();
	let type: keyof typeof typeFactors;

	if (hgt >= 59) {
		// 6'10" or taller
		if (randType < 0.01) {
			type = "point";
		} else if (randType < 0.05) {
			type = "wing";
		} else {
			type = "big";
		}
	} else if (hgt <= 33) {
		// 6'3" or shorter
		if (randType < 0.1) {
			type = "wing";
		} else {
			type = "point";
		}
	} else {
		// TEMP DISABLE WITH ESLINT 9 UPGRADE eslint-disable-next-line no-lonely-if
		if (randType < 0.03) {
			type = "point";
		} else if (randType < 0.3) {
			type = "big";
		} else {
			type = "wing";
		}
	}

	// Tall players are less talented, and all tend towards dumb and can't shoot because they are rookies
	const rawRatings = {
		stre: 40,
		spd: 43,
		jmp: 43,
		endu: 20,
		ins: 30,
		dnk: 30,
		ft: 35,
		fg: 35,
		tp: 35,
		oiq: 25,
		diq: 25,
		drb: 40,
		pss: 40,
		reb: 40,
	};

	const archetypeList = Object.keys(archetypeModifiers) as Archetype[];

	function getTierWeights(): ArchetypeTier {
		const r = Math.random();
		if (r < 0.15) return "gold";
		if (r < 0.5) return "silver";
		return "bronze";
	}

	// Always assign 2 archetypes
	const primaryArchetype =
		archetypeList[Math.floor(Math.random() * archetypeList.length)];

	let secondaryArchetype: Archetype;
	do {
		secondaryArchetype =
			archetypeList[Math.floor(Math.random() * archetypeList.length)];
	} while (secondaryArchetype === primaryArchetype);

	// Assign tiers
	const primaryTier = getTierWeights();
	const secondaryTier = getTierWeights();

	// For correlation across ratings, to ensure some awesome players, but athleticism and skill are independent to
	// ensure there are some who are elite in one but not the other
	const factorAthleticism = helpers.bound(random.realGauss(1, 0.3), 0.2, 1.2);
	const factorShooting = helpers.bound(random.realGauss(1, 0.3), 0.2, 1.2);
	const factorSkill = helpers.bound(random.realGauss(1, 0.3), 0.2, 1.2);
	const factorIns = helpers.bound(random.realGauss(1, 0.3), 0.2, 1.2);

	for (const key of helpers.keys(rawRatings)) {
		const typeFactor = typeFactors[type][key] ?? 1;

		let factor = factorIns;

		if (athleticismRatings.has(key)) {
			factor = factorAthleticism;
		} else if (shootingRatings.has(key)) {
			factor = factorShooting;
		} else if (skillRatings.has(key)) {
			factor = factorSkill;
		}

		const primary = applyArchetype(key, primaryArchetype, primaryTier);
		const secondary = applyArchetype(key, secondaryArchetype, secondaryTier);

		const archetypeMultiplier = primary * 0.7 + secondary * 0.3;

		rawRatings[key] = limitRating(
			factor * typeFactor * archetypeMultiplier * rawRatings[key],
		);

		if (key === "fg" || key === "tp" || key === "pss" || key === "diq") {
			console.log({
				primaryArchetype,
				secondaryArchetype,
				key,
				value: rawRatings[key],
			});
		}
	}

	const ratings = {
		stre: rawRatings.stre,
		spd: rawRatings.spd,
		jmp: rawRatings.jmp,
		endu: rawRatings.endu,
		ins: rawRatings.ins,
		dnk: rawRatings.dnk,
		ft: rawRatings.ft,
		fg: rawRatings.fg,
		tp: rawRatings.tp,
		oiq: rawRatings.oiq,
		diq: rawRatings.diq,
		drb: rawRatings.drb,
		pss: rawRatings.pss,
		reb: rawRatings.reb,
		hgt,
		fuzz: genFuzz(scoutingLevel),
		ovr: 0,
		pos: "F",
		pot: 0,
		season,
		skills: [
			{ archetype: primaryArchetype, tier: primaryTier },
			{ archetype: secondaryArchetype, tier: secondaryTier },
		],
	};

	return {
		heightInInches,
		ratings: {
			...ratings,
			primaryArchetype,
			secondaryArchetype,
		},
	};
};

export default genRatings;
