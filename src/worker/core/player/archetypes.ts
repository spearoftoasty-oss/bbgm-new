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
		oiq: 0.3,
		pss: 0.15,
		drb: 0.1,
		spd: 0.05,
	},

	playmaker: {
		pss: 0.25,
		drb: 0.2,
		oiq: 0.15,
	},

	// --- SCORING TYPES ---
	shotCreator: {
		fg: 0.2,
		tp: 0.1,
		drb: 0.2,
		oiq: 0.1,
	},

	offBallScorer: {
		fg: 0.1,
		tp: 0.2,
		oiq: 0.1,
		spd: 0.2,
	},

	threeAndD: {
		tp: 0.3,
		diq: 1.2,
		oiq: 1.1,
	},

	sharpshooter: {
		fg: 0.15,
		tp: 0.35,
		ft: 0.1,
	},

	slasher: {
		spd: 0.1,
		jmp: 0.1,
		dnk: 0.2,
		ins: 0.15,
		drb: 0.05,
	},

	// --- BIG / INTERIOR TYPES ---
	postScorer: {
		ins: 0.3,
		stre: 0.2,
		reb: 0.1,
	},

	athleticFinisher: {
		dnk: 0.2,
		jmp: 0.1,
		spd: 0.1,
		ins: 0.2,
	},

	rebounder: {
		reb: 0.35,
		stre: 0.15,
		jmp: 0.1,
	},

	physicalEnforcer: {
		stre: 0.3,
		ins: 0.2,
		reb: 0.1,
		diq: 0.1,
	},

	// --- DEFENSE TYPES ---
	perimeterDefender: {
		diq: 0.3,
		spd: 0.25,
		drb: 0.05,
	},

	interiorDefender: {
		diq: 0.25,
		stre: 0.2,
		reb: 0.15,
	},

	rimProtector: {
		diq: 0.3,
		reb: 0.2,
		jmp: 0.1,
	},

	switchDefender: {
		diq: 0.2,
		spd: 0.2,
		drb: 0.05,
		jmp: 0.15,
	},

	hustler: {
		oiq: 0.1,
		diq: 0.1,
		reb: 0.1,
		spd: 0.05,
		endu: 0.25,
	},

	// --- HYBRIDS ---
	twoWay: {
		diq: 0.2,
		oiq: 0.2,
		fg: 0.1,
		tp: 0.1,
	},

	allRounder: {
		stre: 0.1,
		spd: 0.1,
		jmp: 0.1,
		oiq: 0.1,
		pss: 0.1,
		reb: 0.1,
	},
};
