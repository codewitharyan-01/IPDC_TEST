import { useState, useEffect, useRef } from "react";

// ─── ANSWER KEY ───────────────────────────────────────────────────────────────
// Section A: Q1-50, True/False (a=True, b=False), 1 mark each
const SECTION_A_KEY = {
  1:"a",2:"a",3:"b",4:"a",5:"a",6:"b",7:"b",8:"a",9:"a",10:"a",
  11:"b",12:"a",13:"a",14:"b",15:"a",16:"a",17:"a",18:"b",19:"b",20:"a",
  21:"b",22:"a",23:"b",24:"a",25:"a",26:"b",27:"b",28:"a",29:"b",30:"a",
  31:"b",32:"a",33:"a",34:"b",35:"a",36:"b",37:"a",38:"b",39:"a",40:"a",
  41:"a",42:"a",43:"b",44:"b",45:"a",46:"a",47:"a",48:"a",49:"b",50:"a"
};

// Section B: Q51-100, MCQ, 2 marks each
const SECTION_B_KEY = {
  51:"b",52:"c",53:"d",54:"c",55:"a",56:"b",57:"d",58:"d",59:"a",60:"d",
  61:"d",62:"d",63:"b",64:"a",65:"d",66:"c",67:"c",68:"a",69:"c",70:"a",
  71:"c",72:"c",73:"a",74:"c",75:"a",76:"c",77:"d",78:"b",79:"a",80:"c",
  81:"d",82:"b",83:"a",84:"b",85:"c",86:"a",87:"c",88:"c",89:"b",90:"d",
  91:"d",92:"d",93:"b",94:"c",95:"a",96:"b",97:"c",98:"b",99:"d",100:"a"
};

// Section C: Q101-130, Best/Secondary, best=2, secondary=1
const SECTION_C_KEY = {
  101:{best:"a",secondary:"b"},102:{best:"b",secondary:"a"},103:{best:"b",secondary:"a"},
  104:{best:"b",secondary:"a"},105:{best:"a",secondary:"b"},106:{best:"b",secondary:"a"},
  107:{best:"a",secondary:"b"},108:{best:"a",secondary:"b"},109:{best:"b",secondary:"a"},
  110:{best:"b",secondary:"a"},111:{best:"b",secondary:"a"},112:{best:"a",secondary:"b"},
  113:{best:"b",secondary:"a"},114:{best:"b",secondary:"a"},115:{best:"a",secondary:"b"},
  116:{best:"b",secondary:"a"},117:{best:"a",secondary:"b"},118:{best:"b",secondary:"a"},
  119:{best:"a",secondary:"b"},120:{best:"b",secondary:"a"},121:{best:"b",secondary:"a"},
  122:{best:"b",secondary:"a"},123:{best:"b",secondary:"a"},124:{best:"a",secondary:"b"},
  125:{best:"b",secondary:"a"},126:{best:"a",secondary:"b"},127:{best:"b",secondary:"a"},
  128:{best:"b",secondary:"a"},129:{best:"a",secondary:"b"},130:{best:"a",secondary:"b"}
};

// ─── QUESTIONS DATA ────────────────────────────────────────────────────────────
const SECTION_A_QUESTIONS = [
  {id:1, text:"When you live a life without any direction, you will not move far in any one direction.", lecture:16},
  {id:2, text:"To achieve your long-term goals, you need to create smaller short-term goals to guide your life in the right direction.", lecture:16},
  {id:3, text:"The more you visualize your long-term goals, the fewer chances there are of achieving them.", lecture:16},
  {id:4, text:"Short term goals should be time-bound.", lecture:16},
  {id:5, text:"Clear goals will give our lives a clear direction.", lecture:16},
  {id:6, text:"There is no risk of addiction when smoking cigarettes occasionally to please one's friends.", lecture:17},
  {id:7, text:"Drinking alcohol is only harmful to the health of the elderly but not to the youth.", lecture:17},
  {id:8, text:"It is our duty to kindly encourage our family members to give up their bad addictions.", lecture:17},
  {id:9, text:"Seva should be performed with compassion.", lecture:18},
  {id:10, text:"Being generous can make us happier.", lecture:18},
  {id:11, text:"Seva should be performed with the expectation of a reward.", lecture:18},
  {id:12, text:"Working in a team helps you gain new perspectives.", lecture:19},
  {id:13, text:"We should learn to be adaptable when working in a team.", lecture:19},
  {id:14, text:"The biggest role of a team member is to take credit for the team's success.", lecture:19},
  {id:15, text:"A good team member is willing to sacrifice something for the team.", lecture:19},
  {id:16, text:"Legends create everlasting impressions.", lecture:21},
  {id:17, text:"It is possible to lead with humility.", lecture:21},
  {id:18, text:"The most effective way to lead is by making workers feel inferior.", lecture:21},
  {id:19, text:"An aggressive leadership style is generally the most effective.", lecture:21},
  {id:20, text:"A country without value-based citizens can create an environment of crime and corruption.", lecture:22},
  {id:21, text:"To become value-based citizens, we must learn asset valuation techniques.", lecture:22},
  {id:22, text:"Moral values are a universal necessity.", lecture:22},
  {id:23, text:"Unfair treatment promotes a productive environment.", lecture:22},
  {id:24, text:"We should always be accountable for our actions and be honest with the people who are depending on us.", lecture:22},
  {id:25, text:"By completing the small things sincerely, it encourages you to do the big things better.", lecture:23},
  {id:26, text:"Focus on perfecting only the big things. The small things are not as important.", lecture:23},
  {id:27, text:"Good character is essential in our personal lives, but not in the workplace.", lecture:23},
  {id:28, text:"It is possible for a person to bring change in his/her attitude.", lecture:23},
  {id:29, text:"Being punctual in the workplace is unimportant.", lecture:23},
  {id:30, text:"Death can teach us about life.", lecture:24},
  {id:31, text:"Whatever happens, happens for the worst.", lecture:24},
  {id:32, text:"Realizing our lifespan as finite can allow us to become more productive.", lecture:24},
  {id:33, text:"Forgiveness can release us from the burden of regret and guilt. It can bring peace to our minds.", lecture:25},
  {id:34, text:"Asking for forgiveness is an act of a coward.", lecture:25},
  {id:35, text:"Ask for forgiveness because relationships are more important than our ego.", lecture:25},
  {id:36, text:"Failure makes a person become worthless.", lecture:25},
  {id:37, text:"Stress is a physical reaction to a mental state.", lecture:26},
  {id:38, text:"Children are not affected by stress.", lecture:26},
  {id:39, text:"Stress affects our health.", lecture:26},
  {id:40, text:"Our eating habits can affect stress levels.", lecture:26},
  {id:41, text:"We should limit the number of sugary drinks we drink.", lecture:27},
  {id:42, text:"Physical exercise can reduce stress levels.", lecture:27},
  {id:43, text:"The recommended amount of moderate physical exercise is 100 minutes per week.", lecture:27},
  {id:44, text:"Most health professionals say that is ideal to get 6 hours of sleep every night.", lecture:27},
  {id:45, text:"Physical exercise impacts our mental wellbeing.", lecture:27},
  {id:46, text:"Financial planning can help one move abroad or buy a house.", lecture:29},
  {id:47, text:"A mid-term financial goal cannot be achieved straight away but should only take a few years to achieve.", lecture:29},
  {id:48, text:"Compounding is a process of growing.", lecture:29},
  {id:49, text:"The company we keep has little influence on our development and decisions.", lecture:30},
  {id:50, text:"The company you keep has the potential can make you or break you.", lecture:30},
];

