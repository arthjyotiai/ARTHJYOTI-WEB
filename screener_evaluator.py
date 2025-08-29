import json

with open("screener.json") as f:
    quantitative = json.load(f)
with open("qualitative.json") as f:
    qualitative = json.load(f)
with open("mc_results.json") as f:
    mc = json.load(f)

combined=[]
for sym in quantitative:
    q = quantitative[sym]
    qual = qualitative.get(sym,{"combined_score":0})
    mc_data = mc.get(sym,{"mc_min":0,"mc_max":0})
    stock={
        "symbol":sym,
        "current_price":q["current_price"],
        "market_cap":q["market_cap"],
        "roe":q["roe"],
        "pe":q["pe"],
        "mc_min":mc_data["mc_min"],
        "mc_max":mc_data["mc_max"],
        "qual_score":qual["combined_score"],
        "combined_score":round((q.get("quant_score",0)+qual["combined_score"])/2,2)
    }
    combined.append(stock)

with open("screener_filtered.json","w") as f:
    json.dump(combined,f,indent=2)
