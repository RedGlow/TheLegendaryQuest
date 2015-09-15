angular.module('legendarySearch.recipeCompanion', [
	'redglow.gw2api'
])

/**
 * A service that implements the missing functions in GW2 recipe API and the GW2API module.
 */
.service('RecipeCompanion', function($q, $http, GW2API) {
	var mysticForgeRecipes = {
		9615: [ // recipe: gift of metal
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9616: [ // recipe: gift of ice
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9617: [ // recipe: gift of wood
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9618: [ // recipe: gift of energy
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9621: [ // recipe: gift of nature
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9622: [ // recipe: unicorn statue
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9623: [ // recipe: gift of history
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9624: [ // recipe: gift of music
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9625: [ // recipe: gift of darkness
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9626: [ // recipe: gift of light
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9627: [ // recipe: vial of quicksilver
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9628: [ // recipe: gift of entertainment
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9629: [ // recipe: gift of stealth
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9630: [ // recipe: gift of weather
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9631: [ // recipe: liquid flame
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9632: [ // recipe: gift of color
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9633: [ // recipe: gift of lightning
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9634: [ // recipe: wolf statue
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9635: [ // recipe: shark statue
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9636: [ // recipe: eel statue
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		9637: [ // recipe: gift of water
			{type: 'currency', id: 'Coin', amount: 100000}
		],
		19625: [ // gift of frostfang
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19624, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24555, amount: 1},
		],
		19626: [ // gift of fortune
			{ type: 'item', id: 19675, amount: 77 },
			{ type: 'item', id: 19721, amount: 250 },
			{ type: 'item', id: 19673 },
			{ type: 'item', id: 19672 }
		],
		19644: [ // gift of kudzu
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19627, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24865, amount: 1}
		],
		19645: [ // gift of incinerator
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19634, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24548, amount: 1},
		],
		19646: [ // gift of the minstrel
			{type: 'item', id: 19623, amount: 1},
			{type: 'item', id: 19630, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24607, amount: 1},
		],
		19647: [ // gift of sunrise
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19632, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24562, amount: 1},
		],
		19648: [ // gift of twilight
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19631, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24570, amount: 1},
		],
		19649: [ // gift of the juggernaut
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19633, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24584, amount: 1},
		],
		19650: [ // gift of the moot
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19635, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24607, amount: 1},
		],
		19651: [ // gift of quip
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19635, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24592, amount: 1},
		],
		19652: [ // gift of meteorlogicus
			{type: 'item', id: 19623, amount: 1},
			{type: 'item', id: 19637, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24554, amount: 1},
		],
		19653: [ // gift of the flameseeker prophecies
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19629, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24601, amount: 1},
		],
		19654: [ // gift of the bifrost
			{type: 'item', id: 19623, amount: 1},
			{type: 'item', id: 19638, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24572, amount: 1},
		],
		19655: [ // gift of bolt
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19639, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24554, amount: 1},
		],
		19656: [ // gift of rodgort
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19634, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24548, amount: 1},
		],
		19657: [ // gift of Kamohoali'i Kotaki
			{type: 'item', id: 19621, amount: 1},
			{type: 'item', id: 19641, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24612, amount: 1},
		],
		19658: [ // gift of kraitkin
			{type: 'item', id: 19623, amount: 1},
			{type: 'item', id: 19642, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24632, amount: 1},
		],
		19659: [ // gift of frenzy
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19643, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24561, amount: 1},
		],
		19660: [ // gift of the dreamer
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19628, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24571, amount: 1},
		],
		19661: [ // gift of the predator
			{type: 'item', id: 19622, amount: 1},
			{type: 'item', id: 19636, amount: 1},
			{type: 'item', id: 19676, amount: 100},
			{type: 'item', id: 24615, amount: 1},
		],
		19662: [ // gift of howler
			{ type: 'item', id: 19622},
			{ type: 'item', id: 19640},
			{ type: 'item', id: 19676, amount: 100},
			{ type: 'item', id: 24618}
		],
		19663: [ // bottle of elonian wine
			{ type: 'currency', id: 'Coin', amount: 254 }
		],
		19664: [ // gift of Ascalon
			{type: 'currency', id: 'Ascalonian Tear', amount: 500}
		],
		19665: [ // gift of the nobleman
			{type: 'currency', id: 'Seal of Beetletun', amount: 500}
		],
		19666: [ // gift of the forgeman
			{type: 'currency', id: 'Manifesto of the Moletariate', amount: 500}
		],
		19667: [ // gift of thorns
			{ type: 'currency', id: 'Deadly Bloom', amount: 500 }
		],
		19668: [ // gift of baelfire
			{ type: 'currency', id: 'Flame Legion Charr Carving', amount: 500 }
		],
		19669: [ // gift of zhaitan
			{type: 'currency', id: 'Shard of Zhaitan', amount: 500}
		],
		19670: [ // gift of sanctuary
			{type: 'currency', id: 'Symbol of Koda', amount: 500}
		],
		19671: [ // gift of knowledge
			{type: 'currency', id: 'Knowledge Crystal', amount: 500}
		],
		19672: [ // gift of might
			{ type: 'item', id: 24357, amount: 250 },
			{ type: 'item', id: 24289, amount: 250 },
			{ type: 'item', id: 24351, amount: 250 },
			{ type: 'item', id: 24358, amount: 250 }
		],
		19673: [ // gift of magic
			{ type: 'item', id: 24295, amount: 250 },
			{ type: 'item', id: 24283, amount: 250 },
			{ type: 'item', id: 24300, amount: 250 },
			{ type: 'item', id: 24277, amount: 250 }
		],
		19674: [ // gift of mastery
			{ type: 'item', id: 20797 },
			{ type: 'item', id: 19925, amount: 250},
			{ type: 'item', id: 19677},
			{ type: 'item', id: 19678}
		],
		19676: [ // icy runestone
			{type: 'currency', id: 'Coin', amount: 10000}
		],
		19678: [ // gift of battle
			{type: 'currency', id: 'Badge of Honor', amount: 500}
		],
		19675: [ // mystic clover
			{ type: 'item', id: 19925, amount: 3.3},
			{ type: 'item', id: 19976, amount: 3.3},
			{ type: 'item', id: 19721, amount: 3.3},
			{ type: 'item', id: 20796, amount: 6.6},
		],
		19925: [ // obsidian shard
			{type: 'currency', id: 'Karma', amount: 2100}
		],
		20796: [ // philosopher's stone
			{type: 'currency', id: 'Spirit Shard', amount: 0.1}
		],
		20797: [ // bloodstone shard
			{type: 'currency', id: 'Spirit Shard', amount: 200}
		],
		20852: [ // eldritch scroll
			{type: 'currency', id: 'Spirit Shard', amount: 50}
		],
		30684: [ // frostfang
			{type: 'item', id: 29166},
			{type: 'item', id: 19625},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30685: [ // kudzu
			{type: 'item', id: 29172},
			{type: 'item', id: 19644},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30686: [ // the dreamer
			{type: 'item', id: 29178},
			{type: 'item', id: 19660},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30687: [ // incinerator
			{type: 'item', id: 29167},
			{type: 'item', id: 19645},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30688: [ // the minstrel
			{type: 'item', id: 29168},
			{type: 'item', id: 19646},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30689: [ // eternity
			{type: 'item', id: 30703},
			{type: 'item', id: 30704},
			{type: 'item', id: 24277, amount: 5},
			{type: 'item', id: 20796, amount: 10},
		],
		30693: [ // quip
			{type: 'item', id: 29174},
			{type: 'item', id: 19651},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30696: [ // the flameseeker prophecies
			{type: 'item', id: 29177},
			{type: 'item', id: 19653},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30697: [ // frenzy
			{type: 'item', id: 29179},
			{type: 'item', id: 19659},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30702: [ // howler
			{type: 'item', id: 29184},
			{type: 'item', id: 19662},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674}
		],
		30690: [ // juggernaut
			{type: 'item', id: 29170},
			{type: 'item', id: 19649},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30691: [ // Kamohoali'i Kotaki
			{type: 'item', id: 29171},
			{type: 'item', id: 19657},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30692: [ // the moot
			{type: 'item', id: 29173},
			{type: 'item', id: 19650},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30694: [ // the predator
			{type: 'item', id: 29175},
			{type: 'item', id: 19661},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],	
		30695: [ // meteorlogicus
			{type: 'item', id: 29176},
			{type: 'item', id: 19652},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30698: [ // the bifrost
			{type: 'item', id: 29180},
			{type: 'item', id: 19654},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30699: [ // bolt
			{type: 'item', id: 29181},
			{type: 'item', id: 19655},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30700: [ // rodgort
			{type: 'item', id: 29182},
			{type: 'item', id: 19656},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30701: [ // kraitkin
			{type: 'item', id: 29183},
			{type: 'item', id: 19658},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30703: [ // sunrise
			{type: 'item', id: 29169},
			{type: 'item', id: 19647},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		30704: [ // twilight
			{type: 'item', id: 29185},
			{type: 'item', id: 19648},
			{type: 'item', id: 19626},
			{type: 'item', id: 19674},
		],
		31034: [ // reaver of the mists
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 50},
			{type: 'item', id: 24330, amount: 20},
			{type: 'item', id: 19721, amount: 250},
		],
		31045: [ // the anomaly
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 19721, amount: 250},
			{type: 'item', id: 20797, amount: 1},
		],
		31051: [ // spirit links
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 70},
			{type: 'item', id: 19685, amount: 10},
			{type: 'item', id: 19721, amount: 250},
		],
		31052: [ // vision of the mists
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12840, amount: 250},
			{type: 'item', id: 19721, amount: 250},
		],
		31053: [ // volcanus
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 24315, amount: 250},
			{type: 'item', id: 19634, amount: 1},
		],
		31054: [ // illusion
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 50},
			{type: 'item', id: 19721, amount: 250},
			{type: 'item', id: 12899, amount: 250},
		],
		31055: [ // titans' vengeance
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 50},
			{type: 'item', id: 24315, amount: 50},
			{type: 'item', id: 24325, amount: 50},
		],
		31056: [ // eye of rodgort
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 24295, amount: 250},
			{type: 'item', id: 31081, amount: 1},
		],
		31057: [ // immobulus
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 30},
			{type: 'item', id: 24277, amount: 250},
			{type: 'item', id: 24370, amount: 250},
		],
		31058: [ // Abyssal Scepter
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12976, amount: 250},
			{type: 'item', id: 19721, amount: 250},
		],
		31059: [ // cragstone
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 24310, amount: 250},
			{type: 'item', id: 19925, amount: 50},
		],
		31060: [ // wall of the mists
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 50},
			{type: 'item', id: 12912, amount: 250},
			{type: 'item', id: 24370, amount: 30},
		],
		31062: [ // eidolon
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12912, amount: 250},
			{type: 'item', id: 19632, amount: 1},
		],
		31064: [ // firebringer
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 30},
			{type: 'item', id: 12870, amount: 250},
			{type: 'item', id: 24315, amount: 50},
		],
		31068: [ // infinite light
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 24305, amount: 250},
			{type: 'item', id: 12870, amount: 250},
		],
		31069: [ // whisperblade
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12870, amount: 250},
			{type: 'item', id: 19721, amount: 250},
		],
		31070: [ // wings of dwayna
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19632, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 24571, amount: 20},
		],
		31071: [ // azureflame
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19632, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12941, amount: 250},
		],
		31072: [ // wintersbite
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19624, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12941, amount: 250},
		],
		31073: [ // feathers of dwayna
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19632, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 24572, amount: 20},
		],
		31074: [ // aether
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19632, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12947, amount: 250},
		],
		31075: [ // wintersbark
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19624, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12947, amount: 250},
		],
		31076: [ // ilya
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 50},
			{type: 'item', id: 12959, amount: 250},
			{type: 'item', id: 19721, amount: 250},
		],
		31077: [ // Foefire's Essence
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19632, amount: 1},
			{type: 'item', id: 19976, amount: 70},
			{type: 'item', id: 12840, amount: 250},
		],
		31078: [ // Foefire's Power
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19632, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 12864, amount: 250},
		],
		31079: [ // mjölnir
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 24305, amount: 250},
			{type: 'item', id: 19639, amount: 1},
		],
		31080: [ // lyss
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 50},
			{type: 'item', id: 12924, amount: 250},
			{type: 'item', id: 19721, amount: 250},
		],
		31081: [ // lidless eye
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 50},
			{type: 'item', id: 24295, amount: 250},
			{type: 'item', id: 24370, amount: 10},
		],
		31088: [ // ignus fatuus
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 50},
			{type: 'item', id: 19721, amount: 250},
			{type: 'item', id: 12998, amount: 250},
		],
		31103: [ // mirage
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 13004, amount: 250},
			{type: 'item', id: 19721, amount: 250},
		],
		36051: [ // arachnophobia
			{type: 'item', id: 36058, amount: 1},
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 36053, amount: 20},
		],
		36056: [ // the mad moon
			{type: 'item', id: 36069, amount: 1},
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 36053, amount: 20},
		],
		36057: [ // recipe: gift of spiders
			{type: 'item', id: 19663, amount: 40},
			{type: 'item', id: 47909, amount: 10},
			{type: 'item', id: 24277, amount: 10},
			{type: 'item', id: 48805, amount: 10},
		],
		36067: [ // recipe: superior sigil of the night
			{type: 'item', id: 36060, amount: 25*12},
			{type: 'item', id: 36061, amount: 25*12},
			{type: 'item', id: 36059, amount: 25*12},
			{type: 'item', id: 36041, amount: 250*12}
		],
		36068: [ // recipe: gift of the moon
			{type: 'item', id: 19663, amount: 40},
			{type: 'item', id: 47909, amount: 10},
			{type: 'item', id: 24277, amount: 10},
			{type: 'item', id: 48807, amount: 10},
		],
		36070: [ // the crossing
			{type: 'item', id: 36072, amount: 1},
			{type: 'item', id: 20852, amount: 1},
			{type: 'item', id: 19976, amount: 100},
			{type: 'item', id: 36053, amount: 20},
		],
		36071: [ // recipe: gift of souls
			{type: 'item', id: 19663, amount: 40},
			{type: 'item', id: 47909, amount: 10},
			{type: 'item', id: 24277, amount: 10},
			{type: 'item', id: 48806, amount: 10},
		],
		43772: [ // charged quartz crystal
			{type: 'item', id: 43773, amount: 25}
		],
		46732: [ // dragonite ingot
			{type: 'item', id: 46733, amount: 100},
			{type: 'item', id: 19925, amount: 2},
			{type: 'item', id: 46747, amount: 10}
		],
		46734: [ // empyreal star
			{type: 'item', id: 46735, amount: 100},
			{type: 'item', id: 19925, amount: 2},
			{type: 'item', id: 46747, amount: 10}
		],
		46747: [ // thermocatalytic reagent
			{type: 'currency', id: 'Coin', amount: 179}
		],
		46752: [ // augur's stone
			{type: 'currency', id: 'Spirit Shard', amount: 20}
		],
		47909: [ // candy corn cob
			{type: 'item', id: 36041, amount: 1000},
		],
		49523: [ // lesser vision crystal
			{type: 'item', id: 46730, amount: 2},
			{type: 'item', id: 46732, amount: 2},
			{type: 'item', id: 46734, amount: 2},
			{type: 'item', id: 46752, amount: 1},
		],
		49425: [ // +2 agony infusion
			{type: 'item', id: 49424, amount: 2},
			{type: 'item', id: 46747},
		],
		49426: [ // +3 agony infusion
			{type: 'item', id: 49425, amount: 2},
			{type: 'item', id: 46747},
		],
		49427: [ // +4 agony infusion
			{type: 'item', id: 49426, amount: 2},
			{type: 'item', id: 46747},
		],
		49428: [ // +5 agony infusion
			{type: 'item', id: 49427, amount: 2},
			{type: 'item', id: 46747},
		],
		66890: [ // cultivated shoot
			{type: 'item', id: 66979},
			{type: 'item', id: 66989},
		],
		66902: [ // brick of clay
			{type: 'currency', id: 'Geode', amount: 12}
		],
		66905: [ // recipe: clay pot
			{type: 'currency', id: 'Coin', amount: 736},
			{type: 'currency', id: 'Geode', amount: 44}
		],
		66906: [ // recipe: plate of meaty plant food
			{type: 'currency', id: 'Coin', amount: 736},
			{type: 'currency', id: 'Geode', amount: 44}
		],
		66907: [ // recipe: plate of piquant plant food
			{type: 'currency', id: 'Coin', amount: 736},
			{type: 'currency', id: 'Geode', amount: 44}
		],
		66908: [ // mysterious seedling
			{type: 'item', id: 66909},
			{type: 'item', id: 66912},
		],
		66910: [ // pet seed
			{type: 'item', id: 66890},
			{type: 'item', id: 66995},
		],
		66911: [ // mysterious sprout
			{type: 'item', id: 66908},
			{type: 'item', id: 66916},
		],
		66912: [ // ley line infused clay pot
			{type: 'item', id: 66913},
			{type: 'item', id: 66933, amount: 20},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 66914}
		],
		66914: [ // polarized ley line infused stone
			{type: 'item', id: 66915},
		],
		66916: [ 
			{type: 'item', id: 19729, amount: 100},
			{type: 'item', id: 66917, amount: 7},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 66919, amount: 1},
		],
		66919: [ // purified vial of sacred glacial water
			{type: 'item', id: 66918},
		],
		66920: [ // package of phantasmally infused plant food
			{type: 'item', id: 19729, amount: 100},
			{type: 'item', id: 66923, amount: 7},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 66921, amount: 1},
		],
		66921: [ // weirded phantasmal residue
			{type: 'item', id: 66922, amount: 1},
		],
		66924: [ // mysterious vine
			{type: 'item', id: 66911},
			{type: 'item', id: 66920},
		],
		66978: [ // recipe: grow lamp
			{type: 'currency', id: 'Geode', amount: 60}
		],
		66979: [ // cultivated sprout
			{type: 'item', id: 66980},
			{type: 'item', id: 66987},
		],
		66980: [ // cultivated seedling
			{type: 'item', id: 66981},
			{type: 'item', id: 66984},
		],
		66981: [ // cultivated seed
			{type: 'item', id: 66911},
			{type: 'item', id: 66920},
		],
		66982: [ // cultivated vine
			{type: 'item', id: 66890},
			{type: 'item', id: 66995},
		],
		66983: [ // resonating chaos orb
			{type: 'item', id: 66985}
		],
		66984: [ // chaos infused clay pot
			{type: 'item', id: 66913, amount: 1},
			{type: 'item', id: 66933, amount: 20},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 66983, amount: 1},
		],
		66986: [ // pile of crackling ley line dust
			{type: 'item', id: 66988, amount: 1},
		],
		66987: [ // package of ley line dusted plant food
			{type: 'item', id: 19729, amount: 100},
			{type: 'item', id: 66917, amount: 7},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 66986, amount: 1},
		],
		66989: [ // package of oasis soaked plant food
			{type: 'item', id: 19729, amount: 100},
			{type: 'item', id: 66923, amount: 7},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 66991, amount: 1},
		],
		66991: [ // vial of mending oasis water
			{type: 'item', id: 66990, amount: 1},
		],
		66994: [ // germinated foxfire cluster
			{type: 'item', id: 66992, amount: 1},
		],
		66995: [ // attuned grow lamp
			{type: 'item', id: 66993, amount: 1},
			{type: 'item', id: 46730, amount: 3},
			{type: 'item', id: 45178, amount: 4},
			{type: 'item', id: 44941, amount: 1},
		],
		67010: [ // package of elementally charged plant food
			{type: 'item', id: 19729, amount: 100},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 66917, amount: 7},
			{type: 'item', id: 67009},
		],
		67012: [ // package of rhand blessed plant food
			{type: 'item', id: 19729, amount: 100},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 66923, amount: 7},
			{type: 'item', id: 67011},
		],
		67014: [ // powerful grow lamp
			{type: 'item', id: 66993},
			{type: 'item', id: 46730, amount: 3},
			{type: 'item', id: 45178, amount: 4},
			{type: 'item', id: 67013},
		],
		67015: [ // heat stone
			{type: 'item', id: 49523},
			{type: 'item', id: 24315, amount: 10},
			{type: 'item', id: 24310, amount: 10},
			{type: 'item', id: 46747, amount: 15},
		],
		67016: [ // destroyer heated stone
			{type: 'item', id: 67015},
			{type: 'item', id: 46730, amount: 3},
			{type: 'item', id: 49428},
			{type: 'item', id: 67017},
		],
		67000: [ // pet sprout
			{type: 'item', id: 67010},
			{type: 'item', id: 67003},
		],
		67003: [ // pet seedling
			{type: 'item', id: 67008},
			{type: 'item', id: 66910},
		],
		67004: [ // mawdrey
			{type: 'item', id: 67016},
			{type: 'item', id: 67006},
		],
		67005: [ // pet shoot
			{type: 'item', id: 67012},
			{type: 'item', id: 67000},
		],
		67006: [ // pet plantling
			{type: 'item', id: 67014},
			{type: 'item', id: 67005},
		],
		67007: [ // mists stone
			{type: 'currency', id: 'Pristine Fractal Relic', amount: 5}
		],
		67008: [ // mists infused clay pot
			{type: 'item', id: 66913},
			{type: 'item', id: 66933, amount: 20},
			{type: 'item', id: 46731, amount: 100},
			{type: 'item', id: 67007},
		]
	};
	
	var recipeItemIds = {
		19621: 9615,
		19622: 9617,
		19623: 9618,
		19624: 9616,
		19627: 9621,
		19628: 9622,
		19629: 9623,
		19630: 9624,
		19631: 9625,
		19632: 9626,
		19633: 9627,
		19634: 9631,
		19635: 9628,
		19636: 9629,
		19637: 9630,
		19638: 9632,
		19639: 9633,
		19640: 9634,
		19641: 9635,
		19642: 9636,
		19643: 9637,
		36053: 36067,
		36058: 36057,
		36069: 36068,
		36072: 36071,
		66923: 66907,
		66913: 66905,
		66917: 66906,
		66993: 66978
	};
	
	var legendaryIds = [
		30702,
		30698,
		30699,
		30686,
		30696,
		30697,
		30684,
		30687,
		30690,
		30685,
		30701,
		30691,
		30695,
		30688,
		30692,
		30694,
		30693,
		30700,
		30703,
		30704,
		30689
	];
	
	var namedExoticIds = [
		31034,
		31045,
		31051,
		31052,
		31053,
		31054,
		31055,
		31056,
		31057,
		31058,
		31059,
		31060,
		31062,
		31064,
		31068,
		31069,
		31070,
		31071,
		31072,
		31073,
		31074,
		31075,
		31076,
		31077,
		31078,
		31079,
		31080,
		31081,
		31088,
		31103,
		36051,
		36056,
		36070
	];
	
	var othersIds = [
		19626,
		19674,
		66924,
		66982,
		67004
	];

	/* recipe item ids not present in the API for some reason */
	var brokenItems = {
		9630: "Gift of Weather",
		9635: "Shark Statue"
	};
	
	/* object used to create the replacement for the broken recipe items */
	var baseRecipe = {
		"name": "Recipe: ",
		"description": "Synthesized recipe",
		"type": "Consumable",
		"level": 0,
		"rarity": "Legendary",
		"vendor_value": 12500,
		"game_types": [
			"Dungeon",
			"Pve",
			"Wvw"
		],
		"flags": [
			"AccountBound",
			"NoSalvage",
			"AccountBindOnUse"
		],
		"restrictions": [
		],
		"id": 9636,
		"icon": "https://render.guildwars2.com/file/3D423F6758A5265FF1195303529B32E239C6B0BF/849385.png",
		"details": {
			"type": "Unlock",
			"unlock_type": "CraftingRecipe",
			"recipe_id": 1715
		}
	};
	
	var cache = {};
	
	return {
		/**
		 * Get the item ids of all the legendary weapons.
		 * @returns {[int]} - The ids of all the legendary weapons.
		 */
		getLegendaryIds: function() {
			return legendaryIds;
		},
		/**
		 * Get the item ids of the crafted named exotic weapons.
		 * @returns {[int]} - The ids of all the crafted named exotic weapons.
		 */
		getNamedExoticsIds: function() {
			return namedExoticIds;
		},
		/**
		 * Get the item ids of the other weapons and items.
		 * @returns {[int]} - The ids of all the other weapons and items.
		 */
		getOthersIds: function() {
			return othersIds;
		},
		/**
		 * Get an item, even when the GW2 API is broken in respect to recipe items.
		 *
		 * @param {int} itemId - The ID of the item to return.
		 * @returns {promise<item>} - The item.
		 */
		getSynthesizedItem: function(itemId) {
			var brokenItem = brokenItems[itemId];
			if(!!brokenItem) {
				var newItem = jQuery.extend(true, {}, baseRecipe);
				newItem.name = newItem.name + brokenItem;
				return $q.when(newItem);
			} else {
				return GW2API.getItem(itemId);
			}
		},
		
		/**
		 * Get a recipe, considering also the mystic forge ones and possibly synthesizing recipe item ids
		 * when the API is missing elements.
		 * @param {int} itemId - The output item id.
		 * @returns {promise<recipe>} - A recipe item.
		 */
		getRecipeFromOutputId: function(itemId) {
			function apiGetRecipeFromOutputId(id) {
				if(!!cache[id]) {
					return $q.when(cache[id]);
				}
				return GW2API.getRecipeIdsByOutput(id).then(function(recipes) {
					cache[id] = recipes;
					return cache[id];
				});
			}
			// get out implicit recipes
			var recipe = mysticForgeRecipes[itemId];
			// get out api recipes, if we have no other recipe
			if(!!recipe) {
				return $q.when({
					ingredients: recipe,
					crafter: null
				});
			} else {
				return apiGetRecipeFromOutputId(itemId)
					.then(function(recipeIds) {
						if(recipeIds.length === 0) {
							return $q.reject("No recipe found for itemId = " + itemId);
						}
						var recipeId = recipeIds[0];
						return GW2API.getRecipe(recipeId);
					})
					.then(function(recipe) {
						var ingredients = recipe.ingredients;
						var recipeItemId = null;
						if(jQuery.inArray("LearnedFromItem", recipe.flags || []) != -1) {
							recipeItemId = recipeItemIds[recipe.output_item_id];
							if(!recipeItemId) {
								return $q.reject("No recipe item id registered for output item id = " + recipe.output_item_id);
							} /*else {
								ingredients = ingredients.slice(0);
								ingredients.push({
									item_id: recipeItemId,
									count: 1
								});
							}*/
						}
						return {
							ingredients: jQuery.map(ingredients, function(entry) {
									return {
										type: 'item',
										id: entry.item_id,
										amount: entry.count
									};
								}),
							crafter: {
								disciplines: recipe.disciplines,
								rating: recipe.min_rating
							},
							recipeItemId: recipeItemId
						};
					});
			}
		}
	};
})

;