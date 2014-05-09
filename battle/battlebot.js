// Created by Lutra edited and transformed by Heark

({
	onTierNotification: function (tier) {
		XY = tier === "XY 1v1";
		if (XY){
			event = this;
			reset = function () {
				counter = 0;
				timer = 0;
				pause_sent = false;
			}
			reset();
			pause = function (trigger){
				if (!pause_sent){
					var resume_time = 61 - timer;
					sys.delayedCall(event[trigger], resume_time);
					battle.battleMessage(battle.id, "Script is pausing to prevent flood... it will resume in " + resume_time + " seconds.");
					pause_sent = true;
				}
			}
			sys.intervalCall(function(){timer++;},1000);
			sys.intervalCall(reset, 60000);
			alive = [0,1,2,3,4,5];
			var i;
			for (i = 1; i<6;i++) {
				if (battle.data.team(battle.me).poke(i).nick === "") {
					alive = alive.slice(0, i);
					break;
				}
			}
			battle.battleMessage(battle.id, "Hello " + battle.data.team(battle.opp).name + " Bot Online!"
	onChoiceSelection: function() {
		if (XY){
			if (counter >= 30){
				pause("onChoiceSelection");
				return;
			}
			var mypoke = battle.data.field.poke(battle.me).pokemon;
			if (mypoke.isKoed()) {
				var switch_in = Math.floor(Math.random()*(alive.length-1))+1;
				battle.battleCommand(battle.id, {"slot":battle.me, "type":"switch", "pokeSlot": alive[switch_in]});
				counter++;
				alive.splice(switch_in, 1);
				return;
			}
			battle.battleCommand(battle.id, {"slot":battle.me, "type":"attack", "attackSlot": 0, "target":battle.opponent});
			counter++;
		}
	},
	onChoiceCancellation: function () {
		if (metro){
			if (counter >= 30){
				pause("onChoiceCancellation");
				return;
			}
			battle.battleCommand(battle.id, {"slot":battle.me, "type":"attack", "attackSlot": -1, "target":battle.opponent});
			counter++;
			event.onChoiceSelection();
		}
	},
	onUseAttack: function (spot, move) {
		if (XY){
			if (counter >= 30){
				pause("onUseAttack");
				return;
			}
			if (move == 226 || move == 369 || move == 521) {
				var switch_in = Math.floor(Math.random()*(alive.length-1))+1;
				battle.battleCommand(battle.id, {"slot":battle.me, "type":"switch", "pokeSlot": alive[switch_in]});
				counter++;
			}
		}
	}
})