const SECTION_B_QUESTIONS = [
  {id:51, text:'What is the meaning of "begin with the end in mind"?', lecture:16, options:{a:"You should end the task while remembering the start point",b:"You should envision where you want to be in future and structure your life now to give direction to reach your goal",c:"You should begin the task and later plan to end it depending on your initial progress",d:"You should imagine how you want to begin the task before starting"}},
  {id:52, text:'"One should analyses oneself continually, introspect and think that ..."', lecture:16, options:{a:"How can I get people to like me more?",b:"I have enough time to do this task later.",c:"This is still to be done, and what have I come to do, and what is happening?",d:"What is the point of doing anything when one must die one day?"}},
  {id:53, text:"What is the first step to begin with the end in mind?", lecture:16, options:{a:"Create good daily routines",b:"Prepare short-term goals",c:"Calculate your risk-outcome ratio",d:"Visualize your long-term goal"}},
  {id:54, text:"Short term goals should be...?", lecture:16, options:{a:"vague",b:"not be time-bound",c:"relevant to your long-term goal",d:"hard to achieve"}},
  {id:55, text:'What does "S" stand for in the "SMART" method (used to define short-term goals)?', lecture:16, options:{a:"Specific",b:"Standard",c:"Superb",d:"Simple"}},
  {id:56, text:"Complete this sentence: To achieve your short-term goal...", lecture:16, options:{a:"You should not work in time-limits",b:"Your daily routine should include activities that help to achieve it",c:"Do the same thing that your friends do",d:"You should avoid focussing on your daily habits"}},
  {id:57, text:"Drug addictions can negatively impact which of the following", lecture:17, options:{a:"Health",b:"Wealth",c:"Family",d:"All the above"}},
  {id:58, text:"Which of the following is the least likely reason for the formation of drug addiction?", lecture:17, options:{a:"Peer pressure",b:"The search for an escape from stress",c:"Curiosity",d:"The desire to form an addiction"}},
  {id:59, text:"Which of these methods can help an addict overcome their addictions?", lecture:17, options:{a:"Firmly decide to give up",b:"Reject assistance",c:"Deny accountability",d:"All the above"}},
  {id:60, text:"According to the statistics presented in the IPDC workbook, how many adult smokers began before the age of 18?", lecture:17, options:{a:"3/10",b:"5/10",c:"7/10",d:"9/10"}},
  {id:61, text:"What was the fate of the shining star Devashish Ghosh?", lecture:17, options:{a:"He is currently working at NASA, even though he had initially declined their offer",b:"He is working for ISRO since he declined NASA's offer to serve his country",c:"He is working on aerospace research for Lockheed Martin",d:"He is working at a clothing processing factory in Ahmedabad"}},
  {id:62, text:"How does the 'cool factor' play a role in recreational drugs (e.g. cigarettes, alcohol)?", lecture:17, options:{a:"One will borrow money from their family to buy recreational drugs",b:"One will use recreational drugs out of curiosity",c:"One will start to use recreational drugs to improve concentration levels",d:"One will use recreational drugs because of the belief that it improves one's social status"}},
  {id:63, text:"Which one of the following services were NOT provided to the victims of the Gujarat earthquake in Bhuj?", lecture:18, options:{a:"Postcards",b:"Mobile phones",c:"Psychological Trauma Centre",d:"Last rites for the deceased"}},
  {id:64, text:"How did Carl Joss, a reporter from the Swiss magazine Sonntagsblick, describe his experience after performing seva in the Gujarat Earthquake relief camp?", lecture:18, options:{a:'"The best birthday gift that anyone could have given me"',b:'"It was a very memorable experience for me"',c:'"Tiring but definitely worthwhile"',d:'"It was hard to see the people suffering"'}},
  {id:65, text:"Which of the following seva did the journalist, Carl Joss, NOT perform during the relief work of the Gujarat earthquake?", lecture:18, options:{a:"Cutting vegetables",b:"Serving food",c:"Donating money",d:"Driving the ambulance"}},
  {id:66, text:"Norgay and Hillary were able to successfully climb Mount Everest. What factor allowed them to do this while their predecessors (previous climbers) could not?", lecture:19, options:{a:"They took permission of the government",b:"They were experienced in mountaineering",c:"They were part of a team that worked selflessly",d:"There was no disappointment in their team"}},
  {id:67, text:"Which of the following is NOT a characteristic of a good team player?", lecture:19, options:{a:"Selflessness",b:"Respect",c:"Half-heartedness",d:"Adaptability"}},
  {id:68, text:"How did Tenzing Norgay climb Mount Everest?", lecture:19, options:{a:"With unselfish teamwork",b:"With agility and recklessness",c:"By trying to get ahead on his own",d:"With persistent fast speed"}},
  {id:69, text:"Which of the following does NOT contribute to being a good team player?", lecture:19, options:{a:"Sacrifice",b:"Value each team member",c:"Make sure to claim your credit",d:"Learn to change, change to learn"}},
  {id:70, text:"What standard did Pramukh Swami Maharaj study until?", lecture:21, options:{a:"6th standard",b:"12th standard",c:"10th standard",d:"Bachelor's degree"}},
  {id:71, text:"What was the first thing that Pramukh Swami Maharaj did, after being appointed as the president of BAPS, in 1950?", lecture:21, options:{a:"Take a selfie",b:"Delegate work to people",c:"Wash dishes and utensils",d:"Travel overseas"}},
  {id:72, text:"What did Anjali Ahuja do every Wednesday?", lecture:21, options:{a:"Take a nap",b:"Meet with her mentor to review her progress",c:"Serve the employees lunch",d:"Evaluate everyone's wages"}},
  {id:73, text:"Pramukh Swami Maharaj reacted to the workers' refusal to continue the construction by doing what?", lecture:21, options:{a:"Lifting tiles",b:"Serving tea",c:"Giving a discourse",d:"Scolding them"}},
  {id:74, text:"Who supported Mahatma Gandhi as his personal secretary for 25 years?", lecture:23, options:{a:"Vallabhbhai Patel",b:"Vithalbhai Patel",c:"Mahadev Desai",d:"V. P. Menon"}},
  {id:75, text:"As per the IPDC workbook, what is NOT one of the ways to bring a positive change in your perception?", lecture:23, options:{a:"Make others feel your importance",b:"Don't Understand Small Things to be Small",c:"Look at the Bigger Picture",d:"None of the above"}},
  {id:76, text:"___ is to complete a required task or fulfil an obligation, before or at a previously decided time.", lecture:23, options:{a:"Loyalty",b:"Sincerity",c:"Punctuality",d:"Honesty"}},
  {id:77, text:"How did Mahadev Desai win the complete trust of Mahatma Gandhi?", lecture:23, options:{a:"By being loyal",b:"By being sincere in his work",c:"By being punctual in all his duties",d:"All of the above"}},
  {id:78, text:"How did Walt Disney bring a change in the attitude of his employees at Disneyland?", lecture:23, options:{a:"He doubled the salary of all the employees.",b:"He gave them a new perspective in which to view their role.",c:"He hired motivational speakers to inspire his employees",d:"He increased paid leaves for the employees."}},
  {id:79, text:"What was the reply from the sweeper at NASA when President John F. Kennedy asked him about his job?", lecture:23, options:{a:'"I\'m helping put a man on the moon."',b:'"I keep the NASA premises clean."',c:'"There is no significant contribution from me in NASA\'s success."',d:'"I clean the instruments to be used for NASA\'s moon mission."'}},
  {id:80, text:"Reminding ourselves that 'life is finite' can benefit us in many ways. Which of the following are NOT one of those ways?", lecture:24, options:{a:"It can make our life more meaningful",b:"It can make us more productive",c:"It can increase our lifespan",d:"It can give us clarity"}},
  {id:81, text:"Which of the following are NOT one of the powerful thoughts explored in the lecture - 'Timeless Wisdom for Daily Life'?", lecture:24, options:{a:"Live every day as if it were your last",b:"Look beyond the body",c:"Whatever happens, happens for the best",d:"When the going gets tough, the tough get going"}},
  {id:82, text:"Which one of the following famous personalities received a cancer diagnosis from which they learnt to understand life as finite and encouraged them to create the most iconic technological advantages in the 21st century?", lecture:24, options:{a:"Bill Gates",b:"Steve Jobs",c:"Sundar Pichai",d:"Mark Zuckerberg"}},
  {id:83, text:"How did Raj react to his father when he gave him a Bhagwat Gita instead of the car he asked for?", lecture:25, options:{a:"He never spoke to his father again",b:"He told his friend to buy him the car instead",c:"He asked for an explanation",d:"He moved to Japan and lived there"}},
  {id:84, text:"According to the workbook, which of the following is NOT one of the 6 important tips when asking for forgiveness?", lecture:25, options:{a:"Apologize",b:"Make excuses",c:"Show empathy",d:"Trying to make things right"}},
  {id:85, text:"According to the workbook, which of the following is NOT part of the process of forgiving?", lecture:25, options:{a:"Consider why you want to forgive this person",b:"Choose to forgive",c:"Think of the person's flaws and share them with others",d:"When in doubt, take your time"}},
  {id:86, text:"Asking for forgiveness is an act of the ___.", lecture:25, options:{a:"Courageous",b:"Weak",c:"Foolish",d:"Shy"}},
  {id:87, text:"After forgiving someone, what should we do next? Answer according to the lecture.", lecture:25, options:{a:"Remind them of their mistake",b:"Tell others about their mistake",c:"Forget their mistake and move on",d:"Tell them to write a letter of apology"}},
  {id:88, text:"Which of the below is NOT an effective method for relieving stress?", lecture:26, options:{a:"Meditation",b:"Sufficient rest",c:"Smoking cigarettes",d:"Exercise"}},
  {id:89, text:"'Performing exercise' best fits into which one of the below categories?", lecture:26, options:{a:"Important & Urgent",b:"Important but Not Urgent",c:"Not Important but Urgent",d:"Not Important & Not Urgent"}},
  {id:90, text:"'Mindless web-browsing' best fits into which one of the below categories?", lecture:26, options:{a:"Important & Urgent",b:"Important but Not Urgent",c:"Not Important but Urgent",d:"Not Important & Not Urgent"}},
  {id:91, text:"Which one of the following statements is false?", lecture:27, options:{a:"Physical exercise can increase creativity",b:"Physical exercise can sharpen memory",c:"Physical exercise can improve brain power",d:"Physical exercise can change the color of the brain"}},
  {id:92, text:"According to the Harvard School of Public Health, how much of a portioned plate should be filled with fruits and vegetables?", lecture:27, options:{a:"15%",b:"25%",c:"40%",d:"50%"}},
  {id:93, text:"According to the Harvard School of Public Health, how much of a portioned plate should be filled with healthy proteins?", lecture:27, options:{a:"15%",b:"25%",c:"40%",d:"50%"}},
  {id:94, text:"Which of the following does NOT directly benefit from financial planning?", lecture:29, options:{a:"Retirement",b:"Purchasing a house",c:"Exam technique",d:"Emergencies"}},
  {id:95, text:"Purchasing a smartphone is most likely to be which type of financial goal?", lecture:29, options:{a:"Short-term",b:"Mid-term",c:"Maximization",d:"Strategic"}},
  {id:96, text:"Which of the following is a fixed-voluntary cost?", lecture:29, options:{a:"Rent",b:"Gym membership",c:"Medicine",d:"Food"}},
  {id:97, text:"For a person with secure employment, how many months of basic expenses should be saved in an emergency fund?", lecture:29, options:{a:"At least 1 months' worth",b:"At least 2 months' worth",c:"At least 3 months' worth",d:"At least 12 months' worth"}},
  {id:98, text:"Which of the following is NOT an important component of financial planning?", lecture:29, options:{a:"Using compound interest",b:"Investing in an orient fund",c:"Calculating your budget",d:"Creating an emergency fund"}},
  {id:99, text:"Mangesh Mhaskar scored 97% on the 10th standard board exams. But what caused his downfall?", lecture:30, options:{a:"Lack of finance",b:"Illness",c:"A lack of support from his parents",d:"Bad company"}},
  {id:100, text:"How can we create a good environment for ourselves?", lecture:30, options:{a:"Read good books",b:"Watch popular shows",c:"Keep negative thoughts",d:"Eat more food"}},
];

