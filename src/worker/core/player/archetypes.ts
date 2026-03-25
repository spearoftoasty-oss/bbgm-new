export type Archetype =
	| "facilitator"
	| "playmaker"
	| "shotCreator"
	| "offBallScorer"
	| "threeAndD"
	| "sharpshooter"
	| "slasher"
	| "postScorer"
	| "athleticFinisher"
	| "rebounder"
	| "hustler"
	| "physicalEnforcer"
	| "perimeterDefender"
	| "interiorDefender"
	| "rimProtector"
	| "switchDefender"
	| "twoWay"
	| "allRounder";

export const archetypeModifiers: Record<
	Archetype,
	Partial<Record<string, number>>
> = {
	// --- PLAYMAKING CORE ---
	facilitator: {
		oiq: 1.3,
		pss: 1.15,
		drb: 1.1,
		spd: 1.05,
	},

	playmaker: {
		pss: 1.25,
		drb: 1.2,
		oiq: 1.15,
	},

	// --- SCORING TYPES ---
	shotCreator: {
		fg: 1.2,
		tp: 1.1,
		drb: 1.2,
		oiq: 1.1,
	},

	offBallScorer: {
		fg: 1.1,
		tp: 1.2,
		oiq: 1.1,
		spd: 1.2,
	},

	threeAndD: {
		tp: 1.3,
		diq: 1.2,
		oiq: 1.1,
	},

	sharpshooter: {
		fg: 1.15,
		tp: 1.35,
		ft: 1.1,
	},

	slasher: {
		spd: 1.1,
		jmp: 1.1,
		dnk: 1.2,
		ins: 1.15,
		drb: 1.05,
	},

	// --- BIG / INTERIOR TYPES ---
	postScorer: {
		ins: 1.3,
		stre: 1.2,
		reb: 1.1,
	},

	athleticFinisher: {
		dnk: 1.2,
		jmp: 1.1,
		spd: 1.1,
		ins: 1.2,
	},

	rebounder: {
		reb: 1.35,
		stre: 1.15,
		jmp: 1.1,
	},

	physicalEnforcer: {
		stre: 1.3,
		ins: 1.2,
		reb: 1.1,
		diq: 1.1,
	},

	// --- DEFENSE TYPES ---
	perimeterDefender: {
		diq: 1.3,
		spd: 1.25,
		drb: 1.05,
	},

	interiorDefender: {
		diq: 1.25,
		stre: 1.2,
		reb: 1.15,
	},

	rimProtector: {
		diq: 1.3,
		reb: 1.2,
		jmp: 1.1,
	},

	switchDefender: {
		diq: 1.2,
		spd: 1.2,
		drb: 1.05,
		jmp: 1.15,
	},

	hustler: {
		oiq: 1.1,
		diq: 1.1,
		reb: 1.1,
		spd: 1.05,
		endu: 1.25,
	},

	// --- HYBRIDS ---
	twoWay: {
		diq: 1.2,
		oiq: 1.2,
		fg: 1.1,
		tp: 1.1,
	},

	allRounder: {
		stre: 1.1,
		spd: 1.1,
		jmp: 1.1,
		oiq: 1.1,
		pss: 1.1,
		reb: 1.1,
	},
};
