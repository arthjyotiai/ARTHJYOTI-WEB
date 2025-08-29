import json, random

mc_results = {
    "RELIANCE.NS":{"mc_min":530,"mc_max":650},
    "TCS.NS":{"mc_min":3200,"mc_max":4000}
}

with open("mc_results.json","w") as f:
    json.dump(mc_results,f,indent=2)