const SECTION_C_QUESTIONS = [
  {id:101, text:"Rajesh has cleared his 12th standard exam with good grades. He is confused about the selection of his degree course. What should Rajesh do?", lecture:16, options:{a:"He should seek some advice in choosing a course that is relevant to his prospective career choice.",b:"He should select the course that is most popular with his friends and other students."}},
  {id:102, text:"Amit is a very bright student. He wants to be an engineer and get entry to the best company in his field. He has just got admission into the engineering institute that he desired, now what should Amit follow?", lecture:16, options:{a:"Amit should try to settle down into the new atmosphere, observe what others are doing and should follow in their footsteps.",b:"Amit should define some short-term goals that will help get entry into the company of his choice"}},
  {id:103, text:"Anjali is an average Student. She has set a clear long-term goal to join the Civil Services. With the help from experts, she has set some short-term goals too, but she is struggling to achieve them. What should she do?", lecture:16, options:{a:"Anjali should change her long-term goal to something easier",b:"Anjali should create a daily routine that will help her achieve her short-term targets"}},
  {id:104, text:'What can we learn from the following Alexander-The-Great quote: "Bury my body, do not build any monument, keep my hands outside so that the world knows the person who won the world had nothing in his hands when dying"?', lecture:16, options:{a:"Great people often die unhappy.",b:"Material gain and reputation are not the most important thing in life."}},
  {id:105, text:"Neel's friend encourages him to smoke some cigarettes because he believes that 'there is no harm in trying it once'. Why should Neel decline his friend's offer to smoke?", lecture:17, options:{a:"Smoking is harmful and can become addictive.",b:"Smoking can be an unpleasant experience for beginners."}},
  {id:106, text:"Devashish Ghosh, an intelligent youth, had great career prospects. But he became addicted to various drugs. The Defense Ministry found him in possession of drugs and blacklisted him. This ruined his career. How do you think Devashish Ghosh could have avoided this situation?", lecture:17, options:{a:"Devashish should have only used drugs occasionally during his vacation time.",b:"Devashish should not have taken the risk. He should have avoided the use of drugs completely."}},
  {id:107, text:"Sejal often gets stressed because she has financial difficulties. She is also addicted to cigarettes, smoking 15 cigarettes daily. She refuses to stop smoking because she says that it helps control her stress. Do you think it is beneficial for her to stop smoking?", lecture:17, options:{a:"Yes. Spending money on cigarettes is wasting her money. If she can be strong and give up her addiction, then this will be more beneficial in the long term.",b:"No. By trying to stop smoking she will get more stressed. Which will only make her situation worse."}},
  {id:108, text:"A charitable NGO is planning on building a school for the local orphans. During the discussion, one volunteer suggests installing air coolers into the school so that the students feel comfortable during the summer. Some other members disagree as it would mean increasing the fundraising target by 5%. What would you suggest?", lecture:18, options:{a:'"It will be worth the extra effort of fundraising so that the students feel more comfortable."',b:'"We should only focus on the basic necessities needed to build the school."'}},
  {id:109, text:"The local community has organised a one-day cleanup event. The organisers have invited the local minister alongside sixty members of the community to clean all the trash in the village river. The media has not confirmed their attendance. Upon hearing this, the minister is considering whether to attend the event or not, what would you advise him?", lecture:18, options:{a:"You should request the organisers to postpone the event until the media guarantees their attendance.",b:"You should attend the event even if the media does not attend because it is a good cause."}},
  {id:110, text:"Sanjay is part of a district football team. Today, Sanjay has been scheduled to play in the final match, but Sanjay's back has started hurting in a way that affects his performance. Help him decide what advice he should take.", lecture:19, options:{a:"Do not tell anyone and play the match even with the chance that your performance might get impacted.",b:"Alert your coach about it, even if that means he may not let you play in the match. It is better to do what is best for the team."}},
  {id:111, text:"Anmol has been given the responsibility to lead a new project for an IT company. One of his responsibilities is to hire new people into his team. Which approach do you think is the best to take?", lecture:19, options:{a:"Make a team with less diversity to help avoid conflicts and confusion.",b:"Make a team with more diversity to increase innovation, different perspectives, and greater acceptance."}},
  {id:112, text:'Which attribute of a good team player is emphasised in the quote, "Teamwork: simply stated, it is less me and more we."?', lecture:19, options:{a:"A good team player should be able to sacrifice his personal gains for the success of the team",b:"A good team player should be able to change his personality to fit in with the team."}},
  {id:113, text:"What is the best way to describe the leadership concept 'Leading without Leading'?", lecture:21, options:{a:"Great leaders should delegate as much work as possible to free up their time for the most important things.",b:"Great leaders can lead through a good example instead of a more commanding nature."}},
  {id:114, text:'What leadership style best describes the following quotation: "As we look ahead into the next century, leaders will be those who empower others." [Bill Gates]', lecture:21, options:{a:"Delegative Leadership",b:"Servant Leadership"}},
  {id:115, text:'Jeff Garcia, a former American football player, was admired for his leadership: "Jeff Garcia showed up every day to do the work - first one to practice, first one out the tunnel - and in the way he carried himself he demanded that you do the same." Which leadership style best represents this?', lecture:21, options:{a:"Lead by example",b:"First in, is the first to win"}},
  {id:116, text:"Manan is an intelligent college student. But he often gets late to class, and he rarely submits the assignments on time. His professor is new at his role and has not noticed Manan's absences. What should Manan do?", lecture:23, options:{a:"Manan can maintain his lifestyle but should also stay aware such that his grades do not suffer.",b:"He should become more punctual in his attendance and submissions."}},
  {id:117, text:"What is the closest interpretation of the following quote: \"'Small things make perfection, but perfection is not a small thing\"?", lecture:23, options:{a:"Try to bring perfection into the small tasks of your day-to-day life. Perfection in small tasks drives our life to perfection.",b:"Perfection is very important for your career. Bring perfection into your important tasks as a student or as a professional."}},
  {id:118, text:"Archana is a software engineer. She likes to work on program designing and coding. But she does not like to do the supporting documentation work. She finds it unimportant as it is not normally used by anyone. What should Archana do?", lecture:23, options:{a:"Complete the documentation work by noting down only the biggest details. The supporting document feels unimportant.",b:"Complete the documentation work sincerely. Follow the organization guidelines to specify the details. Even if it seems unimportant, she should be sincere."}},
  {id:119, text:'Every morning Steve Jobs asked himself: "If today was the last day of my life, would I want to do what I am about to do today?" From the following two statements, pick that which you think best explains Jobs\' quote.', lecture:24, options:{a:"Jobs wanted to remind himself of what is most important in his life and to continue working in that direction.",b:"Jobs wanted to focus more on achieving short term benefits instead of making long term investments."}},
  {id:120, text:'"Death teaches about life." Which of the following statements best explains the importance of this quotation?', lecture:24, options:{a:"We should accept that everything has an ending point.",b:"Realizing our life as finite can improve our productivity, clarity, and stability."}},
  {id:121, text:"Anamika and Aditi are friends. But Aditi forgot to invite Anamika to her birthday celebration. Anamika felt upset. A few weeks later, Anamika's birthday anniversary is now soon approaching. What should Anamika do?", lecture:25, options:{a:"Invite Aditi to her birthday celebration. This will make Aditi realize her mistake and more likely to apologize.",b:"Invite Aditi to her birthday celebration and bridge the gap in their friendship."}},
  {id:122, text:"Due to poor exam results, Rahul's father scolded him in front of his friends. Rahul felt it was insulting and had an argument with his father in the evening. After the argument, Rahul felt even more disturbed. What advice would you give to Rahul?", lecture:25, options:{a:"Meet your father and say sorry to him. A gentle talk may inspire your father to realize that he should not have scolded you in front of your friends.",b:"Meet your father and say sorry to him. Accept your fault and apologize for your improper behavior. Promise him that you will work harder for your studies."}},
  {id:123, text:"Avinash stays in a hostel. Raj is his roommate. Raj is very notorious and has a habit of mocking everyone. After a few months, Raj stopped teasing Avinash. But Avinash has started to hate Raj because of his nature. He gets disturbed just by looking at Raj. What should Avinash do to feel more positive?", lecture:25, options:{a:"Change rooms and avoid speaking to Raj. That way he cannot ruin his mood.",b:"Try and forgive Raj for his mocking nature. Focus on his positive qualities instead."}},
  {id:124, text:"'Resentment is like drinking poison and then hoping it will kill your enemies.' - What is the most useful lesson to learn from this famous quote by Nelson Mandela?", lecture:25, options:{a:"Keeping bitter emotions for those who have hurt us will only prove to be self-destructive. So, we should learn to forgive others for our own peace of mind.",b:"Keeping bitter emotions for your enemies is unlikely to inflict harm on them. It is better to act upon it instead."}},
  {id:125, text:"Which of the following do you think is the most effective method to become more productive?", lecture:26, options:{a:"Create and follow a schedule while neglecting everything else.",b:"Find your biggest priorities and ensure they are scheduled and completed."}},
  {id:126, text:"Jatin has important exams approaching in three weeks. He is aware that he will need to commit a decent amount of time to study, but he would also like to give some time for exercise. How would you suggest that he balances his time?", lecture:26, options:{a:"Jatin should schedule at least 30 minutes of exercising every morning before studying.",b:"Jatin should commit to exercising only on the days when he finds spare time after completing his studies."}},
  {id:127, text:"Anil is currently learning to code while also working part-time as an IT consultant. He needs to drive to meet his client at 11 AM. The journey normally takes around 44 minutes. Anil is trying to decide when to leave. Which option is more appropriate?", lecture:26, options:{a:"Anil should leave home at 10:15 AM, so as not to potentially waste any time waiting around.",b:"Anil should leave home at 10:05 AM, so to include buffer time into his schedule."}},
  {id:128, text:"Anjali sleeps for 7 hours a night and wakes up a few hours later on Sunday. However, on Monday mornings, Anjali often feels more tired than usual. How do you think Anjali should adjust her sleep pattern?", lecture:27, options:{a:"Anjali should try to sleep extra early on Sunday night so that she feels well-rested on Monday morning.",b:"Anjali should try to keep the same sleep schedule on weekdays and weekends so as not to disturb her body clock."}},
  {id:129, text:"The monsoon season saw some serious flooding. The structure of your house has been significantly damaged. The repair work will cost you ₹5 lakh. How should you go about financing the repair?", lecture:29, options:{a:"Check if your insurance covers water damage, make the necessary insurance claim and withdraw the balance from your emergency fund.",b:"Check if your insurance covers water damage, make the necessary insurance claim and borrow the balance of the money from a bank."}},
  {id:130, text:"After graduating, Shivani started working as a data scientist for the last 4 years. She has been earning ₹7 lakh rupees every year. Now that her 25th birthday is approaching, she is wondering about the best time to start a retirement fund. What financial plan will allow her to benefit the most?", lecture:29, options:{a:"Start investing into a retirement fund straight away to earn more money through compound interest.",b:"For the next 5-7 years, she should keep her money free so she can spend it. She can then start a retirement fund afterwards."}},
];

