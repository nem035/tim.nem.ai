import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_KEY ?? '')

const linksAndTexts = [
  [
    "#1: Kevin Rose",
    "https://tim.blog/wp-content/uploads/2018/07/01-kevin-rose.pdf",
  ],
  [
    "#2: Joshua Waitzkin",
    "https://tim.blog/wp-content/uploads/2018/07/02-josh-waitzkin.pdf",
  ],
  [
    "#3: Kelly Starrett and Dr. Justin Mager",
    "https://tim.blog/wp-content/uploads/2018/07/03-kelly-starrett-and-justin-megar.pdf",
  ],
  [
    "#4: Ryan Holiday",
    "https://tim.blog/wp-content/uploads/2018/07/04-ryan-holiday.pdf",
  ],
  [
    "#5: Jason Silva",
    "https://tim.blog/wp-content/uploads/2018/07/05-jason-silva.pdf",
  ],
  [
    "#6: 6 Formulas for More Output and Less Overwhelm",
    "https://tim.blog/wp-content/uploads/2018/07/06-tim-ferriss-6-formulas-for-more-output-and-less-overwhelm.pdf",
  ],
  [
    "#7: Stephen Dubner, co-author of Freakonomics",
    "https://tim.blog/wp-content/uploads/2018/09/07-stephen-dubner.pdf",
  ],
  [
    "#8: Chase Jarvis, Master Photographer",
    "https://tim.blog/wp-content/uploads/2018/07/08-chase-jarvis.pdf",
  ],
  [
    "#9: The 9 Habits to Stop Now — The Not-To-Do List",
    "https://tim.blog/wp-content/uploads/2018/07/09-tim-ferriss-the-9-habits-to-stop-now.pdf",
  ],
  [
    "#10: Brian Koppelman, co-writer/producer of Rounders, Ocean’s Thirteen, The Illusionist, etc.",
    "https://tim.blog/wp-content/uploads/2018/07/10-brian-koppelman.pdf",
  ],
  [
    "#11: Drugs and the Meaning of Life",
    "https://tim.blog/wp-content/uploads/2018/07/11-tim-ferriss-drugs-and-the-meaning-of-life.pdf",
  ],
  [
    "#12: Dr. Rhonda Patrick on Life Extension, Performance, and More",
    "https://tim.blog/wp-content/uploads/2018/09/12-rhonda-patrick.pdf",
  ],
  [
    "#13: “Productivity” Tricks for the Neurotic, Manic-Depressive, and Crazy (Like Me)",
    "https://tim.blog/wp-content/uploads/2018/07/13-tim-ferriss-productivity-tricks-for-the-neurotic.pdf",
  ],
  [
    "#14: Sam Harris, PhD — Spirituality, Neuroscience, Meditation, and More",
    "https://tim.blog/wp-content/uploads/2018/07/14-sam-harris.pdf",
  ],
  [
    "#15: Neil Strauss — Author of The Game and 7 New York Times Bestsellers",
    "https://tim.blog/wp-content/uploads/2018/07/15-neil-strauss.pdf",
  ],
  [
    "#16: Joe De Sena on Grit, Endurance, and Building Empires",
    "https://tim.blog/wp-content/uploads/2018/07/16-joe-de-sena.pdf",
  ],
  [
    "#17: The Power of Negative Visualization (<10 Minutes)",
    "https://tim.blog/wp-content/uploads/2018/09/17-tim-ferriss-the-power-of-negative-visualization.pdf",
  ],
  [
    "#18: James Altucher on Saying No, Failing Better, Business Building, and More",
    "https://tim.blog/wp-content/uploads/2018/07/18-james-altucher.pdf",
  ],
  [
    "#19: The Top 5 Reasons to Be a Jack of All Trades",
    "https://tim.blog/wp-content/uploads/2018/07/19-tim-ferriss-the-top-5-reasons-to-be-a-jack-of-all-trades.pdf",
  ],
  [
    "#20: Dan Carlin — Hardcore History, Building Podcasts, Creativity, and More",
    "https://tim.blog/wp-content/uploads/2018/07/20-dan-carlin.pdf",
  ],
  [
    "#21: Mike Shinoda of Linkin Park — On Music, Creativity, Selling 60+ Million Albums",
    "https://tim.blog/wp-content/uploads/2018/07/21-mike-shinoda.pdf",
  ],
  [
    "#22: Ed Catmull, President of Pixar, on Steve Jobs, Stories, and Lessons Learned",
    "https://tim.blog/wp-content/uploads/2018/07/22-ed-catmull.pdf",
  ],
  [
    "#23: Do “Homeopathic” Remedies or Medicine Work?",
    "https://tim.blog/wp-content/uploads/2018/07/23-tim-ferriss-do-22homeopathic22-remedies-or-medicine-work.pdf",
  ],
  [
    "#24: Kevin Rose — Gut Bacteria, Meditation, Startups, and More",
    "https://tim.blog/wp-content/uploads/2018/07/24-random-show.pdf",
  ],
  [
    "#25: Kevin Kelly — WIRED Co-Founder, Polymath, Most Interesting Man In The World",
    "https://tim.blog/wp-content/uploads/2018/07/25-26-27-kevin-kelly.pdf",
  ],
  [
    "#26: Kevin Kelly (Part 2) — WIRED Co-Founder, Polymath, Most Interesting Man In The World",
    "https://tim.blog/wp-content/uploads/2018/07/25-26-27-kevin-kelly.pdf",
  ],
  [
    "#27: Kevin Kelly (Part 3) – WIRED Co-Founder, Polymath, Most Interesting Man In The World",
    "https://tim.blog/wp-content/uploads/2018/07/25-26-27-kevin-kelly.pdf",
  ],
  [
    "#28: Peter Thiel, Billionaire Investor and Company Creator on Investing, Business, and Life",
    "https://tim.blog/wp-content/uploads/2018/07/28-peter-thiel.pdf",
  ],
  [
    "#29: What I Learned Losing a Million Dollars, with Author Brendan Moynihan",
    "https://tim.blog/wp-content/uploads/2018/07/29-brendan-moynihan.pdf",
  ],
  [
    "#30: Tracy DiNunzio, Founder of Tradesy, on High-Velocity Growth and Tactics",
    "https://tim.blog/wp-content/uploads/2018/07/30-31-32-tracy-dinunzio.pdf",
  ],
  [
    "#31: Tracy DiNunzio (Part 2), Founder of Tradesy, on Rapid Growth and Rapid Learning",
    "https://tim.blog/wp-content/uploads/2018/07/30-31-32-tracy-dinunzio.pdf",
  ],
  [
    "#32: Tracy DiNunzio (Part 3), Founder of Tradesy, on Rapid Growth and Rapid Learning",
    "https://tim.blog/wp-content/uploads/2018/07/30-31-32-tracy-dinunzio.pdf",
  ],
  [
    "#33: Ramit Sethi on Persuasion, Negotiation, and Turning a Blog Into a Multi-Million-Dollar Business",
    "https://tim.blog/wp-content/uploads/2018/09/33-ramit-sethi.pdf",
  ],
  [
    "#34: Ramit Sethi (Part 2) on Persuasion, Negotiation, and Turning a Blog Into a Multi-Million-Dollar Business",
    "https://tim.blog/wp-content/uploads/2018/09/34-ramit-sethi.pdf",
  ],
  [
    "#35: Tony Robbins and Peter Diamandis (XPRIZE) on the Magic of Thinking BIG",
    "https://tim.blog/wp-content/uploads/2018/07/35-tony-robbins-and-peter-diamandis.pdf",
  ],
  [
    "#36: Alexis Ohanian on Y Combinator, Getting Punched, and Picking Winners",
    "https://tim.blog/wp-content/uploads/2018/07/36-alexis-ohanian.pdf",
  ],
  [
    "#37: Tony Robbins on Morning Routines, Peak Performance, and Mastering Money",
    "https://tim.blog/wp-content/uploads/2018/07/37-tony-robbins-part-1.pdf",
  ],
  [
    "#38: Tony Robbins (Part 2) on Morning Routines, Peak Performance, and Mastering Money",
    "https://tim.blog/wp-content/uploads/2018/07/38-tony-robbins-part-2.pdf",
  ],
  [
    "#39: Maria Popova on Writing, Work Arounds, and Building BrainPickings.org",
    "https://tim.blog/wp-content/uploads/2018/07/39-maria-popova.pdf",
  ],
  [
    "#40: Andrew Zimmern on Simple Cooking Tricks, Developing TV, and Addiction",
    "https://tim.blog/wp-content/uploads/2018/07/40-andrew-zimmern.pdf",
  ],
  [
    "#41: Rolf Potts on Travel Tactics, Creating Time Wealth, and Lateral Thinking",
    "https://tim.blog/wp-content/uploads/2018/07/41-rolf-potts-part-1.pdf",
  ],
  [
    "#42: Rolf Potts (Part 2) on Travel Tactics, Creating Time Wealth, and Lateral Thinking",
    "https://tim.blog/wp-content/uploads/2018/07/42-rolf-potts-part-2.pdf",
  ],
  [
    "#43: Margaret Cho on Comedy, Bisexuality, and The Slow-Carb Diet",
    "https://tim.blog/wp-content/uploads/2018/07/43-margaret-cho.pdf",
  ],
  [
    "#44: How to Avoid Decision Fatigue (<20 Min)",
    "https://tim.blog/wp-content/uploads/2018/07/44-tim-ferriss-how-to-avoid-decision-fatigue.pdf",
  ],
  [
    "#45: Nick Ganju on The Majesty of Ping Pong, Poker, and How to Write Hit Songs",
    "https://tim.blog/wp-content/uploads/2018/07/45-nick-ganju.pdf",
  ],
  [
    "#46: Hating Tech, Hidden Japanese Gems, Sexual Awkwardness, and More",
    "https://tim.blog/wp-content/uploads/2018/07/46-random-show.pdf",
  ],
  [
    "#47: Bryan Callen on Eating Corgis (Yes, The Dogs) and Improving Creativity",
    "https://tim.blog/wp-content/uploads/2018/07/47-bryan-callen.pdf",
  ],
  [
    "#48: Marc Goodman, FBI Futurist, on High-Tech Crime and How to Protect Yourself",
    "https://tim.blog/wp-content/uploads/2018/07/48-marc-goodman.pdf",
  ],
  [
    "#49: Tim Answers Your 10 Most Popular Questions",
    "https://tim.blog/wp-content/uploads/2018/07/49-tim-ferriss-tim-answers-your-10-most-popular-questions.pdf",
  ],
  [
    "#50: Dr. Peter Attia on Ultra-Endurance, Drinking Jet Fuel, Human Foie Gras, and More",
    "https://tim.blog/wp-content/uploads/2018/07/50-peter-attia.pdf",
  ],
  [
    "#51: Tim Answers 10 More Popular Questions from Listeners",
    "https://tim.blog/wp-content/uploads/2018/07/51-tim-ferriss-tim-answers-10-more-popular-questions-from-listeners.pdf",
  ],
  [
    "#52: Ed Cooke, Grandmaster of Memory, on Mental Performance, Imagination, and Productive Mischief",
    "https://tim.blog/wp-content/uploads/2018/07/52-53-ed-cooke.pdf",
  ],
  [
    "#53: Ed Cooke (Part 2), Grandmaster of Memory, on Mental Performance, Imagination, and Productive Mischief",
    "https://tim.blog/wp-content/uploads/2018/07/52-53-ed-cooke.pdf",
  ],
  [
    "#54: The Promises and Perils of the Microbiome — Dr. Jonathan Eisen and Jessica Richman",
    "https://tim.blog/wp-content/uploads/2018/07/54-jonathan-eisen-jessica-richman.pdf",
  ],
  [
    "#55: The Science of Strength and Simplicity with Pavel Tsatsouline",
    "https://tim.blog/wp-content/uploads/2018/07/55-pavel-tsatsouline.pdf",
  ],
  [
    "#56: How to Think Like Elon Musk and Jeff Bezos",
    "https://tim.blog/wp-content/uploads/2018/07/56-peter-diamandis.pdf",
  ],
  [
    "#57: Pavel Tsatsouline Answers Your 15 Most Popular Exercise Questions",
    "https://tim.blog/wp-content/uploads/2018/07/57-pavel-tsatsouline.pdf",
  ],
  [
    "#58: How to Create a Blockbuster Podcast (Part 1)",
    "https://tim.blog/wp-content/uploads/2018/07/58-alex-blumberg-part-1.pdf",
  ],
  [
    "#59: How to Create a Blockbuster Podcast (Part 2)",
    "https://tim.blog/wp-content/uploads/2018/07/59-alex-blumberg-part-2.pdf",
  ],
  [
    "#60: Tim Ferriss Interviews Arnold Schwarzenegger on Psychological Warfare (And Much More)",
    "https://tim.blog/wp-content/uploads/2018/07/60-arnold-schwarzenegger.pdf",
  ],
  [
    "#61: The Benevolent Dictator of the Internet, Matt Mullenweg",
    "https://tim.blog/wp-content/uploads/2018/07/61-matt-mullenweg.pdf",
  ],
  [
    "#62: The EDM Cinderella — How The Glitch Mob Exploded",
    "https://tim.blog/wp-content/uploads/2018/07/62-justin-boreta.pdf",
  ],
  [
    "#63: Hedge Funds, Investing, and Optimizing Lifestyle (Mark Hart, Raoul Pal)",
    "https://tim.blog/wp-content/uploads/2018/07/63-mark-hart-and-raoul-pal.pdf",
  ],
  [
    "#64: CrossFit’s Good, Bad, and Ugly",
    "https://tim.blog/wp-content/uploads/2018/07/64-kelly-starrett.pdf",
  ],
  [
    "#65: Supplements, Blood Tests, and Near-Death Experiences (Dr. Peter Attia)",
    "https://tim.blog/wp-content/uploads/2018/07/65-peter-attia.pdf",
  ],
  [
    "#66: The Psychedelic Explorer’s Guide — Risks, Micro-Dosing, Ibogaine, and More",
    "https://tim.blog/wp-content/uploads/2018/07/66-james-fadiman.pdf",
  ],
  [
    "#67: Amanda Palmer on How to Fight, Meditate, and Make Good Art",
    "https://tim.blog/wp-content/uploads/2018/07/67-amanda-palmer.pdf",
  ],
  ["#68: Lazy: A Manifesto", "https://tim.blog/2015/04/03/lazy-a-manifesto/"],
  [
    "#69: Inside the Mind of Glenn Beck Is… Walt Disney and Orson Welles?",
    "https://tim.blog/wp-content/uploads/2018/07/69-glenn-beck.pdf",
  ],
  [
    "#70: How to Earn Your Freedom ",
    "https://tim.blog/2015/04/10/how-to-earn-your-freedom/",
  ],
  [
    "#71: The Master Creator — How Jon Favreau Went from Swingers to Elf to Ironman to Chef",
    "https://tim.blog/wp-content/uploads/2018/09/71-jon-favreau.pdf",
  ],
  [
    "#72: Triple H on Pre-Fight Rituals, Injury Avoidance, and Floyd Mayweather, Jr.",
    "https://tim.blog/wp-content/uploads/2018/09/72-paul-levesque-tfs.pdf",
  ],
  [
    "#73: A Chess Prodigy on Mastering Martial Arts, Chess, and Life",
    "https://rss.art19.com/episodes/690e2309-55de-4f9b-b4d8-07b27e728e86.mp3",
  ],
  [
    "#74: How a Computer Hacker Optimizes Online Dating, Opens Locked Cars, and Hijacks Drones Part 1",
    "https://tim.blog/wp-content/uploads/2018/07/74-samy-kamkar-part-1.pdf",
  ],
  [
    "#75: Tools and Tricks from the #30 Employee at Facebook",
    "https://tim.blog/wp-content/uploads/2018/07/75-noah-kagan.pdf",
  ],
  [
    "#76: Rick Rubin, The Seclusive Zen Master",
    "https://tim.blog/wp-content/uploads/2018/07/76-rick-rubin.pdf",
  ],
  [
    "#77: What Do Google X, Medicine, and Great Relationships Have In Common?",
    "https://tim.blog/wp-content/uploads/2018/07/77-danielle-and-astro-teller.pdf",
  ],
  [
    "#78: How to Build a Large Audience from Scratch (and More)",
    "https://tim.blog/wp-content/uploads/2018/07/78-tim-ferriss-how-to-build-a-large-audience-from-scratch.pdf",
  ],
  [
    "#79: Chris Sacca on Being Different and Making Billions",
    "https://tim.blog/wp-content/uploads/2018/07/79-chris-sacca.pdf",
  ],
  [
    "#80: Thomas Edison’s Formula for Greatness",
    "https://rss.art19.com/episodes/eff51486-f356-42a2-8659-8a8b3b042b30.mp3",
  ],
  [
    "#81: The Rags to Riches Philosopher: Bryan Johnson’s Path to $800 Million",
    "https://tim.blog/wp-content/uploads/2018/07/81-bryan-johnson.pdf",
  ],
  [
    "#82: Sam Kass on Trials by Fire and Cooking for The Obamas",
    "https://tim.blog/wp-content/uploads/2018/07/82-sam-kass.pdf",
  ],
  [
    "#83: The Maverick of Brain Optimization",
    "https://tim.blog/wp-content/uploads/2018/07/83-adam-gazzaley.pdf",
  ],
  [
    "#84: How to Turn Pain Into Creativity (Whitney Cummings)",
    "https://tim.blog/wp-content/uploads/2018/09/84-whitney-cummings.pdf",
  ],
  [
    "#85: Kelly Starrett on the 80/20 of Mobility and Performance",
    "https://tim.blog/wp-content/uploads/2018/09/85-kelly-starrett.pdf",
  ],
  [
    "#86: General Stan McChrystal on Eating One Meal Per Day, Special Ops, and Mental Toughness",
    "https://tim.blog/wp-content/uploads/2018/07/86-stanley-mcchrystal-chris-fussell.pdf",
  ],
  [
    "#87: Sam Harris on Daily Routines, The Trolley Scenario, and 5 Books Everyone Should Read",
    "https://tim.blog/wp-content/uploads/2018/07/87-sam-harris.pdf",
  ],
  [
    "#88: Stanley McChrystal on Anti-War Americans, Pushing Your Limits, and The Three Military Tests You Should Take",
    "https://tim.blog/wp-content/uploads/2018/07/88-stanley-mcchrystal.pdf",
  ],
  [
    "#89: Laird Hamilton, The King of Big Wave Surfing (Plus: Gabrielle Reece and Brian MacKenzie)",
    "https://tim.blog/wp-content/uploads/2018/07/89-laird-hamilton-gabrielle-reece-brian-mackenzie.pdf",
  ],
  [
    "#90: Peter Diamandis on Disrupting the Education System, The Evolution of Healthcare, and Building a Billion-Dollar Business",
    "https://tim.blog/wp-content/uploads/2018/07/90-peter-diamandis.pdf",
  ],
  [
    "#91: Charles Poliquin on Strength Training, Shredding Body Fat, and Increasing Testosterone and Sex Drive",
    "https://tim.blog/wp-content/uploads/2018/07/91-charles-poliquin.pdf",
  ],
  [
    "#92: Maria Popova on Being Interesting, Creating More Time in a Day, And How to Start A Successful Blog",
    "https://tim.blog/wp-content/uploads/2018/07/92-maria-popova.pdf",
  ],
  [
    "#93: Jane McGonigal on Getting More Done with Less Stress and The Health Benefits of Gaming",
    "https://tim.blog/wp-content/uploads/2018/07/93-jane-mcgonigal.pdf",
  ],
  [
    "#94: Tara Brach on Meditation and Overcoming FOMO (Fear Of Missing Out)",
    "https://tim.blog/wp-content/uploads/2018/07/94-tara-brach.pdf",
  ],
  [
    "#95: Lessons Learned from Jeff Bezos, Reid Hoffman, and More",
    "https://tim.blog/wp-content/uploads/2018/07/95-phil-libin.pdf",
  ],
  [
    "#96: Kevin Kelly on Artificial Intelligence and Designer Babies",
    "https://tim.blog/wp-content/uploads/2018/07/96-kevin-kelly.pdf",
  ],
  [
    "#97: The Evolutionary Angel, Naval Ravikant",
    "https://tim.blog/wp-content/uploads/2018/07/97-naval-ravikant.pdf",
  ],
  [
    "#98: The “Wizard” of Hollywood, Robert Rodriguez",
    "https://tim.blog/wp-content/uploads/2018/07/98-robert-rodriguez.pdf",
  ],
  [
    "#99: How to Build a World-Class Network in Record Time",
    "https://tim.blog/wp-content/uploads/2018/07/99-tim-ferriss-how-to-build-a-world-class-network-in-record-time.pdf",
  ],
  [
    "#100: Brene Brown on Vulnerability and Home Run TED Talks",
    "https://tim.blog/wp-content/uploads/2018/07/100-brene-brown.pdf",
  ],
  [
    "#101: The Oracle of Silicon Valley, Reid Hoffman (Plus: Michael McCullough)",
    "https://tim.blog/wp-content/uploads/2018/08/101-reid-hoffman-and-michael-mccullough.pdf",
  ],
  [
    "#102: “The Iceman,” Wim Hof",
    "https://tim.blog/wp-content/uploads/2018/08/102-wim-hof.pdf",
  ],
  [
    "#103: Drunk Dialing Fans — Celebrating The 100th Podcast Episode!",
    "https://tim.blog/wp-content/uploads/2018/08/103-tim-ferriss-episode-100-drunk-dialing-fans.pdf",
  ],
  [
    "#104: Are Psychedelic Drugs the Next Medical Breakthrough?",
    "https://tim.blog/wp-content/uploads/2018/08/104-martin-polanco-and-dan-engle.pdf",
  ],
  [
    "#105: 5 Morning Rituals That Help Me Win the Day",
    "https://tim.blog/wp-content/uploads/2018/08/105-5-morning-rituals-that-help-me-win-the-day.pdf",
  ],
  [
    "#106: Scott Adams: The Man Behind Dilbert",
    "https://tim.blog/wp-content/uploads/2018/08/106-scott-adams.pdf",
  ],
  [
    "#107: The Scariest Navy SEAL I’ve Ever Met… And What He Taught Me",
    "https://tim.blog/wp-content/uploads/2018/08/107-jocko-willink.pdf",
  ],
  [
    "#108: Comedy’s Dynamic Duo, Seth Rogen and Evan Goldberg",
    "https://tim.blog/wp-content/uploads/2018/09/108-seth-rogen-evan-goldberg.pdf",
  ],
  [
    "#109: The 5 Things I Did To Become a Better Investor",
    "https://tim.blog/wp-content/uploads/2018/08/109-tim-ferriss-5-things-i-did-to-become-a-better-investor.pdf",
  ],
  [
    "#110: The Tattooed Heretic of Wine and Whiskey, Richard Betts",
    "https://tim.blog/wp-content/uploads/2018/08/110-richard-betts.pdf",
  ],
  [
    "#111: Should You Start a Startup or Build a Cash-Flow Business?",
    "https://tim.blog/wp-content/uploads/2018/08/111-tim-ferriss-conversation-at-expa-should-you-start-a-startup.pdf",
  ],
  [
    "#112: The Nasty Icon of Retail, Sophia Amoruso",
    "https://tim.blog/wp-content/uploads/2018/08/112-sophia-amoruso.pdf",
  ],
  [
    "#113: 5 Tools I Use For Faster And Better Sleep",
    "https://tim.blog/wp-content/uploads/2018/08/113-tim-ferriss-5-tools-i-use-for-faster-and-better-sleep.pdf",
  ],
  [
    "#114: The Athlete (And Artist) Who Cheats Death, Jimmy Chin",
    "https://tim.blog/wp-content/uploads/2018/08/114-jimmy-chin.pdf",
  ],
  [
    "#115: Thinking About Extra Dimensions with Physicist Lisa Randall",
    "https://tim.blog/wp-content/uploads/2018/08/115-lisa-randall.pdf",
  ],
  [
    "#116: How Casey Neistat Gets Away With Murder",
    "https://tim.blog/wp-content/uploads/2018/08/116-casey-neistat.pdf",
  ],
  [
    "#117: Dom D’Agostino on Fasting, Ketosis, and The End of Cancer",
    "https://tim.blog/wp-content/uploads/2018/08/117-dominic-dagostino.pdf",
  ],
  [
    "#118: How Philosophy Can Change Your Life, Alain de Botton",
    "https://tim.blog/wp-content/uploads/2018/08/118-alain-de-botton.pdf",
  ],
  [
    "#119: Kevin Costner on Building His Career, Positive Self-Talk, and Making Dances with Wolves Happen",
    "https://tim.blog/wp-content/uploads/2018/08/119-kevin-costner.pdf",
  ],
  [
    "#120: Will MacAskill on Effective Altruism, Y Combinator, and Artificial Intelligence",
    "https://tim.blog/wp-content/uploads/2018/08/120-william-macaskill.pdf",
  ],
  [
    "#121: BJ Novak of The Office on Creative Process, Handling Rejection, and Good Comedy",
    "https://tim.blog/wp-content/uploads/2018/08/121-bj-novak.pdf",
  ],
  [
    "#122: The Magic of Mindfulness: Complain Less, Appreciate More, and Live a Better Life",
    "https://tim.blog/wp-content/uploads/2018/08/122-tim-ferriss-the-magic-of-mindfulness.pdf",
  ],
  [
    "#123: Rainn Wilson on Meditation, The Sexy Nostril Exercise, and Acting as Therapy",
    "https://tim.blog/wp-content/uploads/2018/08/123-rainn-wilson.pdf",
  ],
  [
    "#124: Jamie Foxx on Workout Routines, Success Habits, and Untold Hollywood Stories",
    "https://tim.blog/wp-content/uploads/2018/08/124-jamie-foxx.pdf",
  ],
  [
    "#125: Derek Sivers on Developing Confidence, Finding Happiness, and Saying “No” to Millions",
    "https://tim.blog/wp-content/uploads/2018/08/125-derek-sivers.pdf",
  ],
  [
    "#126: 25 Great Things I Learned from Podcast Guests in 2015",
    "https://tim.blog/wp-content/uploads/2018/08/126-tim-ferriss-25-great-things-ive-learned-from-podcast-guests.pdf",
  ],
  [
    "#127: Amelia Boone on Beating 99% of Men and Suffering for a High-Performance Life",
    "https://tim.blog/wp-content/uploads/2018/08/127-amelia-boone.pdf",
  ],
  [
    "#128: Derek Sivers Reloaded — On Success Habits and Billionaires with Perfect Abs",
    "https://tim.blog/derek-sivers-reloaded-on-the-tim-ferriss-show-transcript/",
  ],
  [
    "#129: Recommendations and Resolutions for 2016 — Kevin Rose and Tim Ferriss",
    "https://tim.blog/wp-content/uploads/2018/08/129-random-show.pdf",
  ],
  [
    "#130: Daymond John and How to Turn Weaknesses into Strengths",
    "https://tim.blog/daymond-john-on-the-tim-ferriss-show-transcript/",
  ],
  [
    "#131: Eric Weinstein on Challenging Reality, Working with Peter Thiel, and Destroying Education to Save It",
    "https://tim.blog/wp-content/uploads/2018/08/131-eric-weinstein.pdf",
  ],
  [
    "#132: Chris Sacca on Shark Tank, Building Your Business, and Startup Mistakes",
    "https://tim.blog/wp-content/uploads/2018/08/132-chris-sacca.pdf",
  ],
  [
    "#133: Edward Norton on Mastery, Must-Read Books, and The Future of CrowdFunding",
    "https://tim.blog/edward-norton-on-the-tim-ferriss-show-transcript/",
  ],
  [
    "#134: The Tao of Seneca",
    "https://tim.blog/wp-content/uploads/2018/08/134-tim-ferriss-the-tao-of-seneca.pdf",
  ],
  [
    "#135: Luis Von Ahn on Learning Languages, Building Companies, and Changing the World",
    "https://tim.blog/wp-content/uploads/2018/08/135-luis-von-ahn.pdf",
  ],
  [
    "#136: Naval Ravikant on Happiness Hacks and The 5 Chimps Theory",
    "https://tim.blog/naval-ravikant-on-the-tim-ferriss-show-transcript/",
  ],
  [
    "#137: How to Practice Poverty and Reduce Fear",
    "https://tim.blog/wp-content/uploads/2018/08/137-tim-ferriss-how-to-practice-poverty-and-reduce-fear.pdf",
  ],
  [
    "#138: How Seth Godin Manages His Life — Rules, Principles, and Obsessions",
    "https://tim.blog/wp-content/uploads/2018/09/138-seth-godin.pdf",
  ],
  [
    "#140: Shaun White: The Most Unholy Snowboarder Ever",
    "https://tim.blog/wp-content/uploads/2018/08/140-shaun-white.pdf",
  ],
  [
    "#141: Kaskade and Sekou Andrews: The Musician and the Poet",
    "https://tim.blog/wp-content/uploads/2018/08/141-kaskade-and-sekou-andrews.pdf",
  ],
  [
    "#142: How to Achieve Self-Ownership",
    "https://tim.blog/wp-content/uploads/2018/08/142-tim-ferriss-how-to-achieve-self-ownership.pdf",
  ],
  [
    "#143: The World’s Most Famous Performance-Enhancement Chemist",
    "https://tim.blog/wp-content/uploads/2018/08/143-patrick-arnold.pdf",
  ],
  [
    "#144: How to 10X Your Results, One Tiny Tweak at a Time",
    "https://tim.blog/wp-content/uploads/2018/08/144-10x-results-with-joel-stein.pdf",
  ],
  [
    "#145: The Interview Master: Cal Fussman and the Power of Listening",
    "https://tim.blog/wp-content/uploads/2018/08/145-cal-fussman.pdf",
  ],
  [
    "#146: The Random Show, Ice Cold Edition",
    "https://tim.blog/wp-content/uploads/2018/08/146-random-show.pdf",
  ],
  [
    "#147: How to Avoid the Busy Trap (And Other Misuses of Your Time)",
    "https://tim.blog/wp-content/uploads/2018/08/147-tim-ferriss-how-to-avoid-the-busy-trap.pdf",
  ],
  [
    "#148: Josh Waitzkin, The Prodigy Returns",
    "https://tim.blog/wp-content/uploads/2018/08/148-josh-waitzkin.pdf",
  ],
  [
    "#149: How to Live in The Moment",
    "https://tim.blog/wp-content/uploads/2018/08/149-tim-ferriss-how-to-live-in-the-moment.pdf",
  ],
  [
    "#150: Morgan Spurlock: Inside the Mind of a Human Guinea Pig",
    "https://tim.blog/wp-content/uploads/2018/08/150-morgan-spurlock.pdf",
  ],
  [
    "#151: How to Overcome Fear — Lessons from Firefighter and Luger, Caroline Paul",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-caroline-paul/",
  ],
  [
    "#152: On Philosophy and Riches",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-on-philosophy-and-riches/",
  ],
  [
    "#153: The Man Who Studied 1,000 Deaths to Learn How to Live",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-bj-miller/",
  ],
  [
    "#154: The Habits of a Master — Paulo Coelho, Author of The Alchemist",
    "http://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-paulo-coelho/",
  ],
  [
    "#155: On Zero-to-Hero Transformations",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-on-zero-to-hero-transformations/",
  ],
  [
    "#156: Joshua Skenes — Playing with Fire",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-joshua-skenes/",
  ],
  [
    "#157: The Importance of Being Dirty: Lessons from Mike Rowe",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-mike-rowe/",
  ],
  [
    "#158: The Secrets of Gymnastic Strength Training",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-the-secrets-of-gymnastic-strength-training/",
  ],
  [
    "#159: How to Optimize Creative Output — Jarvis versus Ferriss",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-how-to-optimize-creative-output-jarvis-vs-ferriss/",
  ],
  [
    "#160: Assessing Risk and Living Without a Rope — Lessons from Alex Honnold",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-assessing-risk-and-living-without-a-rope-lessons-from-alex-honnold/",
  ],
  [
    "#161: Lessons from War, Tribal Societies, and a Non-Fiction Life (Sebastian Junger)",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-lessons-from-war-tribal-societies-and-a-non-fiction-life-sebastian-junger/",
  ],
  [
    "#162: How to Be Tim Ferriss – Featuring Freakonomics",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-how-to-be-tim-ferriss-freakonomics-stephen-j-dubner/",
  ],
  [
    "#163: Marc Andreessen — Lessons, Predictions, and Recommendations from an Icon",
    "https://tim.blog/2018/01/01/the-tim-ferriss-show-transcripts-marc-andreessen/",
  ],
  [
    "#164: Kevin Kelly — AI, Virtual Reality, and The Inevitable",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-kevin-kelly-ai-virtual-reality-and-the-inevitable/",
  ],
  [
    "#165: The Canvas Strategy — What Ben Franklin and Bill Belichick Have in Common ",
    "https://tim.blog/2016/06/10/the-canvas-strategy/",
  ],
  [
    "#166: How Creatives Should Negotiate",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-ramit-sethi-how-creatives-should-negotiate/",
  ],
  [
    "#167: Jamie Foxx Part 2 — Bringing the Thunder",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-jamie-foxx-part-2/",
  ],
  [
    "#168: Dissecting the Success of Malcolm Gladwell",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-malcolm-gladwell/",
  ],
  [
    "#169: Useful Lessons from Workaholics Anonymous, Corporate Implosions, and More",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-ryan-holiday-169-useful-lessons-from-workaholics-anonymous-corporate-implosions-and-more/",
  ],
  [
    "#170: Shay Carl — From Manual Laborer to 2.3 Billion YouTube Views",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-shay-carl-from-manual-laborer-to-2-3-billion-youtube-views/",
  ],
  [
    "#171: The Random Show — New Favorite Books, Memory Training, and Bets On VR",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-the-random-show-new-favorite-books-memory-training-and-bets-on-vr/",
  ],
  [
    "#172: Dom D’Agostino — The Power of the Ketogenic Diet",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-dom-dagostino-the-power-of-the-ketogenic-diet/",
  ],
  [
    "#173: Lessons from Geniuses, Billionaires, and Tinkerers",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-chris-young/",
  ],
  [
    "#174: The One-Handed Concert Pianist, Nicholas McCarthy",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-nicholas-mccarthy/",
  ],
  [
    "#175: How to Cage the Monkey Mind",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-how-to-cage-the-monkey-mind/",
  ],
  [
    "#176: Mike Birbiglia, The Sleepwalking Comedy Giant",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-mike-birbiglia/",
  ],
  [
    "#177: Seth Godin on How to Think Small to Go Big",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-seth-godin-on-how-to-think-small-to-go-big/",
  ],
  [
    "#178: Tony Robbins — On Achievement Versus Fulfillment",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-tony-robbins-on-achievement-versus-fulfillment/",
  ],
  [
    "#179: What’s Important to You? ",
    "https://tim.blog/2016/08/14/whats-important-to-you/",
  ],
  [
    "#180: The Secrets of Gymnastic Strength Training, Part Two — Home Equipment, Weighted Stretches, and Muscle-Ups",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-the-secrets-of-gymnastic-strength-training-part-two/",
  ],
  [
    "#181: How to “Waste Money” To Improve the Quality of Your Life",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-how-to-waste-money-to-improve-the-quality-of-your-life/",
  ],
  [
    "#182: Jason Nemer — Inside the Magic of AcroYoga",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-jason-nemer/",
  ],
  [
    "#183: Cal Fussman: The Master Storyteller Returns",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-cal-fussman-the-master-storyteller-returns/",
  ],
  [
    "#184: Shep Gordon — The King Maker on His Best PR Stunts, Hugest Failures, and Practical Philosophies",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-shep-gordon/",
  ],
  [
    "#185: Practicing What You Preach",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-practicing-what-you-preach/",
  ],
  [
    "#186: Tony Robbins on How to Resolve Internal Conflict",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-tony-robbins-on-how-to-resolve-internal-conflict/",
  ],
  [
    "#187: Jocko Willink on Discipline, Leadership, and Overcoming Doubt",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-jocko-willink-on-discipline-leadership-and-overcoming-doubt/",
  ],
  [
    "#188: Dom D’Agostino on Disease Prevention, Cancer, and Living Longer",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-dom-dagostino-on-disease-prevention-cancer-and-living-longer/",
  ],
  [
    "#189: Shay Carl on Wealth, Parenting, and the Future of Video",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-shay-carl-on-wealth-parenting-and-the-future-of-video/",
  ],
  [
    "#190: Matt Mullenweg on the Characteristics and Practices of Successful Entrepreneurs",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-matt-mullenweg-on-characteristics-and-practices-of-successful-entrepreneurs/",
  ],
  [
    "#191: The Art and Science of Learning Anything Faster",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-the-art-and-science-of-learning-anything-faster/",
  ],
  [
    "#192: The Return of Drunk Dialing",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-the-return-of-drunk-dialing/",
  ],
  [
    "#193: My Life Extension Pilgrimage to Easter Island",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-peter-attia-david-sabatini-and-navdeep-chandel/",
  ],
  [
    "#194: The Magic and Power of Placebo",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-erik-vance/",
  ],
  [
    "#195: David Heinemeier Hansson: The Power of Being Outspoken",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-david-dhh-heinemeier-hansson/",
  ],
  [
    "#196: Meet the Machine, Dave Camarillo",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-dave-camarillo/",
  ],
  [
    "#197: Drunk Dialing — Ladies Night Edition!",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-drunk-dialing-ladies-night-edition/",
  ],
  [
    "#198: Charles Poliquin — His Favorite Mass-Building Program, His Nighttime Routine For Better Sleep, and Much More",
    "https://tim.blog/2018/06/19/the-tim-ferriss-show-transcripts-charles-poliquin-his-favorite-mass-building-program-his-nighttime-routine-for-better-sleep-and-much-more/",
  ],
  [
    "#199: Stephen Dubner — The Art of Storytelling and Facing Malcolm Gladwell in a Fist Fight",
    "https://tim.blog/2018/06/06/the-tim-ferriss-show-transcripts-stephen-dubner-the-art-of-storytelling-and-facing-malcolm-gladwell-in-a-fist-fight/",
  ],
  [
    "#200: Susan Garrett — Master Dog (and Human) Trainer",
    "https://tim.blog/2018/06/19/the-tim-ferriss-show-transcripts-susan-garrett/",
  ],
  [
    "#201: The Tim Ferriss Radio Hour: Meditation, Mindset, and Mastery",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-meditation-mindset-and-mastery/",
  ],
  [
    "#202: Tools of Titans: Derek Sivers Distilled",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-derek-sivers-distilled/",
  ],
  [
    "#203: David Heinemeier Hansson on Digital Security, Company Culture, and the Value of Schooling",
    "https://tim.blog/2018/06/19/the-tim-ferriss-show-transcripts-david-heinemeier-hansson-on-digital-security-company-culture-and-the-value-of-schooling/",
  ],
  [
    "#204: Tools of Titans: Josh Waitzkin Distilled",
    "https://tim.blog/2018/06/19/the-tim-ferriss-show-transcripts-josh-waitzkin-distilled/",
  ],
  [
    "#205: Mark Bittman on Changing the Food Industry and Living Dangerously",
    "https://tim.blog/2018/06/19/the-tim-ferriss-show-transcripts-mark-bittman/",
  ],
  [
    "#206: Testing the “Impossible”: 17 Questions That Changed My Life",
    "https://tim.blog/2016/12/07/testing-the-impossible-17-questions-that-changed-my-life/",
  ],
  [
    "#207: Tools of Titans: Brene Brown Distilled and Other Goodies",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-brene-brown-distilled/",
  ],
  [
    "#208: Ezra Klein — From College Blogger to Political Powerhouse",
    "https://tim.blog/2018/06/19/the-tim-ferriss-show-transcripts-ezra-klein/",
  ],
  [
    "#209: The Random Show Threesome — Tim Ferriss, Kevin Rose, and Matt Mullenweg",
    "https://tim.blog/2018/06/19/the-tim-ferriss-show-transcripts-the-random-show-threesome-tim-ferriss-kevin-rose-and-matt-mullenweg/",
  ],
  [
    "#210: Becoming the Best Version of You",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-becoming-the-best-version-of-you/",
  ],
  [
    "#211: A.J. Jacobs: Self-Experimenter Extraordinaire",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-a-j-jacobs/",
  ],
  [
    "#212: 2016 — What I’ve Learned",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-what-i-learned-in-2016/",
  ],
  [
    "#213: Fasting vs. Slow-Carb Diet, Top $150 Purchases, Balancing Productivity and Relaxation, and More",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-fasting-vs-slow-carb-diet-top-150-purchases-balancing-productivity-and-relaxation-and-more/",
  ],
  [
    "#214: How to Design a Life — Debbie Millman",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-debbie-millman/",
  ],
  [
    "#215: The Return of the Money Shot",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-whitney-cummings/",
  ],
  [
    "#216: Arnold Schwarzenegger Part 2! Bodybuilding, Investing, and Online Battles",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-arnold-schwarzenegger-part-2/",
  ],
  [
    "#217: The One-Minute Workout Designed by Scientists — Dr. Martin Gibala",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-dr-martin-gibala/",
  ],
  [
    "#218: The Most Feared and Well-Liked Journalist in Silicon Valley — Kara Swisher",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-kara-swisher/",
  ],
  [
    "#219: Lessons from Warren Buffett, Bobby Fischer, and Other Outliers — Adam Robinson",
    "https://tim.blog/2018/06/22/the-tim-ferriss-show-transcripts-adam-robinson-interview/",
  ],
  [
    "#220: Soman Chainani — The School for Good and Evil",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-soman-chainani/",
  ],
  [
    "#221: Mr. Money Mustache — Living Beautifully on $25-27K Per Year",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-mr-money-mustache/",
  ],
  [
    "#222: Jerrod Carmichael — Uber-Productivity and Dangerous Comedy",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-jerrod-carmichael/",
  ],
  [
    "#223: Calming Philosophies for Chaotic Times — Krista Tippett",
    "https://tim.blog/2018/06/21/the-tim-ferriss-show-transcripts-krista-tippett/",
  ],
  [
    "#224: The Random Show — Drinking Urine, Exploring Japan, and Figuring Out Life",
    "https://tim.blog/2018/06/22/the-tim-ferriss-show-transcripts-the-random-show-with-kevin-rose-224-the-random-show-drinking-urine-exploring-japan-and-figuring-out-life/",
  ],
  [
    "#225: John Crowley — The Real-Life Captain America and Bruce Banner (Seriously)",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-john-crowley/",
  ],
  [
    "#226: How to Not Be Evil — Dr. Phil Zimbardo",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-dr-phil-zimbardo/",
  ],
  [
    "#227: Conquering Fear and Reducing Anxiety — Caroline Paul",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-caroline-paul-on-conquering-fear-and-reducing-anxiety/",
  ],
  [
    "#228: The Lion of Olympic Weightlifting, 62-Year-Old Jerzy Gregorek (Also Featuring: Naval Ravikant)",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-jerzy-gregorek-and-naval-ravikant/",
  ],
  [
    "#229: Ricardo Semler — The Seven-Day Weekend and How to Break the Rules",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-ricardo-semler/",
  ],
  [
    "#230: The Secrets, Tactics, and Creative Processes of High Performers and Achievers — Debbie Millman",
    "https://tim.blog/2018/06/22/the-tim-ferriss-show-transcripts-debbie-millman-on-the-secrets-tactics-and-creative-processes-of-high-performers-and-achievers/",
  ],
  [
    "#231: How to Be Creative Like a Motherf*cker — Cheryl Strayed",
    "https://tim.blog/2018/06/22/the-tim-ferriss-show-transcripts-cheryl-strayed/",
  ],
  [
    "#232: The Tim Ferriss Radio Hour: Controlling Stress, Nutrition Upgrades, and Improved Health",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-how-to-control-stress-upgrade-your-nutrition-and-build-the-mindset-of-a-gladiator/",
  ],
  [
    "#233: Cory Booker — Street Fights, 10-Day Hunger Strikes, and Creative Problem-Solving",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-cory-booker/",
  ],
  [
    "#234: Marie Kondo — The Japanese Tidying Master",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-marie-kondo/",
  ],
  [
    "#235: Dorian Yates on High Intensity Training, Injury Prevention, and Building Maximum Muscle",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-dorian-yates/",
  ],
  [
    "#236: The Alien of Extraordinary Ability",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-murray-carter/",
  ],
  [
    "#237: Exploring Smart Drugs, Fasting, and Fat Loss — Dr. Rhonda Patrick",
    "https://tim.blog/2017/05/25/transcript-dr-rhonda-patrick-on-exploring-smart-drugs-fasting-and-fat-loss/",
  ],
  [
    "#238: The Savant of Speed — Ryan Flaherty",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-ryan-flaherty/",
  ],
  [
    "#239: How to Reverse Aging with Art De Vany",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-art-de-vany/",
  ],
  [
    "#240: Accelerated Learning and Mentors — My Personal Story",
    "https://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-accelerated-learning-my-story/",
  ],
  [
    "#241: The Relationship Episode: Sex, Love, Polyamory, Marriage, and More (with Esther Perel)",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-esther-perel/",
  ],
  [
    "#242: Phil Keoghan — The Magic of Bucket Lists and Amazing Races",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-phil-keoghan/",
  ],
  [
    "#243: How to Fear Less — Vince Vaughn",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-vince-vaughn/",
  ],
  [
    "#244: The Quiet Master of Cryptocurrency — Nick Szabo",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-nick-szabo/",
  ],
  [
    "#245: The Magic, Misdirection, and Mindset of David Blaine",
    "https://tim.blog/2018/06/05/the-tim-ferriss-show-transcripts-david-blaine/",
  ],
  [
    "#246: Building Strength, Improving Mindset, and Becoming the World’s Fittest Man — Jason Khalipa",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-jason-khalipa/",
  ],
  [
    "#247: Cool Tools for Travel — Tim Ferriss and Kevin Kelly",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-cool-tools-for-travel-with-kevin-kelly/",
  ],
  [
    "#248: The 10 Commandments of Startup Success with Reid Hoffman",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-reid-hoffman-ten-commandments/",
  ],
  [
    "#249: How to Make a Difference and Find Your Purpose — Blake Mycoskie",
    "https://tim.blog/2018/06/01/the-tim-ferriss-show-transcripts-blake-mycoskie/",
  ],
  [
    "#250: Myers-Briggs, Diet Mistakes, and Immortality",
    "https://tim.blog/2018/05/30/the-tim-ferriss-show-transcripts-myers-briggs-diet-mistakes-and-immortality/",
  ],
  [
    "#251: How to Live Without Limits — Kyle Maynard",
    "https://tim.blog/2018/05/30/the-tim-ferriss-show-transcripts-kyle-maynard/",
  ],
  [
    "#252: Inside the World of SuperTraining — Mark Bell",
    "https://tim.blog/2018/05/30/the-tim-ferriss-show-transcripts-mark-bell/",
  ],
  [
    "#253: Morning Routines and Strategies",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-morning-routines-and-strategies/",
  ],
  [
    "#254: When to Quit — Lessons from World-Class Entrepreneurs, Investors, Authors, and More",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-when-to-quit-lessons-from-world-class-entrepreneurs-investors-authors-and-more/",
  ],
  [
    "#255: How to Turn Failure into Success",
    "http://tim.blog/2018/06/20/the-tim-ferriss-show-transcripts-how-to-turn-failure-into-success/",
  ],
  [
    "#256: How to Overcome Anxiety and Stress — with Adviser to Olympians, Michael Gervais",
    "https://tim.blog/2018/05/30/the-tim-ferriss-show-transcripts-michael-gervais/",
  ],
  [
    "#257: Physical Training, Dating Strategies, and Stories from the Early Days",
    "https://tim.blog/2018/06/22/the-tim-ferriss-show-transcripts-physical-training-and-dating-strategies/",
  ],
  [
    "#258: From Long-Shot to $50 Billion Empire — Bill Rasmussen",
    "https://tim.blog/2018/05/30/the-tim-ferriss-show-transcripts-bill-rasmussen/",
  ],
  [
    "#259: Lessons from 50,000 Interviews: Larry King and Cal Fussman",
    "https://tim.blog/2018/05/30/the-tim-ferriss-show-transcripts-cal-fussman-and-larry-king/",
  ],
  [
    "#260: Setting Goals, Making Money, and Overcoming Tough Times — Phil Hellmuth",
    "https://tim.blog/2018/05/30/the-tim-ferriss-show-transcripts-phil-hellmuth/",
  ],
  [
    "#261: Mental Performance, Work-Life Balance, and the Rise to the Top — Maria Sharapova",
    "https://tim.blog/2018/05/30/tim-ferriss-show-transcript-maria-sharapova/",
  ],
  [
    "#262: The CIA, The Police, and Other Adventures from Stewart Copeland",
    "https://tim.blog/2018/02/01/the-tim-ferriss-show-transcripts-stewart-copeland/",
  ],
  [
    "#263: Filmmaker Darren Aronofsky — Exploring Creativity, Ignoring Critics, and Making Art",
    "https://tim.blog/2018/02/01/the-tim-ferriss-show-transcripts-darren-aronofsky/",
  ],
  [
    "#264: Ray Dalio, The Steve Jobs of Investing",
    "https://tim.blog/2018/02/01/the-tim-ferriss-show-transcripts-ray-dalio/",
  ],
  [
    "#265: Bill Burr — The Comedian’s Comedian",
    "https://tim.blog/2018/02/01/the-tim-ferriss-show-transcripts-bill-burr/",
  ],
  [
    "#266: Favorite Books, Supplements, Simple Technologies, and More",
    "https://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-favorite-books-supplements-simple-technologies-and-more/",
  ],
  [
    "#267: Tools and Tips for Better Sleep",
    "https://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-tools-and-tips-for-better-sleep/",
  ],
  [
    "#268: Eric Ripert — Lessons in Mastery and Mindfulness",
    "https://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-eric-ripert/",
  ],
  [
    "#269: The 3 Critical Rules of Branding",
    "https://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-the-3-critical-rules-of-branding/",
  ],
  [
    "#270: Investing Wisdom from Marc Andreessen, Peter Thiel, Reid Hoffman, Chris Sacca, and Others",
    "https://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-investing-wisdom-from-marc-andreessen-peter-thiel-reid-hoffman-chris-sacca-and-others/",
  ],
  [
    "#271: Intimacy, Emotional Baggage, Relationship Longevity, and More — Esther Perel",
    "https://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-intimacy-emotional-baggage-relationship-longevity-and-more-esther-perel/",
  ],
  [
    "#272: Sir Richard Branson — The Billionaire Maverick of the Virgin Empire",
    "http://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-sir-richard-branson/",
  ],
  [
    "#273: Lessons from Steve Jobs, Leonardo da Vinci, and Ben Franklin",
    "http://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-walter-isaacson/",
  ],
  [
    "#274: Arianna Huffington, Media Maven",
    "http://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-arianna-huffington/",
  ],
  [
    "#275: Discipline Equals Freedom — Jocko Willink",
    "http://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-discipline-equals-freedom-jocko-willink/",
  ],
  [
    "#276: Terry Laughlin, The Master Who Changed My Life",
    "https://tim.blog/2018/02/02/the-tim-ferriss-show-transcripts-terry-laughlin/",
  ],
  [
    "#277: Sharon Salzberg, World-Renowned Meditation Teacher",
    "https://tim.blog/2018/02/03/the-tim-ferriss-show-podcasts-sharon-salzberg/",
  ],
  [
    "#278: Tim O’Reilly — The Trend Spotter",
    "http://tim.blog/2018/02/03/the-tim-ferriss-show-transcripts-tim-oreilly/",
  ],
  [
    "#279: The Most Curious Man in Hollywood — Brian Grazer",
    "https://tim.blog/2018/02/03/the-tim-ferriss-show-transcripts-brian-grazer/",
  ],
  [
    "#280: The Erotic Playbook of a Top-Earning Sex Worker (NSFW)",
    "https://tim.blog/2018/02/03/the-tim-ferriss-show-transcripts-alice-little/",
  ],
  [
    "#281: Stewart Brand — The Polymath of Polymaths",
    "https://tim.blog/2018/02/03/the-tim-ferriss-show-transcripts-stewart-brand/",
  ],
  [
    "#282: How to Say No",
    "https://tim.blog/2018/02/03/the-tim-ferriss-show-transcripts-how-to-say-no/",
  ],
  [
    "#283: Managing Procrastination, Predicting the Future, and Finding Happiness — Tim Urban",
    "https://tim.blog/2018/02/03/the-tim-ferriss-show-transcripts-tim-urban/",
  ],
  [
    "#284: The Answers to My Favorite Questions",
    "https://tim.blog/2018/02/03/the-tim-ferriss-show-transcripts-the-answers-to-my-favorite-questions/",
  ],
  [
    "#285: Preserving Human Life, Battling the Busy Trap, and How to Stay Focused — M. Sanjayan",
    "https://tim.blog/2018/02/04/the-tim-ferriss-show-transcripts-m-sanjayan/",
  ],
  [
    "#286: The Man Who Taught Me How to Invest",
    "https://tim.blog/2018/02/04/the-tim-ferriss-show-transcripts-mike-maples/",
  ],
  [
    "#287: Terry Crews — How to Have, Do, and Be All You Want",
    "https://tim.blog/2018/02/04/the-tim-ferriss-show-transcripts-terry-crews/",
  ],
  [
    "#288: Lessons from Bozoma Saint John — From Spike Lee to Uber, From Ghana to Silicon Valley",
    "https://tim.blog/2018/02/04/the-tim-ferriss-show-transcripts-bozoma-saint-john/",
  ],
  [
    "#289: How to Handle Information Overwhelm (and Social Media)",
    "https://tim.blog/2018/02/04/the-tim-ferriss-show-transcripts-how-to-handle-information-overwhelm-and-social-media/",
  ],
  [
    "#290: Gretchen Rubin — Experiments in Happiness and Creativity",
    "https://tim.blog/2018/02/04/the-tim-ferriss-show-transcripts-gretchen-rubin/",
  ],
  [
    "#291: Overcoming, Managing, and Using Fear",
    "http://tim.blog/2018/02/06/the-tim-ferriss-show-transcripts-how-the-best-overcome-fear/",
  ],
  [
    "#292: Lessons and Warnings from Successful Risk Takers",
    "https://tim.blog/2018/02/06/the-tim-ferriss-show-transcripts-lessons-and-warnings-from-successful-risk-takers/",
  ],
  [
    "#293: Catherine Hoke — The Master of Second Chances",
    "http://tim.blog/2018/02/06/the-tim-ferriss-show-transcripts-catherine-hoke/",
  ],
  [
    "#294: Best Investments, Bad Advice to Avoid, and Other Life Lessons",
    "https://tim.blog/2018/02/06/the-tim-ferriss-show-transcripts-best-investments-bad-advice-to-avoid-and-other-life-lessons/",
  ],
  [
    "#295: The 4-Hour Workweek Revisited",
    "https://tim.blog/2018/02/06/the-tim-ferriss-show-transcripts-the-4-hour-workweek-revisited/",
  ],
  [
    "#296: How to Build Popular Podcasts and Blogs",
    "https://tim.blog/2018/02/06/the-tim-ferriss-show-transcripts-how-to-build-popular-podcasts-and-blogs/",
  ],
  [
    "#297: Bob Metcalfe — The Man (and Lessons) Behind Ethernet, Metcalfe’s Law, and More",
    "https://tim.blog/2018/02/07/the-tim-ferriss-show-transcripts-bob-metcalfe/",
  ],
  [
    "#298: Dr. Gabor Mate — New Paradigms, Ayahuasca, and Redefining Addiction",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-dr-gabor-mate/",
  ],
  [
    "#299: How to Secure Financial Freedom, Maximize Productivity, and Protect Your Health",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-how-to-secure-financial-freedom-maximize-productivity-and-protect-your-health/",
  ],
  [
    "#300: Jack Kornfield — Finding Freedom, Love, and Joy in the Present",
    "https://tim.blog/2018/06/04/the-tim-ferriss-show-transcripts-jack-kornfield/",
  ],
  [
    "#301: Joe Gebbia — Co-Founder of Airbnb",
    "https://tim.blog/2018/03/10/tim-ferriss-show-transcript-joe-gebbia/",
  ],
  [
    "#302: Own the Day, Own Your Life — Aubrey Marcus",
    "https://tim.blog/2018/03/22/tim-ferriss-show-transcript-aubrey-marcus/",
  ],
  [
    "#303: How to Do Crazy Good Turns — Frank Blake",
    "https://tim.blog/2018/03/22/the-tim-ferriss-show-transcripts-frank-blake/",
  ],
  [
    "#304: How to Prioritize Your Life and Make Time for What Matters",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-debbie-millman-how-to-prioritize-your-life-and-make-time-for-what-matters/",
  ],
  [
    "#305: Daniel Pink — How to Make Better Decisions and Be More Creative",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-daniel-pink/",
  ],
  [
    "#306: Discipline, Sex, Psychedelics, and More — The Return of Drunk Dialing",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-discipline-sex-and-psychedelics-the-return-of-drunk-dialing/",
  ],
  [
    "#307: Karlie Kloss — Entrepreneur and Supermodel",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-karlie-kloss/",
  ],
  [
    "#308: Inside Out with Katie Couric",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-katie-couric/",
  ],
  [
    "#309: Astro Teller, CEO of X — How to Think 10x Bigger",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-astro-teller-how-to-think-10x-bigger/",
  ],
  [
    "#310: Hurry Up and Fail — Tim Kennedy",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-tim-kennedy/",
  ],
  [
    "#311: Nick Thompson — Editor-In-Chief of WIRED",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-podcasts-nick-thompson/",
  ],
  [
    "#312: Joseph Gordon-Levitt — Actor, Filmmaker, and Entrepreneur",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-joseph-gordon-levitt/",
  ],
  [
    "#313: Michael Pollan — Exploring The New Science of Psychedelics",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-michael-pollan/",
  ],
  [
    "#314: Cindy Eckert (formerly Whitehead) — How to Sell Your Company For One Billion Dollars",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-cindy-eckert/",
  ],
  [
    "#315: Lessons Learned Traveling The World",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-lessons-learned-traveling-the-world/",
  ],
  [
    "#316: Whitney Wolfe Herd — Founder and CEO of Bumble",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-whitney-wolfe-herd/",
  ],
  [
    "#317: Steve Jurvetson — The Midas Touch and Mind-Bending Futures",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-steve-jurvetson/",
  ],
  [
    "#318: One-Person Businesses That Make $1M+ Per Year",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-one-person-businesses-that-make-1m-per-year/",
  ],
  [
    "#319: How to Succeed in High-Stress Situations",
    "https://tim.blog/2018/06/10/how-to-succeed-in-high-stress-situations/",
  ],
  [
    "#320: The Art of Hospitality: An Interview With Entrepreneur and Hotelier Liz Lambert",
    "https://tim.blog/2018/06/26/the-tim-ferriss-show-transcripts-liz-lambert/",
  ],
  [
    "#321: Brandon Stanton — The Story of Humans of New York and 25M+ Fans",
    "https://tim.blog/2018/06/27/the-tim-ferriss-show-transcripts-brandon-stanton/",
  ],
  [
    "#322: Adam Robinson — Outflanking and Outsmarting the Competition",
    "https://tim.blog/2018/06/30/the-tim-ferriss-show-transcripts-adam-robinson-outflanking-and-outsmarting-the-competition/",
  ],
  [
    "#323: Tim Ferriss Goes to Maximum Security Prison",
    "https://tim.blog/2018/06/30/the-tim-ferriss-show-transcripts-tim-ferriss-goes-to-maximum-security-prison/",
  ],
  [
    "#324: Cal Fussman Corners Tim Ferriss",
    "https://tim.blog/2018/07/05/the-tim-ferriss-show-transcripts-cal-fussman-corners-tim-ferriss/",
  ],
  [
    "#325: Lessons from Richard Branson, Tony Robbins, Ray Dalio, and Other Icons",
    "https://tim.blog/2018/07/07/the-tim-ferriss-show-transcripts-lessons-from-richard-branson-tony-robbins-ray-dalio-and-other-icons-325/",
  ],
  [
    "#326: Reid Hoffman of LinkedIn, Brian Chesky of Airbnb, and How to Scale to 100M+ Users",
    "https://tim.blog/2018/07/13/the-tim-ferriss-show-transcripts-reid-hoffman-brian-chesky-how-to-scale-to-100m-users/",
  ],
  [
    "#327: Aisha Tyler — How to Use Pain, Comedy, and Practice for Creativity",
    "https://tim.blog/2018/07/18/the-tim-ferriss-show-transcripts-aisha-tyler/",
  ],
  [
    "#328: How to Say “No” Gracefully and Uncommit ",
    "https://tim.blog/2018/07/19/essentialism/",
  ],
  [
    "#329: Jason Fried — How to Live Life on Your Own Terms",
    "https://tim.blog/2018/07/25/the-tim-ferriss-show-transcripts-jason-fried/",
  ],
  [
    "#330: The Return of Drunk Dialing Q&A: How to Ask Better Questions, Take Better Risks, and More!",
    "https://tim.blog/2018/08/01/the-tim-ferriss-show-transcripts-the-return-of-drunk-dialing-how-to-ask-better-questions-take-better-risks-and-more/",
  ],
  [
    "#331: Ann Miura-Ko — The Path from Shyness to World-Class Debater and Investor",
    "https://tim.blog/2018/08/07/the-tim-ferriss-show-transcripts-ann-miura-ko/",
  ],
  [
    "#332: Coach George Raveling — A Legend on Sports, Business, and The Great Game of Life",
    "https://tim.blog/2018/08/11/the-tim-ferriss-show-transcripts-coach-george-raveling/",
  ],
  [
    "#333: Random Show — Fasting, Biohacking, and Tony Robbins",
    "https://tim.blog/2018/08/20/the-tim-ferriss-show-transcripts-random-show-fasting-biohacking-and-tony-robbins/",
  ],
  [
    "#334: Drew Houston — The Billionaire Founder of Dropbox",
    "https://tim.blog/2018/08/29/the-tim-ferriss-show-transcripts-drew-houston/",
  ],
  [
    "#335: The Life Lessons and Success Habits of Four Presidents — Doris Kearns Goodwin",
    "https://tim.blog/2018/09/11/the-tim-ferriss-show-transcripts-doris-kearns-goodwin/",
  ],
  [
    "#336: Scott Belsky — How to Conquer the Messy Middle",
    "https://tim.blog/2018/09/17/the-tim-ferriss-show-transcripts-scott-belsky/",
  ],
  [
    "#337: Hamilton Morris on Better Living Through Chemistry: Psychedelics, Smart Drugs, and More",
    "https://tim.blog/2018/09/24/the-tim-ferriss-show-transcripts-hamilton-morris/",
  ],
  [
    "#338: Howard Marks  —  How to Invest with Clear Thinking",
    "https://tim.blog/2018/09/27/the-tim-ferriss-show-transcripts-howard-marks/",
  ],
  [
    "#339: Samin Nosrat  —  Master Creative, Master Teacher",
    "https://tim.blog/2018/10/04/the-tim-ferriss-show-transcripts-samin-nosrat/",
  ],
  [
    "#340: Paul Stamets  —  How Mushrooms Can Save You and (Perhaps) the World",
    "https://tim.blog/2018/10/15/the-tim-ferriss-show-transcripts-paul-stamets/",
  ],
  [
    "#341: Nick Kokonas  —  How to Apply World-Class Creativity to Business, Art, and Life",
    "https://tim.blog/2018/10/22/the-tim-ferriss-show-transcripts-nick-kokonas/",
  ],
  [
    "#342: Sam Harris, Ph.D.  —  How to Master Your Mind",
    "https://tim.blog/2018/10/31/the-tim-ferriss-show-transcripts-sam-harris-342/",
  ],
  [
    "#343: Seth Godin on How to Say “No,” Market Like a Professional, and Win at Life",
    "https://tim.blog/2018/11/05/the-tim-ferriss-show-transcripts-seth-godin/",
  ],
  [
    "#344: A.J. Jacobs  —  10 Strategies to Be Happier Through Gratitude",
    "https://tim.blog/2018/11/08/the-tim-ferriss-show-transcripts-a-j-jacobs-344/",
  ],
  [
    "#345: Doug McMillon  —  CEO of Walmart ",
    "https://tim.blog/2018/11/12/the-tim-ferriss-show-podcasts-doug-mcmillon/",
  ],
  [
    "#346: James Cameron and Suzy Amis Cameron  —  How to Think Big, Start Small, and Change the World",
    "https://tim.blog/2018/11/15/the-tim-ferriss-show-transcripts-james-cameron-and-suzy-amis-cameron/",
  ],
  [
    "#347: Stan Grof, Lessons from ~4,500 LSD Sessions and Beyond",
    "https://tim.blog/2018/11/22/the-tim-ferriss-show-transcripts-stan-grof/",
  ],
  [
    "#348: Dave Elitch  —  How to Get Out of Your Own Way",
    "https://tim.blog/2018/11/28/the-tim-ferriss-show-transcripts-dave-elitch/",
  ],
  [
    "#349: LeBron James and His Top-Secret Trainer, Mike Mancias",
    "https://tim.blog/2018/11/30/the-tim-ferriss-show-transcripts-lebron-james-and-mike-mancias/",
  ],
  [
    "#350: Dr. Andrew Weil  —  Optimal Health, Plant Medicine, and More",
    "https://tim.blog/2018/12/10/the-tim-ferriss-show-transcripts-dr-andrew-weil/",
  ],
  [
    "#351: Real 4-Hour Workweek Case Studies — Allen Walton and SpyGuy, The Path to Seven Figures",
    "https://tim.blog/2018/12/13/the-tim-ferriss-show-transcripts-allen-walton-and-spyguy-the-path-to-seven-figures/",
  ],
  [
    "#352: Dr. Peter Attia vs. Tim Ferriss",
    "https://tim.blog/2018/12/20/the-tim-ferriss-show-transcripts-dr-peter-attia-vs-tim-ferriss/",
  ],
  [
    "#353: Patrick Collison — CEO of Stripe",
    "https://tim.blog/2018/12/24/the-tim-ferriss-show-patrick-collison/",
  ],
  [
    "#354: How to Generate 8-Figure Revenue at Age 21 (or Any Age) Real 4-Hour Workweek Case Studies (Benedict Dohmen, Santiago Nestares, Elaine Pofeldt)",
    "https://tim.blog/2019/01/02/the-tim-ferriss-show-transcripts-benedict-dohmen-and-santiago-nestares-with-elaine-pofeldt/",
  ],
  [
    "#355: Greg McKeown — How to Master Essentialism",
    "https://tim.blog/2019/01/12/the-tim-ferriss-show-transcripts-greg-mckeown/",
  ],
  [
    "#356: Peter Mallouk — Exploring the Worlds of Investing, Assests, and Quality of Life",
    "https://tim.blog/2019/01/21/the-tim-ferriss-show-transcripts-peter-mallouk/",
  ],
  [
    "#357: Susan Cain — How to Overcome Fear and Embrace Creativity",
    "https://tim.blog/2019/01/28/the-tim-ferriss-show-transcripts-susan-cain/",
  ],
  [
    "#358: Ken Block — The Art of Marketing with a DC Shoes and Gymkhana Legend (500M+ Views)",
    "https://tim.blog/2019/02/04/the-tim-ferriss-show-transcripts-ken-block/",
  ],
  [
    "#359: Tobi Lütke — From Snowboard Shop to Billion-Dollar Company",
    "https://tim.blog/2019/02/11/the-tim-ferriss-show-transcripts-tobi-lutke/",
  ],
  [
    "#360: Caterina Fake — The Outsider Who Built Giants",
    "https://tim.blog/2019/02/21/the-tim-ferriss-show-transcripts-caterina-fake-360/",
  ],
  [
    "#361: Jim Collins — A Rare Interview with a Reclusive Polymath",
    "https://tim.blog/2019/02/20/the-tim-ferriss-show-transcripts-jim-collins-361/",
  ],
  [
    "#362: Graham Duncan — Talent Is the Best Asset Class",
    "https://tim.blog/2019/03/01/the-tim-ferriss-show-transcripts-graham-duncan-362/",
  ],
  [
    "#363: Tea Time with Tim — How to Find Mentors, Decrease Anxiety Through Training, and Much More",
    "https://tim.blog/2019/03/12/the-tim-ferriss-show-transcripts-tea-time-with-tim-363/",
  ],
  [
    "#364: Safi Bahcall — On Thinking Big, Curing Cancer, and Transforming Industries",
    "https://tim.blog/2019/03/19/the-tim-ferriss-show-transcripts-safi-bahcall/",
  ],
  [
    "#365: Michael Pollan — Exploring the Frontiers of Psychedelics",
    "https://tim.blog/2019/03/24/the-tim-ferriss-show-transcripts-michael-pollan-365/",
  ],
  [
    "#366: Neil Gaiman — The Interview I’ve Waited 20 Years to Do",
    "https://tim.blog/2019/03/30/the-tim-ferriss-show-transcripts-neil-gaiman-366/",
  ],
  [
    "#367: Eric Schmidt — Lessons Learned from a Trillion-Dollar Coach",
    "https://tim.blog/2019/04/11/the-tim-ferriss-show-transcripts-eric-schmidt-367/",
  ],
  [
    "#368: Amanda Palmer — On Creativity, Pain and Art",
    "https://tim.blog/2019/04/22/the-tim-ferriss-show-transcripts-amanda-palmer-on-creativity-pain-and-art-368/",
  ],
  [
    "#369: Kevin Systrom — Tactics, Books, and the Path to a Billion Users",
    "https://tim.blog/2019/04/30/the-tim-ferriss-show-transcripts-kevin-systrom-369/",
  ],
  [
    "#370: Adam Savage on Great Tools, Great Projects, and Great Lessons",
    "https://tim.blog/2019/05/08/the-tim-ferriss-show-transcripts-adam-savage-370/",
  ],
  [
    "#371: Ramit Sethi — Automating Finances, Negotiating Prenups, Disagreeing with Tim, and More",
    "https://tim.blog/2019/05/23/the-tim-ferriss-show-transcripts-ramit-sethi-automating-finances-negotiating-prenups-disagreeing-with-tim-and-more-371/",
  ],
  [
    "#372: Julie Rice — Co-Founding Soul Cycle, Taming Anxiety, and Mastering Difficult Conversations",
    "https://tim.blog/2019/06/05/the-tim-ferriss-show-transcripts-julie-rice-371/",
  ],
  [
    "#373: Jerry Colonna — The Coach with the Spider Tattoo",
    "https://tim.blog/2019/06/14/the-tim-ferriss-show-transcripts-jerry-colonna-373/",
  ],
  [
    "#374: Chip Conley — Building Empires, Tackling Cancer, and Surfing the Liminal",
    "https://tim.blog/2019/06/24/the-tim-ferriss-show-transcripts-chip-conley/",
  ],
  [
    "#375: Josh Waitzkin — How to Cram 2 Months of Learning into 1 Day",
    "https://tim.blog/2019/07/03/the-tim-ferriss-show-transcripts-josh-waitzkin-how-to-cram-2-months-of-learning-into-1-day-375/",
  ],
  [
    "#376: (Rebroadcast) How Seth Godin Manages His Life — Rules, Principles, and Obsessions",
    "https://tim.blog/wp-content/uploads/2018/09/138-seth-godin.pdf",
  ],
  [
    "#377: Psychedelics — Microdosing, Mind-Enhancing Methods, and More",
    "https://tim.blog/2019/07/17/the-tim-ferriss-show-transcripts-psychedelics-microdosing-mind-enhancing-methods-and-more-377/",
  ],
  [
    "#378: Nick Norris — Navy SEAL and Athlete on Training, Post-Traumatic Growth, and Healing",
    "https://tim.blog/2019/07/22/the-tim-ferriss-show-transcripts-nick-norris-navy-seal-and-athlete-on-training-post-traumatic-growth-and-healing-378/",
  ],
  [
    "#379: Dita Von Teese — The Queen of Burlesque",
    "https://tim.blog/2019/07/31/the-tim-ferriss-show-transcripts-dita-von-teese-the-queen-of-burlesque-379/",
  ],
  [
    "#380: Ed Zschau — The Polymath Professor Who Changed My Life",
    "https://tim.blog/2019/08/07/the-tim-ferriss-show-transcripts-ed-zschau-the-polymath-professor-who-changed-my-life-380/",
  ],
  [
    "#382: Safi Bahcall — On Hypnosis, Conquering Insomnia, Incentives, and More",
    "https://tim.blog/2019/08/21/the-tim-ferriss-show-transcripts-safi-bahcall-on-hypnosis-conquering-insomnia-incentives-and-more-382/",
  ],
  [
    "#383: Mike Phillips — How to Save a Species",
    "https://tim.blog/2019/08/23/the-tim-ferriss-show-transcripts-mike-phillips-how-to-save-a-species-383/",
  ],
  [
    "#384: David Allen — The Art of Getting Things Done",
    "https://tim.blog/2019/09/05/the-tim-ferriss-show-transcripts-david-allen-the-art-of-getting-things-done-gtd-384/",
  ],
  [
    "#386: Ken Burns — A Master Filmmaker on Creative Process, the Long Game, and the Noumenal",
    "https://tim.blog/2019/09/18/the-tim-ferriss-show-transcripts-ken-burns-a-master-filmmaker-on-creative-process-the-long-game-and-the-noumenal-386/",
  ],
  [
    "#387: Tristan Harris — Fighting Skynet and Firewalling Attention",
    "https://tim.blog/2019/09/24/the-tim-ferriss-show-transcripts-tristan-harris-fighting-skynet-and-firewalling-attention-387/",
  ],
  [
    "#388: Lisa Ling — Exploring Subcultures, Learning to Feel, and Changing Perception",
    "https://tim.blog/2019/10/06/lisa-ling-transcript/",
  ],
  [
    "#389: Neil de Grasse Tyson — How to Dream Big, Think Scientifically, and Get More Done",
    "https://tim.blog/2019/10/15/neil-degrasse-tyson-transcript/",
  ],
  [
    "#390: Q&A with Tim — On Happiness, Dating, Depressive Episodes, and Much More",
    "https://tim.blog/2019/10/23/fan-supporters-q-and-a-transcript/",
  ],
  [
    "#391: The Random Show — On Fasting, Forest Bathing, How to Say NO, Rebooting the Self, and Much More",
    "https://tim.blog/2019/10/31/random-show-kevin-rose-391-transcript/",
  ],
  [
    "#392: Ben Horowitz — What You Do Is Who You Are >> Lessons from Silicon Valley, Andy Grove, Genghis Khan, Slave Revolution, and More",
    "https://tim.blog/2019/11/12/ben-horowitz-transcript/",
  ],
  [
    "#393: Edward Norton — On Creative Process, Creative Struggle, and Motherless Brooklyn",
    "https://tim.blog/2019/11/12/edward-norton-transcript/",
  ],
  [
    "#394: Q&A with Tim — On Wealth, Legacy, Grief, Lyme Disease, Gratitude, Longevity, and More",
    "https://tim.blog/2019/11/fan-supporters-2nd-q-and-a-transcript/",
  ],
  [
    "#395: Jocko Willink Takeover — On Quitting, Relationships, Financial Discipline, Contrast Baths, and More",
    "https://tim.blog/2019/11/25/jocko-willink-takeover-transcript/",
  ],
  [
    "#396: Marcela Ot’alora — How to Become a Psychedelic Therapist",
    "https://tim.blog/2019/11/marcela-otalora-transcript/",
  ],
  [
    "#397: Mike Maples and Andy Rachleff: Two Questions Every Entrepreneur Should Answer",
    "https://tim.blog/2019/12/mike-maples-andy-rachleff-transcript/",
  ],
  [
    "#398: Peter Attia, M.D. — Fasting, Metformin, Athletic Performance, and More",
    "https://tim.blog/2019/12/peter-attia-transcript/",
  ],
  [
    "#399: Adam Grant — The Man Who Does Everything",
    "https://tim.blog/2019/12/20/adam-grant-transcripts/",
  ],
  [
    "#400: Books I’ve Loved: Tim’s Four Must-Read Books",
    "https://tim.blog/2019/12/18/tim-ferriss-recommended-books-transcript/",
  ],
  [
    "#401: Gary Keller — How to Focus on the One Important Thing",
    "https://tim.blog/2019/12/18/gary-keller-transcript/",
  ],
  [
    "#402: Books I’ve Loved — Seth Godin and Esther Perel",
    "https://tim.blog/2019/12/20/seth-godin-esther-perel-recommended-books-transcript/",
  ],
  [
    "#403: Tony Fadell — On Building the iPod, iPhone, Nest, and a Life of Curiosity",
    "https://tim.blog/2020/01/27/tony-fadell-transcript/",
  ],
  [
    "#404: Books I’ve Loved — Steve Jurvetson",
    "https://tim.blog/2020/01/27/steve-jurvetson-recommended-books-transcript/",
  ],
  [
    "#405: Penn Jillette on Magic, Losing 100+ Pounds, and Weaponizing Kindness",
    "https://tim.blog/2020/01/27/penn-jillette-transcript/",
  ],
  [
    "#406: Bob Iger — CEO and Chairman of Disney",
    "https://tim.blog/2020/01/27/bob-iger-transcript/",
  ],
  [
    "#407: Sam Zell — Strategies for High-Stakes Investing, Deal-Making, and Grave-Dancing",
    "https://tim.blog/2020/03/08/sam-zell-transcript/",
  ],
  [
    "#408: The Random Show — New Year’s Resolutions, 2010–2019 Lessons Learned, Finding Joy, Energy Management, and Much More",
    "https://tim.blog/2020/03/09/random-show-transcript-408/",
  ],
  [
    "#409: Brené Brown — Striving versus Self-Acceptance, Saving Marriages, and More",
    "https://tim.blog/2020/03/13/brene-brown-transcript-409/",
  ],
  [
    "#410: Ryan Holiday — Turning the Tables",
    "https://tim.blog/2020/03/13/ryan-holiday-transcript-410/",
  ],
  [
    "#411: Richard Turner — The Magical Phenom Who Will Blow Your Mind",
    "https://tim.blog/2020/03/14/richard-turner-transcript/",
  ],
  [
    "#412: Josh Waitzkin on Beginner’s Mind, Self-Actualization, and Advice from Your Future Self",
    "https://tim.blog/2020/03/14/josh-waitzkin-transcript-412/",
  ],
  [
    "#413: Tyler Cowen on Rationality, COVID-19, Talismans, and Life on the Margins",
    "https://tim.blog/2020/05/09/tyler-cowen-transcript/",
  ],
  [
    "#414: Jack Kornfield — How to Find Peace Amidst COVID-19, How to Cultivate Calm in Chaos",
    "https://tim.blog/2020/05/09/jack-kornfield-covid19-transcript/",
  ],
  [
    "#415: Lori Gottlieb — The Power of Getting to *Unknow* Yourself",
    "https://tim.blog/2020/05/09/lori-gottlieb-transcript/",
  ],
  [
    "#416: How to Support Healthcare Workers Now — Plus Urgent Suggestions for Uber Eats, Hilton, Amazon, and More",
    "https://tim.blog/2020/05/09/how-to-support-healthcare-workers-now-transcript/",
  ],
  [
    "#417: Dr. Vivek Murthy — Former Surgeon General on Combating COVID-19, Loneliness, and More",
    "https://tim.blog/2020/05/09/vivek-murthy-transcript/",
  ],
  [
    "#418: Esther Perel — Tactics for Relationships in Quarantine",
    "https://tim.blog/2020/05/13/esther-perel-relationships-in-quarantine-transcript/",
  ],
  [
    "#419: Ryan Holiday — How to Use Stoicism to Choose Alive Time Over Dead Time",
    "https://tim.blog/2020/05/13/ryan-holiday-stoicism-transcript/",
  ],
  [
    "#420: Books I’ve Loved — Matt Mullenweg",
    "https://tim.blog/2020/05/13/matt-mullenweg-book-recommendations-transcript/",
  ],
  [
    "#421: Dr. Jane Goodall — The Legend, The Lessons, The Hope",
    "https://tim.blog/2020/05/13/jane-goodall-transcript/",
  ],
  [
    "#423: Rana el Kaliouby — AI, Emotional Intelligence, and the Journey of Finding Oneself",
    "https://tim.blog/2020/05/13/rana-el-kaliouby-transcript/",
  ],
  [
    "#424: Brian Koppelman on Making Art, Francis Ford Coppola, Building Momentum and More",
    "https://tim.blog/2020/05/14/brian-koppelman-transcript/",
  ],
  [
    "#425: Books I’ve Loved — Cindy Eckert and Alexis Ohanian",
    "https://tim.blog/2020/05/14/books-ive-loved-cindy-eckert-alexis-ohanian-transcript/",
  ],
  [
    "#426: The Random Show — Boozy Quarantine Edition!",
    "https://tim.blog/2020/05/14/random-show-boozy-quarantine-edition-transcript/",
  ],
  [
    "#427: Michael Lewis — Inside the Mind of the Iconic Writer",
    "https://tim.blog/2020/05/14/michael-lewis-transcript/",
  ],
  [
    "#428: Jim Jefferies on Comedy, Life Lessons, and the Magic of Filling Out Customs Forms",
    "https://tim.blog/2020/05/16/jim-jefferies-transcript/",
  ],
  [
    "#429: Nick Kokonas on Resurrecting Restaurants, Skin in the Game, and Investing",
    "https://tim.blog/2020/05/17/nick-kokonas-2-transcript/",
  ],
  [
    "#430: Elizabeth Gilbert’s Creative Path: Saying No, Trusting Your Intuition, Index Cards, Integrity Checks, Grief, Awe, and Much More",
    "https://tim.blog/2020/05/17/elizabeth-gilbert-transcript/",
  ],
  [
    "#431: Howard Marks on the US Dollar, Three Ways to Add Defense, and Good Questions",
    "https://tim.blog/2020/05/18/howard-marks-2-transcript/",
  ],
  [
    "#432: Books I’ve Loved — Kevin Kelly",
    "https://tim.blog/2020/05/18/kevin-kelly-book-recommendations-transcript/",
  ],
  [
    "#433: Sam Harris on Psychedelics, How to Cope During a Pandemic, Taming Anxiety, and More",
    "https://tim.blog/2020/05/18/sam-harris-2-transcript/",
  ],
  [
    "#434: Jim Dethmer — How to Shift from Victim Consciousness, Reduce Drama, Practice Candor, Be Fully Alive, and More",
    "https://tim.blog/2020/06/09/jim-dethmer-transcript/",
  ],
  [
    "#435: Kevin Hart — The Unstoppable Combination of Positivity and Relentless Improvement",
    "https://tim.blog/2020/06/15/kevin-hart-transcript/",
  ],
  [
    "#436: Books I’ve Loved — Maria Popova and Tyler Cowen",
    "https://tim.blog/2020/06/15/maria-popova-tyler-cowen-book-recommendations-transcript/",
  ],
  [
    "#437: Secretary Madeleine Albright — Optimism, the Future of the US, and 450-Pound Leg Presses",
    "https://tim.blog/2020/06/17/secretary-madeleine-albright-transcript/",
  ],
  [
    "#438: Coach George Raveling on This Unique Moment in Time, How to Practice Self-Leadership, Navigating Difficult Conversations, and Much More",
    "https://tim.blog/2020/06/19/coach-george-raveling-transcript/",
  ],
  [
    "#440: Rick Doblin — The Psychedelic Domino That Tips All Others",
    "https://tim.blog/2020/06/19/rick-doblin-transcript/",
  ],
  [
    "#441: John Paul DeJoria — From Homelessness to Building Paul Mitchell and Patrón Tequila",
    "https://tim.blog/2020/06/20/john-paul-dejoria-transcript/",
  ],
  [
    "#443: David Yarrow on Art, Markets, Business, and Combining It All",
    "https://tim.blog/2020/06/27/david-yarrow-transcript/",
  ],
  [
    "#444: Hugh Jackman on Best Decisions, Daily Routines, The 85% Rule, Favorite Exercises, Mind Training, and Much More",
    "https://tim.blog/2020/06/30/hugh-jackman-transcript/",
  ],
  [
    "#445: Janna Levin on Extra Dimensions, Time Travel, and How to Overcome Boots in the Face",
    "https://tim.blog/2020/07/09/janna-levin-transcript/",
  ],
  [
    "#446: Blake Mycoskie — TOMS, The Hoffman Process, Conscious Uncoupling, and Psychedelics",
    "https://tim.blog/2020/07/17/blake-mycoskie-2-transcript/",
  ],
  [
    "#447: Books I’ve Loved — Ann Miura-Ko",
    "https://tim.blog/2020/07/17/ann-miura-ko-book-recommendations-transcript/",
  ],
  [
    "#448: Brad Feld — The Art of Unplugging, Carving Your Own Path, and Riding the Entrepreneurial Rollercoaster",
    "https://tim.blog/2020/07/24/brad-feld-transcript/",
  ],
  [
    "#449: Grandmaster Maurice Ashley on the Magic of Chess, the Art of Trash-Talking, Must-Read Biographies, and More",
    "https://tim.blog/2020/07/30/maurice-ashley-transcript/",
  ],
  [
    "#450: Neil Strauss — Books I’ve Loved",
    "https://tim.blog/2020/08/01/neil-strauss-book-recommendations-transcript/",
  ],
  [
    "#451: Mike Novogratz on Bitcoin, Macro Trading, Ayahuasca, Redemption, and More",
    "https://tim.blog/2020/08/08/mike-novogratz-transcript/",
  ],
  [
    "#452: Sia — The Alchemy of Blockbuster Songs, Billions of Views, and the Face You’ve Never Seen",
    "https://tim.blog/2020/08/13/sia-transcript/",
  ],
  [
    "#453: The Random Show — Zen, Investing, Mike Tyson, Artificial Intelligence, and the World’s Best Beers (#453)",
    "https://tim.blog/2020/08/22/the-random-show-zen-investing-and-more-transcript/",
  ],
  [
    "#454: Books I’ve Loved — Whitney Cummings",
    "https://tim.blog/2020/08/22/whitney-cummings-book-recommendations-transcript/",
  ],
  [
    "#455: Rabbi Lord Jonathan Sacks on Powerful Books, Mystics, Richard Dawkins, and the Dangers of Safe Spaces",
    "https://tim.blog/2020/08/29/rabbi-lord-jonathan-sacks-transcript/",
  ],
  [
    "#457: Chuck Palahniuk, Author of Fight Club — A Masterclass in Creative Living and Dangerous Writing",
    "https://tim.blog/2020/09/05/chuck-palahniuk-transcript/",
  ],
  [
    "#458: The Psychedelic News Hour: New Breakthroughs, Compound Comparisons and Warnings (Psilocybin/LSD/Ayahuasca/N,N-DMT/5-MeO-DMT), Treatment of Trauma, Scalable vs. Unscalable Approaches, Making Sense of “Bad” Trips, and Much More",
    "https://tim.blog/2020/09/05/psychedelic-news-hour-transcript/",
  ],
  [
    "#459: “Books I’ve Loved” — Alain de Botton",
    "https://tim.blog/2020/09/05/alain-de-botton-book-recommendations-transcript/",
  ],
  [
    "#461: Kelly Slater — The Surfing Legend on Routine, Rickson Gracie, Favorite Books, and Overcoming Setbacks",
    "https://tim.blog/2020/09/12/kelly-slater-transcript/",
  ],
  [
    "#462: Guy Raz on Building ‘How I Built This,’ Managing Depression, and Podcast Ecosystem Predictions",
    "https://tim.blog/2020/09/14/guy-raz-transcript/",
  ],
  [
    "#466: Richard Koch on Mastering the 80/20 Principle, Achieving Unreasonable Success, and the Art of Gambling",
    "https://tim.blog/2020/09/29/richard-koch-transcript/",
  ],
  [
    "#467: Dustin Yellin on Making Art, Weaving Madness, and Forging Your Own Path",
    "https://tim.blog/2020/09/29/dustin-yellin-transcript/",
  ],
  [
    "#468: “Books I’ve Loved” — Cal Fussman",
    "https://tim.blog/2020/10/07/cal-fussman-book-recommendations-transcript/",
  ],
  [
    "#469: Dr. Mark Plotkin on Ethnobotany, Real vs. Fake Shamans, Hallucinogens, and the Dalai Lamas of South America",
    "https://tim.blog/2020/10/08/mark-plotkin-transcript/",
  ],
  [
    "#470: Steven Rinella on Hunting (and Why You Should Care), Reconnecting with Nature, Favorite Trips, and More",
    "https://tim.blog/2020/10/18/steven-rinella-transcript/",
  ],
  [
    "#471: Adam Grant — How to Remember Anything",
    "https://www.ted.com/talks/worklife_with_adam_grant_how_to_remember_anything/transcript#t-1869813",
  ],
  [
    "#472: Books I’ve Loved — Debbie Millman",
    "https://tim.blog/2020/10/18/https-tim-blog-2020-10-09-debbie-millman-book-recommendations-transcript/",
  ],
  [
    "#473: Naval Ravikant on Happiness, Reducing Anxiety, Crypto Stablecoins, and Crypto Strategy",
    "https://tim.blog/2020/10/15/naval-transcript/",
  ],
  [
    "#474: Matthew McConaughey on His Success Playbooks, the Powerful Philosophy of Greenlights, and Choosing the Paths Less Traveled",
    "https://tim.blog/2020/10/19/matthew-mcconaughey-transcript/",
  ],
  [
    "#476: Seth Godin on The Game of Life, The Value of Hacks, and Overcoming Anxiety",
    "https://tim.blog/2020/10/29/seth-godin-the-practice-transcript/",
  ],
  [
    "#477: Yuval Noah Harari on The Story of Sapiens, The Power of Awareness, and The Brilliance of Bone-Conduction Headphones",
    "https://tim.blog/2020/10/30/yuval-noah-harari-transcript/",
  ],
  [
    "#478: Scott Kelly — Lessons Learned from 500+ Days in Space, Life-Changing Books, and The Art of Making Hard Choices",
    "https://tim.blog/2020/11/07/scott-kelly-transcript/",
  ],
  [
    "#479: Mary Karr — The Master of Memoir on Creative Process and Finding Gifts in the Suffering",
    "https://tim.blog/2020/11/12/mary-karr-transcript/",
  ],
  [
    "#480: Dax Shepard on the Craft of Podcasting, Favorite Books, and Dancing with Your Demons",
    "https://tim.blog/2020/11/19/dax-shepard-transcript/",
  ],
  [
    "#481: Dan Harris on Becoming 10% Happier, Hugging Inner Dragons, Self-Help for Skeptics, Training the Mind, and Much More",
    "https://tim.blog/2020/11/19/dan-harris-transcript/",
  ],
  [
    "#482: Steven Rinella — A Short Introduction to True Wilderness Skills and Survival",
    "https://tim.blog/2020/11/26/steven-rinella-wilderness-skills-and-survival-transcript/",
  ],
  [
    "#483: Jim Collins — The Return of a Reclusive Polymath",
    "https://tim.blog/2020/12/04/jim-collins-returns-transcript/",
  ],
  [
    "#484: Daniel Ek, CEO of Spotify — The Art of Seeing Around Corners, Two-Year Missions, Top Books, and the Essence of Fire Soul",
    "https://tim.blog/2020/12/06/daniel-ek-transcript/",
  ],
  [
    "#485: Jerry Seinfeld — A Comedy Legend’s Systems, Routines, and Methods for Success",
    "https://tim.blog/2020/12/09/jerry-seinfeld-transcript/",
  ],
  [
    "#486: Harley Finkelstein — Tactics and Strategies from Shopify, the Future of Retail, and More",
    "https://tim.blog/2020/12/11/harley-finkelstein-transcript/",
  ],
  [
    "#487: Dr. Martine Rothblatt — The Incredible Polymath of Polymaths",
    "https://tim.blog/2020/12/17/martine-rothblatt-transcript/",
  ],
  [
    "#488: Leo Babauta on Zen Habits, Antifragility, Contentment, and Unschooling",
    "https://tim.blog/2020/12/27/leo-babauta-transcript/",
  ],
  [
    "#489: Guy Raz Interviews Tim Ferriss — How I Built This — Key Lessons, Critical Decisions, and Reinvention for Fun and Profit",
    "https://tim.blog/2020/12/30/guy-raz-interviews-tim-ferriss-how-i-built-this-transcript/",
  ],
  [
    "#490: Dr. Jim Loehr on Mental Toughness, Energy Management, the Power of Journaling, and Olympic Gold Medals",
    "https://tim.blog/2020/12/30/jim-loehr-2-transcript/",
  ],
  [
    "#491: Dr. Stefi Cohen — 25 World Records, Power Training, Deadlifting 4.4x Bodyweight, Sports Psychology, Overcoming Pain, and More",
    "https://tim.blog/2021/01/09/stefi-cohen-transcript/",
  ],
  [
    "#492: Richard Schwartz — IFS, Psychedelic Experiences without Drugs, and Finding Inner Peace for Our Many Parts",
    "https://tim.blog/2021/01/15/richard-schwartz-internal-family-systems-transcript/",
  ],
  [
    "#493: The Random Show — Bitcoin Pros and Cons, 2021 Resolutions, Fave Books, Lucid Dreaming, Couples Therapy, and More (#493)",
    "https://tim.blog/2021/01/23/the-random-show-bitcoin-pros-and-cons-2021-resolutions-fave-books-lucid-dreaming-couples-therapy-transcript/",
  ],
  [
    "#494: Michael Phelps and Grant Hackett — Two Legends on Competing, Overcoming Adversity, Must-Read Books, and Much More",
    "https://tim.blog/2021/01/23/michael-phelps-grant-hackett-transcript/",
  ],
  [
    "#495: David Rubenstein, Co-Founder of The Carlyle Group, on Lessons Learned, Jeff Bezos, Raising Billions of Dollars, Advising Presidents, and Sprinting to the End",
    "https://tim.blog/2021/01/28/david-rubenstein-transcript/",
  ],
  [
    "#496: Marc Randolph on Building Netflix, Battling Blockbuster, Negotiating with Amazon/Bezos, and Scraping the Barnacles Off the Hull",
    "https://tim.blog/2021/02/01/marc-randolph-transcript/",
  ],
  [
    "#497: Joyce Carol Oates — A Writing Icon on Creative Process and Creative Living",
    "https://tim.blog/2021/02/11/joyce-carol-oates-transcript/",
  ],
  [
    "#498: Josh Waitzkin and Tim Ferriss on The Cave Process, Advice from Future Selves, and Training for an Uncertain Future (#498)",
    "https://tim.blog/2021/02/18/josh-waitzkin-2-transcript/",
  ],
  [
    "#499: Katie Haun on the Dark Web, Gangs, Investigating Bitcoin, and The New Magic of “Nifties” (NFTs)",
    "https://tim.blog/2021/02/24/katie-haun-transcript/",
  ],
  [
    "#500: KevKev TimTim TalkTalk on Dragon Slaying, Lessons Learned, Viagra, and Assorted Nonsense (#500)",
    "https://tim.blog/2021/02/26/episode-500-kevkev-timtim-talktalk-transcript/",
  ],
  [
    "#501: Steven Pressfield on The Artist’s Journey, the Wisdom of Little Successes, Shadow Careers, and Overcoming Resistance",
    "https://tim.blog/2021/02/27/steven-pressfield-transcript/",
  ],
  [
    "#502: Jordan Peterson on Rules for Life, Psychedelics, The Bible, and Much More",
    "https://tim.blog/2021/03/02/jordan-peterson-transcript/",
  ],
  [
    "#503: Walter Isaacson on CRISPR, Jennifer Doudna, Gene Editing, and the Future of the Human Race",
    "https://tim.blog/2021/03/04/walter-isaacson-2-transcript/",
  ],
  [
    "#504: Vitalik Buterin, Creator of Ethereum, on Understanding Ethereum, ETH vs. BTC, ETH2, Scaling Plans and Timelines, NFTs, Future Considerations, Life Extension, and More (Featuring Naval Ravikant)",
    "https://tim.blog/2021/03/09/vitalik-buterin-naval-ravikant-transcript/",
  ],
  [
    "#505: Elizabeth Lesser on Building Omega Institute, Intentional Communities, ADD (Authenticity Deficit Disorder), the Value of Grief, and the Emotion of Illumination",
    "https://tim.blog/2021/03/17/elizabeth-lesser-transcript/",
  ],
  [
    "#506: The Episode of Everything: Balaji on Bitcoin and Ethereum, Media Self-Defense, Drone Warfare, Crypto Oracles, India as Dark Horse, The Pseudonymous Economy, Beautiful Trouble, Ramanujan, Life Extension, and More",
    "https://tim.blog/2021/03/25/balaji-srinivasan-transcript/",
  ],
  [
    "#507: Dr. Adam Gazzaley, UCSF — Brain Optimization and the Future of Psychedelic Medicine (#507)",
    "https://tim.blog/2021/03/31/adam-gazzaley-2-transcript/",
  ],
  [
    "#508: Plants of the Gods — Ayahuasca, Shamanic Knowledge, Coca, and the Adventures of Richard Evans Schultes",
    "https://tim.blog/2021/04/08/plants-of-the-gods-transcript/",
  ],
  [
    "#509: George Mumford, Mindfulness Coach to Michael Jordan and Kobe Bryant, on Awareness, Compassionate Action, the Dizziness of Freedom, and More",
    "https://tim.blog/2021/04/16/george-mumford-transcript/",
  ],
  [
    "#510: Greg McKeown — The Art of Effortless Results, How to Take the Lighter Path, the Joys of Simplicity, and More",
    "https://tim.blog/2021/04/27/greg-mckeown-effortless-transcript/",
  ],
  [
    "#511: Hamilton Morris on Iboga, 5-MeO-DMT, the Power of Ritual, New Frontiers in Psychedelics, Excellent Problems to Solve, and More",
    "https://tim.blog/2021/05/03/hamilton-morris-2-transcript/",
  ],
  [
    "#512: Jacqueline Novogratz on Building Acumen, How to (Actually) Change the World, Speaking Your Truth, and the Incredible Power of “Dumb” Questions",
    "https://tim.blog/2021/05/06/jacqueline-novogratz-transcript/",
  ],
  [
    "#513: Sebastian Junger — Seeking Freedom, Near-Death Experiences, and Reordering Your Place in the World",
    "https://tim.blog/2021/05/12/sebastian-junger-freedom-transcript/",
  ],
  [
    "#514: Chip Wilson — Building Lululemon, the Art of Setting Goals, and the 10 Great Decisions of Your Life",
    "https://tim.blog/2021/05/21/chip-wilson-transcript/",
  ],
  [
    "#515: Chris Bosh on How to Reinvent Yourself, The Way and The Power, the Poison of Complaining, Leonardo da Vinci, and More",
    "https://tim.blog/2021/05/31/chris-bosh-transcript/",
  ],
  [
    "#516: Suleika Jaouad on Invaluable Road Trips, the Importance of a To-Feel List, and Finding Artistic Homes",
    "https://tim.blog/2021/06/02/suleika-jaouad-transcript/",
  ],
  [
    "#517: Dr. Peter Attia on Longevity Drugs, Alzheimer’s Disease, and the 3 Most Important Levers to Pull",
    "https://tim.blog/2021/06/14/peter-attia-transcript-2/",
  ],
  [
    "#518: Q&A with Tim — Current Morning and Exercise Routines, Holotropic Breathwork, Ambition vs. Self-Compassion, Daily Practices for Joy, Ontological Shock, and More",
    "https://tim.blog/2021/06/18/qa-with-tim-transcript/",
  ],
  [
    "#520: Michael Pollan — This Is Your Mind on Plants",
    "https://tim.blog/2021/06/30/michael-pollan-this-is-your-mind-on-plants-transcript/",
  ],
  [
    "#521: Dr. Andrew Huberman — A Neurobiologist on Optimizing Sleep, Performance, and Testosterone",
    "https://tim.blog/2021/07/08/andrew-huberman-transcript/",
  ],
  [
    "#522: Anne Lamott on Spiritual Fitness, Creative Process, Redecorating the Abyss, and the Perennial Magic of “Bird by Bird”",
    "https://tim.blog/2021/07/15/anne-lamott-transcript/",
  ],
  [
    "#523: Dennis McKenna — The Depths of Ayahuasca: 500+ Sessions, Fundamentals, Advanced Topics, Science, Churches, Learnings, Warnings, and Beyond",
    "https://tim.blog/2021/07/25/dennis-mckenna-transcript/",
  ],
  [
    "#524: Ramit Sethi on How Couples Can Talk about Money, Bucket Lists, the $100 Challenge, and More",
    "https://tim.blog/2021/07/31/ramit-sethi-2-transcript/",
  ],
  [
    "#525: Giuliana Furci on the Wonders of Mycology, Wisdom from Jane Goodall, Favorite Books, and the World’s Largest Fungarium",
    "https://tim.blog/2021/08/05/giuliana-furci-transcript/",
  ],
  [
    "#526: B. Jeffrey Madoff — Dealmaking, the Hidden Persuaders, Working with Ralph Lauren, and Finding the Secret to Life in the Mojave Desert",
    "https://tim.blog/2021/08/14/b-jeffrey-madoff-transcript/",
  ],
  [
    "#527: The Random Show — Life-Extension Misadventures, Blockchain/Crypto Investing, NFT Experiments, Dogecoin, Zen Buddhism, and Weathering Sharp Elbows",
    "https://tim.blog/2021/08/20/random-show-kevin-rose-nft-crypto-transcript/",
  ],
  [
    "#528: Jimmy Wales, Founder of Wikipedia, on Wikipedia’s Real Genesis Story, Best Business Decisions, Understanding Financial Markets, Developing a Questioning Mind, and the Value of Optimism",
    "https://tim.blog/2021/08/24/jimmy-wales-transcript/",
  ],
  [
    "#529: Iconic Therapist Dr. Sue Johnson on How to Improve Sex, Shape Love, Face Dragons, and Find Comfort in the Arms of Another",
    "https://tim.blog/2021/08/29/dr-sue-johnson-transcript/",
  ],
  [
    "#530: Sir James Dyson — Founder of Dyson and Master Inventor on How to Turn the Mundane into Magic",
    "https://tim.blog/2021/09/03/james-dyson-transcript/",
  ],
  [
    "#531: Henry Shukman — Zen, Tools for Awakening, Ayahuasca vs. Meditation, Intro to Koans, and Using Wounds as the Doorway",
    "https://tim.blog/2021/09/10/henry-shukman-transcript/",
  ],
  [
    "#532: Sheila Heen of the Harvard Negotiation Project — How to Navigate Hard Conversations, the Subtle Art of Apologizing, and a Powerful 60-Day Challenge",
    "https://tim.blog/2021/09/16/sheila-heen-transcript/",
  ],
  [
    "#533: Paul Conti, MD — How Trauma Works and How to Heal from It",
    "https://tim.blog/2021/09/22/paul-conti-trauma-transcript/",
  ],
  [
    "#534: Michael Dell, Founder of Dell — How to Play Nice But Win",
    "https://tim.blog/2021/09/28/michael-dell-transcript/",
  ],
  [
    "#535: General Stanley McChrystal — Mastering Risk: A User’s Guide",
    "https://tim.blog/2021/10/04/general-stanley-mcchrystal-transcript/",
  ],
  [
    "#536: Diana Chapman — How to Get Unstuck, Do “The Work,” Take Radical Responsibility, and Reduce Drama in Your Life",
    "https://tim.blog/2021/10/06/diana-chapman-transcript/",
  ],
  [
    "#538: How I Built The Tim Ferriss Show to 700+ Million Downloads — An Immersive Explanation of All Aspects and Key Decisions (Featuring Chris Hutchins)",
    "https://tim.blog/2021/10/18/how-i-built-the-tim-ferriss-show-podcast-transcript/",
  ],
  [
    "#539: Alisa Cohn on Prenups for Startup Founders, How to Reinvent Your Career, the Importance of “Pre-Mortems,” and the Three Selves",
    "https://tim.blog/2021/10/21/alisa-cohn-transcript/",
  ],
  [
    "#540: Noah Feldman on Hyper-Productivity, Learning 10+ Languages, DAOs, Using History to Become a Futurist, Crypto Constitutions, State Building, and the Supreme Court of Facebook",
    "https://tim.blog/2021/10/26/noah-feldman-transcript/",
  ],
  [
    "#541: Eric Schmidt — The Promises and Perils of AI, the Future of Warfare, Profound Revolutions on the Horizon, and Exploring the Meaning of Life",
    "https://tim.blog/2021/10/27/eric-schmidt-ai-transcript/",
  ],
  [
    "#542: Chris Dixon and Naval Ravikant — The Wonders of Web3, How to Pick the Right Hill to Climb, Finding the Right Amount of Crypto Regulation, Friends with Benefits, and the Untapped Potential of NFTs",
    "https://tim.blog/2021/10/28/chris-dixon-naval-ravikant-transcript/",
  ],
  [
    "#543: Legendary Investor John Doerr on Picking Winners — From Google in 1999 to Solving the Climate Crisis Now ",
    "https://tim.blog/2021/11/04/john-doerr-transcript/",
  ],
  [
    "#545: Marco Canora — The Art of Food, Eating, Nutrition, and Life",
    "https://tim.blog/2021/11/10/marco-canora-transcript/",
  ],
  [
    "#546: Master Magician David Blaine — Fear{less} with Tim Ferriss",
    "https://tim.blog/2021/11/12/david-blaine-fearless-transcript/",
  ],
  [
    "#547: Balaji Srinivasan on Bitcoin, The Great Awokening, Wolf Warrior Diplomacy, Open-Source Ecology, Reputational Civil War, Creating New Cities, and Options for Becoming a Sane but Sovereign Individual",
    "https://tim.blog/2021/11/17/balaji-srinivasan-2-trancript/",
  ],
  [
    "#548: The Lost Presentation That Launched The 4-Hour Workweek — “Secrets of Doing More with Less in a Digital World” from SXSW 2007",
    "https://tim.blog/2021/11/21/sxsw-presentation-2007-the-4-hour-workweek-transcript/",
  ],
  [
    "#549: The Random Show — Biohacking, Tim’s COVID Experience, Holiday Gift Ideas, Favorite New Apps, Bad Science, Quarantine Delights, and a Small Dose of NFTs and DAOs",
    "https://tim.blog/2021/11/30/the-random-show-biohacking-apps-nft-dao-2-transcript/",
  ],
  [
    "#550: Andrew Chen — Growth Secrets from Tinder, Uber, and Twitch; Exploring the Metaverse; the Future of Startup Investing; Games as the Next Social Networks; and How to Pick the Right Metrics",
    "https://tim.blog/2021/12/01/andrew-chen-transcript/",
  ],
  [
    "#551: TOMS Founder Blake Mycoskie — Fear{less} with Tim Ferriss",
    "https://tim.blog/2021/12/05/blake-mycoskie-3-transcript/",
  ],
  [
    "#553: Jessica Lahey on Parenting, Desirable Difficulties, The Gift of Failure, Self-Efficacy, and The Addiction Inoculation",
    "https://tim.blog/2021/12/11/jessica-lahey-transcript/",
  ],
  [
    "#554: Jerry Colonna — How to Take a Two-Month Sabbatical Every Year",
    "https://tim.blog/2021/12/15/jerry-colonna-2-transcript/",
  ],
  [
    "#555: The Liberation of Cosmic Insignificance Therapy",
    "https://tim.blog/2021/12/15/the-liberation-of-cosmic-insignificance-therapy/",
  ],
  [
    "#556: The Incredible Kyle Maynard — Fear{less} with Tim Ferriss",
    "https://tim.blog/2021/12/19/kyle-maynard-2-transcript/",
  ],
  [
    "#557: Q&A with Tim — Tools for Better Sleep, Musings on Parenting, The Different Roles of Fear, The Delight of Deepening Friendships, The Purpose of College, How to Boost Your Mood, HRV Training, and More",
    "https://tim.blog/2021/12/26/qa-with-tim-sleep-parenting-fear-transcript/",
  ],
  [
    "#559: Forget New Year’s Resolutions and Conduct a ‘Past Year Review’ Instead",
    "https://tim.blog/2021/12/27/past-year-review/",
  ],
  [
    "#560: Zen Master Henry Shukman — 20 Minutes of Calm, Plus the Strange and Powerful World of Koans",
    "https://tim.blog/2021/12/31/zen-master-henry-shukman-transcript/",
  ],
  [
    "#561: Rich Roll — From Alcoholic to Ultra-Endurance Star, Rebooting Life at 40, the Trap of Lower Companions, and How to Reinvent Yourself in the New Year",
    "https://tim.blog/2022/01/07/rich-roll-transcript/",
  ],
  [
    "#562: Dr. Michio Kaku — Exploring Time Travel, the Beauty of Physics, Parallel Universes, the Mind of God, String Theory, Lessons from Einstein, and More",
    "https://tim.blog/2022/01/08/michio-kaku-transcript/",
  ],
  [
    "#563: Sarah Silverman — How to Be Your Own Best Friend, Lessons from Therapy, and Grabbing Joy Where You Can Get It",
    "https://tim.blog/2022/01/17/sarah-sliverman-transcript/",
  ],
  [
    "#564: Performance Psychologist Michael Gervais — Fear{less} with Tim Ferriss",
    "https://tim.blog/2022/01/17/michael-gervais-2-transcript/",
  ],
  [
    "#565: Michael Schur, Creator of “The Good Place” — How SNL Trains Writers, His TV University at “The Office,” Lessons from Lorne Michaels, Wisdom from David Foster Wallace, and Exploring Moral Philosophy with “How to Be Perfect”",
    "https://tim.blog/2022/01/22/michael-schur-transcript/",
  ],
  [
    "#566: John List — A Master Economist on Increasing Tipping, Strategic Quitting, Maximizing Charitable Fundraising, Baseball Cards, Theory of Mind, and Valuable Decisions on the Margin",
    "https://tim.blog/2022/01/28/john-list-transcript/",
  ],
  [
    "#567: A Rare Podcast at 30 Below Zero — Sue Flood on Antarctica, Making Your Own Luck, Chasing David Attenborough, and Reinventing Yourself",
    "https://tim.blog/2022/01/30/sue-flood-transcript/",
  ],
  [
    "#568: Cal Newport — The Eternal Pursuit of Craftsmanship, the Deep Life, Slow Productivity, and a 30-Day Digital Minimalism Challenge",
    "https://tim.blog/2022/02/04/cal-newport-transcript/",
  ],
  [
    "#569: ESPN Co-Founder Bill Rasmussen — Fear{less} with Tim Ferriss",
    "https://tim.blog/2022/02/04/bill-rasmussen-fearless-transcript/",
  ],
  [
    "#570: Marine Biologist Dr. Ayana Elizabeth Johnson on How to Catalyze Change with Awe and Wonder, How to Save the Planet, Finding Your Unique Venn Diagram of Strength, and Seeking the Minimum Effective Dose",
    "https://tim.blog/2022/02/13/ayana-elizabeth-johnson-transcript/",
  ],
  [
    "#571: Boyd Varty — The Lion Tracker’s Guide to Life",
    "https://tim.blog/2022/02/18/boyd-varty-transcript/",
  ],
  [
    "#573: Margaret Atwood — A Living Legend on Creative Process, The Handmaid’s Tale, Being a Mercenary Child, Resisting Labels, the Poet Rug Exchange, Liminal Beings, Burning Questions, Practical Utopias, and More",
    "https://tim.blog/2022/02/24/margaret-atwood-transcript/",
  ],
  [
    "#576: Morgan Housel — The Psychology of Money, Picking the Right Game, and the $6 Million Janitor",
    "https://tim.blog/2022/03/05/morgan-housel-the-psychology-of-money-transcript/",
  ],
  [
    "#578: Tim Ferriss and Matt Mullenweg in Antarctica: Exploring Personal Fears, Bucket Lists, Facing Grief, Crafting Life Missions, and Tim’s Best Penguin Impressions",
    "https://tim.blog/2022/03/12/matt-mullenweg-antarctica-transcript/",
  ],
  [
    "#579: Jane McGonigal — How She Predicted COVID in 2010, Becoming the Expert of Your Own Future, Trust Warfare, the 10-Year Winter, and How to Cultivate Optimism",
    "https://tim.blog/2022/03/18/jane-mcgonigal-imaginable-transcript/",
  ],
  [
    "#580: Rock and Roll Hall of Famer Stewart Copeland — Fear{less} with Tim Ferriss",
    "https://tim.blog/2022/03/21/stewart-copeland-fearless-transcript/",
  ],
  [
    "#582: Mark Zuckerberg — Founder and CEO of Meta",
    "https://tim.blog/2022/03/24/mark-zuckerberg-transcript/",
  ],
  [
    "#583: Susan Cain on Transforming Pain, Building Your Emotional Resilience, Exploring Sufi Wisdom, Tapping into Bittersweet Songs, and Seeking the Shards of Light",
    "https://tim.blog/2022/04/02/susan-cain-bittersweet-transcript/",
  ],
  [
    "#584: Bo Shao — His Path from Food Rations to Managing Billions, the Blessings and Burdens of Chasing Perfection, Building the eBay of China in 1999, Pillars of Parenting, and Pursuing the Unpopular",
    "https://tim.blog/2022/04/10/bo-shao-transcript/",
  ],
  [
    "#585: Professor Donald Hoffman — The Case Against Reality, Beyond Spacetime, Rethinking Death, Panpsychism, QBism, and More",
    "https://tim.blog/2022/04/18/donald-hoffman-transcript/",
  ],
  [
    "#586: The Random Show with Kevin Rose — Current Books, Men’s Groups, Tuna Helper, the Latest in NFTs, Fierce Intimacy, and More",
    "https://tim.blog/2022/04/18/the-random-show-with-kevin-rose-transcript/",
  ],
  [
    "#587: Terry Crews — His Journey to True Power",
    "https://tim.blog/2022/04/21/terry-crews-2-transcript/",
  ],
  [
    "#588: A.J. Jacobs — How to Be Less Furious and More Curious",
    "https://tim.blog/2022/04/24/a-j-jacobs-2-transcript/",
  ],
  [
    "#590: Tony Fadell of iPod, iPhone, and Nest Fame — Stories of Steve Jobs on “Vacation,” Product Design and Team Building, Good Assholes vs. Bad Assholes, Investing in Trends Before They Become Trends, The Hydrogen Economy, The Future of Batteries, and More",
    "https://tim.blog/2022/04/29/tony-fadell-build-transcript/",
  ],
  [
    "#591: Tom Morello of Rage Against the Machine Fame — Fear{less} with Tim Ferriss",
    "https://tim.blog/2022/05/01/tom-morello-transcript/",
  ],
  [
    "#592: Dennis McKenna — An Ethnopharmacologist on Hallucinogens, Sex-Crazed Cicadas, The Mushrooms of Language, BioGnosis, and Illuminating Obscure Corners",
    "https://tim.blog/2022/05/08/dennis-mckenna-2-transcript/",
  ],
  [
    "#593: Richard Wiseman on Lessons from Dale Carnegie, How to Keep a Luck Diary, Mentalism, The Psychology of the Paranormal, Mass Participation Experiments, NLP, Remote Viewing, and Attempting the Impossible",
    "https://tim.blog/2022/05/12/richard-wiseman-transcript/",
  ],
  [
    "#594: Cal Newport and Tim Ferriss Revisit The 4-Hour Workweek (Plus: The Allure and The Void of Remote Work, Unsustainable Behaviors, Burning Out, The Cult of Productivity, and More)",
    "https://tim.blog/2022/05/19/cal-newport-and-tim-ferriss-revisit-the-4-hour-workweek-transcript/",
  ],
  [
    "#596: Edward O. Thorp, A Man for All Markets — Beating Blackjack and Roulette, Beating the Stock Market, Spotting Bernie Madoff Early, and Knowing When Enough Is Enough",
    "https://tim.blog/2022/05/28/ed-thorp-transcript/",
  ],
  [
    "#597: Morgan Fallon — 10 Years on the Road with Anthony Bourdain, 9 Emmy Nominations, Lessons from Michael Mann, Adventures with Steven Rinella, High Standards, Wisdom from West Virginia, and More",
    "https://tim.blog/2022/05/29/morgan-fallon-transcript/",
  ],
  [
    "#598: Primatologist Isabel Behncke on Play, Sexual Selection, and Lessons from Following Bonobos for 3,000 Kilometers in the Jungles of Congo",
    "https://tim.blog/2022/06/01/primatologist-isabel-behncke/",
  ],
  [
    "#600: Jason Portnoy of PayPal, Palantir, and More — Porn Addiction, Sexaholics Anonymous, Shame Spirals, and His Path to Recovery and Redemption",
    "https://tim.blog/2022/06/16/jason-portnoy-transcript/",
  ],
  [
    "#601: Jack Kornfield — How to Overcome Apathy and Find Beautiful Purpose",
    "https://tim.blog/2022/06/25/jack-kornfield-2-transcript/",
  ],
  [
    "#602: Legendary Comedian Bill Burr — Fear{less} with Tim Ferriss",
    "https://tim.blog/2022/06/23/bill-burr-2/",
  ],
  [
    "#604: Ed Thorp, The Man for All Markets — How to Think for Yourself, A Real Estate Cautionary Tale, Hedge Fund History and Warnings, The Incredible Power of Basic Numeracy (and How to Develop It), Thought Experiments on Risk, Popular Delusions, Cryptocurrencies, and More",
    "https://tim.blog/2022/06/30/edward-o-thorp-2-transcript/",
  ],
  [
    "#606: Balaji S. Srinivasan — The Network State and How to Start a New Country",
    "https://tim.blog/2022/07/04/balaji-srinivasan-network-state-transcript/",
  ],
  [
    "#607: Luis von Ahn, Co-Founder and CEO of Duolingo — How to Be (Truly) Mission-Driven, Monetization Experiments, 10x Growth, Org Chart Iterations for Impacting Metrics, The Intricate Path to an IPO, Best Hiring Practices, Catching Exam Cheaters, The Allure of Toto Toilets, The Future of Duolingo, and How to Stand Out in Your Career",
    "https://tim.blog/2022/07/18/luis-von-ahn-transcript/",
  ],
  [
    "#608: Signal Over Noise with Noah Feldman — The War in Ukraine (Recap and Predictions), The Machiavelli of Maryland, Best Books to Understand Geopolitics, The Battles for Free Speech on Social Media, Metaverse Challenges, and More",
    "https://tim.blog/2022/07/21/noah-feldman-2-transcript/",
  ],
  [
    "#610: The Life-Extension Episode — Dr. Matt Kaeberlein on The Dog Aging Project, Rapamycin, Metformin, Spermidine, NAD+ Precursors, Urolithin A, Acarbose, and Much More",
    "https://tim.blog/2022/07/30/matt-kaeberlein-life-extension-transcript/",
  ],
  [
    "#611: Liv Boeree, Poker and Life — Core Strategies, Turning $500 into $1.7M, Cage Dancing, Game Theory, and Metaphysical Curiosities",
    "https://tim.blog/2022/08/02/liv-boeree-transcript/",
  ],
  [
    "#612: Will MacAskill of Effective Altruism Fame — The Value of Longtermism, Tools for Beating Stress and Overwhelm, AI Scenarios, High-Impact Books, and How to Save the World and Be an Agent of Change",
    "https://tim.blog/2022/08/04/will-macaskill-what-we-owe-the-future-transcript/",
  ],
  [
    "#613: Russ Roberts on Lessons from F.A. Hayek and Nassim Taleb, Decision-Making Insights from Charles Darwin, The Dangers of Scientism, Wild Problems in Life and the Decisions That Define Us, Learnings from the Talmud, The Role of Prayer, and The Journey to Transcendence",
    "https://tim.blog/2022/08/07/russ-roberts-transcript/",
  ],
  [
    "#614: Q&A with Tim on Wealth and Money, Book Recommendations, Advice on Taking Advice, C.S. Lewis, Relationships, Behavior Change and Self-Awareness, Why We Are All (Mostly) Making It Up as We Go, and Much More",
    "https://tim.blog/2022/08/16/the-tim-ferriss-show-transcripts-qa-with-tim-on-wealth-and-money-book-recommendations-advice-on-taking-advice-c-s-lewis-relationships-behavior-change-and-self-awareness-why-we-are-all-mostly/",
  ],
  [
    "#615: Dr. Andrew Weil — The 4-7-8 Breath Method, Cannabis, The Uses of Coca Leaf, Rehabilitating Demonized Plants, Kava for Anxiety, Lessons from Wade Davis, The Psychedelic Renaissance, How to Emerge from Depression, Tales from 50+ Visits to Japan, Matcha Benefits, and More",
    "https://tim.blog/2022/08/18/dr-andrew-weil-2-transcript/",
  ],
  [
    "#616: Insights from Dr. Andrew Huberman, Greg McKeown, Jocko Willink, Brené Brown, and Naval Ravikant",
    "https://tim.blog/2022/08/28/insights-from-dr-andrew-huberman-greg-mckeown-jocko-willink-brene-brown-and-naval-ravikant-transcript/",
  ],
  [
    "#618: Roelof Botha — Investing with the Best, Ulysses Pacts, The Magic of Founder-Problem Fit, How to Use Pre-Mortems and Pre-Parades, Learning from Crucible Moments, and Daring to Dream",
    "https://tim.blog/2022/09/01/roelof-botha-transcript/",
  ],
  [
    "#619: Dr. Suresh Muthukumaraswamy — LSD Microdosing, Classical Psychedelics vs. Ketamine, Science and Speed in New Zealand, Placebo Options, and The Infinite Possibilities of Studying Mind-Altering Compounds",
    "https://tim.blog/2022/09/05/dr-suresh-muthukumaraswamy-transcript/",
  ],
  [
    "#620: Dr. Gabor Maté — The Myth of Normal, Metabolizing Anger, Processing Trauma, and Finding the Still Voice Within",
    "https://tim.blog/2022/09/09/dr-gabor-mate-myth-of-normal-transcript/",
  ],
  [
    "#621: UFC Hall of Famer Bas Rutten on Fundamentals of Real Self-Defense, Savage Fight Stories, How He’s Handled Bullies, Breathing Techniques for Increasing Stamina and Endurance, The Art of Personal Reinvention, and Cultivating the Practice of Prayer",
    "https://tim.blog/2022/09/19/bas-rutten-transcript/",
  ],
  [
    "#622: A Rare In-Person Random Show with Kevin Rose — VR Workouts, I Bonds, Excellent Movies, Recent Books, Lessons from Amy Tan, How to Shape Your Mind, and More",
    "https://tim.blog/2022/09/27/a-rare-in-person-random-show-kevin-rose-transcript/",
  ],
  [
    "#624: Rolf Potts — The Vagabond’s Way, Tactics for Immersive Travel, Pilgrimages and Psychogeography, Empathy Machines, Full-Throated Love, The Slow Sense of Smell, Lessons from Thích Nhất Hạnh, Falling Upward, and More",
    "https://tim.blog/2022/10/03/rolf-potts-the-vagabonds-way-transcript/",
  ],
  [
    "#625: Dr. John Krystal — All Things Ketamine, The Most Comprehensive Podcast Episode Ever",
    "https://tim.blog/2022/10/03/dr-john-krystal-ketamine-transcript/",
  ],
  [
    "#626: Insights from Tara Brach, Ryan Holiday, Maria Popova, and Cal Newport",
    "https://tim.blog/2022/10/11/insights-from-tara-brach-ryan-holiday-maria-popova-and-cal-newport-transcript/",
  ],
  [
    "#627: Brian Armstrong, CEO of Coinbase — The Art of Relentless Focus, Preparing for Full-Contact Entrepreneurship, Critical Forks in the Path, Handling Haters, The Wisdom of Paul Graham, Epigenetic Reprogramming, and Much More",
    "https://tim.blog/2022/10/10/brian-armstrong-transcript/",
  ],
  [
    "#628: Q&A with Tim — Revisiting 15+ Years of PR and Marketing Lessons, Time Dilation for Deep Relaxation, The Art of Setting Ultra-High Prices, The Low-Information Diet, Studying Animal Communication, My 3-Day Fasting Protocol, Tools for Handling Adversity, Selling to the Affluent, My Current Coffee and Alcohol Rules, Risk Mitigation, and Much More",
    "https://tim.blog/2022/10/17/qa-with-tim-ferriss-transcript/",
  ],
  [
    "#629: Aryeh Bourkoff — Media’s Hottest Dealmaker on How to Negotiate, Rejecting Constraints, Mastering the Calendar to Create More Time, and How to Play the Long Game",
    "https://tim.blog/2022/10/24/aryeh-bourkoff-transcript/",
  ],
  [
    "#630: Insights from Dr. Matthew Walker, Adam Grant/Atul Gawande, Diana Chapman, and Rich Roll/David Goggins",
    "https://tim.blog/2022/10/29/insights-from-dr-matthew-walker-adam-grant-atul-gawande-diana-chapman-and-rich-roll-david-goggins-transcript/",
  ],
  [
    "#633: Chris Palmer, MD, of Harvard Medical School — Optimizing Brain Energy for Mental Health, The Incredible Potential of Metabolic Psychiatry, Extraordinary Case Studies, and Harnessing Mitochondria for Anxiety, ",
    "https://tim.blog/2022/11/12/chris-palmer-transcript/",
  ],
  [
    "#634: Niall Ferguson, Historian — The Coming Cold War II, Visible and Invisible Geopolitics, Why Even Atheists Should Study Religion, Masters of Paradox, Fatherhood, Fear, and More",
    "https://tim.blog/2022/11/16/niall-ferguson-transcript/",
  ],
  [
    "#635: Jason Calacanis on Brooklyn Grit, Big Asks, Angel Investing (Uber, Calm, Robinhood, and More), The Magic of Thinking Big, and St*bbing People in the Face but Never in the Back",
    "https://tim.blog/2022/11/19/jason-calacanis-transcript/",
  ],
  [
    "#636: The Big Reveal: The Legend of CØCKPUNCH — Kevin Rose and Tim Ferriss on Tim’s New and Extremely Bizarre Art Project",
    "https://tim.blog/2022/11/21/the-legend-of-cockpunch-transcript/",
  ],
  [
    "#637: Stephen Wolfram — Personal Productivity Systems, Richard Feynman Stories, Computational Thinking as a Superpower, Perceiving a Branching Universe, and The Ruliad… The Biggest Object in Metascience",
    "https://tim.blog/2022/11/25/stephen-wolfram-transcript/",
  ],
  [
    "#639: Todd McFarlane, Legendary Comic Book Artist — How to Make Iconic Art, Reinvent Spider-Man, Live Life on Your Own Terms, and Meet Every Deadline",
    "https://tim.blog/2022/12/03/todd-mcfarlane-transcript/",
  ],
  [
    "#641: Roland Griffiths, PhD — Life’s Ultimate Glide Path, An Unexpected Stage IV Diagnosis, Facing Death, How Meditation and Psychedelics Can Help, and The Art of Living a Life of Gratitude",
    "https://tim.blog/2022/12/10/roland-griffiths-transcript/",
  ],
  [
    "#642: Steven Pressfield on Going from Truck Driver to Bestselling Novelist, Overcoming Self-Sabotage, Building Momentum, Dancing with the Muse, Turning Pro, and Letting Your Underground River Flow",
    "https://tim.blog/2022/12/15/steven-pressfield-3-transcript/",
  ],
  [
    "#643: Todd McFarlane, Iconic Comic Book Artist — Lessons from Stan Lee, How to Make Art That Outlives You, How to Compete with Corporate Giants and Win (While Having Fun), Dealmaking Strategies, War Stories from Wall Street and Lawyer Land, Taking Responsibility for Your Life, and Why Creators Need to Smash Limits",
    "https://tim.blog/2022/12/16/todd-mcfarlane-2-transcript/",
  ],
  [
    "#644: Jonathan Haidt — The Coddling of the American Mind, How to Become Intellectually Antifragile, and How to Lose Anger by Studying Morality",
    "https://tim.blog/2022/12/27/jonathan-haidt-transcript/",
  ],
  [
    "#645: The Random Show, Mega-Holiday Edition — 2023 Resolutions and New Tools, Extensive Bullshitting, Booze and Ethanol Alternatives, The “Yearly Delete,” A Million Sidebars, Ayahuasca Revisited, Recapping the COCKPUNCH Saga, and Much More",
    "https://tim.blog/2022/12/28/the-random-show-mega-holiday-edition-transcript/",
  ],
  [
    "#646: Brian C. Muraresku with Dr. Mark Plotkin — The Eleusinian Mysteries, Discovering the Divine, The Immortality Key, The Pagan Continuity Hypothesis, Lessons from Scholar Karen Armstrong, and Much More",
    "https://tim.blog/2022/12/29/brian-c-muraresku-dr-mark-plotkin-transcript/",
  ],
  [
    "#647: Mark Manson, The Subtle Art of Not Giving a F*ck — The Surprising Stories Behind 15+ Million Copies Sold, Crucial Decisions, The Art of Home Run Headlines, How to Build a Lean Team, Lessons from Will Smith, Personal Reinvention, and More",
    "https://tim.blog/2022/12/31/mark-manson-transcript/",
  ],
  [
    "#648: James Clear, Atomic Habits — Mastering Habits, Growing an Email List to 2M+ People, Selling 10M+ Books, Cultivating Self-Awareness, and Much More",
    "https://tim.blog/2023/01/06/james-clear-atomic-habits-transcript/",
  ],
  [
    "#649: Rick Rubin, Legendary Music Producer — The Creative Act, Overcoming Creative Blocks, Developing Your Perception and Sensitivities, Reinvention vs. Going Narrow, The Future and AI, and Much More",
    "https://tim.blog/2023/01/16/rick-rubin-2-transcript/",
  ],
  [
    "#650: Dr. Matthew Walker, All Things Sleep — How to Improve Sleep, How Sleep Ties Into Alzheimer’s Disease and Weight Gain, and How Medications (Ambien, Trazodone, etc.), Caffeine, THC/CBD, Psychedelics, Exercise, Smart Drugs, Fasting, and More Affect Sleep",
    "https://tim.blog/2023/01/21/matthew-walker-sleep-transcript/",
  ],
  [
    "#651: Legendary Investor Bill Gurley on Investing Rules, Finding Outliers, Insights from Jeff Bezos and Howard Marks, Must-Read Books, Creating True Competitive Advantages, Open-Source Strategies, Adapting Mental Models to New Realities, and More",
    "https://tim.blog/2023/01/25/bill-gurley-transcript/",
  ],
  [
    "#652: Famed Explorer Wade Davis — How to Become the Architect of Your Life, The Divine Leaf of Immortality, Rites of Passage, Voodoo Demystified, Optimism as the Purpose of Life, How to Be a Prolific Writer, Psychedelics, Monetizing the Creativity of Your Life, and More",
    "https://tim.blog/2023/01/30/wade-davis-transcript/",
  ],
  [
    "#653: Elan Lee, Co-Creator of Exploding Kittens — How to Raise Millions on Kickstarter, Deconstructing Mega-Successes, Secrets of Game Design, The Power of Positive Constraints, The Delights of Craftsmanship, and The Art of Turning Fans into Superfans",
    "https://tim.blog/2023/02/04/elan-lee-transcript/",
  ],
  [
    "#654: Dr. Matthew Walker, All Things Sleep Continued — The Hidden Dangers of Melatonin, Tools for Insomnia, Enhancing Learning and Sleep Spindles, The Upsides of Sleep Divorce, How Sleep Impacts Sex (and Vice Versa), Adventures in Lucid Dreaming, The One Clock to Rule Them All, The IP Addresses of Your Memories, and More",
    "https://tim.blog/2023/02/10/dr-matthew-walker-transcript/",
  ],
];

(async function () {
  const { data: episodes, error } = await supabase
    .from('episodes')
    .select()

  if (error) {
    console.error(error);
  } else {
    for (const e of episodes) {
      const [title, url] = linksAndTexts.find(lt => lt[0].match(/\#\d{1,3}/)[0] === `#${e.slug.slice(0, 5).match(/\d{1,3}/)[0]}`);
      const { error } = await supabase.from('episodes')
        .update({ title, url })
        .eq('id', e.id)
      if (error) {
        console.error(error);
      }
    }
  }
})();