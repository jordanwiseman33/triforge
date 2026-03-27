import { useState, useEffect, useRef } from "react";

var FOODS = [
  {cat:"Fruit",name:"Apple (medium)",serv:"1 medium",cal:95,pro:0,carb:25,fat:0,fib:4,sug:19},
  {cat:"Fruit",name:"Banana",serv:"1 medium",cal:105,pro:1,carb:27,fat:0,fib:3,sug:14},
  {cat:"Fruit",name:"Orange",serv:"1 medium",cal:62,pro:1,carb:15,fat:0,fib:3,sug:12},
  {cat:"Fruit",name:"Strawberries",serv:"1 cup",cal:49,pro:1,carb:12,fat:0,fib:3,sug:7},
  {cat:"Fruit",name:"Blueberries",serv:"1 cup",cal:84,pro:1,carb:21,fat:0,fib:4,sug:15},
  {cat:"Fruit",name:"Raspberries",serv:"1 cup",cal:64,pro:1,carb:15,fat:1,fib:8,sug:5},
  {cat:"Fruit",name:"Blackberries",serv:"1 cup",cal:62,pro:2,carb:14,fat:1,fib:8,sug:7},
  {cat:"Fruit",name:"Cherries",serv:"1 cup",cal:87,pro:1,carb:22,fat:0,fib:3,sug:18},
  {cat:"Fruit",name:"Grapes",serv:"1 cup",cal:104,pro:1,carb:27,fat:0,fib:1,sug:23},
  {cat:"Fruit",name:"Watermelon",serv:"1 cup diced",cal:46,pro:1,carb:12,fat:0,fib:1,sug:9},
  {cat:"Fruit",name:"Cantaloupe",serv:"1 cup diced",cal:54,pro:1,carb:13,fat:0,fib:1,sug:12},
  {cat:"Fruit",name:"Mango",serv:"1 cup",cal:99,pro:1,carb:25,fat:1,fib:3,sug:23},
  {cat:"Fruit",name:"Pineapple",serv:"1 cup",cal:82,pro:1,carb:22,fat:0,fib:2,sug:16},
  {cat:"Fruit",name:"Avocado",serv:"1/2 medium",cal:120,pro:1,carb:6,fat:11,fib:5,sug:0},
  {cat:"Fruit",name:"Peach",serv:"1 medium",cal:59,pro:1,carb:14,fat:0,fib:2,sug:13},
  {cat:"Fruit",name:"Pear",serv:"1 medium",cal:101,pro:1,carb:27,fat:0,fib:6,sug:17},
  {cat:"Fruit",name:"Kiwi",serv:"1 medium",cal:42,pro:1,carb:10,fat:0,fib:2,sug:6},
  {cat:"Fruit",name:"Grapefruit",serv:"1/2 medium",cal:52,pro:1,carb:13,fat:0,fib:2,sug:8},
  {cat:"Fruit",name:"Plum",serv:"1 medium",cal:30,pro:0,carb:8,fat:0,fib:1,sug:7},
  {cat:"Vegetable",name:"Broccoli",serv:"1 cup",cal:55,pro:4,carb:11,fat:1,fib:5,sug:2},
  {cat:"Vegetable",name:"Spinach (raw)",serv:"2 cups",cal:14,pro:2,carb:2,fat:0,fib:1,sug:0},
  {cat:"Vegetable",name:"Sweet Potato",serv:"1 medium",cal:103,pro:2,carb:24,fat:0,fib:4,sug:7},
  {cat:"Vegetable",name:"Potato (baked)",serv:"1 medium",cal:161,pro:4,carb:37,fat:0,fib:4,sug:2},
  {cat:"Vegetable",name:"Carrots",serv:"1 cup",cal:52,pro:1,carb:12,fat:0,fib:4,sug:6},
  {cat:"Vegetable",name:"Green Beans",serv:"1 cup",cal:31,pro:2,carb:7,fat:0,fib:3,sug:3},
  {cat:"Vegetable",name:"Asparagus",serv:"6 spears",cal:20,pro:2,carb:4,fat:0,fib:2,sug:1},
  {cat:"Vegetable",name:"Bell Pepper",serv:"1 medium",cal:31,pro:1,carb:7,fat:0,fib:2,sug:5},
  {cat:"Vegetable",name:"Tomato",serv:"1 medium",cal:22,pro:1,carb:5,fat:0,fib:1,sug:3},
  {cat:"Vegetable",name:"Corn on Cob",serv:"1 ear",cal:88,pro:3,carb:19,fat:1,fib:2,sug:6},
  {cat:"Vegetable",name:"Cauliflower",serv:"1 cup",cal:27,pro:2,carb:5,fat:0,fib:2,sug:2},
  {cat:"Vegetable",name:"Zucchini",serv:"1 cup",cal:17,pro:1,carb:3,fat:0,fib:1,sug:3},
  {cat:"Vegetable",name:"Cucumber",serv:"1 cup",cal:16,pro:1,carb:4,fat:0,fib:1,sug:2},
  {cat:"Vegetable",name:"Kale",serv:"1 cup",cal:33,pro:3,carb:6,fat:1,fib:1,sug:2},
  {cat:"Vegetable",name:"Brussels Sprouts",serv:"1 cup",cal:56,pro:4,carb:11,fat:1,fib:4,sug:3},
  {cat:"Vegetable",name:"Celery",serv:"2 stalks",cal:13,pro:1,carb:3,fat:0,fib:1,sug:1},
  {cat:"Vegetable",name:"Mushrooms",serv:"1 cup",cal:21,pro:3,carb:3,fat:0,fib:1,sug:2},
  {cat:"Vegetable",name:"Edamame",serv:"1 cup",cal:188,pro:18,carb:14,fat:8,fib:8,sug:3},
  {cat:"Vegetable",name:"Beets",serv:"1 cup",cal:58,pro:2,carb:13,fat:0,fib:4,sug:9},
  {cat:"Chicken",name:"Chicken Breast (grilled)",serv:"6 oz",cal:281,pro:53,carb:0,fat:6,fib:0,sug:0},
  {cat:"Chicken",name:"Chicken Breast (fried)",serv:"6 oz",cal:390,pro:46,carb:12,fat:17,fib:0,sug:0},
  {cat:"Chicken",name:"Chicken Thigh (grilled)",serv:"1 thigh",cal:230,pro:28,carb:0,fat:13,fib:0,sug:0},
  {cat:"Chicken",name:"Chicken Thigh (fried)",serv:"1 thigh",cal:318,pro:25,carb:9,fat:20,fib:0,sug:0},
  {cat:"Chicken",name:"Chicken Wing (3)",serv:"3 wings",cal:320,pro:27,carb:0,fat:23,fib:0,sug:0},
  {cat:"Chicken",name:"Chicken Drumstick (2)",serv:"2 drumsticks",cal:296,pro:36,carb:0,fat:16,fib:0,sug:0},
  {cat:"Chicken",name:"Chicken Tenders (fried)",serv:"4 pieces",cal:360,pro:28,carb:20,fat:18,fib:1,sug:1},
  {cat:"Chicken",name:"Rotisserie Chicken",serv:"6 oz",cal:310,pro:42,carb:0,fat:15,fib:0,sug:0},
  {cat:"Beef",name:"Ribeye Steak",serv:"8 oz",cal:544,pro:48,carb:0,fat:38,fib:0,sug:0},
  {cat:"Beef",name:"Sirloin Steak",serv:"8 oz",cal:408,pro:52,carb:0,fat:21,fib:0,sug:0},
  {cat:"Beef",name:"Filet Mignon",serv:"6 oz",cal:348,pro:42,carb:0,fat:18,fib:0,sug:0},
  {cat:"Beef",name:"Ground Beef 80/20",serv:"6 oz",cal:426,pro:38,carb:0,fat:30,fib:0,sug:0},
  {cat:"Beef",name:"Ground Beef 90/10",serv:"6 oz",cal:332,pro:42,carb:0,fat:18,fib:0,sug:0},
  {cat:"Beef",name:"Chuck Roast",serv:"6 oz",cal:396,pro:42,carb:0,fat:24,fib:0,sug:0},
  {cat:"Beef",name:"Brisket",serv:"6 oz",cal:408,pro:40,carb:0,fat:27,fib:0,sug:0},
  {cat:"Beef",name:"NY Strip",serv:"8 oz",cal:480,pro:50,carb:0,fat:30,fib:0,sug:0},
  {cat:"Beef",name:"T-Bone",serv:"8 oz",cal:496,pro:46,carb:0,fat:34,fib:0,sug:0},
  {cat:"Pork",name:"Pork Chop (grilled)",serv:"6 oz",cal:310,pro:42,carb:0,fat:15,fib:0,sug:0},
  {cat:"Pork",name:"Pork Tenderloin",serv:"6 oz",cal:248,pro:44,carb:0,fat:7,fib:0,sug:0},
  {cat:"Pork",name:"Pulled Pork",serv:"6 oz",cal:380,pro:36,carb:8,fat:22,fib:0,sug:6},
  {cat:"Pork",name:"Bacon (3 slices)",serv:"3 slices",cal:129,pro:9,carb:0,fat:10,fib:0,sug:0},
  {cat:"Pork",name:"Baby Back Ribs",serv:"6 ribs",cal:540,pro:36,carb:0,fat:42,fib:0,sug:0},
  {cat:"Pork",name:"Pork Loin Roast",serv:"6 oz",cal:270,pro:44,carb:0,fat:10,fib:0,sug:0},
  {cat:"Fish",name:"Salmon Fillet",serv:"6 oz",cal:354,pro:38,carb:0,fat:22,fib:0,sug:0},
  {cat:"Fish",name:"Tuna Steak",serv:"6 oz",cal:244,pro:52,carb:0,fat:2,fib:0,sug:0},
  {cat:"Fish",name:"Tilapia",serv:"6 oz",cal:218,pro:44,carb:0,fat:4,fib:0,sug:0},
  {cat:"Fish",name:"Cod",serv:"6 oz",cal:186,pro:40,carb:0,fat:2,fib:0,sug:0},
  {cat:"Fish",name:"Shrimp",serv:"6 oz",cal:168,pro:36,carb:0,fat:2,fib:0,sug:0},
  {cat:"Fish",name:"Catfish (grilled)",serv:"6 oz",cal:230,pro:38,carb:0,fat:8,fib:0,sug:0},
  {cat:"Fish",name:"Trout",serv:"6 oz",cal:280,pro:38,carb:0,fat:12,fib:0,sug:0},
  {cat:"Fish",name:"Walleye",serv:"6 oz",cal:196,pro:40,carb:0,fat:3,fib:0,sug:0},
  {cat:"Other",name:"Eggs (2 whole)",serv:"2 large",cal:143,pro:12,carb:1,fat:10,fib:0,sug:1},
  {cat:"Other",name:"Egg Whites (3)",serv:"3 whites",cal:51,pro:11,carb:0,fat:0,fib:0,sug:0},
  {cat:"Other",name:"White Rice",serv:"1 cup",cal:206,pro:4,carb:45,fat:0,fib:1,sug:0},
  {cat:"Other",name:"Brown Rice",serv:"1 cup",cal:216,pro:5,carb:45,fat:2,fib:4,sug:1},
  {cat:"Other",name:"Pasta",serv:"1 cup",cal:220,pro:8,carb:43,fat:1,fib:3,sug:1},
  {cat:"Other",name:"Oatmeal",serv:"1 cup",cal:166,pro:6,carb:28,fat:4,fib:4,sug:1},
  {cat:"Other",name:"Peanut Butter",serv:"2 tbsp",cal:190,pro:7,carb:7,fat:16,fib:2,sug:3},
  {cat:"Other",name:"Greek Yogurt",serv:"1 cup",cal:130,pro:22,carb:9,fat:0,fib:0,sug:7},
  {cat:"Other",name:"Protein Shake",serv:"1 scoop",cal:120,pro:24,carb:3,fat:1,fib:0,sug:1},
  {cat:"Other",name:"Black Beans",serv:"1/2 cup",cal:114,pro:8,carb:20,fat:0,fib:8,sug:0},
  {cat:"Other",name:"Quinoa",serv:"1 cup",cal:222,pro:8,carb:39,fat:4,fib:5,sug:2},
  {cat:"Other",name:"Turkey Breast",serv:"4 oz",cal:120,pro:24,carb:2,fat:1,fib:0,sug:1},
  {cat:"Other",name:"Venison",serv:"6 oz",cal:258,pro:50,carb:0,fat:6,fib:0,sug:0}
];

var CATS = ["Fruit","Vegetable","Chicken","Beef","Pork","Fish","Other"];
var DAYNAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var SPORTS = [
  {id:"triathlon",name:"Triathlon",disc:["swim","bike","run"],icon:"S/B/R"},
  {id:"duathlon",name:"Duathlon",disc:["bike","run"],icon:"B/R"},
  {id:"aquathlon",name:"Aquathlon",disc:["swim","run"],icon:"S/R"},
  {id:"marathon",name:"Marathon / Running",disc:["run"],icon:"RUN"},
  {id:"ultra",name:"Ultra Marathon",disc:["run"],icon:"ULTRA"},
  {id:"cycling",name:"Century / Cycling",disc:["bike"],icon:"BIKE"},
  {id:"swim",name:"Open Water / Swim",disc:["swim"],icon:"SWIM"}
];
var RACE_TYPES = {
  triathlon:["Super Sprint Tri","Sprint Tri","Olympic Tri","Half Ironman 70.3","Ironman 140.6"],
  duathlon:["Sprint Du","Standard Du","Long Du","Powerman"],
  aquathlon:["Sprint Aquathlon","Standard Aquathlon","Long Aquathlon"],
  marathon:["5K","10K","15K","10 Mile","Half Marathon","Marathon"],
  ultra:["50K","50 Mile","100K","100 Mile","24 Hour","Backyard Ultra"],
  cycling:["25 Mile","50 Mile","Metric Century (62mi)","Century (100mi)","Double Century","Gran Fondo"],
  swim:["1 Mile","1.2 Mile","2.4 Mile","5K Swim","10K Swim"]
};
var TERRAIN_OPTS = ["Flat","Rolling hills","Hilly","Mountainous","Mixed","Trail/Off-road","Track","Unknown"];
var SWIM_TYPE_OPTS = ["Open water - lake","Open water - ocean","Open water - river (downstream)","Open water - river (upstream)","Pool","Unknown"];
var BODY_TYPES = [{v:"slim",l:"Slim / Lean"},{v:"athletic",l:"Athletic / Muscular"},{v:"average",l:"Average Build"},{v:"stocky",l:"Stocky / Heavy-set"},{v:"large",l:"Large / Big-boned"}];

// ── Subscription tiers ──
var TIERS = {
  trial: { name: "Free Trial", price: 0, maxRaces: 0, maxMods: 0, hasPlanBuilder: false, hasCoach: false, durationDays: 7 },
  basic: { name: "Basic", price: 9.99, maxRaces: 5, maxMods: 5, hasPlanBuilder: true, hasCoach: true, smsPrice: 3.99 },
  pro: { name: "Pro", price: 16.99, maxRaces: 15, maxMods: 15, hasPlanBuilder: true, hasCoach: true, smsPrice: 2.99 }
};
var SMS_PRICE = 3.99;
var SMS_TRIAL_DAYS = 3;