// ─── SCORING ──────────────────────────────────────────────────────────────────
function getScore(answers) {
  let total = 0, secA = 0, secB = 0, secC = 0;
  let details = {};

  for (let id = 1; id <= 50; id++) {
    const ans = answers[id];
    const correct = SECTION_A_KEY[id];
    const isCorrect = ans === correct;
    details[id] = { ans, correct, marks: isCorrect ? 1 : 0, max: 1 };
    if (isCorrect) { secA += 1; total += 1; }
  }

  for (let id = 51; id <= 100; id++) {
    const ans = answers[id];
    const correct = SECTION_B_KEY[id];
    const isCorrect = ans === correct;
    details[id] = { ans, correct, marks: isCorrect ? 2 : 0, max: 2 };
    if (isCorrect) { secB += 2; total += 2; }
  }

  for (let id = 101; id <= 130; id++) {
    const ans = answers[id];
    const key = SECTION_C_KEY[id];
    let marks = 0;
    if (ans === key.best) marks = 2;
    else if (ans === key.secondary) marks = 1;
    details[id] = { ans, correct: key.best, secondary: key.secondary, marks, max: 2 };
    secC += marks; total += marks;
  }

  return { total, secA, secB, secC, details, maxTotal: 310, maxA: 50, maxB: 100, maxC: 60 };
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #FAFAF8;
    --surface: #FFFFFF;
    --border: #E8E4DF;
    --border-strong: #C8C4BF;
    --text-primary: #1A1A18;
    --text-secondary: #6B6860;
    --text-muted: #9E9B94;
    --accent: #2D5A27;
    --accent-light: #EDF3EB;
    --accent-muted: #6B9666;
    --red: #8B2020;
    --red-light: #F5EAEA;
    --amber: #7A5500;
    --amber-light: #FBF3E2;
    --blue: #1B3D6B;
    --blue-light: #EBF0F7;
    --radius: 12px;
    --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
    --transition: all 0.18s ease;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text-primary); line-height: 1.6; }

  .app { min-height: 100vh; }

  /* LANDING */
  .landing { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; padding: 40px 20px; text-align:center; }
  .landing-badge { display:inline-flex; align-items:center; gap:8px; background:var(--accent-light); color:var(--accent); font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; padding:6px 14px; border-radius:100px; margin-bottom:32px; border:1px solid rgba(45,90,39,0.15); }
  .landing-title { font-family:'DM Serif Display', serif; font-size:clamp(2.4rem,5vw,3.6rem); line-height:1.15; color:var(--text-primary); margin-bottom:16px; max-width:700px; }
  .landing-title em { font-style:italic; color:var(--accent); }
  .landing-sub { font-size:1.05rem; color:var(--text-secondary); max-width:480px; margin:0 auto 40px; font-weight:300; }
  .stat-row { display:flex; gap:24px; justify-content:center; flex-wrap:wrap; margin-bottom:48px; }
  .stat-item { text-align:center; }
  .stat-num { font-family:'DM Serif Display', serif; font-size:2rem; color:var(--text-primary); line-height:1; }
  .stat-label { font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em; margin-top:2px; }
  .start-btn { background:var(--accent); color:#fff; border:none; padding:16px 40px; border-radius:100px; font-size:1rem; font-weight:600; cursor:pointer; letter-spacing:0.02em; transition:var(--transition); box-shadow:0 4px 16px rgba(45,90,39,0.25); }
  .start-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(45,90,39,0.3); }
  .section-pills { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin-bottom:48px; }
  .section-pill { background:var(--surface); border:1px solid var(--border); border-radius:100px; padding:8px 18px; font-size:0.85rem; color:var(--text-secondary); }
  .section-pill strong { color:var(--text-primary); }

  /* EXAM */
  .exam-layout { display:grid; grid-template-columns:260px 1fr; min-height:100vh; }
  @media(max-width:768px) { .exam-layout { grid-template-columns:1fr; } }

  .sidebar { position:sticky; top:0; height:100vh; overflow-y:auto; background:var(--surface); border-right:1px solid var(--border); padding:24px 16px; display:flex; flex-direction:column; gap:16px; }
  .sidebar::-webkit-scrollbar { width:4px; }
  .sidebar::-webkit-scrollbar-thumb { background:var(--border); border-radius:4px; }
  @media(max-width:768px) { .sidebar { display:none; } }

  .sidebar-header { padding:4px 8px 12px; border-bottom:1px solid var(--border); }
  .sidebar-logo { font-family:'DM Serif Display', serif; font-size:1.1rem; color:var(--text-primary); }
  .sidebar-progress-bar { height:4px; background:var(--border); border-radius:4px; margin-top:10px; overflow:hidden; }
  .sidebar-progress-fill { height:100%; background:var(--accent); border-radius:4px; transition:width 0.4s ease; }
  .sidebar-progress-text { font-size:0.75rem; color:var(--text-muted); margin-top:6px; }

  .nav-section-title { font-size:0.65rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-muted); padding:0 8px; }
  .nav-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:4px; }
  .nav-dot { aspect-ratio:1; border-radius:6px; border:1px solid var(--border); background:var(--bg); font-size:0.65rem; font-weight:600; color:var(--text-muted); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:var(--transition); }
  .nav-dot:hover { border-color:var(--accent); color:var(--accent); }
  .nav-dot.answered { background:var(--accent-light); border-color:var(--accent-muted); color:var(--accent); }
  .nav-dot.current { background:var(--accent); border-color:var(--accent); color:#fff; }

  .exam-main { padding:40px 48px; max-width:800px; }
  @media(max-width:768px) { .exam-main { padding:24px 16px; } }

  .exam-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; }
  .section-badge { font-size:0.75rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; padding:4px 12px; border-radius:100px; }
  .badge-a { background:var(--blue-light); color:var(--blue); }
  .badge-b { background:var(--amber-light); color:var(--amber); }
  .badge-c { background:var(--accent-light); color:var(--accent); }
  .q-counter { font-size:0.85rem; color:var(--text-muted); }

  .question-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:32px; margin-bottom:20px; box-shadow:var(--shadow); }
  .q-header { display:flex; align-items:flex-start; gap:16px; margin-bottom:24px; }
  .q-num { font-family:'DM Serif Display', serif; font-size:2rem; color:var(--border-strong); line-height:1; min-width:40px; }
  .q-meta { display:flex; flex-direction:column; gap:4px; }
  .q-lecture { font-size:0.72rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-muted); }
  .q-text { font-size:1.05rem; font-weight:400; color:var(--text-primary); line-height:1.65; }

  .options-list { display:flex; flex-direction:column; gap:10px; }
  .option-btn { display:flex; align-items:center; gap:14px; padding:14px 18px; border:1.5px solid var(--border); border-radius:10px; background:var(--bg); cursor:pointer; text-align:left; font-size:0.95rem; color:var(--text-primary); transition:var(--transition); font-family:'DM Sans', sans-serif; }
  .option-btn:hover { border-color:var(--accent-muted); background:var(--accent-light); }
  .option-btn.selected { border-color:var(--accent); background:var(--accent-light); color:var(--accent); font-weight:500; }
  .option-key { width:28px; height:28px; border-radius:6px; border:1.5px solid currentColor; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:700; flex-shrink:0; text-transform:uppercase; }
  .option-btn.selected .option-key { background:var(--accent); border-color:var(--accent); color:#fff; }
  .option-text { flex:1; line-height:1.4; }

  .tf-options { display:flex; gap:12px; }
  .tf-btn { flex:1; padding:14px; border:1.5px solid var(--border); border-radius:10px; background:var(--bg); cursor:pointer; font-size:1rem; font-weight:500; color:var(--text-secondary); transition:var(--transition); font-family:'DM Sans', sans-serif; display:flex; align-items:center; justify-content:center; gap:8px; }
  .tf-btn:hover { border-color:var(--accent-muted); background:var(--accent-light); }
  .tf-btn.selected { border-color:var(--accent); background:var(--accent-light); color:var(--accent); }

  .nav-buttons { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
  .nav-btn { padding:10px 22px; border-radius:100px; font-size:0.9rem; font-weight:500; cursor:pointer; transition:var(--transition); font-family:'DM Sans', sans-serif; }
  .btn-prev { background:transparent; border:1.5px solid var(--border); color:var(--text-secondary); }
  .btn-prev:hover { border-color:var(--text-secondary); color:var(--text-primary); }
  .btn-next { background:var(--accent); border:none; color:#fff; box-shadow:0 2px 8px rgba(45,90,39,0.2); }
  .btn-next:hover { box-shadow:0 4px 16px rgba(45,90,39,0.3); transform:translateY(-1px); }
  .btn-submit { background:var(--text-primary); border:none; color:#fff; padding:12px 32px; border-radius:100px; font-size:0.95rem; font-weight:600; cursor:pointer; transition:var(--transition); font-family:'DM Sans', sans-serif; }
  .btn-submit:hover { background:#333; transform:translateY(-1px); }

  .mobile-progress { background:var(--surface); border-bottom:1px solid var(--border); padding:12px 16px; position:sticky; top:0; z-index:10; display:none; }
  @media(max-width:768px) { .mobile-progress { display:block; } }
  .mobile-bar { height:3px; background:var(--border); border-radius:4px; overflow:hidden; margin-bottom:6px; }
  .mobile-fill { height:100%; background:var(--accent); border-radius:4px; }
  .mobile-text { font-size:0.8rem; color:var(--text-muted); display:flex; justify-content:space-between; }

  /* RESULTS */
  .results { max-width:900px; margin:0 auto; padding:48px 24px 80px; }
  .results-header { text-align:center; margin-bottom:48px; }
  .results-emoji { font-size:3rem; margin-bottom:16px; }
  .results-title { font-family:'DM Serif Display', serif; font-size:2.4rem; color:var(--text-primary); margin-bottom:8px; }
  .results-sub { font-size:1rem; color:var(--text-secondary); }

  .score-hero { background:var(--accent); color:#fff; border-radius:var(--radius); padding:40px; text-align:center; margin-bottom:32px; }
  .score-label { font-size:0.8rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; opacity:0.75; margin-bottom:8px; }
  .score-num { font-family:'DM Serif Display', serif; font-size:4rem; line-height:1; }
  .score-max { font-size:1.2rem; opacity:0.75; margin-bottom:12px; }
  .score-pct { font-size:1.6rem; font-weight:600; opacity:0.9; }

  .section-scores { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:32px; }
  @media(max-width:600px) { .section-scores { grid-template-columns:1fr; } }
  .sec-score-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:20px; text-align:center; }
  .sec-score-label { font-size:0.75rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px; }
  .sec-score-num { font-family:'DM Serif Display', serif; font-size:1.8rem; color:var(--text-primary); }
  .sec-score-of { font-size:0.85rem; color:var(--text-muted); }
  .sec-score-bar { height:4px; background:var(--border); border-radius:4px; margin-top:12px; overflow:hidden; }
  .sec-score-fill { height:100%; border-radius:4px; }

  .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:40px; }
  @media(max-width:480px) { .stats-grid { grid-template-columns:repeat(3,1fr); } }
  .stat-card { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:16px; text-align:center; }
  .stat-card-num { font-family:'DM Serif Display', serif; font-size:1.8rem; line-height:1; margin-bottom:4px; }
  .stat-card-label { font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em; }
  .correct-color { color:var(--accent); }
  .wrong-color { color:var(--red); }
  .skipped-color { color:var(--text-muted); }

  .review-section { margin-bottom:32px; }
  .review-section-title { font-family:'DM Serif Display', serif; font-size:1.3rem; margin-bottom:16px; padding-bottom:8px; border-bottom:1px solid var(--border); }
  .review-item { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:18px 20px; margin-bottom:8px; }
  .review-item.correct { border-left:3px solid var(--accent); }
  .review-item.wrong { border-left:3px solid var(--red); }
  .review-item.partial { border-left:3px solid #E08A00; }
  .review-item.skipped { border-left:3px solid var(--border-strong); }
  .review-item-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:8px; }
  .review-q-text { font-size:0.9rem; color:var(--text-primary); flex:1; line-height:1.5; }
  .review-marks { font-size:0.8rem; font-weight:700; padding:3px 10px; border-radius:100px; white-space:nowrap; }
  .marks-full { background:var(--accent-light); color:var(--accent); }
  .marks-partial { background:var(--amber-light); color:var(--amber); }
  .marks-zero { background:var(--red-light); color:var(--red); }
  .review-answers { display:flex; flex-wrap:wrap; gap:8px; font-size:0.8rem; }
  .ans-pill { padding:3px 10px; border-radius:100px; }
  .ans-yours { background:var(--blue-light); color:var(--blue); }
  .ans-correct { background:var(--accent-light); color:var(--accent); }
  .ans-skipped { background:var(--bg); border:1px solid var(--border); color:var(--text-muted); }

  .retry-btn { width:100%; padding:16px; background:var(--accent); color:#fff; border:none; border-radius:var(--radius); font-size:1rem; font-weight:600; cursor:pointer; font-family:'DM Sans', sans-serif; transition:var(--transition); margin-top:8px; }
  .retry-btn:hover { box-shadow:0 4px 16px rgba(45,90,39,0.3); transform:translateY(-1px); }

  .divider { height:1px; background:var(--border); margin:32px 0; }
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const ALL_QUESTIONS = [
  ...SECTION_A_QUESTIONS.map(q => ({...q, section:'A'})),
  ...SECTION_B_QUESTIONS.map(q => ({...q, section:'B'})),
  ...SECTION_C_QUESTIONS.map(q => ({...q, section:'C'})),
];

const TOTAL = ALL_QUESTIONS.length;

function getSectionLabel(section) {
  if (section === 'A') return 'True / False';
  if (section === 'B') return 'MCQ';
  return 'Application';
}

export default function App() {
  const [phase, setPhase] = useState('landing'); // landing | exam | results
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const mainRef = useRef(null);

  const q = ALL_QUESTIONS[current];
  const answered = Object.keys(answers).length;
  const progress = (answered / TOTAL) * 100;

  function handleAnswer(qid, val) {
    setAnswers(prev => ({...prev, [qid]: val}));
  }

  function goTo(idx) {
    setCurrent(idx);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }

  function handleSubmit() {
    const r = getScore(answers);
    setResult(r);
    setPhase('results');
  }

  function handleRetry() {
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setPhase('exam');
  }

  const isLast = current === TOTAL - 1;

  if (phase === 'landing') return (
    <>
      <style>{styles}</style>
      <div className="landing">
        <div className="landing-badge">📚 IPDC – 2 · Lectures 16 to 30</div>
        <h1 className="landing-title">Exam Preparation <em>Practice Test</em></h1>
        <p className="landing-sub">130 questions across three sections. Test your understanding, apply your knowledge, get instant results.</p>
        <div className="section-pills">
          <div className="section-pill"><strong>Section A</strong> — 50 True/False · 1 mark each</div>
          <div className="section-pill"><strong>Section B</strong> — 50 MCQ · 2 marks each</div>
          <div className="section-pill"><strong>Section C</strong> — 30 Applied · up to 2 marks each</div>
        </div>
        <div className="stat-row">
          <div className="stat-item"><div className="stat-num">130</div><div className="stat-label">Questions</div></div>
          <div className="stat-item"><div className="stat-num">310</div><div className="stat-label">Total Marks</div></div>
          <div className="stat-item"><div className="stat-num">15</div><div className="stat-label">Lectures</div></div>
        </div>
        <button className="start-btn" onClick={() => setPhase('exam')}>Begin Practice Test →</button>
      </div>
    </>
  );

  if (phase === 'exam') {
    const sectionLabel = getSectionLabel(q.section);
    return (
      <>
        <style>{styles}</style>
        <div className="app">
          <div className="mobile-progress">
            <div className="mobile-bar"><div className="mobile-fill" style={{width:`${progress}%`}} /></div>
            <div className="mobile-text"><span>Q{q.id} of {TOTAL}</span><span>{answered} answered</span></div>
          </div>
          <div className="exam-layout">
            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-header">
                <div className="sidebar-logo">IPDC–2 Exam</div>
                <div className="sidebar-progress-bar"><div className="sidebar-progress-fill" style={{width:`${progress}%`}} /></div>
                <div className="sidebar-progress-text">{answered}/{TOTAL} answered</div>
              </div>

              {['A','B','C'].map(sec => {
                const qs = ALL_QUESTIONS.filter(x => x.section === sec);
                return (
                  <div key={sec}>
                    <div className="nav-section-title">Section {sec}</div>
                    <div className="nav-grid">
                      {qs.map((x,i) => {
                        const idx = ALL_QUESTIONS.indexOf(x);
                        const isCurr = idx === current;
                        const isAns = answers[x.id] !== undefined;
                        return (
                          <button key={x.id} className={`nav-dot ${isCurr?'current':isAns?'answered':''}`} onClick={() => goTo(idx)}>{x.id}</button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {answered === TOTAL && (
                <button className="btn-submit" onClick={handleSubmit} style={{marginTop:'auto'}}>Submit Exam</button>
              )}
            </aside>

            {/* Main */}
            <main ref={mainRef} style={{overflowY:'auto',height:'100vh'}}>
              <div className="exam-main">
                <div className="exam-topbar">
                  <span className={`section-badge badge-${q.section.toLowerCase()}`}>Section {q.section} · {sectionLabel}</span>
                  <span className="q-counter">Question {current+1} of {TOTAL}</span>
                </div>

                <div className="question-card">
                  <div className="q-header">
                    <span className="q-num">{q.id}</span>
                    <div className="q-meta">
                      <span className="q-lecture">Lecture {q.lecture}</span>
                      <p className="q-text">{q.text}</p>
                    </div>
                  </div>

                  {/* Section A: True/False */}
                  {q.section === 'A' && (
                    <div className="tf-options">
                      {[{k:'a',label:'True'},{k:'b',label:'False'}].map(({k,label}) => (
                        <button key={k} className={`tf-btn ${answers[q.id]===k?'selected':''}`} onClick={()=>handleAnswer(q.id,k)}>
                          {k==='a'?'✓':'✗'} {label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Section B: MCQ */}
                  {q.section === 'B' && (
                    <div className="options-list">
                      {Object.entries(q.options).map(([k,v]) => (
                        <button key={k} className={`option-btn ${answers[q.id]===k?'selected':''}`} onClick={()=>handleAnswer(q.id,k)}>
                          <span className="option-key">{k}</span>
                          <span className="option-text">{v}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Section C: 2 options */}
                  {q.section === 'C' && (
                    <div className="options-list">
                      {Object.entries(q.options).map(([k,v]) => (
                        <button key={k} className={`option-btn ${answers[q.id]===k?'selected':''}`} onClick={()=>handleAnswer(q.id,k)}>
                          <span className="option-key">{k}</span>
                          <span className="option-text">{v}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="nav-buttons">
                  <button className="nav-btn btn-prev" onClick={() => current > 0 && goTo(current-1)} disabled={current===0}>← Previous</button>
                  <div style={{display:'flex',gap:12}}>
                    {isLast ? (
                      <button className="btn-submit" onClick={handleSubmit}>Submit Exam →</button>
                    ) : (
                      <button className="nav-btn btn-next" onClick={() => goTo(current+1)}>Next →</button>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }

  if (phase === 'results' && result) {
    const pct = Math.round((result.total / result.maxTotal) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : pct >= 40 ? '📖' : '💪';
    const grade = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : pct >= 40 ? 'Needs Work' : 'Keep Practicing';

    // Count stats
    let correctCount=0, wrongCount=0, skippedCount=0, partialCount=0;
    for(let id=1;id<=130;id++){
      const d = result.details[id];
      if(!d.ans) skippedCount++;
      else if(d.marks===d.max) correctCount++;
      else if(d.marks>0) partialCount++;
      else wrongCount++;
    }

    return (
      <>
        <style>{styles}</style>
        <div className="results">
          <div className="results-header">
            <div className="results-emoji">{emoji}</div>
            <h1 className="results-title">{grade}</h1>
            <p className="results-sub">Here's your detailed performance breakdown</p>
          </div>

          <div className="score-hero">
            <div className="score-label">Total Score</div>
            <div className="score-num">{result.total}</div>
            <div className="score-max">out of {result.maxTotal}</div>
            <div className="score-pct">{pct}%</div>
          </div>

          <div className="section-scores">
            {[
              {label:'Section A', score:result.secA, max:result.maxA, color:'#1B3D6B'},
              {label:'Section B', score:result.secB, max:result.maxB, color:'#7A5500'},
              {label:'Section C', score:result.secC, max:result.maxC, color:'#2D5A27'},
            ].map(s => (
              <div key={s.label} className="sec-score-card">
                <div className="sec-score-label">{s.label}</div>
                <div className="sec-score-num">{s.score} <span className="sec-score-of">/ {s.max}</span></div>
                <div className="sec-score-bar"><div className="sec-score-fill" style={{width:`${(s.score/s.max)*100}%`, background:s.color}} /></div>
              </div>
            ))}
          </div>

          <div className="stats-grid">
            <div className="stat-card"><div className="stat-card-num correct-color">{correctCount}</div><div className="stat-card-label">Correct</div></div>
            <div className="stat-card"><div className="stat-card-num wrong-color">{wrongCount}</div><div className="stat-card-label">Wrong</div></div>
            <div className="stat-card"><div className="stat-card-num" style={{color:'#E08A00'}}>{partialCount}</div><div className="stat-card-label">Partial</div></div>
          </div>

          {/* Review */}
          {['A','B','C'].map(sec => {
            const qlist = ALL_QUESTIONS.filter(x => x.section === sec);
            return (
              <div key={sec} className="review-section">
                <h2 className="review-section-title">Section {sec} Review</h2>
                {qlist.map(q => {
                  const d = result.details[q.id];
                  const isSkipped = !d.ans;
                  const isFull = d.marks === d.max;
                  const isPartial = d.marks > 0 && d.marks < d.max;
                  const cls = isSkipped ? 'skipped' : isFull ? 'correct' : isPartial ? 'partial' : 'wrong';
                  const marksCls = isFull ? 'marks-full' : isPartial ? 'marks-partial' : 'marks-zero';

                  // Get option text
                  function getOptionText(qObj, key) {
                    if (!key) return null;
                    if (qObj.section === 'A') return key === 'a' ? 'True' : 'False';
                    if (qObj.options && qObj.options[key]) return `(${key}) ${qObj.options[key]}`;
                    return key;
                  }

                  return (
                    <div key={q.id} className={`review-item ${cls}`}>
                      <div className="review-item-header">
                        <span className="review-q-text"><strong>Q{q.id}.</strong> {q.text.length > 100 ? q.text.slice(0,100)+'…' : q.text}</span>
                        <span className={`review-marks ${marksCls}`}>{d.marks}/{d.max}pts</span>
                      </div>
                      <div className="review-answers">
                        {isSkipped ? (
                          <span className="ans-pill ans-skipped">Not answered</span>
                        ) : (
                          <>
                            <span className="ans-pill ans-yours">Your answer: {getOptionText(q, d.ans)}</span>
                            {!isFull && <span className="ans-pill ans-correct">Correct: {getOptionText(q, d.correct)}</span>}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          <button className="retry-btn" onClick={handleRetry}>Retake Exam</button>
        </div>
      </>
    );
  }

  return null;
}
