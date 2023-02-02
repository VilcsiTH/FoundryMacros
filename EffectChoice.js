//Effect Choice Macro
//Created by ShadowSWilliam#4555, for Coul#3188's campaign, Sailors Of Velicita.

function inputEffect(effect) { //this is called once an effect choice is made, macro starts below this function
	new Dialog({
		title: "Describe the Effect",
		content:
		`<form>
			<div class="form-group">
				<label>Effect text:</label>
				<input type='text' name='effectInput'></input>
			</div>
		</form>`,
		buttons:{
			go: {
				icon: "<i class='fas fa-message'></i>",
				label: "Send Effect",
				callback: (html) => {
					let result = html.find("input[name=\"effectInput\"]");
					let effectText = result.val();
					let effectHtml = null; //this MUST be defined before we enter the switchcase.
					switch(effect){
						case "Good":
						effectHtml =
						`<h2 style='color: lightgreen;'>Good Effect</h2>
						${effectText}`;
						break;
						case "Bad":
						effectHtml =
						`<h2 style='color: crimson;'>Bad Effect</h2>
						${effectText}`;
						break;
						default:
						effectHtml =
						`<h2 style='color: grey;'>Neutral Effect</h2>
						${effectText}`;
					}
					ChatMessage.create({
						user: game.user._id,
						speaker: ChatMessage.getSpeaker({alias: "Your actions affect the world..."}), //this is the best thing i could come up with, targeting token would be a headache imo
						content: effectHtml
					});
				} 
			},
			cancel: { //failsafe if situation changes mid-text
				icon: "<i class='fas fa-message-slash'></i>",
				label: "Discard Effect"
			}
		},
		default: "cancel",
	}, {id: "effectTextInput"}).render(true);
}

//Macro starts here
new Dialog({
	title: "Choose Effect",
	content:
		`<style>
		.dialog-buttons {
			flex-direction: column;
		}
		</style>`,
	buttons: {
		goodEffect: {
			icon: "<i class='fas fa-check'></i>",
			label: "Good Effect",
			callback: () => inputEffect("Good")
		},
		badEffect: {
			icon: "<i class='fas fa-xmark'></i>",
			label: "Bad Effect",
			callback: () => inputEffect("Bad")
		},
		neutralEffect: {
			icon: "<i class='fas fa-minus'></i>",
			label: "Neutral Effect",
			callback: () => inputEffect() //since neutral is used when the effect is unknown, we don't need to pass anything
		},
		cancelEffect: { //just a failsafe in case the macro is called accidentally
			icon: "<i class='fas fa-message-slash'></i>",
			label: "Cancel Effect Creation"
		}
	},
	default: "cancelEffect",
}, {id: "effectSelector"}).render(true);