export default function App() {
  var [user, setUser] = useState("");
  var [pw, setPw] = useState("");
  var [loggedIn, setLoggedIn] = useState(false);
  var [remember, setRemember] = useState(false);
  var [tab, setTab] = useState("dash");
  var [page, setPage] = useState(""); // "terms", "privacy", "forgot", "signup"
  var [resetEmail, setResetEmail] = useState("");
  var [promoCode, setPromoCode] = useState("");
  var [promoResult, setPromoResult] = useState("");
  var [signupCount, setSignupCount] = useState(0);
  var [toast, setToast] = useState("");
  var [profile, setProfile] = useState({ height:"",weight:"",goalWeight:"",weightGoal:"lose",swim500m:"",bike20k:"",run5k:"",run10k:"",weeklyHours:"",goals:"",expectations:"",races:[],weekStart:1,sport:"triathlon" });
  var [program, setProgram] = useState("");
  var [workouts, setWorkouts] = useState([]);
  var [sleepLog, setSleepLog] = useState([]);
  var [foodLog, setFoodLog] = useState([]);
  var [sub, setSub] = useState({ tier: "trial", trialStart: "", plansBuilt: 0, modsUsed: 0, yearStart: new Date().getFullYear(), racesCompleted: 0, rewardClaimed: false });
  var [raceProofs, setRaceProofs] = useState([]);
  var [proofRace, setProofRace] = useState(null);
  var [proofUrl, setProofUrl] = useState("");
  var [proofImage, setProofImage] = useState(null);
  var [proofTime, setProofTime] = useState("");
  var [proofType, setProofType] = useState("screenshot");
  var [verifying, setVerifying] = useState(false);
  var proofFileRef = useRef(null);
  var [msgs, setMsgs] = useState([]);
  var [chatIn, setChatIn] = useState("");
  var [chatBusy, setChatBusy] = useState(false);
  var [rn, setRn] = useState(""); var [rd, setRd] = useState(""); var [rdist, setRdist] = useState(""); var [rgt, setRgt] = useState("");
  var [sd, setSd] = useState(new Date().toISOString().split("T")[0]);
  var [sh, setSh] = useState(""); var [sq, setSq] = useState("good"); var [snn, setSnn] = useState("");
  var [fName, setFName] = useState(""); var [fCal, setFCal] = useState(""); var [fPro, setFPro] = useState(""); var [fCarb, setFCarb] = useState(""); var [fFat, setFFat] = useState(""); var [fFib, setFFib] = useState(""); var [fSug, setFSug] = useState(""); var [fDate, setFDate] = useState(new Date().toISOString().split("T")[0]); var [fMeal, setFMeal] = useState("lunch");
  var [openCat, setOpenCat] = useState("");
  var [nutDay, setNutDay] = useState(new Date().toISOString().split("T")[0]);
  var [fn, setFn] = useState("");
  var [woDate, setWoDate] = useState(""); var [woText, setWoText] = useState("");
  var [editWo, setEditWo] = useState(null); var [editText, setEditText] = useState("");
  var [buildStep, setBuildStep] = useState(0);
  var [buildRaces, setBuildRaces] = useState([]);
  var [brName, setBrName] = useState(""); var [brDate, setBrDate] = useState(""); var [brType, setBrType] = useState(""); var [brGoal, setBrGoal] = useState("");
  var [brTerrain, setBrTerrain] = useState("Unknown"); var [brElevation, setBrElevation] = useState(""); var [brSwimType, setBrSwimType] = useState("Unknown");
  var [brCourse, setBrCourse] = useState(""); var [brPriority, setBrPriority] = useState("goal");
  var [buildProfile, setBuildProfile] = useState({ age:"",gender:"Male",height:"",weight:"",goalWeight:"",bodyType:"average",sport:"triathlon",experience:"beginner",yearsActive:"",priorRaces:"",currentSwim:"",currentBike:"",currentRun:"",weeklyHours:"",preferredDays:"",morningEvening:"Morning",workSchedule:"",injuries:"",limitations:"",sleepHours:"",sleepQuality:"Good",dietType:"Balanced",supplements:"",strengthTraining:"No",crossTraining:"",primaryGoal:"finish",secondaryGoal:"" });
  var [buildBusy, setBuildBusy] = useState(false);
  var [buildResult, setBuildResult] = useState("");
  var [modRequest, setModRequest] = useState("");
  // SMS
  var [smsSettings, setSmsSettings] = useState({ enabled: false, phone: "", sendTime: "06:00", trialStart: "" });
  // Swap
  var [swapFrom, setSwapFrom] = useState(null);
  // Workout Results
  var [resultWo, setResultWo] = useState(null);
  var [woResult, setWoResult] = useState({ dist: "", time: "", feel: "good", notes: "" });
  // Weight + Hydration
  var [weightLog, setWeightLog] = useState([]);
  var [hydrationLog, setHydrationLog] = useState([]);
  var [wlDate, setWlDate] = useState(new Date().toISOString().split("T")[0]);
  var [wlWeight, setWlWeight] = useState("");
  var [hydDate, setHydDate] = useState(new Date().toISOString().split("T")[0]);
  var [hydOz, setHydOz] = useState("");
  // Integrations
  var [garminConnected, setGarminConnected] = useState(false);
  var [stravaConnected, setStravaConnected] = useState(false);
  // Support
  var [supportSubject, setSupportSubject] = useState("");
  var [supportMsg, setSupportMsg] = useState("");
  // Reviews
  var [reviewText, setReviewText] = useState("");
  var [reviewStars, setReviewStars] = useState(5);
  var [reviews, setReviews] = useState([]);
  var chatEndRef = useRef(null);
  var fileRef = useRef(null);

  useEffect(function() {
    var link = document.createElement("link"); link.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"; link.rel = "stylesheet"; document.head.appendChild(link);
    if (window.storage) {
      window.storage.get("tf11-remember").then(function(r) { if (r && r.value) { var s = JSON.parse(r.value); if (s.user) { setUser(s.user); setRemember(true); loadUserData(s.user); } } }).catch(function() {});
      window.storage.get("tf11-signup-count", true).then(function(r) { if (r && r.value) setSignupCount(parseInt(r.value) || 0); }).catch(function() {});
    }
  }, []);
  useEffect(function() { if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  function flash(m) { setToast(m); setTimeout(function() { setToast(""); }, 2500); }
  function getSport() { return SPORTS.find(function(s) { return s.id === (profile.sport || "triathlon"); }) || SPORTS[0]; }
  function hasDisc(d) { return getSport().disc.indexOf(d) !== -1; }

  // ── Subscription logic ──
  function getTier() { return TIERS[sub.tier] || TIERS.trial; }
  function trialDaysLeft() {
    if (!sub.trialStart) return 7;
    var start = new Date(sub.trialStart); var now = new Date(); var diff = 7 - Math.floor((now - start) / 86400000);
    return Math.max(0, diff);
  }
  function isTrialExpired() { return sub.tier === "trial" && trialDaysLeft() <= 0; }
  function isPaid() { return sub.tier === "basic" || sub.tier === "pro"; }
  function canBuildPlan() { if (!isPaid()) return false; var t = getTier(); return sub.plansBuilt < t.maxRaces; }
  function canModifyPlan() { if (!isPaid()) return false; var t = getTier(); return sub.modsUsed < t.maxMods; }
  function plansRemaining() { var t = getTier(); return Math.max(0, t.maxRaces - sub.plansBuilt); }
  function modsRemaining() { var t = getTier(); return Math.max(0, t.maxMods - sub.modsUsed); }
  // Reset yearly counters
  function checkYearReset(s) {
    var yr = new Date().getFullYear();
    if (s.yearStart && s.yearStart !== yr) { s.plansBuilt = 0; s.modsUsed = 0; s.racesCompleted = 0; s.rewardClaimed = false; s.yearStart = yr; }
    return s;
  }

  function loadUserData(u) {
    if (window.storage) {
      window.storage.get("tf11-" + u).then(function(r) {
        if (r && r.value) {
          var d = JSON.parse(r.value);
          if (d.profile) setProfile(d.profile);
          if (d.program) setProgram(d.program);
          if (d.workouts) setWorkouts(d.workouts);
          if (d.sleep) setSleepLog(d.sleep);
          if (d.food) setFoodLog(d.food);
          if (d.sub) { var s = checkYearReset(d.sub); setSub(s); }
          if (d.sms) setSmsSettings(d.sms);
          if (d.weightLog) setWeightLog(d.weightLog);
          if (d.hydration) setHydrationLog(d.hydration);
          if (d.reviews) setReviews(d.reviews);
          if (d.raceProofs) setRaceProofs(d.raceProofs);
        }
        setLoggedIn(true); loadReviews();
      }).catch(function() { setLoggedIn(true); loadReviews(); });
    } else { setLoggedIn(true); }
  }
  function doLogin() {
    if (!user.trim()) return;
    if (remember && window.storage) window.storage.set("tf11-remember", JSON.stringify({ user: user.trim() })).catch(function() {});
    loadUserData(user.trim());
  }
  function doLogout() { if (window.storage) window.storage.delete("tf11-remember").catch(function() {}); setLoggedIn(false); setMsgs([]); setRemember(false); }
  function doSave(p, pr, wo, sl, fd, sb, sm, wl, hy, rp) {
    if (!window.storage) return;
    window.storage.set("tf11-" + user.trim(), JSON.stringify({
      profile: p || profile, program: pr !== undefined ? pr : program,
      workouts: wo || workouts, sleep: sl || sleepLog,
      food: fd || foodLog, sub: sb || sub, sms: sm || smsSettings,
      weightLog: wl || weightLog, hydration: hy || hydrationLog,
      raceProofs: rp || raceProofs
    })).catch(function() {});
  }
  function saveSub(newSub) { setSub(newSub); doSave(undefined, undefined, undefined, undefined, undefined, newSub); }
  // ── Weight + Hydration ──
  function addWeight() { var w = parseFloat(wlWeight); if (isNaN(w)) return; var up = weightLog.filter(function(e) { return e.date !== wlDate; }).concat([{ date: wlDate, weight: w }]); up.sort(function(a, b) { return a.date.localeCompare(b.date); }); setWeightLog(up); setWlWeight(""); doSave(undefined, undefined, undefined, undefined, undefined, undefined, undefined, up); flash("Weight logged!"); }
  function addHydration() { var oz = parseInt(hydOz); if (isNaN(oz)) return; var existing = hydrationLog.find(function(e) { return e.date === hydDate; }); var up; if (existing) { up = hydrationLog.map(function(e) { return e.date === hydDate ? Object.assign({}, e, { oz: e.oz + oz }) : e; }); } else { up = hydrationLog.concat([{ date: hydDate, oz: oz }]); } up.sort(function(a, b) { return a.date.localeCompare(b.date); }); setHydrationLog(up); setHydOz(""); doSave(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, up); flash(oz + " oz added!"); }
  function getTodayHydration() { var today = new Date().toISOString().split("T")[0]; var entry = hydrationLog.find(function(e) { return e.date === today; }); return entry ? entry.oz : 0; }
  // ── Workout Results ──
  function saveWorkoutResult(id) {
    var up = workouts.map(function(w) { if (w.id === id) return Object.assign({}, w, { done: true, result: Object.assign({}, woResult) }); return w; });
    setWorkouts(up); setResultWo(null); setWoResult({ dist: "", time: "", feel: "good", notes: "" }); doSave(undefined, undefined, up); flash("Result logged!");
  }
  // ── Cancel Subscription ──
  function cancelSubscription() { var ns = Object.assign({}, sub, { tier: "trial", trialStart: new Date().toISOString().split("T")[0] }); saveSub(ns); flash("Subscription cancelled. Trial access restored."); }

  // ── Promo Codes ──
  var PROMO_CODES = {
    "WISE431": { type: "free_month", tier: "basic", desc: "1 free month of Basic" },
    "TRIHARD10": { type: "discount", pct: 10, months: 3, desc: "10% off for 3 months" }
  };
  function isEarlyBird() { return signupCount < 25; }
  function isDiscountActive(s) {
    var subData = s || sub;
    if (!subData.discountStart) return false;
    var start = new Date(subData.discountStart);
    var now = new Date();
    var months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return months < 3;
  }
  function getDiscount() {
    var code = promoCode.trim().toUpperCase();
    var promo = PROMO_CODES[code];
    if (promo && promo.type === "discount") return promo.pct;
    if (isEarlyBird()) return 10;
    return 0;
  }
  function applyPromo(tier) {
    var code = promoCode.trim().toUpperCase();
    var promo = PROMO_CODES[code];
    // Wise431 = 1 free month Basic
    if (promo && promo.type === "free_month") {
      var ns = Object.assign({}, sub, { tier: promo.tier, trialStart: new Date().toISOString().split("T")[0], yearStart: new Date().getFullYear(), promoUsed: code, freeMonthEnd: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0] });
      saveSub(ns); flash("Promo applied! 1 free month of Basic activated.");
      return true;
    }
    return false;
  }
  function validatePromo() {
    var code = promoCode.trim().toUpperCase();
    if (!code) { setPromoResult(""); return; }
    var promo = PROMO_CODES[code];
    if (promo) { setPromoResult(promo.desc); }
    else { setPromoResult("Invalid code"); }
  }
  function incrementSignupCount() {
    var newCount = signupCount + 1; setSignupCount(newCount);
    if (window.storage) { window.storage.set("tf11-signup-count", String(newCount), true).catch(function() {}); }
  }
  function doSignupAndSubscribe(tier) {
    if (!user.trim()) { flash("Enter a username."); return; }
    // Check if promo gives free access
    if (applyPromo(tier)) { incrementSignupCount(); if (remember && window.storage) window.storage.set("tf11-remember", JSON.stringify({ user: user.trim() })).catch(function() {}); loadUserData(user.trim()); return; }
    // Normal subscribe
    var discount = getDiscount();
    var ns = Object.assign({}, sub, { tier: tier, trialStart: new Date().toISOString().split("T")[0], yearStart: new Date().getFullYear() });
    if (discount > 0) { ns.discountPct = discount; ns.discountStart = new Date().toISOString().split("T")[0]; ns.discountMonths = 3; }
    if (promoCode.trim()) ns.promoUsed = promoCode.trim().toUpperCase();
    setSub(ns); incrementSignupCount();
    if (remember && window.storage) window.storage.set("tf11-remember", JSON.stringify({ user: user.trim() })).catch(function() {});
    loadUserData(user.trim());
    // Save after login
    setTimeout(function() { doSave(undefined, undefined, undefined, undefined, undefined, ns); }, 500);
    if (tier === "trial") flash("7-day free trial started!");
    else flash(getTier().name + " plan activated!" + (discount > 0 ? " " + discount + "% discount applied!" : ""));
  }

  // ── Support Ticket (emails to jordanwiseman33@gmail.com) ──
  function submitSupport() {
    if (!supportSubject.trim() || !supportMsg.trim()) { flash("Fill in subject and message."); return; }
    // Create mailto link and open it (works in browser; in production use a serverless email function)
    var mailto = "mailto:jordanwiseman33@gmail.com?subject=" + encodeURIComponent("[TriForge Support] " + supportSubject) + "&body=" + encodeURIComponent("From: " + user + "\n\n" + supportMsg + "\n\n---\nSent from TriForge app");
    window.open(mailto, "_blank");
    setSupportSubject(""); setSupportMsg(""); flash("Support request opened in your email client!");
  }

  // ── Reviews ──
  function submitReview() {
    if (!reviewText.trim()) { flash("Write a review first."); return; }
    var r = { user: user, stars: reviewStars, text: reviewText.trim(), date: new Date().toISOString().split("T")[0], id: Date.now() };
    var up = reviews.concat([r]); setReviews(up); setReviewText(""); setReviewStars(5);
    // Save to shared storage so all users can see
    if (window.storage) { window.storage.set("tf11-reviews", JSON.stringify(up), true).catch(function() {}); }
    flash("Review posted! Thank you.");
  }
  function loadReviews() {
    if (window.storage) { window.storage.get("tf11-reviews", true).then(function(r) { if (r && r.value) setReviews(JSON.parse(r.value)); }).catch(function() {}); }
  }

  // ── Race Completion with Proof Upload + AI Verification ──
  function handleProofFile(e) {
    var f = e.target.files[0]; if (!f) return;
    var reader = new FileReader();
    reader.onload = function(ev) { setProofImage(ev.target.result); };
    reader.readAsDataURL(f);
  }

  function submitRaceProof() {
    if (!proofRace) return;
    if (!proofImage && !proofUrl.trim()) { flash("Upload a photo or provide a results URL."); return; }
    if (!proofTime.trim()) { flash("Enter your finish time."); return; }
    setVerifying(true);

    // Build AI verification prompt
    var race = proofRace;
    var verifyPrompt = "You are verifying a race completion claim for a training app loyalty reward. Be thorough but fair.\n\n";
    verifyPrompt += "RACE CLAIMED: " + race.name + "\n";
    verifyPrompt += "RACE DATE: " + race.date + "\n";
    verifyPrompt += "RACE TYPE: " + (race.dist || "unknown") + "\n";
    verifyPrompt += "CLAIMED FINISH TIME: " + proofTime + "\n";
    verifyPrompt += "PROOF TYPE: " + proofType + "\n";
    if (proofUrl.trim()) verifyPrompt += "RESULTS URL: " + proofUrl + "\n";
    verifyPrompt += "\nINSTRUCTIONS:\n";
    verifyPrompt += "1. If an image is attached, analyze it for: race bib, medal, finish line, timing display, results screenshot, or any indicator of race participation.\n";
    verifyPrompt += "2. Check if the finish time is realistic for the race distance (not impossibly fast or suspiciously round).\n";
    verifyPrompt += "3. Check if the date aligns (proof shouldn't be from a clearly different date/year).\n";
    verifyPrompt += "4. If a results URL is provided, note that it should be checked against the claimed time.\n\n";
    verifyPrompt += "Respond with ONLY a JSON object (no markdown, no backticks):\n";
    verifyPrompt += '{"status": "verified" or "needs_review" or "rejected", "confidence": 1-100, "reason": "brief explanation"}\n\n';
    verifyPrompt += "Be generous - if the proof looks reasonable and the time is plausible, verify it. Only reject obvious fraud (wrong race, impossible times, stock photos). Use 'needs_review' if uncertain.";

    var messages = [{ role: "user", content: [] }];
    if (proofImage) {
      var parts = proofImage.split(",");
      var mimeMatch = proofImage.match(/data:([^;]+);/);
      var mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
      messages[0].content.push({ type: "image", source: { type: "base64", media_type: mime, data: parts[1] } });
    }
    messages[0].content.push({ type: "text", text: verifyPrompt });

    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 500, messages: messages })
    }).then(function(r) { return r.json(); }).then(function(data) {
      var text = (data.content || []).map(function(b) { return b.text || ""; }).join("");
      var result = { status: "needs_review", confidence: 50, reason: "Could not parse AI response." };
      try {
        var cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
        result = JSON.parse(cleaned);
      } catch (e) {
        if (text.toLowerCase().indexOf("verified") !== -1) result = { status: "verified", confidence: 75, reason: text.substring(0, 200) };
      }

      var proof = {
        raceName: race.name, raceDate: race.date, raceDist: race.dist || "",
        finishTime: proofTime, proofType: proofType, proofUrl: proofUrl,
        hasImage: !!proofImage, submittedAt: new Date().toISOString(),
        verification: result, id: Date.now()
      };

      var updatedProofs = raceProofs.concat([proof]);
      setRaceProofs(updatedProofs);

      // If verified, increment racesCompleted
      if (result.status === "verified") {
        var ns = Object.assign({}, sub, { racesCompleted: (sub.racesCompleted || 0) + 1 });
        setSub(ns);
        doSave(undefined, undefined, undefined, undefined, undefined, ns, undefined, undefined, undefined, updatedProofs);
        flash("Race verified! " + ns.racesCompleted + "/4 toward your free month.");
      } else if (result.status === "needs_review") {
        doSave(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, updatedProofs);
        flash("Submitted for review. We will verify within 24 hours.");
      } else {
        doSave(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, updatedProofs);
        flash("Verification issue: " + (result.reason || "Please try different proof."));
      }

      setProofRace(null); setProofImage(null); setProofUrl(""); setProofTime(""); setVerifying(false);
    }).catch(function() {
      setVerifying(false); flash("Verification error. Try again.");
    });
  }

  function getVerifiedCount() {
    return raceProofs.filter(function(p) { return p.verification && p.verification.status === "verified"; }).length;
  }
  function getPendingCount() {
    return raceProofs.filter(function(p) { return p.verification && p.verification.status === "needs_review"; }).length;
  }
  function isRaceProofed(raceName, raceDate) {
    return raceProofs.some(function(p) { return p.raceName === raceName && p.raceDate === raceDate; });
  }

  function canClaimReward() { return isPaid() && getVerifiedCount() >= 4 && !sub.rewardClaimed; }
  function claimFreeMonth() {
    var ns = Object.assign({}, sub, { rewardClaimed: true }); saveSub(ns);
    flash("Congratulations! 1 free month of " + getTier().name + " earned! (Applied to next billing cycle)");
  }
  function claimUpgrade() {
    if (sub.tier === "basic") {
      var ns = Object.assign({}, sub, { tier: "pro", rewardClaimed: true }); saveSub(ns);
      flash("Upgraded to Pro at Basic price for one month! Enjoy 15 races and 15 modifications.");
    }
  }
  function getSmsPrice() { return (getTier().smsPrice || SMS_PRICE); }
  // ── SMS Functions ──
  function smsDaysLeft() { if (!smsSettings.trialStart) return SMS_TRIAL_DAYS; return Math.max(0, SMS_TRIAL_DAYS - Math.floor((new Date() - new Date(smsSettings.trialStart)) / 86400000)); }
  function isSmsTrialActive() { return smsSettings.enabled && !isPaid() && smsDaysLeft() > 0; }
  function isSmsActive() { return smsSettings.enabled && (isPaid() || smsDaysLeft() > 0); }
  function toggleSms(phone, time) {
    var ns = Object.assign({}, smsSettings, { enabled: true, phone: phone || smsSettings.phone, sendTime: time || smsSettings.sendTime });
    if (!ns.trialStart) ns.trialStart = new Date().toISOString().split("T")[0];
    setSmsSettings(ns); doSave(undefined, undefined, undefined, undefined, undefined, undefined, ns); flash("Daily texts activated!");
  }
  function disableSms() { var ns = Object.assign({}, smsSettings, { enabled: false }); setSmsSettings(ns); doSave(undefined, undefined, undefined, undefined, undefined, undefined, ns); flash("Daily texts disabled."); }
  function saveSmsSettings(ns) { setSmsSettings(ns); doSave(undefined, undefined, undefined, undefined, undefined, undefined, ns); flash("Text settings saved!"); }
  function getTodayWorkout() { var today = new Date().toISOString().split("T")[0]; var wo = workouts.filter(function(w) { return w.date === today && !w.done; }); return wo.length > 0 ? wo.map(function(w) { return w.text; }).join(" + ") : "Rest day"; }
  // ── Swap Workouts ──
  function swapWorkouts(id1, id2) {
    var up = workouts.map(function(w) {
      if (w.id === id1) { var other = workouts.find(function(x) { return x.id === id2; }); return Object.assign({}, w, { date: other.date }); }
      if (w.id === id2) { var other2 = workouts.find(function(x) { return x.id === id1; }); return Object.assign({}, w, { date: other2.date }); }
      return w;
    });
    up.sort(function(a, b) { return a.date.localeCompare(b.date); });
    setWorkouts(up); setSwapFrom(null); doSave(undefined, undefined, up); flash("Workouts swapped!");
  }
  function subscribe(tier) {
    var ns = Object.assign({}, sub, { tier: tier });
    if (!ns.trialStart) ns.trialStart = new Date().toISOString().split("T")[0];
    if (!ns.yearStart) ns.yearStart = new Date().getFullYear();
    saveSub(ns);
    flash(tier === "basic" ? "Basic plan activated!" : "Pro plan activated!");
  }
  function startTrial() {
    var ns = Object.assign({}, sub, { tier: "trial", trialStart: new Date().toISOString().split("T")[0], yearStart: new Date().getFullYear() });
    saveSub(ns); setLoggedIn(true);
  }
  function saveProfile() { doSave(profile); flash("Profile saved!"); }
  function addRace() { if (!rn || !rd) return; var np = Object.assign({}, profile); np.races = (profile.races || []).concat([{ name: rn, date: rd, dist: rdist, goal: rgt }]); setProfile(np); setRn(""); setRd(""); setRgt(""); doSave(np); flash("Race added!"); }
  function addSleep() { var h = parseFloat(sh); if (isNaN(h) || h <= 0) return; var up = sleepLog.filter(function(e) { return e.date !== sd; }).concat([{ date: sd, hours: h, quality: sq, note: snn }]); up.sort(function(a, b) { return a.date.localeCompare(b.date); }); setSleepLog(up); setSh(""); setSnn(""); doSave(undefined, undefined, undefined, up); flash("Sleep logged!"); }
  function addFood() { var cal = parseInt(fCal); if (!fName.trim() || isNaN(cal)) return; var up = foodLog.concat([{ date: fDate, meal: fMeal, name: fName.trim(), cal: cal, protein: parseInt(fPro) || 0, carbs: parseInt(fCarb) || 0, fat: parseInt(fFat) || 0, fiber: parseInt(fFib) || 0, sugar: parseInt(fSug) || 0, id: Date.now() }]); setFoodLog(up); setFName(""); setFCal(""); setFPro(""); setFCarb(""); setFFat(""); setFFib(""); setFSug(""); doSave(undefined, undefined, undefined, undefined, up); flash("Food logged!"); }
  function quickAdd(item) { setFName(item.name); setFCal(String(item.cal)); setFPro(String(item.pro)); setFCarb(String(item.carb)); setFFat(String(item.fat)); setFFib(String(item.fib)); setFSug(String(item.sug)); setOpenCat(""); }
  function removeFood(id) { var up = foodLog.filter(function(e) { return e.id !== id; }); setFoodLog(up); doSave(undefined, undefined, undefined, undefined, up); }

  function handleFile(e) {
    var f = e.target.files[0]; if (!f) return; setFn(f.name); var ext = f.name.split(".").pop().toLowerCase();
    if (ext === "pdf" || ext === "doc" || ext === "docx") { var r = new FileReader(); r.onload = function(ev) { var bytes = new Uint8Array(ev.target.result); var text = ""; for (var i = 0; i < bytes.length; i++) { var c = bytes[i]; if (c >= 32 && c <= 126) text += String.fromCharCode(c); else if (c === 10 || c === 13) text += "\n"; } var clean = text.split("\n").filter(function(l) { return l.trim().length > 3 && /[a-zA-Z]/.test(l); }).join("\n"); if (clean.length < 50) clean = "Imported: " + f.name + "\n(Copy/paste for best results.)"; setProgram(clean); var p = parseProgram(clean); if (p.length > 0) setWorkouts(p); doSave(undefined, clean, p.length > 0 ? p : undefined); flash("Loaded!"); }; r.readAsArrayBuffer(f);
    } else { var r2 = new FileReader(); r2.onload = function(ev) { setProgram(ev.target.result); var p = parseProgram(ev.target.result); if (p.length > 0) setWorkouts(p); doSave(undefined, ev.target.result, p.length > 0 ? p : undefined); flash(p.length + " workouts parsed!"); }; r2.readAsText(f); }
  }
  function parseProgram(text) {
    var lines = text.split("\n"); var parsed = []; var currentDate = new Date().toISOString().split("T")[0]; var dayOffset = 0;
    var dn = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0 };
    for (var i = 0; i < lines.length; i++) { var line = lines[i].trim(); if (!line || line.length < 3) continue; if (/^(week|phase|block|month)/i.test(line)) { if (/week\s*(\d+)/i.test(line)) { dayOffset = parseInt(line.match(/week\s*(\d+)/i)[1]) - 1; } continue; } var dm = line.match(/^(mon|tue|wed|thu|fri|sat|sun)/i); if (dm) { var dk = line.substring(0, 3).toLowerCase(); if (dn[dk] !== undefined) { var today = new Date(); var diff = dn[dk] - today.getDay() + dayOffset * 7; if (diff < 0 && dayOffset === 0) diff += 7; var d = new Date(today); d.setDate(d.getDate() + diff); currentDate = d.toISOString().split("T")[0]; } } var desc = line.replace(/^(mon|tue|wed|thu|fri|sat|sun)[a-z]*[\s:\-]*/i, "").trim(); if (desc.length > 2) parsed.push({ id: Date.now() + i, date: currentDate, text: desc, done: false }); }
    return parsed;
  }
  function handleProgramSave() { var p = parseProgram(program); if (p.length > 0) { setWorkouts(p); doSave(undefined, program, p); flash(p.length + " workouts!"); } else { doSave(undefined, program); flash("Saved!"); } }
  function addWorkout() { if (!woDate || !woText.trim()) return; var up = workouts.concat([{ id: Date.now(), date: woDate, text: woText.trim(), done: false }]); up.sort(function(a, b) { return a.date.localeCompare(b.date); }); setWorkouts(up); setWoText(""); doSave(undefined, undefined, up); flash("Added!"); }
  function toggleWorkout(id) { var up = workouts.map(function(w) { if (w.id === id) return Object.assign({}, w, { done: !w.done }); return w; }); setWorkouts(up); doSave(undefined, undefined, up); }
  function deleteWorkout(id) { var up = workouts.filter(function(w) { return w.id !== id; }); setWorkouts(up); doSave(undefined, undefined, up); }
  function saveEditWorkout(id) { var up = workouts.map(function(w) { if (w.id === id) return Object.assign({}, w, { text: editText }); return w; }); setWorkouts(up); setEditWo(null); doSave(undefined, undefined, up); flash("Updated!"); }
  function getWeekRange(offset) { var ws = profile.weekStart || 1; var today = new Date(); today.setDate(today.getDate() + (offset || 0) * 7); var dw = today.getDay(); var ds = (dw - ws + 7) % 7; var start = new Date(today); start.setDate(start.getDate() - ds); var end = new Date(start); end.setDate(end.getDate() + 6); return { start: start.toISOString().split("T")[0], end: end.toISOString().split("T")[0] }; }
  function getWeekWorkouts(offset) { var r = getWeekRange(offset); return workouts.filter(function(w) { return w.date >= r.start && w.date <= r.end; }); }
  function getWeekCompletion(offset) { var ww = getWeekWorkouts(offset); if (ww.length === 0) return null; var done = ww.filter(function(w) { return w.done; }).length; return { total: ww.length, done: done, pct: Math.round((done / ww.length) * 100) }; }

  // ── Build Race Management ──
  function addBuildRace() { if (!brDate || !brType) { flash("Need race type and date."); return; } setBuildRaces(buildRaces.concat([{ name: brName || brType, date: brDate, type: brType, goal: brGoal, terrain: brTerrain, elevation: brElevation, swimType: brSwimType, courseNotes: brCourse, priority: brPriority, id: Date.now() }])); setBrName(""); setBrDate(""); setBrType(""); setBrGoal(""); setBrTerrain("Unknown"); setBrElevation(""); setBrSwimType("Unknown"); setBrCourse(""); setBrPriority("goal"); flash("Race added!"); }
  function removeBuildRace(id) { setBuildRaces(buildRaces.filter(function(r) { return r.id !== id; })); }
  function setBP(key, val) { var n = Object.assign({}, buildProfile); n[key] = val; setBuildProfile(n); }

  // ── Generate Plan (Opus) - counts against plansBuilt ──
  function generatePlan() {
    if (!canBuildPlan()) { flash("Plan limit reached. Upgrade to Pro for more."); return; }
    setBuildBusy(true); setBuildResult("");
    var bp = buildProfile; var sorted = buildRaces.slice().sort(function(a, b) { return a.date.localeCompare(b.date); });
    var sportInfo = SPORTS.find(function(s) { return s.id === bp.sport; }) || SPORTS[0];
    var prompt = "You are an elite endurance coach building a REALISTIC training plan.\n\nCRITICAL RULES:\n- Max 10% weekly volume increase\n- Recovery week every 3-4 weeks\n- Taper 2-3 wks for A races, 1 wk for B/C\n- Rest days mandatory\n- Conservative for beginners\n- No hard sessions after night shifts\n- Earlier races = training benchmarks for A race\n- Course-specific prep in final 4-6 weeks\n\n";
    prompt += "SPORT: " + sportInfo.name + "\n\n=== RACES (" + sorted.length + ") ===\n";
    var priMap = { goal: "GOAL RACE (peak performance, full taper)", tuneup: "TUNE-UP (race as prep, short taper)", fun: "JUST FOR FUN (treat as hard workout, no taper needed)" };
    sorted.forEach(function(race, i) { var dOut = Math.ceil((new Date(race.date) - new Date()) / 86400000); prompt += "\nRace " + (i + 1) + " [" + (priMap[race.priority] || race.priority) + "]: " + race.name + " (" + race.type + ")\n  Date: " + race.date + " (" + dOut + " days, ~" + Math.floor(dOut / 7) + " wks)\n"; if (race.goal) prompt += "  Goal: " + race.goal + "\n"; prompt += "  Terrain: " + race.terrain + "\n"; if (race.elevation) prompt += "  Elevation: " + race.elevation + " ft\n"; if (race.swimType !== "Unknown") prompt += "  Swim: " + race.swimType + "\n"; if (race.courseNotes) prompt += "  Course: " + race.courseNotes + "\n"; prompt += "  (If you recognize this race, incorporate known course data.)\n"; });
    prompt += "\n=== ATHLETE ===\nAge: " + bp.age + " | " + bp.gender + " | " + bp.height + " | " + bp.weight + " lbs | Build: " + bp.bodyType + "\n"; if (bp.goalWeight) prompt += "Goal weight: " + bp.goalWeight + "\n"; prompt += "Experience: " + bp.experience + " | Years: " + bp.yearsActive + "\n"; if (bp.priorRaces) prompt += "Prior: " + bp.priorRaces + "\n";
    prompt += "(IMPORTANT: Adapt the plan for the athlete's body type. Heavier/stocky athletes need more joint-friendly training, gradual run volume increases, extra attention to impact management, and may benefit from more cycling/swimming early on. Slim/lean athletes can handle higher run volume sooner. Athletic builds can push intensity earlier.)\n";
    prompt += "\n=== FITNESS ===\n"; if (bp.currentSwim) prompt += "Swim: " + bp.currentSwim + "\n"; if (bp.currentBike) prompt += "Bike: " + bp.currentBike + "\n"; if (bp.currentRun) prompt += "Run: " + bp.currentRun + "\n";
    prompt += "\n=== SCHEDULE ===\n" + bp.weeklyHours + " hrs/wk | " + bp.morningEvening + "\n"; if (bp.preferredDays) prompt += "Days: " + bp.preferredDays + "\n"; if (bp.workSchedule) prompt += "Work: " + bp.workSchedule + "\n";
    prompt += "\n=== HEALTH ===\n"; if (bp.injuries) prompt += "Injuries: " + bp.injuries + "\n"; if (bp.limitations) prompt += "Limits: " + bp.limitations + "\n"; prompt += "Sleep: " + bp.sleepHours + "hrs " + bp.sleepQuality + " | Diet: " + bp.dietType + " | Strength: " + bp.strengthTraining + "\n";
    prompt += "\nGoal: " + bp.primaryGoal + (bp.secondaryGoal ? " + " + bp.secondaryGoal : "") + "\n";
    prompt += "\nFORMAT: Week 1 (dates)\\nMon - [workout]\\nTue - [workout]\\n...EVERY week. Miles. Specific paces. Race weeks marked. Plan overview at top.\n";

    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-opus-4-20250514", max_tokens: 4000, tools: [{ type: "web_search_20250305", name: "web_search" }], messages: [{ role: "user", content: prompt }] }) }).then(function(r) { return r.json(); }).then(function(data) {
      var text = (data.content || []).map(function(b) { return b.text || ""; }).filter(Boolean).join("\n") || "Error.";
      setBuildResult(text); setBuildBusy(false);
      // Increment plans built
      var ns = Object.assign({}, sub, { plansBuilt: sub.plansBuilt + 1 }); saveSub(ns);
    }).catch(function() { setBuildResult("Connection error."); setBuildBusy(false); });
  }

  function loadBuiltPlan() {
    setProgram(buildResult); var p = parseProgram(buildResult); if (p.length > 0) setWorkouts(p);
    var np = Object.assign({}, profile); np.races = (profile.races || []).slice();
    buildRaces.forEach(function(br) { var exists = np.races.some(function(r) { return r.name === br.name && r.date === br.date; }); if (!exists) np.races.push({ name: br.name, date: br.date, dist: br.type, goal: br.goal }); });
    setProfile(np); doSave(np, buildResult, p.length > 0 ? p : undefined);
    setTab("program"); flash("Plan loaded! " + p.length + " workouts added.");
  }

  // ── Coach Chat (Sonnet) ──
  function sendChat(text) {
    if (!text.trim() || chatBusy) return; var all = msgs.concat([{ role: "user", content: text }]); setMsgs(all); setChatIn(""); setChatBusy(true);
    var sp = getSport();
    var sys = "You are an expert " + sp.name + " coach. Use miles. Be specific.\n\nAthlete: " + user + "\n";
    if (profile.weight) sys += "Weight: " + profile.weight + " lbs\n";
    if (hasDisc("swim") && profile.swim500m) sys += "Swim 500m: " + profile.swim500m + "\n";
    if (hasDisc("bike") && profile.bike20k) sys += "Bike 20k: " + profile.bike20k + "\n";
    if (hasDisc("run") && profile.run5k) sys += "Run 5k: " + profile.run5k + "\n";
    (profile.races || []).forEach(function(r) { var d = Math.ceil((new Date(r.date) - new Date()) / 86400000); sys += "Race: " + r.name + " " + d + "d\n"; });
    if (program) sys += "\nProgram:\n" + program.substring(0, 2000) + "\n";
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys, messages: all.map(function(m) { return { role: m.role, content: m.content }; }) }) }).then(function(r) { return r.json(); }).then(function(data) { var reply = (data.content || []).map(function(b) { return b.text || ""; }).join("\n") || "No response."; setMsgs(all.concat([{ role: "assistant", content: reply }])); setChatBusy(false); }).catch(function() { setMsgs(all.concat([{ role: "assistant", content: "Connection error." }])); setChatBusy(false); });
  }

  // ── Plan Modification via Coach (counts against modsUsed) ──
  function requestPlanMod() {
    if (!modRequest.trim()) return;
    if (!canModifyPlan()) { flash("Modification limit reached. Upgrade for more."); return; }
    setChatBusy(true);
    var sys = "You are an expert coach. The athlete wants to modify their training plan. Rewrite the MODIFIED SECTIONS of the plan based on their request. Output the updated plan text in the same format (Week X / Mon - workout / Tue - workout etc). Only output the changed weeks.\n\nCurrent plan:\n" + program.substring(0, 3000) + "\n";
    var modMsg = "MODIFICATION REQUEST: " + modRequest;
    var all = msgs.concat([{ role: "user", content: "PLAN MODIFICATION: " + modRequest }]);
    setMsgs(all); setModRequest("");
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, system: sys, messages: [{ role: "user", content: modMsg }] }) }).then(function(r) { return r.json(); }).then(function(data) {
      var reply = (data.content || []).map(function(b) { return b.text || ""; }).join("\n") || "Error.";
      setMsgs(all.concat([{ role: "assistant", content: reply }]));
      // Apply to program and count mod
      var updated = program + "\n\n--- MODIFICATION " + (sub.modsUsed + 1) + " ---\n" + reply;
      setProgram(updated); var p = parseProgram(updated); if (p.length > 0) setWorkouts(p);
      var ns = Object.assign({}, sub, { modsUsed: sub.modsUsed + 1 }); saveSub(ns);
      doSave(undefined, updated, p.length > 0 ? p : undefined, undefined, undefined, ns);
      setChatBusy(false); flash("Plan modified! (" + (ns.modsUsed) + "/" + getTier().maxMods + " used)");
    }).catch(function() { setMsgs(all.concat([{ role: "assistant", content: "Connection error." }])); setChatBusy(false); });
  }

  // Utils
  function parseTime(str) { if (!str) return null; var p = str.split(":"); if (p.length === 2) return parseInt(p[0]) * 60 + parseInt(p[1]); if (p.length === 3) return parseInt(p[0]) * 3600 + parseInt(p[1]) * 60 + parseInt(p[2]); return null; }
  function fmtSecs(t) { if (!t || isNaN(t)) return "-"; var h = Math.floor(t / 3600); var m = Math.floor((t % 3600) / 60); var s = Math.round(t % 60); if (h > 0) return h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; return m + ":" + (s < 10 ? "0" : "") + s; }
  function calcBMI() { if (!profile.weight || !profile.height) return null; var w = parseFloat(profile.weight); var hp = profile.height.replace(/['"]/g, "").split(/[' \s]+/); var ft = parseInt(hp[0]) || 0; var inch = parseInt(hp[1]) || 0; var ti = ft * 12 + inch; if (!ti) return null; return ((w / (ti * ti)) * 703).toFixed(1); }
  function getDailyTargets() { var w = parseFloat(profile.weight) || 180; var g = profile.weightGoal; var base = g === "lose" ? w * 12 : g === "gain" ? w * 18 : w * 15; var pro = g === "gain" ? w * 1.2 : w; var fat = base * 0.28 / 9; var carb = (base - pro * 4 - fat * 9) / 4; return { cal: Math.round(base), pro: Math.round(pro), carb: Math.round(carb), fat: Math.round(fat), fib: 35, sug: 50 }; }
  function getDayTotals(date) { var t = { cal: 0, pro: 0, carb: 0, fat: 0, fib: 0, sug: 0 }; foodLog.filter(function(f) { return f.date === date; }).forEach(function(f) { t.cal += f.cal; t.pro += f.protein; t.carb += f.carbs; t.fat += f.fat; t.fib += f.fiber; t.sug += f.sugar; }); return t; }
  function getLast7() { var days = []; for (var i = 6; i >= 0; i--) { var d = new Date(); d.setDate(d.getDate() - i); var ds = d.toISOString().split("T")[0]; days.push({ date: ds, label: d.toLocaleDateString("en-US", { weekday: "short" }), totals: getDayTotals(ds) }); } return days; }

  var sleepRec = sleepLog.slice(-7); var avg7 = sleepRec.length > 0 ? (sleepRec.reduce(function(a, b) { return a + b.hours; }, 0) / sleepRec.length).toFixed(1) : null;
  var upcoming = (profile.races || []).filter(function(r) { return new Date(r.date) >= new Date(); }); upcoming.sort(function(a, b) { return new Date(a.date) - new Date(b.date); });
  var bmi = calcBMI(); var targets = getDailyTargets(); var todayT = getDayTotals(new Date().toISOString().split("T")[0]); var last7 = getLast7();
  var weekComp = getWeekCompletion(0); var weekWos = getWeekWorkouts(0);
  var qc = { great: "#22c55e", good: "#3b82f6", fair: "#f59e0b", poor: "#ef4444" }; var wc2 = { lose: "#3b82f6", maintain: "#22c55e", gain: "#f59e0b" }; var wl = { lose: "Lose", maintain: "Maintain", gain: "Gain" };
  var bg = "#0F1117"; var white = "#1A1D28"; var bdr = "#2A2D3A"; var accent = "#3B82F6"; var accentL = "#60A5FA"; var tD = "#F0F2F8"; var tM = "#A0A6B8"; var tL = "#6B7190"; var hf = "'Oswald', sans-serif"; var ff = "'DM Sans', sans-serif"; var purple = "#A855F7";
  var cardBg = "linear-gradient(145deg, #1A1D28 0%, #1F2233 100%)";
  var inp = { display: "block", width: "100%", boxSizing: "border-box", background: "#141620", border: "1px solid " + bdr, borderRadius: 10, padding: "11px 14px", color: tD, fontSize: 14, fontFamily: ff, outline: "none" };
  var btnS = { background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, fontFamily: hf, letterSpacing: 3, cursor: "pointer", textTransform: "uppercase" };
  var lblS = { fontSize: 11, fontWeight: 600, color: tL, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 4 };
  var secS = { fontFamily: hf, fontSize: 16, letterSpacing: 2, color: tL, marginTop: 0, marginBottom: 10, textTransform: "uppercase" };
  var crd = { background: white, borderRadius: 14, padding: 18, border: "1px solid " + bdr, marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" };
  function PBar(p) { var pct = Math.min((p.cur / p.tgt) * 100, 100); return <div style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}><span style={{ fontWeight: 600, color: tD }}>{p.label}</span><span style={{ color: tL }}>{p.cur + " / " + p.tgt + (p.unit ? " " + p.unit : "")}</span></div><div style={{ height: 8, background: "#EEF0F4", borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: pct + "%", background: p.color || accentL, borderRadius: 4 }} /></div></div>; }
  function Logo(p) { return <svg width={p.size || 60} height={p.size || 60} viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="38" stroke={accent} strokeWidth="2" fill="none" /><path d="M20 52 C20 52 25 30 28 28 C31 26 33 30 30 35 C27 40 22 48 22 48" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" fill="none" /><circle cx="26" cy="24" r="3" fill="#3B82F6" /><circle cx="42" cy="50" r="6" stroke="#22C55E" strokeWidth="2" fill="none" /><circle cx="54" cy="50" r="6" stroke="#22C55E" strokeWidth="2" fill="none" /><path d="M45 44 L48 34 L51 44" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" /><circle cx="48" cy="31" r="3" fill="#22C55E" /><path d="M60 28 C63 25 67 24 68 26 C69 28 66 32 62 34" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" /></svg>; }
  function BF(p) { return <div style={p.span ? { gridColumn: "span " + p.span } : {}}><div style={lblS}>{p.label}</div>{p.type === "select" ? <select style={inp} value={p.value} onChange={function(e) { p.set(e.target.value); }}>{p.opts.map(function(o) { return <option key={o.v || o} value={o.v || o}>{o.l || o}</option>; })}</select> : p.type === "textarea" ? <textarea style={Object.assign({}, inp, { resize: "vertical" })} rows={p.rows || 2} value={p.value} onChange={function(e) { p.set(e.target.value); }} placeholder={p.ph || ""} /> : <input style={inp} type={p.type || "text"} value={p.value} onChange={function(e) { p.set(e.target.value); }} placeholder={p.ph || ""} />}</div>; }
  var priColors = { goal: "#EF4444", tuneup: "#F59E0B", fun: "#22C55E" };
  var priLabels = { goal: "GOAL RACE", tuneup: "TUNE-UP", fun: "JUST FOR FUN" };

  // ═══ LOGIN ═══
  // ═══ TERMS PAGE ═══
  if (page === "terms") { return <div style={{ minHeight: "100vh", background: bg, fontFamily: ff, padding: "40px 20px" }}><div style={{ maxWidth: 700, margin: "0 auto" }}><button onClick={function() { setPage(""); }} style={{ background: "none", border: "none", color: accentL, fontSize: 13, cursor: "pointer", marginBottom: 20 }}>Back</button><div style={{ fontFamily: hf, fontSize: 36, color: accent, letterSpacing: 3, marginBottom: 20 }}>TERMS OF SERVICE</div><div style={{ background: white, borderRadius: 14, padding: 28, border: "1px solid " + bdr, fontSize: 13, color: tM, lineHeight: 1.8 }}><p style={{ marginBottom: 16 }}><strong>Last updated:</strong> March 2026</p><p style={{ marginBottom: 16 }}><strong>1. Acceptance.</strong> By creating an account on TriForge Training ("the Service"), you agree to these Terms. If you do not agree, do not use the Service.</p><p style={{ marginBottom: 16 }}><strong>2. Service Description.</strong> TriForge provides AI-generated training plans, coaching chat, nutrition tracking, workout logging, and related features for endurance athletes. Plans are generated by artificial intelligence and are not a substitute for professional medical or coaching advice.</p><p style={{ marginBottom: 16 }}><strong>3. Subscriptions and Billing.</strong> Free Trial lasts 7 days. After the trial, a paid subscription (Basic $9.99/mo or Pro $16.99/mo) is required to access AI Plan Builder and AI Coach features. Daily Text Messages are an optional add-on at $3.99/mo. You may cancel at any time from your Profile page. Cancellation takes effect at the end of the current billing period.</p><p style={{ marginBottom: 16 }}><strong>4. Health Disclaimer.</strong> Training plans generated by TriForge are for informational purposes only. Always consult a physician before beginning any exercise program. TriForge is not responsible for injuries, health complications, or any adverse outcomes resulting from following AI-generated plans. You assume all risk associated with your training activities.</p><p style={{ marginBottom: 16 }}><strong>5. User Data.</strong> You retain ownership of all data you enter. We store your data securely using Firebase/Firestore. See our Privacy Policy for details on how we handle your information.</p><p style={{ marginBottom: 16 }}><strong>6. AI-Generated Content.</strong> Training plans and coaching responses are generated by AI (Claude by Anthropic). While we strive for accuracy, AI-generated content may contain errors. You should use your own judgment and consult professionals as needed.</p><p style={{ marginBottom: 16 }}><strong>7. Acceptable Use.</strong> You agree not to share your account, reverse engineer the Service, or use it for any unlawful purpose.</p><p style={{ marginBottom: 16 }}><strong>8. Limitation of Liability.</strong> TriForge Training is provided "as is" without warranty. We are not liable for any indirect, incidental, or consequential damages arising from use of the Service.</p><p style={{ marginBottom: 16 }}><strong>9. Changes.</strong> We may update these Terms at any time. Continued use after changes constitutes acceptance.</p><p><strong>10. Contact.</strong> Questions? Email support@triforgetraining.com</p></div></div></div>; }

  // ═══ PRIVACY PAGE ═══
  if (page === "privacy") { return <div style={{ minHeight: "100vh", background: bg, fontFamily: ff, padding: "40px 20px" }}><div style={{ maxWidth: 700, margin: "0 auto" }}><button onClick={function() { setPage(""); }} style={{ background: "none", border: "none", color: accentL, fontSize: 13, cursor: "pointer", marginBottom: 20 }}>Back</button><div style={{ fontFamily: hf, fontSize: 36, color: accent, letterSpacing: 3, marginBottom: 20 }}>PRIVACY POLICY</div><div style={{ background: white, borderRadius: 14, padding: 28, border: "1px solid " + bdr, fontSize: 13, color: tM, lineHeight: 1.8 }}><p style={{ marginBottom: 16 }}><strong>Last updated:</strong> March 2026</p><p style={{ marginBottom: 16 }}><strong>1. Information We Collect.</strong> Account information (email, password), profile data (height, weight, age, fitness metrics), training data (workouts, nutrition, sleep, race schedule), phone number (if you opt into daily texts), and usage data.</p><p style={{ marginBottom: 16 }}><strong>2. How We Use It.</strong> To provide and personalize the Service, generate AI training plans, send daily text messages (if opted in), process payments, and improve the platform. We do not sell your personal data to third parties.</p><p style={{ marginBottom: 16 }}><strong>3. Data Storage.</strong> Your data is stored securely in Google Firebase/Firestore with encryption in transit and at rest. Only you can access your data through your authenticated account.</p><p style={{ marginBottom: 16 }}><strong>4. Third-Party Services.</strong> We use: Firebase (authentication and database), Anthropic (AI plan generation and coaching), Twilio (text messages, if opted in), Stripe (payment processing, when activated), and optionally Garmin Connect / Strava (if you connect your account). Each service has its own privacy policy.</p><p style={{ marginBottom: 16 }}><strong>5. AI Processing.</strong> When you use the Plan Builder or AI Coach, your profile and training data is sent to Anthropic's API to generate responses. This data is not stored by Anthropic beyond the API request.</p><p style={{ marginBottom: 16 }}><strong>6. Text Messages.</strong> If you opt in, we send one text message per day to your phone number. You can disable this at any time from your Profile. Standard message rates apply. We do not share your phone number.</p><p style={{ marginBottom: 16 }}><strong>7. Garmin / Strava.</strong> If you connect these services, we access your workout activity data (distance, time, heart rate). We do not post to your accounts or access data beyond what is needed for training sync.</p><p style={{ marginBottom: 16 }}><strong>8. Data Deletion.</strong> You can delete your account and all associated data by contacting support@triforgetraining.com. We will remove your data within 30 days.</p><p style={{ marginBottom: 16 }}><strong>9. Cookies.</strong> We use essential cookies for authentication. We do not use advertising cookies or third-party trackers.</p><p><strong>10. Contact.</strong> For privacy concerns, email support@triforgetraining.com</p></div></div></div>; }

  // ═══ FORGOT PASSWORD ═══
  if (page === "forgot") { return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #E8ECFA 0%, #F5F6FA 50%, #EEF0F7 100%)", padding: 20, fontFamily: ff }}><div style={{ width: "100%", maxWidth: 380, padding: 40, background: white, borderRadius: 22, border: "1px solid " + bdr, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}><div style={{ textAlign: "center", marginBottom: 24 }}><Logo size={50} /><div style={{ fontFamily: hf, fontSize: 28, color: accent, letterSpacing: 3, marginTop: 8 }}>RESET PASSWORD</div></div><div style={{ fontSize: 13, color: tM, marginBottom: 16, lineHeight: 1.6 }}>Enter your email address and we will send you a link to reset your password.</div><div style={lblS}>Email</div><input style={Object.assign({}, inp, { marginBottom: 14 })} type="email" value={resetEmail} onChange={function(e) { setResetEmail(e.target.value); }} placeholder="you@email.com" /><button style={Object.assign({}, btnS, { width: "100%", marginBottom: 12 })} onClick={function() { if (resetEmail.trim()) { flash("Password reset email sent! Check your inbox. (Beta: no actual email sent)"); setTimeout(function() { setPage(""); }, 2000); } else { flash("Enter your email address."); } }}>SEND RESET LINK</button><button onClick={function() { setPage(""); }} style={{ background: "none", border: "none", color: accentL, fontSize: 13, cursor: "pointer", width: "100%", textAlign: "center" }}>Back to sign in</button></div></div>; }

  // ═══ SIGNUP PAGE (plan selection + promo) ═══
  if (page === "signup") { return <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E8ECFA 0%, #F5F6FA 50%, #EEF0F7 100%)", padding: 20, fontFamily: ff }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}><Logo size={60} /><div style={{ fontFamily: hf, fontSize: 36, color: accent, letterSpacing: 4, marginTop: 8 }}>GET STARTED</div></div>

      {/* Account */}
      <div style={Object.assign({}, crd, { marginBottom: 16 })}>
        <div style={secS}>CREATE YOUR ACCOUNT</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div><div style={lblS}>Username</div><input style={inp} value={user} onChange={function(e) { setUser(e.target.value); }} placeholder="Choose a username" /></div>
          <div><div style={lblS}>Password</div><input style={inp} type="password" value={pw} onChange={function(e) { setPw(e.target.value); }} placeholder="Password" /></div>
        </div>
      </div>

      {/* Promo Code */}
      <div style={Object.assign({}, crd, { marginBottom: 16 })}>
        <div style={secS}>PROMO CODE</div>
        <div style={{ display: "flex", gap: 8, alignItems: "end" }}>
          <div style={{ flex: 1 }}><div style={lblS}>Enter Code (optional)</div><input style={inp} value={promoCode} onChange={function(e) { setPromoCode(e.target.value); setPromoResult(""); }} onBlur={validatePromo} placeholder="PROMO CODE" /></div>
          <button onClick={validatePromo} style={Object.assign({}, btnS, { padding: "11px 16px", fontSize: 12, background: tL })}>APPLY</button>
        </div>
        {promoResult ? <div style={{ fontSize: 12, marginTop: 8, color: promoResult === "Invalid code" ? "#EF4444" : "#22C55E", fontWeight: 600 }}>{promoResult}</div> : null}
        {isEarlyBird() && !promoCode.trim() ? <div style={{ fontSize: 12, marginTop: 8, color: "#22C55E", fontWeight: 600 }}>{"Early bird! You are signup #" + (signupCount + 1) + " of 25. 10% off your first 3 months!"}</div> : null}
      </div>

      {/* Plan Selection */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        {/* Free Trial */}
        <div style={Object.assign({}, crd, { textAlign: "center", padding: 24 })}>
          <div style={{ fontFamily: hf, fontSize: 14, color: tL, letterSpacing: 2, marginBottom: 8 }}>FREE TRIAL</div>
          <div style={{ fontFamily: hf, fontSize: 36, color: tD }}>$0</div>
          <div style={{ fontSize: 11, color: tL, marginBottom: 12 }}>7 days</div>
          <div style={{ fontSize: 11, color: tM, lineHeight: 1.7, marginBottom: 16, textAlign: "left" }}>Tracker<br />Nutrition<br />Sleep<br />Program upload</div>
          <button onClick={function() { doSignupAndSubscribe("trial"); }} style={Object.assign({}, btnS, { width: "100%", fontSize: 12, padding: "10px", background: tL })}>START TRIAL</button>
        </div>
        {/* Basic */}
        <div style={Object.assign({}, crd, { textAlign: "center", padding: 24, border: "2px solid " + accentL })}>
          <div style={{ fontFamily: hf, fontSize: 14, color: accentL, letterSpacing: 2, marginBottom: 8 }}>BASIC</div>
          {getDiscount() > 0 ? <div><div style={{ fontFamily: hf, fontSize: 36, color: tD }}>{"$" + (9.99 * (1 - getDiscount() / 100)).toFixed(2)}</div><div style={{ fontSize: 11, color: "#EF4444", textDecoration: "line-through" }}>$9.99/mo</div><div style={{ fontSize: 10, color: "#22C55E" }}>for first 3 months</div></div> : <div style={{ fontFamily: hf, fontSize: 36, color: tD }}>$9.99<span style={{ fontSize: 12, color: tL }}>/mo</span></div>}
          <div style={{ fontSize: 11, color: tM, lineHeight: 1.7, marginBottom: 16, marginTop: 8, textAlign: "left" }}>Everything in trial<br />AI Plan Builder (5/yr)<br />AI Coach<br />5 modifications/yr</div>
          <button onClick={function() { doSignupAndSubscribe("basic"); }} style={Object.assign({}, btnS, { width: "100%", fontSize: 12, padding: "10px", background: accentL })}>GET BASIC</button>
        </div>
        {/* Pro */}
        <div style={Object.assign({}, crd, { textAlign: "center", padding: 24, border: "2px solid " + purple, position: "relative" })}>
          <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: purple, color: "#fff", padding: "3px 14px", borderRadius: 20, fontSize: 9, fontWeight: 700 }}>BEST VALUE</div>
          <div style={{ fontFamily: hf, fontSize: 14, color: purple, letterSpacing: 2, marginBottom: 8 }}>PRO</div>
          {getDiscount() > 0 ? <div><div style={{ fontFamily: hf, fontSize: 36, color: tD }}>{"$" + (16.99 * (1 - getDiscount() / 100)).toFixed(2)}</div><div style={{ fontSize: 11, color: "#EF4444", textDecoration: "line-through" }}>$16.99/mo</div><div style={{ fontSize: 10, color: "#22C55E" }}>for first 3 months</div></div> : <div style={{ fontFamily: hf, fontSize: 36, color: tD }}>$16.99<span style={{ fontSize: 12, color: tL }}>/mo</span></div>}
          <div style={{ fontSize: 11, color: tM, lineHeight: 1.7, marginBottom: 16, marginTop: 8, textAlign: "left" }}>Everything in Basic<br />15 races/yr<br />15 modifications/yr<br />Texts $2.99/mo</div>
          <button onClick={function() { doSignupAndSubscribe("pro"); }} style={Object.assign({}, btnS, { width: "100%", fontSize: 12, padding: "10px", background: purple })}>GO PRO</button>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: tM, marginBottom: 10 }}>Already have an account?</div>
        <button onClick={function() { setPage("login"); }} style={{ background: "none", border: "1px solid " + bdr, borderRadius: 10, padding: "10px 24px", color: accentL, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>SIGN IN</button>
        <div style={{ marginTop: 16, fontSize: 11, color: tL }}><button onClick={function() { setPage("terms"); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer", fontSize: 11 }}>Terms</button><span style={{ margin: "0 6px" }}>|</span><button onClick={function() { setPage("privacy"); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer", fontSize: 11 }}>Privacy</button></div>
        <div style={{ fontSize: 10, color: tL, marginTop: 8 }}>Beta: No charges during testing. Stripe coming soon.</div>
      </div>
    </div>
  </div>; }

  // ═══ LOGIN (existing users) ═══
  if (page === "login") { return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #E8ECFA 0%, #F5F6FA 50%, #EEF0F7 100%)", padding: 20, fontFamily: ff }}><div style={{ width: "100%", maxWidth: 380, padding: 40, background: white, borderRadius: 22, border: "1px solid " + bdr, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}><div style={{ textAlign: "center", marginBottom: 32 }}><Logo size={70} /><div style={{ fontSize: 48, fontFamily: hf, color: accent, letterSpacing: 6, marginTop: 8 }}>TRIFORGE</div><div style={{ color: tL, fontSize: 12, letterSpacing: 2, marginTop: 2 }}>ENDURANCE TRAINING INTELLIGENCE</div></div><div style={lblS}>Username</div><input style={Object.assign({}, inp, { marginBottom: 12 })} value={user} onChange={function(e) { setUser(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") doLogin(); }} placeholder="Enter username" /><div style={lblS}>Password</div><input style={Object.assign({}, inp, { marginBottom: 8 })} type="password" value={pw} onChange={function(e) { setPw(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") doLogin(); }} placeholder="Password" /><div style={{ textAlign: "right", marginBottom: 12 }}><button onClick={function() { setPage("forgot"); }} style={{ background: "none", border: "none", color: accentL, fontSize: 12, cursor: "pointer" }}>Forgot password?</button></div><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><div onClick={function() { setRemember(!remember); }} style={{ width: 20, height: 20, borderRadius: 6, border: "2px solid " + (remember ? accent : bdr), background: remember ? accent : white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{remember ? <span style={{ color: white, fontSize: 12, fontWeight: 700 }}>Y</span> : null}</div><span style={{ fontSize: 13, color: tM, cursor: "pointer" }} onClick={function() { setRemember(!remember); }}>Remember me</span></div><button style={Object.assign({}, btnS, { width: "100%" })} onClick={doLogin}>SIGN IN</button><div style={{ textAlign: "center", marginTop: 16 }}><button onClick={function() { setPage("signup"); }} style={{ background: "none", border: "none", color: accentL, fontSize: 13, cursor: "pointer" }}>New here? Create an account</button></div><div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: tL }}><button onClick={function() { setPage("terms"); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer", fontSize: 11 }}>Terms</button><span style={{ margin: "0 6px" }}>|</span><button onClick={function() { setPage("privacy"); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer", fontSize: 11 }}>Privacy</button></div></div></div>; }

  // ═══ WELCOME LANDING (first thing users see) ═══
  if (!loggedIn) { return <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0A0E1A 0%, #111827 50%, #0A0E1A 100%)", color: "#E2E8F0", fontFamily: ff }}>
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
      <Logo size={80} />
      <div style={{ fontFamily: hf, fontSize: 64, letterSpacing: 6, color: "#fff", marginTop: 12 }}>TRIFORGE</div>
      <div style={{ fontSize: 14, letterSpacing: 3, color: "#64748B", marginBottom: 40 }}>AI-POWERED ENDURANCE TRAINING</div>
      <div style={{ fontSize: 18, color: "#94A3B8", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>Personalized training plans for triathlons, marathons, cycling, ultra running, and more. Built by AI that adapts to your body, schedule, and goals.</div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 40 }}>
        {["Triathlon", "Marathon", "Half Marathon", "5K / 10K", "Ultra", "Century Ride", "Duathlon", "Open Water"].map(function(s) { return <span key={s} style={{ padding: "6px 16px", borderRadius: 100, border: "1px solid #334155", fontSize: 12, color: "#64748B" }}>{s}</span>; })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40, textAlign: "left" }}>
        {[["AI Plan Builder", "Claude Opus builds week-by-week plans with course-specific prep.", accentL], ["AI Coach", "Unlimited chat. Ask anything. Modify your plan on command.", purple], ["Daily Texts", "Wake up to your workout + motivation. Syncs with swaps.", "#22C55E"], ["Nutrition Tracking", "80+ foods with auto macros. Weight trends. Hydration.", "#F59E0B"], ["Garmin + Strava", "Auto-import workouts. No manual logging.", "#EF4444"], ["Race Rewards", "Complete 4 races, earn a free month.", "#EC4899"]].map(function(f) { return <div key={f[0]} style={{ background: "#1E293B", borderRadius: 14, padding: 20, border: "1px solid #334155" }}><div style={{ fontSize: 14, fontWeight: 700, color: f[2], marginBottom: 6 }}>{f[0]}</div><div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>{f[1]}</div></div>; })}
      </div>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 24 }}>
        <button onClick={function() { setPage("signup"); }} style={{ background: accentL, color: "#fff", border: "none", borderRadius: 12, padding: "16px 40px", fontSize: 16, fontWeight: 700, fontFamily: hf, letterSpacing: 3, cursor: "pointer" }}>GET STARTED</button>
        <button onClick={function() { setPage("login"); }} style={{ background: "transparent", color: "#94A3B8", border: "2px solid #334155", borderRadius: 12, padding: "16px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>Sign In</button>
      </div>
      <div style={{ fontSize: 12, color: "#475569" }}>7-day free trial. No credit card required.</div>
      <div style={{ marginTop: 24, fontSize: 11, color: "#334155" }}><button onClick={function() { setPage("terms"); }} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 11 }}>Terms</button><span style={{ margin: "0 8px" }}>|</span><button onClick={function() { setPage("privacy"); }} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 11 }}>Privacy</button></div>
    </div>
  </div>; }

  // ═══ TRIAL EXPIRED WALL ═══
  if (isTrialExpired()) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: bg, padding: 20, fontFamily: ff }}>
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        <Logo size={60} /><div style={{ fontFamily: hf, fontSize: 36, color: accent, letterSpacing: 4, marginTop: 8, marginBottom: 16 }}>YOUR FREE TRIAL HAS ENDED</div>
        <div style={{ fontSize: 14, color: tM, marginBottom: 30 }}>Subscribe to continue tracking your training, nutrition, and sleep — plus unlock AI Plan Builder and Coach.</div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ background: white, borderRadius: 16, padding: 28, border: "2px solid " + accentL, width: 240 }}>
            <div style={{ fontFamily: hf, fontSize: 14, color: accentL, letterSpacing: 2, marginBottom: 8 }}>BASIC</div>
            <div style={{ fontFamily: hf, fontSize: 40, color: tD }}>$9.99<span style={{ fontSize: 14, color: tL }}>/mo</span></div>
            <div style={{ fontSize: 12, color: tM, lineHeight: 1.8, marginTop: 12, marginBottom: 16, textAlign: "left" }}>
              Full app access<br />AI Plan Builder (5 races/yr)<br />AI Coach + 5 plan modifications/yr<br />Nutrition, sleep, workout tracking<br />Daily text add-on: +$3.99/mo
            </div>
            <button onClick={function() { subscribe("basic"); }} style={Object.assign({}, btnS, { width: "100%", background: accentL })}>START BASIC</button>
          </div>
          <div style={{ background: white, borderRadius: 16, padding: 28, border: "2px solid " + purple, width: 240, position: "relative" }}>
            <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: purple, color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>BEST VALUE</div>
            <div style={{ fontFamily: hf, fontSize: 14, color: purple, letterSpacing: 2, marginBottom: 8 }}>PRO</div>
            <div style={{ fontFamily: hf, fontSize: 40, color: tD }}>$16.99<span style={{ fontSize: 14, color: tL }}>/mo</span></div>
            <div style={{ fontSize: 12, color: tM, lineHeight: 1.8, marginTop: 12, marginBottom: 16, textAlign: "left" }}>
              Everything in Basic<br />15 races/yr (triple)<br />15 plan modifications/yr<br />Priority support<br />Daily text add-on: +$2.99/mo (save $1)
            </div>
            <button onClick={function() { subscribe("pro"); }} style={Object.assign({}, btnS, { width: "100%", background: purple })}>START PRO</button>
          </div>
        </div>
        <div style={{ fontSize: 11, color: tL, marginTop: 16 }}>Beta: No charge. Stripe coming soon.</div>
        <button onClick={doLogout} style={{ background: "none", border: "none", color: tL, fontSize: 12, marginTop: 16, cursor: "pointer" }}>Sign out</button>
      </div>
    </div>;
  }

  // ── Computed ──
  var raceTypes = RACE_TYPES[profile.sport] || RACE_TYPES.triathlon;
  var buildSportTypes = RACE_TYPES[buildProfile.sport] || RACE_TYPES.triathlon;
  var buildSportInfo = SPORTS.find(function(s) { return s.id === buildProfile.sport; }) || SPORTS[0];
  var allTabs = ["dash", "profile", "program", "builder", "nutrition", "sleep", "coach", "reviews", "support"];
  var tabLabels = { dash: "Home", profile: "Profile", program: "Program", builder: "Build Plan", nutrition: "Nutrition", sleep: "Sleep", coach: "Coach", reviews: "Reviews", support: "Help" };
  // Trial users: no builder or coach tabs
  var visibleTabs = sub.tier === "trial" ? allTabs.filter(function(t) { return t !== "builder" && t !== "coach"; }) : allTabs;

  // ═══ MAIN APP ═══
  return <div style={{ minHeight: "100vh", background: bg, color: tD, fontFamily: ff }}>
    {/* Subscription banner */}
    {sub.tier === "trial" ? <div style={{ background: "#FFF7ED", padding: "8px 14px", textAlign: "center", fontSize: 12, color: "#EA580C", borderBottom: "1px solid #FED7AA" }}>{"Free trial: " + trialDaysLeft() + " day" + (trialDaysLeft() !== 1 ? "s" : "") + " remaining. "}<button onClick={function() { setTab("dash"); }} style={{ background: "#EA580C", color: "#fff", border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", marginLeft: 6 }}>UPGRADE</button></div> : null}
    {isPaid() ? <div style={{ background: sub.tier === "pro" ? "#F5F3FF" : "#EFF6FF", padding: "6px 14px", textAlign: "center", fontSize: 11, color: sub.tier === "pro" ? purple : accentL, borderBottom: "1px solid " + (sub.tier === "pro" ? "#E0D4FF" : "#BFDBFE") }}>{getTier().name + " Plan | Plans: " + sub.plansBuilt + "/" + getTier().maxRaces + " | Mods: " + sub.modsUsed + "/" + getTier().maxMods}</div> : null}

    <nav style={{ background: white, borderBottom: "1px solid " + bdr, padding: "10px 14px", display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <Logo size={26} /><span style={{ fontFamily: hf, fontSize: 17, color: accent, letterSpacing: 2, marginRight: 4 }}>TRIFORGE</span><span style={{ fontSize: 10, color: tL, marginRight: "auto" }}>{user}</span>
      {visibleTabs.map(function(t) { return <button key={t} onClick={function() { setTab(t); }} style={{ background: tab === t ? accent : "none", color: tab === t ? "#fff" : tL, border: "none", fontSize: 10, fontWeight: 600, padding: "5px 8px", borderRadius: 8, cursor: "pointer", fontFamily: ff }}>{tabLabels[t]}</button>; })}
      <button onClick={doLogout} style={{ background: "none", border: "1px solid " + bdr, color: tL, fontSize: 10, padding: "4px 8px", borderRadius: 6, cursor: "pointer" }}>Out</button>
    </nav>
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "18px 14px 80px" }}>

      {/* ═══ DASHBOARD ═══ */}
      {tab === "dash" && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 16 }}>DASHBOARD</div>
        {weekComp ? <div style={crd}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><div style={secS}>THIS WEEK</div><div style={{ fontFamily: hf, fontSize: 24, color: weekComp.pct >= 80 ? "#22C55E" : weekComp.pct >= 50 ? "#F59E0B" : "#EF4444" }}>{weekComp.pct + "%"}</div></div><div style={{ height: 12, background: "#EEF0F4", borderRadius: 6, overflow: "hidden", marginBottom: 6 }}><div style={{ height: "100%", width: weekComp.pct + "%", background: weekComp.pct >= 80 ? "#22C55E" : weekComp.pct >= 50 ? "#F59E0B" : "#EF4444", borderRadius: 6 }} /></div><div style={{ fontSize: 12, color: tL }}>{weekComp.done + " of " + weekComp.total + " workouts"}</div></div> : null}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {hasDisc("swim") ? <div style={crd}><div style={{ fontSize: 11, fontWeight: 600, color: "#3B82F6", marginBottom: 6 }}>SWIM 500M</div><div style={{ fontFamily: hf, fontSize: 26, color: tD }}>{profile.swim500m || "-"}</div>{parseTime(profile.swim500m) ? <div style={{ fontSize: 12, color: tL }}>{"Pace: " + fmtSecs(parseTime(profile.swim500m) / 5) + " /100yd"}</div> : null}</div> : null}
          {hasDisc("bike") ? <div style={crd}><div style={{ fontSize: 11, fontWeight: 600, color: "#22C55E", marginBottom: 6 }}>BIKE 20K (12.4mi)</div><div style={{ fontFamily: hf, fontSize: 26, color: tD }}>{profile.bike20k || "-"}</div>{parseTime(profile.bike20k) ? <div style={{ fontSize: 12, color: tL }}>{"Avg: " + (12.43 / (parseTime(profile.bike20k) / 3600)).toFixed(1) + " mph"}</div> : null}</div> : null}
          {hasDisc("run") ? <div style={crd}><div style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B", marginBottom: 6 }}>RUN 5K (3.1mi)</div><div style={{ fontFamily: hf, fontSize: 26, color: tD }}>{profile.run5k || "-"}</div>{parseTime(profile.run5k) ? <div style={{ fontSize: 12, color: tL }}>{"Pace: " + fmtSecs((parseTime(profile.run5k) / 5) * 1.609) + " /mile"}</div> : null}</div> : null}
          {hasDisc("run") ? <div style={crd}><div style={{ fontSize: 11, fontWeight: 600, color: "#EF4444", marginBottom: 6 }}>RUN 10K (6.2mi)</div><div style={{ fontFamily: hf, fontSize: 26, color: tD }}>{profile.run10k || "-"}</div>{parseTime(profile.run10k) ? <div style={{ fontSize: 12, color: tL }}>{"Pace: " + fmtSecs((parseTime(profile.run10k) / 10) * 1.609) + " /mile"}</div> : null}</div> : null}
        </div>
        <div style={crd}><div style={secS}>{"TODAY'S NUTRITION"}</div><PBar label="Calories" cur={todayT.cal} tgt={targets.cal} unit="cal" color={accentL} /><PBar label="Protein" cur={todayT.pro} tgt={targets.pro} unit="g" color="#8B5CF6" /><PBar label="Carbs" cur={todayT.carb} tgt={targets.carb} unit="g" color="#F59E0B" /><PBar label="Fat" cur={todayT.fat} tgt={targets.fat} unit="g" color="#EF4444" /></div>
        {upcoming.map(function(race, ri) { var d = Math.ceil((new Date(race.date) - new Date()) / 86400000); return <div key={ri} style={Object.assign({}, crd, { borderLeftWidth: 4, borderLeftColor: d <= 30 ? "#EF4444" : d <= 90 ? "#F59E0B" : "#22C55E" })}><div style={{ display: "flex", justifyContent: "space-between" }}><div><div style={{ fontFamily: hf, fontSize: 20, color: tD }}>{race.name}</div><div style={{ fontSize: 12, color: tL }}>{race.dist + " | " + d + " days"}</div></div>{race.goal ? <div style={{ fontFamily: hf, fontSize: 22, color: accent }}>{"Goal: " + race.goal}</div> : null}</div></div>; })}

        {/* Upgrade CTA for trial */}
        {sub.tier === "trial" ? <div style={Object.assign({}, crd, { border: "2px solid " + purple, textAlign: "center", padding: 24 })}>
          <div style={{ fontFamily: hf, fontSize: 20, color: purple, marginBottom: 8 }}>UNLOCK AI PLAN BUILDER AND COACH</div>
          <div style={{ fontSize: 13, color: tM, marginBottom: 16 }}>Build custom training plans with AI. Get unlimited coaching chat with plan modifications.</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={function() { subscribe("basic"); }} style={Object.assign({}, btnS, { background: accentL })}>BASIC $9.99/mo</button>
            <button onClick={function() { subscribe("pro"); }} style={Object.assign({}, btnS, { background: purple })}>PRO $16.99/mo</button>
          </div>
          <div style={{ fontSize: 10, color: tL, marginTop: 8 }}>Beta: No charge during testing.</div>
        </div> : null}
      </div>}

      {/* ═══ PROFILE ═══ */}
      {tab === "profile" && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 14 }}>PROFILE</div>
        <div style={secS}>SPORT TYPE</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>{SPORTS.map(function(s) { return <button key={s.id} onClick={function() { setProfile(Object.assign({}, profile, { sport: s.id })); }} style={{ background: profile.sport === s.id ? accent : white, color: profile.sport === s.id ? "#fff" : tM, border: "2px solid " + (profile.sport === s.id ? accent : bdr), borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>{s.name}</button>; })}</div>
        <div style={secS}>PHYSICAL</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}><div><div style={lblS}>Height</div><input style={inp} value={profile.height} onChange={function(e) { setProfile(Object.assign({}, profile, { height: e.target.value })); }} placeholder="6'2" /></div><div><div style={lblS}>Weight (lbs)</div><input style={inp} value={profile.weight} onChange={function(e) { setProfile(Object.assign({}, profile, { weight: e.target.value })); }} placeholder="265" /></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}><div><div style={lblS}>Weight Goal</div><div style={{ display: "flex", gap: 4 }}>{["lose", "maintain", "gain"].map(function(g) { return <button key={g} onClick={function() { setProfile(Object.assign({}, profile, { weightGoal: g })); }} style={{ background: profile.weightGoal === g ? wc2[g] + "18" : white, border: "2px solid " + (profile.weightGoal === g ? wc2[g] : bdr), borderRadius: 8, padding: "6px 12px", color: profile.weightGoal === g ? wc2[g] : tL, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>{wl[g]}</button>; })}</div></div><div><div style={lblS}>Goal Weight</div><input style={inp} value={profile.goalWeight} onChange={function(e) { setProfile(Object.assign({}, profile, { goalWeight: e.target.value })); }} placeholder="240" /></div></div>
        <div style={secS}>TIMES</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          {hasDisc("swim") ? <div><div style={lblS}>500m Swim</div><input style={inp} value={profile.swim500m} onChange={function(e) { setProfile(Object.assign({}, profile, { swim500m: e.target.value })); }} placeholder="12:30" /></div> : null}
          {hasDisc("bike") ? <div><div style={lblS}>20k Bike</div><input style={inp} value={profile.bike20k} onChange={function(e) { setProfile(Object.assign({}, profile, { bike20k: e.target.value })); }} placeholder="42:00" /></div> : null}
          {hasDisc("run") ? <div><div style={lblS}>5k Run</div><input style={inp} value={profile.run5k} onChange={function(e) { setProfile(Object.assign({}, profile, { run5k: e.target.value })); }} placeholder="25:30" /></div> : null}
          {hasDisc("run") ? <div><div style={lblS}>10k Run</div><input style={inp} value={profile.run10k} onChange={function(e) { setProfile(Object.assign({}, profile, { run10k: e.target.value })); }} placeholder="55:00" /></div> : null}
        </div>
        <div style={secS}>WEEK</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}><div><div style={lblS}>Hours/Week</div><input style={inp} type="number" value={profile.weeklyHours} onChange={function(e) { setProfile(Object.assign({}, profile, { weeklyHours: e.target.value })); }} placeholder="10" /></div><div><div style={lblS}>Week Starts On</div><select style={inp} value={profile.weekStart} onChange={function(e) { setProfile(Object.assign({}, profile, { weekStart: parseInt(e.target.value) })); }}>{DAYNAMES.map(function(d, i) { return <option key={i} value={i}>{d}</option>; })}</select></div></div>
        <div style={secS}>RACES</div>
        {(profile.races || []).map(function(r, i) { return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid " + bdr, fontSize: 13 }}><span><strong>{r.name}</strong> <span style={{ color: tL }}>{(r.dist || "") + " " + r.date + (r.goal ? " Goal: " + r.goal : "")}</span></span><button onClick={function() { var np = Object.assign({}, profile); np.races = profile.races.filter(function(_, j) { return j !== i; }); setProfile(np); doSave(np); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer" }}>X</button></div>; })}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}><div><div style={lblS}>Race Name</div><input style={inp} value={rn} onChange={function(e) { setRn(e.target.value); }} /></div><div><div style={lblS}>Date</div><input style={inp} type="date" value={rd} onChange={function(e) { setRd(e.target.value); }} /></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginTop: 6, marginBottom: 14, alignItems: "end" }}><div><div style={lblS}>Distance</div><select style={inp} value={rdist} onChange={function(e) { setRdist(e.target.value); }}>{raceTypes.map(function(rt) { return <option key={rt}>{rt}</option>; })}</select></div><div><div style={lblS}>Goal Time</div><input style={inp} value={rgt} onChange={function(e) { setRgt(e.target.value); }} placeholder="5:30:00" /></div><button onClick={addRace} style={Object.assign({}, btnS, { padding: "11px 16px", fontSize: 12 })}>+ ADD</button></div>
        <div style={secS}>GOALS</div><textarea style={Object.assign({}, inp, { resize: "vertical", lineHeight: 1.6, marginBottom: 14 })} rows={3} value={profile.goals} onChange={function(e) { setProfile(Object.assign({}, profile, { goals: e.target.value })); }} placeholder="PR targets, finish goals..." />

        {/* Daily Text Messages */}
        <div style={Object.assign({}, crd, { border: "1px solid " + (isSmsActive() ? "#22C55E" : bdr), marginTop: 16 })}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={secS}>DAILY TEXT MESSAGES</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: isSmsActive() ? "#22C55E" : tL }}>{isSmsActive() ? "ACTIVE" : "$" + getSmsPrice() + "/mo add-on"}</div>
          </div>
          <div style={{ fontSize: 12, color: tM, marginBottom: 12 }}>Get a text every day with your workout and a motivational message. Syncs with any swaps you make. {!isPaid() ? "3-day free preview available." : ""}</div>

          {isSmsActive() ? <div>
            <div style={{ padding: 12, background: "#F0FDF4", borderRadius: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#22C55E", marginBottom: 4 }}>{"TODAY'S TEXT PREVIEW"}</div>
              <div style={{ fontSize: 13, color: tD, lineHeight: 1.6 }}>{"TriForge: " + getTodayWorkout() + " | You got this. One workout at a time."}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div><div style={lblS}>Phone Number</div><input style={inp} value={smsSettings.phone} onChange={function(e) { var ns = Object.assign({}, smsSettings, { phone: e.target.value }); setSmsSettings(ns); }} placeholder="+1 (555) 123-4567" /></div>
              <div><div style={lblS}>Send Time</div><input style={inp} type="time" value={smsSettings.sendTime} onChange={function(e) { var ns = Object.assign({}, smsSettings, { sendTime: e.target.value }); setSmsSettings(ns); }} /></div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={function() { saveSmsSettings(smsSettings); }} style={Object.assign({}, btnS, { background: "#22C55E", fontSize: 12, padding: "10px 16px" })}>SAVE SETTINGS</button>
              <button onClick={disableSms} style={Object.assign({}, btnS, { background: tL, fontSize: 12, padding: "10px 16px" })}>TURN OFF</button>
            </div>
            {!isPaid() && smsSettings.enabled ? <div style={{ fontSize: 11, color: "#EA580C", marginTop: 8 }}>{"Free preview: " + smsDaysLeft() + " day" + (smsDaysLeft() !== 1 ? "s" : "") + " remaining. Subscribe to keep daily texts."}</div> : null}
          </div> : <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div><div style={lblS}>Phone Number</div><input style={inp} value={smsSettings.phone} onChange={function(e) { var ns = Object.assign({}, smsSettings, { phone: e.target.value }); setSmsSettings(ns); }} placeholder="+1 (555) 123-4567" /></div>
              <div><div style={lblS}>Send Time</div><input style={inp} type="time" value={smsSettings.sendTime} onChange={function(e) { var ns = Object.assign({}, smsSettings, { sendTime: e.target.value }); setSmsSettings(ns); }} /></div>
            </div>
            <button onClick={function() { if (!smsSettings.phone.trim()) { flash("Enter your phone number first."); return; } toggleSms(); }} style={Object.assign({}, btnS, { background: "#22C55E", fontSize: 12, padding: "10px 20px" })}>{isPaid() ? "ACTIVATE - $" + getSmsPrice() + "/MO" : "TRY FREE FOR 3 DAYS"}</button>
            <div style={{ fontSize: 10, color: tL, marginTop: 6 }}>Stripe integration coming soon. No charge during beta.</div>
          </div>}
        </div>

        {/* Subscription Management */}
        <div style={Object.assign({}, crd, { border: "1px solid " + (isPaid() ? purple : bdr), marginTop: 16 })}>
          <div style={secS}>SUBSCRIPTION</div>
          <div style={{ fontSize: 13, color: tM, marginBottom: 10 }}>{"Current plan: "}<strong style={{ color: isPaid() ? purple : "#EA580C" }}>{getTier().name + (sub.tier === "trial" ? " (" + trialDaysLeft() + " days left)" : " - $" + getTier().price + "/mo")}</strong></div>
          {isPaid() ? <div style={{ fontSize: 12, color: tL, marginBottom: 10 }}>{"Plans built: " + sub.plansBuilt + "/" + getTier().maxRaces + " | Modifications: " + sub.modsUsed + "/" + getTier().maxMods + " (resets yearly)"}</div> : null}
          {isPaid() && sub.discountPct && isDiscountActive() ? <div style={{ fontSize: 12, color: "#22C55E", marginBottom: 10 }}>{sub.discountPct + "% discount active (expires " + new Date(new Date(sub.discountStart).getTime() + 90 * 86400000).toLocaleDateString("en-US", { month: "short", year: "numeric" }) + ")"}</div> : null}
          {isPaid() && sub.discountPct && !isDiscountActive() && sub.discountStart ? <div style={{ fontSize: 12, color: tL, marginBottom: 10 }}>Introductory discount has ended. Standard pricing applies.</div> : null}
          {sub.tier !== "pro" ? <div style={{ display: "flex", gap: 8 }}>
            {sub.tier !== "basic" ? <button onClick={function() { subscribe("basic"); }} style={Object.assign({}, btnS, { background: accentL, fontSize: 12, padding: "10px 16px" })}>BASIC $9.99/mo</button> : null}
            <button onClick={function() { subscribe("pro"); }} style={Object.assign({}, btnS, { background: purple, fontSize: 12, padding: "10px 16px" })}>{sub.tier === "basic" ? "UPGRADE TO PRO $16.99/mo" : "PRO $16.99/mo"}</button>
          </div> : null}
          {isPaid() ? <div style={{ marginTop: 10 }}><button onClick={function() { if (confirm("Cancel subscription? You will lose access to Plan Builder and AI Coach.")) cancelSubscription(); }} style={{ background: "none", border: "1px solid #EF4444", color: "#EF4444", borderRadius: 8, padding: "8px 16px", fontSize: 12, cursor: "pointer", fontFamily: ff }}>Cancel Subscription</button></div> : null}
          {isSmsActive() ? <div style={{ fontSize: 11, color: "#22C55E", marginTop: 8 }}>Daily texts: Active</div> : null}
        </div>

        {/* Loyalty Reward - Complete 4 Verified Races = 1 Free Month */}
        {isPaid() ? <div style={Object.assign({}, crd, { marginTop: 16, border: "1px solid " + (canClaimReward() ? "#F59E0B" : bdr), background: canClaimReward() ? "#FFFBEB" : white })}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={secS}>RACE REWARD PROGRAM</div>
            <div style={{ fontFamily: hf, fontSize: 22, color: canClaimReward() ? "#F59E0B" : tL }}>{getVerifiedCount() + " / 4"}</div>
          </div>
          <div style={{ fontSize: 12, color: tM, marginBottom: 8 }}>Complete 4 verified races in a calendar year to earn <strong>1 free month</strong>. Upload proof for each race (finish screenshot, medal photo, or results link).</div>
          {getPendingCount() > 0 ? <div style={{ fontSize: 11, color: "#F59E0B", marginBottom: 8 }}>{getPendingCount() + " race(s) pending manual review."}</div> : null}
          <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
            {[1, 2, 3, 4].map(function(n) {
              var verified = getVerifiedCount() >= n;
              return <div key={n} style={{ flex: 1, height: 8, borderRadius: 4, background: verified ? "#F59E0B" : "#EEF0F4" }} />;
            })}
          </div>
          {canClaimReward() ? <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B", marginBottom: 10 }}>You earned it! Choose your reward:</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={claimFreeMonth} style={Object.assign({}, btnS, { background: "#F59E0B", fontSize: 12, padding: "10px 16px" })}>FREE MONTH OF {getTier().name.toUpperCase()}</button>
              {sub.tier === "basic" ? <button onClick={claimUpgrade} style={Object.assign({}, btnS, { background: purple, fontSize: 12, padding: "10px 16px" })}>UPGRADE TO PRO (PAY DIFFERENCE)</button> : null}
            </div>
          </div> : sub.rewardClaimed ? <div style={{ fontSize: 12, color: "#22C55E", fontWeight: 600 }}>Reward claimed this year! Resets January 1.</div> : <div>
            <div style={{ fontSize: 11, color: tL, marginBottom: 6 }}>{(4 - getVerifiedCount()) + " more verified race" + ((4 - getVerifiedCount()) !== 1 ? "s" : "") + " to go."}</div>
          </div>}

          {/* Proof Upload Panel */}
          {proofRace ? <div style={{ marginTop: 14, padding: 16, background: "#FEFCE8", borderRadius: 12, border: "1px solid #FDE68A" }}>
            <div style={{ fontFamily: hf, fontSize: 14, color: "#92400E", letterSpacing: 1, marginBottom: 10 }}>{"VERIFY: " + proofRace.name}</div>
            <div style={lblS}>Proof Type</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {[{v:"screenshot",l:"Results Screenshot"},{v:"medal",l:"Medal / Finish Photo"},{v:"bib",l:"Bib + Timing"},{v:"url",l:"Results URL"}].map(function(pt) {
                return <button key={pt.v} onClick={function() { setProofType(pt.v); }} style={{ background: proofType === pt.v ? "#F59E0B18" : white, border: "2px solid " + (proofType === pt.v ? "#F59E0B" : bdr), borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, color: proofType === pt.v ? "#92400E" : tL, cursor: "pointer", fontFamily: ff }}>{pt.l}</button>;
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div><div style={lblS}>Finish Time</div><input style={inp} value={proofTime} onChange={function(e) { setProofTime(e.target.value); }} placeholder="5:32:14" /></div>
              <div><div style={lblS}>Results URL (optional)</div><input style={inp} value={proofUrl} onChange={function(e) { setProofUrl(e.target.value); }} placeholder="https://results.example.com" /></div>
            </div>
            <div style={lblS}>Upload Photo Proof</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <button onClick={function() { if (proofFileRef.current) proofFileRef.current.click(); }} style={Object.assign({}, btnS, { background: "#92400E", fontSize: 11, padding: "8px 16px" })}>CHOOSE PHOTO</button>
              <input ref={proofFileRef} type="file" accept="image/*" onChange={handleProofFile} style={{ display: "none" }} />
              {proofImage ? <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 600 }}>Photo ready</span> : <span style={{ fontSize: 11, color: tL }}>JPG, PNG, screenshot</span>}
            </div>
            {proofImage ? <div style={{ marginBottom: 10 }}><img src={proofImage} style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, border: "1px solid " + bdr }} /></div> : null}
            <div style={{ fontSize: 11, color: tM, marginBottom: 10 }}>Our AI will verify your proof checks out. It looks for: matching race details, realistic finish time for the distance, visible race indicators (bib, medal, timing screen, official results). Most verifications are instant.</div>
            <div style={{ display: "flex", gap: 8 }}>
              {verifying ? <div style={{ fontSize: 13, fontWeight: 600, color: "#F59E0B" }}>Verifying your race proof...</div> : <button onClick={submitRaceProof} style={Object.assign({}, btnS, { background: "#F59E0B", fontSize: 12, padding: "10px 20px" })}>SUBMIT FOR VERIFICATION</button>}
              <button onClick={function() { setProofRace(null); setProofImage(null); setProofUrl(""); setProofTime(""); }} style={Object.assign({}, btnS, { background: tL, fontSize: 12, padding: "10px 16px" })}>CANCEL</button>
            </div>
          </div> : null}

          {/* Past Race List */}
          {(profile.races || []).length > 0 ? <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: tL, marginBottom: 6 }}>YOUR RACES</div>
            {(profile.races || []).filter(function(r) { return new Date(r.date) <= new Date(); }).map(function(r, i) {
              var proofed = isRaceProofed(r.name, r.date);
              var proof = raceProofs.find(function(p) { return p.raceName === r.name && p.raceDate === r.date; });
              var status = proof ? proof.verification.status : null;
              var statusColor = status === "verified" ? "#22C55E" : status === "needs_review" ? "#F59E0B" : status === "rejected" ? "#EF4444" : tL;
              var statusText = status === "verified" ? "VERIFIED" : status === "needs_review" ? "PENDING REVIEW" : status === "rejected" ? "NEEDS NEW PROOF" : null;
              return <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid " + bdr, fontSize: 12 }}>
                <div><strong>{r.name}</strong> <span style={{ color: tL }}>{r.date}</span>{proof ? <span style={{ fontSize: 10, color: tL, marginLeft: 6 }}>{proof.finishTime}</span> : null}</div>
                {statusText ? <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, padding: "2px 8px", borderRadius: 4, background: statusColor + "18" }}>{statusText}</span> : <button onClick={function() { setProofRace(r); setProofImage(null); setProofUrl(""); setProofTime(r.goal || ""); }} style={{ background: "#F59E0B", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>SUBMIT PROOF</button>}
              </div>;
            })}
          </div> : null}
        </div> : null}

        {/* Garmin / Strava Integration */}
        <div style={Object.assign({}, crd, { marginTop: 16 })}>
          <div style={secS}>CONNECTED APPS</div>
          <div style={{ fontSize: 12, color: tM, marginBottom: 14 }}>Connect your devices to auto-import completed workouts. No more manual logging.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, border: "2px solid " + (garminConnected ? "#22C55E" : bdr), background: garminConnected ? "#F0FDF4" : white }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div><div style={{ fontFamily: hf, fontSize: 18, color: tD, letterSpacing: 1 }}>GARMIN</div><div style={{ fontSize: 11, color: tL }}>Connect, Forerunner, Edge, Fenix</div></div>
                {garminConnected ? <span style={{ color: "#22C55E", fontSize: 12, fontWeight: 700 }}>LINKED</span> : null}
              </div>
              {garminConnected ? <div>
                <div style={{ fontSize: 11, color: "#22C55E", marginBottom: 8 }}>Auto-syncing workouts from your Garmin device.</div>
                <button onClick={function() { setGarminConnected(false); flash("Garmin disconnected."); }} style={{ background: "none", border: "1px solid " + bdr, color: tL, borderRadius: 6, padding: "6px 12px", fontSize: 11, cursor: "pointer" }}>Disconnect</button>
              </div> : <div>
                <button onClick={function() { setGarminConnected(true); flash("Garmin connected! (Beta: simulated)"); }} style={Object.assign({}, btnS, { background: "#1A73E8", fontSize: 11, padding: "8px 16px", letterSpacing: 1 })}>CONNECT GARMIN</button>
                <div style={{ fontSize: 10, color: tL, marginTop: 6 }}>Opens Garmin Connect OAuth. Beta: simulated.</div>
              </div>}
            </div>
            <div style={{ padding: 16, borderRadius: 12, border: "2px solid " + (stravaConnected ? "#FC4C02" : bdr), background: stravaConnected ? "#FFF7ED" : white }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div><div style={{ fontFamily: hf, fontSize: 18, color: tD, letterSpacing: 1 }}>STRAVA</div><div style={{ fontSize: 11, color: tL }}>Activities, segments, routes</div></div>
                {stravaConnected ? <span style={{ color: "#FC4C02", fontSize: 12, fontWeight: 700 }}>LINKED</span> : null}
              </div>
              {stravaConnected ? <div>
                <div style={{ fontSize: 11, color: "#FC4C02", marginBottom: 8 }}>Auto-syncing activities from Strava.</div>
                <button onClick={function() { setStravaConnected(false); flash("Strava disconnected."); }} style={{ background: "none", border: "1px solid " + bdr, color: tL, borderRadius: 6, padding: "6px 12px", fontSize: 11, cursor: "pointer" }}>Disconnect</button>
              </div> : <div>
                <button onClick={function() { setStravaConnected(true); flash("Strava connected! (Beta: simulated)"); }} style={Object.assign({}, btnS, { background: "#FC4C02", fontSize: 11, padding: "8px 16px", letterSpacing: 1 })}>CONNECT STRAVA</button>
                <div style={{ fontSize: 10, color: tL, marginTop: 6 }}>Opens Strava OAuth. Beta: simulated.</div>
              </div>}
            </div>
          </div>
          <div style={{ fontSize: 11, color: tL, marginTop: 10 }}>When connected, completed workouts auto-import with distance, time, pace, and heart rate data. Works with workout result logging.</div>
        </div>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: tL }}><button onClick={function() { setPage("terms"); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer", fontSize: 11 }}>Terms</button><span style={{ margin: "0 6px" }}>|</span><button onClick={function() { setPage("privacy"); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer", fontSize: 11 }}>Privacy</button></div>
        <button style={Object.assign({}, btnS, { marginTop: 14 })} onClick={saveProfile}>SAVE PROFILE</button>
      </div>}

      {/* ═══ PROGRAM ═══ */}
      {tab === "program" && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 14 }}>PROGRAM</div>
        {weekComp ? <div style={crd}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><div style={secS}>{"WEEK: " + getWeekRange(0).start}</div><div style={{ fontFamily: hf, fontSize: 28, color: weekComp.pct >= 80 ? "#22C55E" : weekComp.pct >= 50 ? "#F59E0B" : "#EF4444" }}>{weekComp.pct + "%"}</div></div><div style={{ height: 14, background: "#EEF0F4", borderRadius: 7, overflow: "hidden" }}><div style={{ height: "100%", width: weekComp.pct + "%", background: weekComp.pct >= 80 ? "#22C55E" : weekComp.pct >= 50 ? "#F59E0B" : "#EF4444", borderRadius: 7 }} /></div></div> : null}
        {weekWos.length > 0 ? <div style={crd}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><div style={secS}>THIS WEEK</div>{swapFrom ? <div style={{ fontSize: 11, color: "#8B5CF6", fontWeight: 600 }}>Tap another workout to swap with</div> : <div style={{ fontSize: 11, color: tL }}>Tap Swap to rearrange days</div>}</div>{weekWos.map(function(w) { var dn = new Date(w.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); var isSwapTarget = swapFrom && swapFrom !== w.id; var isSwapSrc = swapFrom === w.id; return <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid " + bdr, background: isSwapSrc ? "#F5F3FF" : isSwapTarget ? "#FEFCE8" : "transparent", marginLeft: -8, marginRight: -8, paddingLeft: 8, paddingRight: 8, borderRadius: isSwapSrc || isSwapTarget ? 8 : 0 }}><div onClick={function() { toggleWorkout(w.id); }} style={{ width: 24, height: 24, borderRadius: 6, border: "2px solid " + (w.done ? "#22C55E" : bdr), background: w.done ? "#22C55E" : white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{w.done ? <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Y</span> : null}</div><div style={{ flex: 1 }}>{editWo === w.id ? <div style={{ display: "flex", gap: 6 }}><input style={Object.assign({}, inp, { flex: 1, padding: "6px 10px", fontSize: 12 })} value={editText} onChange={function(e) { setEditText(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") saveEditWorkout(w.id); }} /><button onClick={function() { saveEditWorkout(w.id); }} style={{ background: "#22C55E", color: "#fff", border: "none", borderRadius: 6, padding: "6px 10px", fontSize: 11, cursor: "pointer" }}>Save</button></div> : <div><span style={{ fontSize: 13, color: w.done ? tL : tD, textDecoration: w.done ? "line-through" : "none" }}>{w.text}</span><span style={{ fontSize: 11, color: tL, marginLeft: 8 }}>{dn}</span></div>}</div>{editWo !== w.id ? <div style={{ display: "flex", gap: 4 }}>{isSwapTarget ? <button onClick={function() { swapWorkouts(swapFrom, w.id); }} style={{ background: "#8B5CF6", color: "#fff", border: "none", borderRadius: 6, padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>HERE</button> : <button onClick={function() { if (isSwapSrc) setSwapFrom(null); else setSwapFrom(w.id); }} style={{ background: "none", border: "1px solid " + (isSwapSrc ? "#8B5CF6" : bdr), color: isSwapSrc ? "#8B5CF6" : tL, borderRadius: 6, padding: "4px 8px", fontSize: 10, cursor: "pointer" }}>{isSwapSrc ? "Cancel" : "Swap"}</button>}<button onClick={function() { setEditWo(w.id); setEditText(w.text); }} style={{ background: "none", border: "none", color: accentL, cursor: "pointer", fontSize: 11 }}>Edit</button><button onClick={function() { setResultWo(w.id); setWoResult({ dist: "", time: "", feel: "good", notes: "" }); }} style={{ background: "none", border: "none", color: "#22C55E", cursor: "pointer", fontSize: 11 }}>{w.result ? "View" : "Log"}</button><button onClick={function() { deleteWorkout(w.id); }} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 11 }}>Del</button></div> : null}</div>; })}</div> : null}
        {/* Workout Result Logging */}
        {resultWo ? <div style={Object.assign({}, crd, { border: "2px solid #22C55E", background: "#F0FDF4" })}>
          <div style={secS}>LOG WORKOUT RESULT</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: tD, marginBottom: 10 }}>{(workouts.find(function(w) { return w.id === resultWo; }) || {}).text || ""}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div><div style={lblS}>Actual Distance</div><input style={inp} value={woResult.dist} onChange={function(e) { setWoResult(Object.assign({}, woResult, { dist: e.target.value })); }} placeholder="5.2 miles" /></div>
            <div><div style={lblS}>Actual Time</div><input style={inp} value={woResult.time} onChange={function(e) { setWoResult(Object.assign({}, woResult, { time: e.target.value })); }} placeholder="48:30" /></div>
          </div>
          <div style={lblS}>How Did It Feel?</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {[{v:"great",l:"Great",c:"#22C55E"},{v:"good",l:"Good",c:"#3B82F6"},{v:"tough",l:"Tough",c:"#F59E0B"},{v:"struggled",l:"Struggled",c:"#EF4444"}].map(function(f) {
              return <button key={f.v} onClick={function() { setWoResult(Object.assign({}, woResult, { feel: f.v })); }} style={{ background: woResult.feel === f.v ? f.c + "18" : white, border: "2px solid " + (woResult.feel === f.v ? f.c : bdr), borderRadius: 8, padding: "6px 14px", color: woResult.feel === f.v ? f.c : tL, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>{f.l}</button>;
            })}
          </div>
          <div style={lblS}>Notes (optional)</div>
          <input style={Object.assign({}, inp, { marginBottom: 10 })} value={woResult.notes} onChange={function(e) { setWoResult(Object.assign({}, woResult, { notes: e.target.value })); }} placeholder="Felt strong on hills, HR stayed in zone 2..." />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={function() { saveWorkoutResult(resultWo); }} style={Object.assign({}, btnS, { background: "#22C55E", fontSize: 12, padding: "10px 20px" })}>SAVE RESULT</button>
            <button onClick={function() { setResultWo(null); }} style={Object.assign({}, btnS, { background: tL, fontSize: 12, padding: "10px 20px" })}>CANCEL</button>
          </div>
        </div> : null}

        <div style={crd}><div style={secS}>ADD WORKOUT</div><div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 8, alignItems: "end" }}><div><div style={lblS}>Date</div><input style={inp} type="date" value={woDate} onChange={function(e) { setWoDate(e.target.value); }} /></div><div><div style={lblS}>Workout</div><input style={inp} value={woText} onChange={function(e) { setWoText(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") addWorkout(); }} placeholder="Swim 1500m, Run 5k easy..." /></div><button onClick={addWorkout} style={Object.assign({}, btnS, { padding: "11px 16px", fontSize: 12 })}>+</button></div></div>
        <div style={crd}><div style={secS}>UPLOAD OR PASTE</div><div style={{ display: "flex", gap: 10, marginBottom: 14 }}><button onClick={function() { if (fileRef.current) fileRef.current.click(); }} style={Object.assign({}, btnS, { padding: "10px 20px", fontSize: 12 })}>CHOOSE FILE</button><input ref={fileRef} type="file" accept=".txt,.csv,.md,.pdf,.doc,.docx,.rtf" onChange={handleFile} style={{ display: "none" }} /><span style={{ fontSize: 13, color: tL, alignSelf: "center" }}>{fn || ".txt .csv .md .pdf .doc .docx"}</span></div><textarea style={Object.assign({}, inp, { resize: "vertical", lineHeight: 1.6 })} rows={8} value={program} onChange={function(e) { setProgram(e.target.value); }} placeholder={"Week 1\nMon - Swim 1500m easy\nTue - Run 5k\nWed - Bike 30mi\nSun - Rest"} /><div style={{ marginTop: 10 }}><button style={btnS} onClick={handleProgramSave}>SAVE AND PARSE</button></div></div>
      </div>}

      {/* ═══ PLAN BUILDER (paid only) ═══ */}
      {tab === "builder" && isPaid() && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 6 }}>AI PLAN BUILDER</div>
        <div style={{ fontSize: 13, color: tM, marginBottom: 6 }}>Claude Opus with web search. Course-specific, realistic plans.</div>
        <div style={{ fontSize: 12, color: purple, fontWeight: 600, marginBottom: 16 }}>{"Plans: " + sub.plansBuilt + "/" + getTier().maxRaces + " used this year | " + plansRemaining() + " remaining"}</div>

        {!buildResult ? <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>{["Races", "About You", "Fitness", "Schedule", "Health", "Generate"].map(function(s, i) { return <div key={i} style={{ flex: 1, textAlign: "center" }}><div style={{ height: 4, borderRadius: 2, background: i <= buildStep ? accent : "#E2E4EB", marginBottom: 4 }} /><div style={{ fontSize: 9, color: i <= buildStep ? accent : tL }}>{s}</div></div>; })}</div>

          {buildStep === 0 && <div>
            <div style={crd}>
              <div style={secS}>ADD YOUR RACES</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <BF label="Sport" type="select" value={buildProfile.sport} set={function(v) { setBP("sport", v); setBrType(""); }} opts={SPORTS.map(function(s) { return { v: s.id, l: s.name }; })} />
                <BF label="Race Type" type="select" value={brType} set={setBrType} opts={[""].concat(buildSportTypes).map(function(r) { return { v: r, l: r || "Select..." }; })} />
                <BF label="Race Name" value={brName} set={setBrName} ph="Ironman Chattanooga" />
                <BF label="Date" type="date" value={brDate} set={setBrDate} />
                <BF label="Goal Time" value={brGoal} set={setBrGoal} ph="5:30:00" />
              </div>
              <div style={lblS}>HOW IMPORTANT IS THIS RACE?</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {[{v:"goal",label:"Goal Race",desc:"This is my main event. I want to peak here.",color:"#EF4444"},{v:"tuneup",label:"Tune-Up Race",desc:"Prep race to test fitness and get race experience.",color:"#F59E0B"},{v:"fun",label:"Just for Fun",desc:"No pressure. Treat it like a hard training day.",color:"#22C55E"}].map(function(opt) {
                  var sel = brPriority === opt.v;
                  return <div key={opt.v} onClick={function() { setBrPriority(opt.v); }} style={{ flex: "1 1 140px", padding: "12px 14px", borderRadius: 10, border: "2px solid " + (sel ? opt.color : bdr), background: sel ? opt.color + "12" : white, cursor: "pointer" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: sel ? opt.color : tD }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: tL, marginTop: 2, lineHeight: 1.4 }}>{opt.desc}</div>
                  </div>;
                })}
              </div>
              <div style={secS}>COURSE DETAILS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                <BF label="Terrain" type="select" value={brTerrain} set={setBrTerrain} opts={TERRAIN_OPTS} />
                <BF label="Elevation (ft)" value={brElevation} set={setBrElevation} ph="4500" />
                {buildSportInfo.disc.indexOf("swim") !== -1 ? <BF label="Swim Type" type="select" value={brSwimType} set={setBrSwimType} opts={SWIM_TYPE_OPTS} /> : <div />}
              </div>
              <BF label="Course Notes" type="textarea" value={brCourse} set={setBrCourse} ph="Point-to-point, windy bike, sharp turns..." span={2} />
              <button onClick={addBuildRace} style={Object.assign({}, btnS, { fontSize: 12, padding: "10px 20px" })}>+ ADD RACE</button>
            </div>
            {buildRaces.length > 0 ? <div style={crd}><div style={secS}>{"SEASON (" + buildRaces.length + " races)"}</div>{buildRaces.sort(function(a, b) { return a.date.localeCompare(b.date); }).map(function(r) { var dO = Math.ceil((new Date(r.date) - new Date()) / 86400000); return <div key={r.id} style={{ padding: "8px 0", borderBottom: "1px solid " + bdr, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><span style={{ background: priColors[r.priority] || "#999", color: "#fff", padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 700, marginRight: 6 }}>{priLabels[r.priority] || r.priority}</span><strong>{r.name}</strong><span style={{ color: tL, fontSize: 12, marginLeft: 6 }}>{r.type + " | " + r.date + " (" + dO + "d) | " + r.terrain}{r.elevation ? " " + r.elevation + "ft" : ""}</span></div><button onClick={function() { removeBuildRace(r.id); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer" }}>X</button></div>; })}</div> : null}
            <button onClick={function() { if (buildRaces.length === 0) flash("Add a race first."); else setBuildStep(1); }} style={btnS}>NEXT</button>
          </div>}
          {buildStep === 1 && <div style={crd}><div style={secS}>ABOUT YOU</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><BF label="Age" type="number" value={buildProfile.age} set={function(v) { setBP("age", v); }} ph="35" /><BF label="Gender" type="select" value={buildProfile.gender} set={function(v) { setBP("gender", v); }} opts={["Male","Female","Non-binary"]} /><BF label="Height" value={buildProfile.height} set={function(v) { setBP("height", v); }} ph="6'2" /><BF label="Weight" value={buildProfile.weight} set={function(v) { setBP("weight", v); }} ph="265" /><BF label="Body Type" type="select" value={buildProfile.bodyType} set={function(v) { setBP("bodyType", v); }} opts={BODY_TYPES} /><BF label="Experience" type="select" value={buildProfile.experience} set={function(v) { setBP("experience", v); }} opts={[{v:"beginner",l:"Beginner"},{v:"intermediate",l:"Intermediate"},{v:"advanced",l:"Advanced"},{v:"elite",l:"Elite"}]} /><BF label="Prior Races" value={buildProfile.priorRaces} set={function(v) { setBP("priorRaces", v); }} ph="4 Olympic tris" span={2} /></div><div style={{ display: "flex", gap: 8, marginTop: 14 }}><button onClick={function() { setBuildStep(0); }} style={Object.assign({}, btnS, { background: tL })}>BACK</button><button onClick={function() { setBuildStep(2); }} style={btnS}>NEXT</button></div></div>}
          {buildStep === 2 && <div style={crd}><div style={secS}>CURRENT FITNESS</div><div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>{buildSportInfo.disc.indexOf("swim") !== -1 ? <BF label="Swim" value={buildProfile.currentSwim} set={function(v) { setBP("currentSwim", v); }} ph="500m in 12:30" /> : null}{buildSportInfo.disc.indexOf("bike") !== -1 ? <BF label="Bike" value={buildProfile.currentBike} set={function(v) { setBP("currentBike", v); }} ph="Avg 15mph, 20mi rides" /> : null}{buildSportInfo.disc.indexOf("run") !== -1 ? <BF label="Run" value={buildProfile.currentRun} set={function(v) { setBP("currentRun", v); }} ph="5k in 28:00" /> : null}</div><div style={{ display: "flex", gap: 8, marginTop: 14 }}><button onClick={function() { setBuildStep(1); }} style={Object.assign({}, btnS, { background: tL })}>BACK</button><button onClick={function() { setBuildStep(3); }} style={btnS}>NEXT</button></div></div>}
          {buildStep === 3 && <div style={crd}><div style={secS}>SCHEDULE</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><BF label="Hours/Week" value={buildProfile.weeklyHours} set={function(v) { setBP("weeklyHours", v); }} ph="8-10" /><BF label="Time of Day" type="select" value={buildProfile.morningEvening} set={function(v) { setBP("morningEvening", v); }} opts={["Morning","Evening","Mixed"]} /><BF label="Work Schedule" type="textarea" value={buildProfile.workSchedule} set={function(v) { setBP("workSchedule", v); }} ph="4pm-12am shifts, 60hr weeks..." span={2} rows={3} /></div><div style={{ display: "flex", gap: 8, marginTop: 14 }}><button onClick={function() { setBuildStep(2); }} style={Object.assign({}, btnS, { background: tL })}>BACK</button><button onClick={function() { setBuildStep(4); }} style={btnS}>NEXT</button></div></div>}
          {buildStep === 4 && <div style={crd}><div style={secS}>HEALTH AND GOALS</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><BF label="Sleep (hrs)" value={buildProfile.sleepHours} set={function(v) { setBP("sleepHours", v); }} ph="6.5" /><BF label="Diet" type="select" value={buildProfile.dietType} set={function(v) { setBP("dietType", v); }} opts={["Balanced","High protein","Keto","Vegetarian","Vegan"]} /><BF label="Injuries" type="textarea" value={buildProfile.injuries} set={function(v) { setBP("injuries", v); }} ph="Old knee injury..." span={2} /><BF label="Strength Training" type="select" value={buildProfile.strengthTraining} set={function(v) { setBP("strengthTraining", v); }} opts={["No","1x/week","2x/week","3+/week"]} /><BF label="Goal" type="select" value={buildProfile.primaryGoal} set={function(v) { setBP("primaryGoal", v); }} opts={[{v:"finish",l:"Just Finish"},{v:"time",l:"Hit Time Goal"},{v:"compete",l:"Compete"},{v:"improve",l:"Improve"}]} /></div><div style={{ display: "flex", gap: 8, marginTop: 14 }}><button onClick={function() { setBuildStep(3); }} style={Object.assign({}, btnS, { background: tL })}>BACK</button><button onClick={function() { setBuildStep(5); }} style={btnS}>REVIEW</button></div></div>}
          {buildStep === 5 && <div>
            <div style={Object.assign({}, crd, { background: "#F8F5FF", border: "1px solid #E0D4FF" })}>
              <div style={{ fontFamily: hf, fontSize: 16, color: purple, letterSpacing: 2, marginBottom: 8 }}>SUMMARY</div>
              <div style={{ fontSize: 12, color: tM, lineHeight: 1.8 }}><strong>{buildSportInfo.name}</strong> | {buildRaces.length + " race(s)"} | {buildProfile.experience} | {buildProfile.bodyType} build | {buildProfile.weeklyHours + " hrs/wk"} | Goal: {buildProfile.primaryGoal}</div>
              {buildRaces.sort(function(a, b) { return a.date.localeCompare(b.date); }).map(function(r, i) { return <div key={i} style={{ fontSize: 11, color: tL, marginTop: 4 }}><span style={{ background: priColors[r.priority] || "#999", color: "#fff", padding: "1px 6px", borderRadius: 3, fontSize: 9, marginRight: 4 }}>{priLabels[r.priority] || r.priority}</span>{r.name + " " + r.type + " " + r.date + " " + r.terrain}{r.elevation ? " " + r.elevation + "ft" : ""}</div>; })}
            </div>
            <div style={Object.assign({}, crd, { textAlign: "center" })}>
              {!canBuildPlan() ? <div style={{ color: "#EF4444", fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{"Plan limit reached (" + sub.plansBuilt + "/" + getTier().maxRaces + "). " + (sub.tier === "basic" ? "Upgrade to Pro for 15 plans/year." : "Resets yearly.")}</div> : null}
              {buildBusy ? <div><div style={{ fontFamily: hf, fontSize: 20, color: accent, marginBottom: 8 }}>BUILDING YOUR PLAN...</div><div style={{ fontSize: 12, color: tL }}>Claude Opus is researching your races. 30-60 seconds.</div></div> : canBuildPlan() ? <button onClick={generatePlan} style={Object.assign({}, btnS, { background: purple, padding: "14px 40px", fontSize: 16 })}>GENERATE PLAN</button> : sub.tier === "basic" ? <button onClick={function() { subscribe("pro"); }} style={Object.assign({}, btnS, { background: purple })}>UPGRADE TO PRO</button> : null}
            </div>
            <button onClick={function() { setBuildStep(4); }} style={Object.assign({}, btnS, { background: tL, marginTop: 8 })}>BACK</button>
          </div>}
        </div> : <div>
          <div style={crd}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}><div style={secS}>YOUR PLAN</div><div style={{ display: "flex", gap: 6 }}><button onClick={loadBuiltPlan} style={Object.assign({}, btnS, { background: "#22C55E", padding: "8px 16px", fontSize: 12 })}>LOAD INTO PROGRAM</button><button onClick={function() { setBuildResult(""); setBuildStep(0); setBuildRaces([]); }} style={Object.assign({}, btnS, { background: tL, padding: "8px 16px", fontSize: 12 })}>NEW</button></div></div><div style={{ fontSize: 13, lineHeight: 1.8, color: tM, whiteSpace: "pre-wrap", maxHeight: 500, overflowY: "auto" }}>{buildResult}</div></div>
        </div>}
      </div>}

      {/* ═══ NUTRITION ═══ */}
      {tab === "nutrition" && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 14 }}>NUTRITION</div>
        <div style={crd}><div style={secS}>QUICK ADD</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>{CATS.map(function(cat) { var isOpen = openCat === cat; var items = FOODS.filter(function(f) { return f.cat === cat; }); return <div key={cat} style={{ position: "relative" }}><button onClick={function() { setOpenCat(isOpen ? "" : cat); }} style={{ width: "100%", background: isOpen ? accent : white, color: isOpen ? "#fff" : tD, border: "1px solid " + (isOpen ? accent : bdr), borderRadius: 8, padding: "10px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: ff, textAlign: "left", display: "flex", justifyContent: "space-between" }}><span>{cat}</span><span style={{ fontSize: 10, color: isOpen ? "#fff" : tL }}>{isOpen ? "X" : items.length}</span></button>{isOpen ? <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: white, border: "1px solid " + bdr, borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: 250, overflowY: "auto" }}>{items.map(function(item, ii) { return <div key={ii} onClick={function() { quickAdd(item); }} style={{ padding: "10px 14px", borderBottom: "1px solid " + bdr, cursor: "pointer", fontSize: 12 }}><div style={{ fontWeight: 600 }}>{item.name} <span style={{ fontWeight: 400, color: tL }}>{item.serv}</span></div><div style={{ color: tL, fontSize: 11 }}>{item.cal + "cal P:" + item.pro + " C:" + item.carb + " F:" + item.fat}</div></div>; })}</div> : null}</div>; })}</div></div>
        <div style={crd}><div style={secS}>LOG FOOD</div><div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, marginBottom: 8 }}><div><div style={lblS}>Food</div><input style={inp} value={fName} onChange={function(e) { setFName(e.target.value); }} /></div><div><div style={lblS}>Meal</div><select style={inp} value={fMeal} onChange={function(e) { setFMeal(e.target.value); }}><option value="breakfast">Breakfast</option><option value="lunch">Lunch</option><option value="dinner">Dinner</option><option value="snack">Snack</option><option value="pre-workout">Pre-WO</option><option value="post-workout">Post-WO</option></select></div></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}><div><div style={lblS}>Cal</div><input style={inp} type="number" value={fCal} onChange={function(e) { setFCal(e.target.value); }} /></div><div><div style={lblS}>Protein</div><input style={inp} type="number" value={fPro} onChange={function(e) { setFPro(e.target.value); }} /></div><div><div style={lblS}>Carbs</div><input style={inp} type="number" value={fCarb} onChange={function(e) { setFCarb(e.target.value); }} /></div><div><div style={lblS}>Fat</div><input style={inp} type="number" value={fFat} onChange={function(e) { setFFat(e.target.value); }} /></div></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}><div><div style={lblS}>Fiber</div><input style={inp} type="number" value={fFib} onChange={function(e) { setFFib(e.target.value); }} /></div><div><div style={lblS}>Sugar</div><input style={inp} type="number" value={fSug} onChange={function(e) { setFSug(e.target.value); }} /></div><div><div style={lblS}>Date</div><input style={inp} type="date" value={fDate} onChange={function(e) { setFDate(e.target.value); }} /></div></div><button style={btnS} onClick={addFood}>LOG FOOD</button></div>
        <div style={crd}><div style={secS}>TODAY VS TARGETS</div><PBar label="Calories" cur={todayT.cal} tgt={targets.cal} unit="cal" color={accentL} /><PBar label="Protein" cur={todayT.pro} tgt={targets.pro} unit="g" color="#8B5CF6" /><PBar label="Carbs" cur={todayT.carb} tgt={targets.carb} unit="g" color="#F59E0B" /><PBar label="Fat" cur={todayT.fat} tgt={targets.fat} unit="g" color="#EF4444" /></div>

        {/* Weight Tracking */}
        <div style={crd}>
          <div style={secS}>WEIGHT TRACKING</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "end", marginBottom: 12 }}>
            <div><div style={lblS}>Date</div><input style={inp} type="date" value={wlDate} onChange={function(e) { setWlDate(e.target.value); }} /></div>
            <div><div style={lblS}>Weight (lbs)</div><input style={inp} type="number" step="0.1" value={wlWeight} onChange={function(e) { setWlWeight(e.target.value); }} placeholder="262.5" /></div>
            <button onClick={addWeight} style={Object.assign({}, btnS, { padding: "11px 16px", fontSize: 12 })}>LOG</button>
          </div>
          {weightLog.length > 1 ? <div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80, marginBottom: 6 }}>
              {weightLog.slice(-21).map(function(e, i) {
                var min = Math.min.apply(null, weightLog.slice(-21).map(function(x) { return x.weight; })); var max = Math.max.apply(null, weightLog.slice(-21).map(function(x) { return x.weight; })); var range = max - min || 1;
                var pct = ((e.weight - min) / range) * 80 + 10;
                return <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ fontSize: 7, color: tL }}>{e.weight}</div>
                  <div style={{ width: "100%", height: pct + "%", background: accentL, borderRadius: "4px 4px 0 0", minHeight: 4 }} />
                </div>;
              })}
            </div>
            {profile.goalWeight ? <div style={{ fontSize: 11, color: accentL }}>{"Goal: " + profile.goalWeight + " lbs | Current: " + weightLog[weightLog.length - 1].weight + " lbs | " + Math.abs(weightLog[weightLog.length - 1].weight - parseFloat(profile.goalWeight)).toFixed(1) + " lbs to go"}</div> : null}
          </div> : null}
          {weightLog.length > 0 ? <div style={{ marginTop: 8 }}>{weightLog.slice().reverse().slice(0, 7).map(function(e, i) { return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid " + bdr, fontSize: 12 }}><span>{e.date}</span><strong>{e.weight + " lbs"}</strong></div>; })}</div> : null}
        </div>

        {/* Hydration */}
        <div style={crd}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={secS}>HYDRATION</div>
            <div style={{ fontFamily: hf, fontSize: 24, color: getTodayHydration() >= 96 ? "#22C55E" : getTodayHydration() >= 64 ? "#F59E0B" : tL }}>{getTodayHydration() + " oz"}</div>
          </div>
          <div style={{ height: 8, background: "#EEF0F4", borderRadius: 4, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", width: Math.min((getTodayHydration() / 128) * 100, 100) + "%", background: getTodayHydration() >= 96 ? "#22C55E" : getTodayHydration() >= 64 ? "#3B82F6" : "#F59E0B", borderRadius: 4 }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {[8, 12, 16, 20, 24, 32].map(function(oz) {
              return <button key={oz} onClick={function() { setHydOz(String(oz)); var existing = hydrationLog.find(function(e) { return e.date === hydDate; }); var up; if (existing) { up = hydrationLog.map(function(e) { return e.date === hydDate ? Object.assign({}, e, { oz: e.oz + oz }) : e; }); } else { up = hydrationLog.concat([{ date: hydDate, oz: oz }]); } setHydrationLog(up); doSave(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, up); flash("+" + oz + " oz"); }} style={{ background: white, border: "1px solid " + bdr, borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>{"+" + oz + " oz"}</button>;
            })}
          </div>
          <div style={{ fontSize: 11, color: tL }}>Target: 96-128 oz/day for endurance athletes. Tap buttons to quick-add.</div>
        </div>
        <div style={crd}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><div style={secS}>FOOD LOG</div><input style={Object.assign({}, inp, { maxWidth: 150, padding: "6px 10px", fontSize: 12 })} type="date" value={nutDay} onChange={function(e) { setNutDay(e.target.value); }} /></div>{foodLog.filter(function(f) { return f.date === nutDay; }).length === 0 ? <div style={{ color: tL, fontSize: 13 }}>No food logged.</div> : null}{["breakfast","lunch","dinner","snack","pre-workout","post-workout"].map(function(meal) { var items = foodLog.filter(function(f) { return f.date === nutDay && f.meal === meal; }); if (items.length === 0) return null; return <div key={meal}><div style={{ fontSize: 11, fontWeight: 600, color: accent, textTransform: "uppercase", marginTop: 8, marginBottom: 4 }}>{meal}</div>{items.map(function(f, fi) { return <div key={fi} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid " + bdr, fontSize: 12 }}><span><strong>{f.name}</strong> <span style={{ color: tL }}>{f.cal + "cal P:" + f.protein + " C:" + f.carbs}</span></span><button onClick={function() { removeFood(f.id); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer" }}>X</button></div>; })}</div>; })}{(function() { var dt = getDayTotals(nutDay); return dt.cal > 0 ? <div style={{ marginTop: 10, padding: "10px", background: "#F0F4FF", borderRadius: 8, fontSize: 12, color: tM }}><strong>{"Total: " + dt.cal + " cal"}</strong>{" | P:" + dt.pro + "g C:" + dt.carb + "g F:" + dt.fat + "g"}</div> : null; })()}</div>
      </div>}

      {/* ═══ SLEEP ═══ */}
      {tab === "sleep" && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 14 }}>SLEEP</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}><div><div style={lblS}>Date</div><input style={inp} type="date" value={sd} onChange={function(e) { setSd(e.target.value); }} /></div><div><div style={lblS}>Hours</div><input style={inp} type="number" step="0.5" value={sh} onChange={function(e) { setSh(e.target.value); }} placeholder="7.5" /></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}><div><div style={lblS}>Quality</div><div style={{ display: "flex", gap: 4 }}>{["great","good","fair","poor"].map(function(q) { return <button key={q} onClick={function() { setSq(q); }} style={{ background: sq === q ? qc[q] + "18" : white, border: "2px solid " + (sq === q ? qc[q] : bdr), borderRadius: 8, padding: "5px 10px", color: sq === q ? qc[q] : tL, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: ff }}>{q}</button>; })}</div></div><div><div style={lblS}>Note</div><input style={inp} value={snn} onChange={function(e) { setSnn(e.target.value); }} placeholder="late shift..." /></div></div>
        <button style={btnS} onClick={addSleep}>LOG SLEEP</button>
        {avg7 ? <div style={Object.assign({}, crd, { marginTop: 14 })}><div style={{ fontFamily: hf, fontSize: 30, color: Number(avg7) >= 7 ? "#22C55E" : Number(avg7) >= 6 ? "#F59E0B" : "#EF4444" }}>{avg7 + " hrs avg"}</div></div> : null}
        {sleepLog.length > 0 ? <div style={{ marginTop: 10 }}>{sleepLog.slice().reverse().slice(0, 10).map(function(e, i) { return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid " + bdr, fontSize: 12 }}><span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: qc[e.quality] || "#999", marginRight: 8 }} /><strong>{e.hours + "h"}</strong> <span style={{ color: tL }}>{e.date}{e.note ? " - " + e.note : ""}</span></span><button onClick={function() { var u = sleepLog.filter(function(x) { return x.date !== e.date; }); setSleepLog(u); doSave(undefined, undefined, undefined, u); }} style={{ background: "none", border: "none", color: tL, cursor: "pointer" }}>X</button></div>; })}</div> : null}
      </div>}

      {/* ═══ COACH (paid only) ═══ */}
      {tab === "coach" && isPaid() && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 6 }}>AI COACH</div>
        <div style={{ fontSize: 11, color: tL, marginBottom: 12 }}>Unlimited chat. Plan modifications count against your limit.</div>

        {/* Plan Modification Section */}
        {program ? <div style={Object.assign({}, crd, { border: "1px solid " + purple })}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={Object.assign({}, secS, { color: purple })}>MODIFY YOUR PLAN</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: canModifyPlan() ? purple : "#EF4444" }}>{modsRemaining() + "/" + getTier().maxMods + " remaining"}</div>
          </div>
          <div style={{ fontSize: 12, color: tM, marginBottom: 8 }}>Describe what you want to change. The coach will rewrite the affected weeks and update your program.</div>
          <input style={Object.assign({}, inp, { marginBottom: 8 })} value={modRequest} onChange={function(e) { setModRequest(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") requestPlanMod(); }} placeholder="Move long run to Saturday, add more hill work in weeks 8-12, reduce swim volume..." />
          <button onClick={requestPlanMod} disabled={!canModifyPlan() || chatBusy} style={Object.assign({}, btnS, { background: canModifyPlan() ? purple : "#ccc", fontSize: 12, padding: "10px 20px" })}>{canModifyPlan() ? "MODIFY PLAN" : "LIMIT REACHED"}</button>
          {!canModifyPlan() && sub.tier === "basic" ? <div style={{ fontSize: 11, color: "#EA580C", marginTop: 6 }}>Upgrade to Pro for 10 modifications/year.</div> : null}
        </div> : null}

        {/* Regular Chat */}
        {msgs.length === 0 ? <div style={{ marginBottom: 14 }}><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["Analyze my fitness", "Nutrition advice", "Race strategy", "Recovery tips", "Taper guidance"].map(function(q, i) { return <button key={i} onClick={function() { sendChat(q); }} style={{ background: white, border: "1px solid " + bdr, borderRadius: 10, padding: "8px 12px", color: tM, fontSize: 12, cursor: "pointer", fontFamily: ff }}>{q}</button>; })}</div></div> : null}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12, maxHeight: 380, overflowY: "auto" }}>{msgs.map(function(m, i) { var isU = m.role === "user"; var isMod = isU && m.content.indexOf("PLAN MODIFICATION:") === 0; return <div key={i} style={{ background: isU ? (isMod ? purple : accent) : white, border: isU ? "none" : "1px solid " + bdr, borderRadius: 14, padding: "10px 14px", alignSelf: isU ? "flex-end" : "flex-start", maxWidth: "85%" }}><div style={{ fontFamily: hf, fontSize: 10, letterSpacing: 2, color: isU ? "rgba(255,255,255,0.7)" : accent, marginBottom: 4 }}>{isU ? (isMod ? "PLAN MOD" : "YOU") : "COACH"}</div><div style={{ fontSize: 13, lineHeight: 1.7, color: isU ? "#fff" : tM, whiteSpace: "pre-wrap" }}>{m.content.replace("PLAN MODIFICATION: ", "")}</div></div>; })}{chatBusy ? <div style={{ background: white, border: "1px solid " + bdr, borderRadius: 14, padding: "10px 14px" }}><div style={{ fontSize: 13, color: tL }}>Thinking...</div></div> : null}<div ref={chatEndRef} /></div>
        <div style={{ display: "flex", gap: 8 }}><input style={Object.assign({}, inp, { flex: 1 })} value={chatIn} onChange={function(e) { setChatIn(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") sendChat(chatIn); }} placeholder="Ask your coach (free, unlimited)..." /><button onClick={function() { sendChat(chatIn); }} disabled={chatBusy} style={{ background: accent, border: "none", borderRadius: 10, padding: "11px 18px", color: "#fff", fontSize: 15, cursor: "pointer", fontWeight: 700 }}>Go</button></div>
      </div>}

      {/* ═══ REVIEWS ═══ */}
      {tab === "reviews" && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 14 }}>REVIEWS</div>

        {/* Write Review */}
        <div style={crd}>
          <div style={secS}>LEAVE A REVIEW</div>
          <div style={lblS}>Rating</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map(function(s) { return <button key={s} onClick={function() { setReviewStars(s); }} style={{ width: 36, height: 36, borderRadius: 8, border: "2px solid " + (reviewStars >= s ? "#F59E0B" : bdr), background: reviewStars >= s ? "#F59E0B" : white, color: reviewStars >= s ? "#fff" : tL, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{s}</button>; })}
          </div>
          <div style={lblS}>Your Review</div>
          <textarea style={Object.assign({}, inp, { resize: "vertical", lineHeight: 1.6, marginBottom: 12 })} rows={3} value={reviewText} onChange={function(e) { setReviewText(e.target.value); }} placeholder="How has TriForge helped your training? What do you love about it?" />
          <button onClick={submitReview} style={Object.assign({}, btnS, { background: "#F59E0B" })}>POST REVIEW</button>
        </div>

        {/* All Reviews */}
        {reviews.length > 0 ? <div>
          <div style={Object.assign({}, secS, { marginTop: 16 })}>{"ALL REVIEWS (" + reviews.length + ")"}</div>
          {reviews.slice().reverse().map(function(r) {
            return <div key={r.id} style={crd}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", gap: 3 }}>{[1, 2, 3, 4, 5].map(function(s) { return <span key={s} style={{ color: s <= r.stars ? "#F59E0B" : "#E2E4EB", fontSize: 16 }}>*</span>; })}</div>
                <span style={{ fontSize: 11, color: tL }}>{r.date}</span>
              </div>
              <div style={{ fontSize: 13, color: tM, lineHeight: 1.6, marginBottom: 4 }}>{r.text}</div>
              <div style={{ fontSize: 11, color: tL }}>{"- " + r.user}</div>
            </div>;
          })}
        </div> : <div style={{ color: tL, fontSize: 13, marginTop: 16 }}>No reviews yet. Be the first!</div>}
      </div>}

      {/* ═══ SUPPORT ═══ */}
      {tab === "support" && <div>
        <div style={{ fontFamily: hf, fontSize: 30, color: accent, letterSpacing: 4, marginBottom: 14 }}>HELP AND SUPPORT</div>

        {/* FAQ */}
        <div style={crd}>
          <div style={secS}>COMMON QUESTIONS</div>
          {[
            { q: "How do I build a training plan?", a: "Go to Build Plan tab, add your races with course details, fill in your profile, and click Generate. Claude Opus builds a complete week-by-week plan." },
            { q: "What counts as a plan modification?", a: "When the AI Coach rewrites actual training weeks in your program. Regular chat questions are free and unlimited." },
            { q: "How do daily text messages work?", a: "Enable in Profile. You get one text per day with your scheduled workout and a motivational message. Texts sync with any workout swaps you make." },
            { q: "How do I earn a free month?", a: "Complete 4 races in a calendar year while subscribed. Mark races complete in your Profile under Race Reward Program. Choose a free month of your current plan or upgrade at the cost difference." },
            { q: "How do I connect my Garmin or Strava?", a: "Go to Profile, scroll to Connected Apps, and click Connect. Your completed workouts will auto-import." },
            { q: "Can I cancel my subscription?", a: "Yes, any time from Profile. Your data stays saved. You revert to Free Trial access." }
          ].map(function(faq, i) {
            return <div key={i} style={{ padding: "12px 0", borderBottom: i < 5 ? "1px solid " + bdr : "none" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: tD, marginBottom: 4 }}>{faq.q}</div>
              <div style={{ fontSize: 12, color: tM, lineHeight: 1.6 }}>{faq.a}</div>
            </div>;
          })}
        </div>

        {/* Submit Ticket */}
        <div style={crd}>
          <div style={secS}>CONTACT SUPPORT</div>
          <div style={{ fontSize: 12, color: tM, marginBottom: 12 }}>Having a technical issue or need help? Send us a message and we will get back to you as soon as possible.</div>
          <div style={lblS}>Subject</div>
          <select style={Object.assign({}, inp, { marginBottom: 10 })} value={supportSubject} onChange={function(e) { setSupportSubject(e.target.value); }}>
            <option value="">Select an issue...</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Account Issue">Account Issue</option>
            <option value="Billing Question">Billing Question</option>
            <option value="Plan Builder Issue">Plan Builder Not Working</option>
            <option value="AI Coach Issue">AI Coach Issue</option>
            <option value="Text Message Issue">Daily Texts Not Arriving</option>
            <option value="Garmin/Strava Issue">Garmin/Strava Connection Issue</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Other">Other</option>
          </select>
          <div style={lblS}>Describe Your Issue</div>
          <textarea style={Object.assign({}, inp, { resize: "vertical", lineHeight: 1.6, marginBottom: 12 })} rows={4} value={supportMsg} onChange={function(e) { setSupportMsg(e.target.value); }} placeholder="Tell us what happened, what you expected, and any steps to reproduce the issue..." />
          <button onClick={submitSupport} style={Object.assign({}, btnS, { background: "#EF4444" })}>SEND TO SUPPORT</button>
          <div style={{ fontSize: 11, color: tL, marginTop: 8 }}>This opens your email client addressed to our support team. You can also email us directly at jordanwiseman33@gmail.com</div>
        </div>
      </div>}

    </main>
    {toast ? <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#22C55E", color: "#fff", padding: "10px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, zIndex: 999, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>{toast}</div> : null}
  </div>;
}
