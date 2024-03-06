import team from "../../assets/team.jpg";

const events = [
    {
        title: "Events",
        description: `From workshops to webinars, EduMinerva has come a long way! The team has been constantly working to organize various workshops and webinars.
        Have a glimpse on our upcoming as well as  our past events!`,
        image: team,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"]
    },
    {
        title: `Placement Bootcamp`,
        description: `EduMinerva, organized a Bootcamp titled "Placement Bootcamp", from 24th April to 29th April, 2023. This Bootcamp included various Sessions and
    interaction with Seniors.`,
        image: `https://drive.google.com/thumbnail?id=1uEejpQT-IiO2dEM0TpL_HlKaPAhLhMhX&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `UPSC Examination With Next IAS`,
        description: `EduMinerva, organized a Session titled "UPSC Examination With Next IAS",on 27th April, 2023. This Session guided Students on Preparation Strategy for UPSC Civil Services Examination.`,
        image: `https://drive.google.com/thumbnail?id=1c7yd2BoMFOHE-y3LG8JpoZxULFQHqkj8&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Career Fair`,
        description: `EduMinerva, organized a Fair titled "Career Fair", on 17th April, 2023. This Session solved many queries of students regarding their Career.`,
        image: `https://drive.google.com/thumbnail?id=1cziJNv5sBEP7qZyfnSAVPbXjPvUlCkR0&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Higher Studies with SIEC`,
        description: `EduMinerva, organized a Seminar titled "Higher Studies with SIEC", on 6th April, 2023. In this seminar the Speakers directed Students about Higher Studies Opportunities.`,
        image: `https://drive.google.com/thumbnail?id=19aXvH9kkLj9rV7ZUY6kfeNlK1y6BQ2LE&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Corporate Visit @ Coding Ninjas`,
        description: `EduMinerva, conducted an Industrial visit at "Coding ninjas", on the 25th March, 2023.This visit was insightful.`,
        image: `https://drive.google.com/thumbnail?id=1Tn5wZSdoWfmo_gNJQFT_VPKyeEAz--wT&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `BVEST'23`,
        description: `EduMinerva, organised two events under BVEST'23 titled "Unsighted" and "word Warriors", on the 29th March,2023. These events were amazing.`,
        image: `https://drive.google.com/thumbnail?id=1Db_17HE-hdr3urm9ZPNJuUKx_SQ22VXq&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Eduation '23`,
        description: `EduMinerva, conducted a two day flagship event titled "Eduation", on the 15th and 16th March 2023.This two day event included various entertaining activities and 24 hour hackathon with three rounds.`,
        image: `https://drive.google.com/thumbnail?id=1-7bIHI5Xnl9w1-6IW8ifRLwFr1xm6xvd&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Instagram Live QnA on Higher Studies`,
        description: `EduMinerva on the 10th December, 2022, conducted a QnA Session on
          "Higher Studies”. It was a Live Session On Instagram in which our regarded
          speakers, Mr. Avadhesh Kumar Singh and Ms. Ralkhi directed students on
          Higher Education.`,
        image: `https://drive.google.com/thumbnail?id=1Pn_Mywp-qocXgak4Phmo97ZnmJMqPzmU&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Fresh On Campus`,
        description: `EduMinerva, planned titled "Fresh On Campus", on the 9th November and
          14th November, 2022. This two day event included various entertaining
          activities and interaction with freshers.`,
        image: `https://drive.google.com/thumbnail?id=1GFgLxQlfNAiSVEa-VHCB_mehxwIsqGh8&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Higher Studies Overseas`,
        description: `EduMinerva, on the 12th October, 2022, conducted a workshop on "Higher
          Studies Overseas”. It was a 1.5-hour session in which our regarded speakers,
          Mr. Avadhesh Kumar Singh and Mr. Kunal Khanna directed students on
          Higher Education.`,
        image: `https://drive.google.com/thumbnail?id=1REwjy464a7rtX2x0LoEW4MddLR6Qq0jo&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Fun fair`,
        description: `Eduminvera planned an entertaining event on 21st September, 2022 for
          our fellow. Which included some really engaging games, including Seven
          Stones (Pithoo challenge), Catch me if you can, Watch Where You Step, and
          Numbers ka jhol mol; the event's objective was to engage youngsters a fun
          day.`,
        image: `https://drive.google.com/thumbnail?id=1y2MOgSHxKaVxWgg0qBQuGqMZ0w_bYpZj&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `De'Coding Placements`,
        description: `EduMinerva, conducted a two day webinar titled "de'CODING
          PLACEMENTS", on the 15th July and 16th July, 2022, in order to make peers
          placement ready. Day 1 was about Essentials of DSA and Day 2 was
          Interaction with seniors and alumni.`,
        image: `https://drive.google.com/thumbnail?id=1jqT_6izdB6Ox90PmWmPEGLuyvqKTU5x7&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Fun Event`,
        description: `Eduminerva, BVCOE, New Delhi, on 2nd June ,2022 organized a 'Get
          together of the team as a Fun Event ' with over all the team members
          of eduminerva . It was a four hour event in which we played a lot of
          games with our team members.`,
        image: `https://drive.google.com/thumbnail?id=1eBwzLx6mxfFOcmlDTSxR_yxw8U698bOA&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Resume Screening & Mock Interview Workshop`,
        description: `Eduminerva, BVCOE, New Delhi, on Z1st May, 2022 organized a
          workshop related to Moclk Interview with over 50+ participants. It was
          a 1-hour event in which our speaker Vaibhav Ehardwaj told us about
          how to build a strong resume and how to present ourselves in an
          interview.`,
        image: `https://drive.google.com/thumbnail?id=1BhVsMnY_iUUGVUazgrMNJbozX4PVRBn-&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `UI-UX Workshop`,
        description: `Eduminerva organized an offline Interactive two-day workshop session
          on Ul/UX on 25th and 26 th April 2022 where 60+ candidates attended.
          Our speaker was MEGHA MAHAJAN, the product designer at coding
          ninjas.`,
        image: `https://drive.google.com/thumbnail?id=1Fk3KxysxKiaRaOyxOChZAKcIYdWlQZb3&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Introduction to Open Source`,
        description: `On evening of 27th Feb 2022, EduMinerva organizing a f event
          "INTRODUCTION TO OPEN SOURCE" to give a roadmap for participation
          in the programs,events competitions and other opportunities in the
          fields of Open-source.`,
        image: `https://drive.google.com/thumbnail?id=1IbFYN7HaoejDdh-S4xiAUN19Z1ugL7Wa&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Understanding DSA Concept`,
        description: `From 18th to 20th Feb, 2021, EduMinerva organizing a 3 days workshop
          "Understanding DSA Concept" wherein all DSA concept Covered by
          Mentor Himashu Mittal, Chandan Raj and Shivam Singh. This workshop
          was helpfull for all students.`,
        image: `https://drive.google.com/thumbnail?id=10rDkUBcTTAMZ-5nAsUw_jMam5i72mb1x&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Let's Discuss`,
        description: `On 13th-14th July 2021,EduMinerva Conduct a Discussion session on
          "SUMMER ROADMAP TO YOUR DREAM COLLEGETRAINING RELATED QUERIES". Wherein all summer Training
          related queries was heard and answered. This session especially for 2nd
          year students to provide them exposure and right guidance on the "Summer
          Training" which is also a part of our curriculum.`,
        image: `https://drive.google.com/thumbnail?id=1Oi8BG5jyEdbiG2JdBeDOygYLy9VXC69G&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Escape Room`,
        description: `On evening of 19th Sept 2021, EduMinerva organizing a fun event
          "Escape Romm". It is an online mystery game to be help on discord
          wherein winners will be given 1 hour to complete the game.`,
        image: `https://drive.google.com/thumbnail?id=17qTtk4OCaUUYoMyynd7hTt--9mMzrO_O&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Welcoming Freshers '21`,
        description: `EduMinerva along with many jolly students welcomed Santa with a bang in
          the Christmas Mela organised by the society. Students joined in with our
          Santa waiting to welcome them. Talks, games, and everything fun that can
          be done under the restraints of online meet.`,
        image: `https://drive.google.com/thumbnail?id=1ZOY-TGhSHEEp5LdsbygpjUmu_daLsr4K&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Welcoming Freshers '21`,
        description: `As is the tradition of EduMinerva, we welcome all the freshers of batch 2021-
          2025. On the evening of 12th December, 2021, EduMinerva held a virtual
          get-together with the freshers, wherein the freshers were given a virtual
          college tour and open forum to ask the seniors any question they had in
          mind. Over 50+ students participated and a WhatsApp group by EduMinerva
          is formed for convenient medium of communication of freshers and seniors.`,
        image: `https://drive.google.com/thumbnail?id=1mQIFeVyvK3ZUdskLT9617vJ-NaHxraaD&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Build A Strong Profile For Studying Abroad`,
        description: `On the evening of 2nd December, 2021, EduMinerva conducted a webinar
          on "How To Build A Strong Profile For Top Universities Abroad", wherein Ms.
          Rushali Kapadia, the speaker, who has 3+ years of experience of studying
          abroad with expertise in USA, talked about overseas education counselling,
          and answered all the questions regarding studying abroad. Over 150+
          students benefitted from the session.`,
        image: `https://drive.google.com/thumbnail?id=1qhWh9DfuAd3EzL9Q1PkWqxFdtxObgty2&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `DogeCoin Vs Bitcoin`,
        description: `Investment knowledge is as much important as academic knowledge.
          Knowing how to earn money in the world of crypto today is a huge
          advantage. To help students of BVCOE get started with the understanding of
          blockchain and crypto, EduMinerva organised Dogecoin Vs Bitcoin, where
          Mr. Premchand Kasi helped students clear the air and get started with crypto
          and blockchain. A quiz at the end was held to assess attendees' takeaway.`,
        image: `https://drive.google.com/thumbnail?id=1yCiEFAyEjHJ6kQFFTYZbdlc01zoHVPze&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Research Paper Writing`,
        description: `To help students write a good research paper EduMinerva organised an
          amazing session: "An Educator's Guide to a Good Research paper". Our
          esteemed speaker and a research expert, Dr. Preeti Nagrath from CSE Dept.,
          BVCOE, who has been writing research papers since the last 12 years
          addressed the students. She has written over 16 research papers and has
          escorted a lot of papers to perfection.`,
        image: `https://drive.google.com/thumbnail?id=1RYQpk9OldYd6klSaIagcuis-B9OiPZDv&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Resume Building Workshop`,
        description: `“Your resume is the chief evangelist of your career and best instrument for
          securing employment.". With this in mind, EduMinerva with esteemed
          speaker Khushi Herchandani, organized a workshop on "How to Build a
          strong resume" on the evening of 4th September, 2021 where more than
          80+ attendees learnt the importance of a good resume and a few tricks to
          improve and make an eye-catching resume.`,
        image: `https://drive.google.com/thumbnail?id=1aKvY1aohAiMVk_H_NRe5lNa3TqbUG8S9&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Cheat Sheet To Placement`,
        description: `On 23rd July, EduMinerva, a society in Bhartiya Vidyapeeth College Of
          Engineering organized an event 'Cheat Sheet To Placement' for students of
          all years but for 3rd and 4th year primarily to provide them exposure and
          right guidance at the right time so that they can do the needful.`,
        image: `https://drive.google.com/thumbnail?id=1BwDwng9yjGNCD9ksNDvDE3Mvbk6EucuU&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Quiz on placement aptitude`,
        description: `EduMinerva on 31st May 2020 organised a very special event, Placement
          Quiz. The aim of the event was to gave students, idea about the type of
          questions been asked in the placement aptitude exam.`,
        image: `https://drive.google.com/thumbnail?id=16LDF8sVNC7VNqdBvvYGLYZE-Sj_5CRsr&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `How to approach for Internships`,
        description: `In Collaboration with Coding Blocks, Eduminerva on 25th April 2021
          conducted a webinar on 'How to approach for Internships'. Mr. Mohit Uniyal,
          instructor and product Engineering at Coding Blocks, graced the session as our
          speaker. The aim of the webinar was to help students how to look for internship
          as they are the first step towards on how to get experience before getting a
          job especially when someone is a fresher.`,
        image: `https://drive.google.com/thumbnail?id=16LDF8sVNC7VNqdBvvYGLYZE-Sj_5CRsr&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `The Entusiastech Summit`,
        description: `Eduminerva in collaboration with MyWays ,an AI and Psychometrics-
          empowered Career Growth Hub for technical students feels immense
          pleasure to invite you to 'The EnthusiasTech Summit 2021' from 10th-11th April.`,
        image: `https://drive.google.com/thumbnail?id=1YW2nHEXa_27A-2XKcJ2m8ULqv7ypX3YR&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `How to get started with programming`,
        description: `In Collaboration with Coding Blocks, Eduminerva on 20th Feburray 2021
          conducted a webinar on 'How to get started with programming'. The aim of the
          webinar was to help students start with coding and also providing them with o
          roadmap that can be followed to excel Programming.`,
        image: `https://drive.google.com/thumbnail?id=1mqkYzhj-Krv9hepUPoYelCNIpW6vIQuQ&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Roadmap to your dream college`,
        description: ``,
        image: `https://drive.google.com/thumbnail?id=1LGgGnUpnXzfniUZSxiG0_xnvlJ4Z4CJK&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Fun meme quiz`,
        description: ``,
        image: `https://drive.google.com/thumbnail?id=1CkbwIWR6G_VR6aDSg682vy9fowCiZe1a&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Christmas With Eduminerva`,
        description: `Christmas With Eduminerva. Participants submitted their creative entries like
          photos and videos with Christmas Vibes. The entry with most likes on
          Instagram was declared as winner.`,
        image: `https://drive.google.com/thumbnail?id=1aTNSuUdp6Dpdz3aTuhCge07cDChli2zU&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Talk With Seniors`,
        description: `24th October, 2020 Edu-Minerva conducted an author workshop "Talk With Seniors"
          with the “seniors” of DTU placed Students was held on the online platform of zoom.
          Around 50 students attended the session. The Stage was then provided to all these
          young leaders who one by one discuss their personal and college life and how they
          reach where they are right now.They discussed about their inspirations and ideologies
          and precious experiences.`,
        image: `https://drive.google.com/thumbnail?id=1LPMilwqEemZ6vOhTADnZskiTG1NUVOFT&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `How to get Hired?`,
        description: `10th October,2020 Edu-Minerva conducted a Workshop in collaboration
          with eeveno How to get Hired? The event was graced by the presence of Mr.
          Punnet Aneja currently employed as Manager in Business development at
          Mastercard. More than 125 students attended the session to curb their
          curiosity.The agenda of the workshop was to help attendees understand
          corporate landscape and optimally utilize LinkedIn for effective
          networking.`,
        image: `https://drive.google.com/thumbnail?id=133nEL6Ev1WHwlK7XLkBzVIzyKXH8pRtB&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Workshop on Resume Writing`,
        description: `25th September,2020 Edu-Minerva conducted a Workshop in collaboration
          with WiseUp Communications "Making The Most Of Your Next Career
          Opportunity" The event was graced by the presence of Ms. Neha Aggarwal .
          Around 300 students attended the session to curb their curiosity. The agenda
          of the workshop was to help attendees with tips on resume writing, insights
          on cover letter writing and techniques for acing interviews.
          H TO GET HIRED?`,
        image: `https://drive.google.com/thumbnail?id=165NHSaJ3R8i0ZDdJsSHBkQ5GPorzW8oQ&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Workshop on GRE Exam`,
        description: `19th September,2020 Edu-Minerva conducted a Workshop on GRE Exam.
          The event was graced by the presence of Mr. Apurv Bhargava currently
          employed as Product Security Engineer at Facebook and scored 323 in GRE
          (2015). The agenda of the workshop was to help attendees know about the
          application procedure, requirements and how to crack GRE and to clear
          their doubts.`,
        image: `https://drive.google.com/thumbnail?id=1mkUbXJcS_uWv16VoYjIBWswhib97eSu9&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Edge 2.0`,
        description: `22th August, 2020 Edu-Minerva Kick started the session 2020-2021 with
          a webinar on Data Science which is the second workshop in series Edge
          2.0 .The webinar was delivered by Salil Gautam, Data Scientist from
          Société Générale who's won over 30 hackathons. The second speaker
          was Anchal Sharma, a Data Analyst at HCL Technologies who's also
          hand worked on four international live projects.`,
        image: `https://drive.google.com/thumbnail?id=13kD7IvccwC97DNzzPkv0-YKRxBsC51t3&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `All in one placement webinar`,
        description: `Edu-Minerva conducted its live session on “Your all-in-one guide for
          placements” on 26th July 20 and second session on 28th July 20 to provide
          students with the insights into the placement process and the corresponding
          requirements. They also gave tips and tricks on how and when to apply for off-
          campus placements.`,
        image: `https://drive.google.com/thumbnail?id=176QWfWqFaH8o1KTl5Q_aRFT19ITYRtGN&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `UI-UX & Product Dev Webinar`,
        description: `14 June 2020, Sunday, Edu-Minerva in collaboration with MonkTree, founded by Mr
          Tarun Dixit, organized a webinar on Ul UX designing and product development.
          More than 70 students from colleges including IIT-Roorkee, SRM , South and North
          India attended the webinar.The agenda of the webinar included introduction to the
          tools and resources necessary to learn like XD, Figma, Protopie, Sketch, Mockup,
          Adobe XD (kits).`,
        image: `https://drive.google.com/thumbnail?id=1xpynOofWwMRcZpC_w2zrCpwdntfPnijs&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `Workshop on 'How to write a Research paper'`,
        description: `On 29th January 2020, Edu-Minerva hosted a 2 hour long workshop on “How to
          write a Research paper”. Dr. Yugananda and Mr. Abhay Sheel Anand, faculty and a
          current final year student of our college respectively were invited to provide their
          insight on how to write a research paper. The workshop was attended by 50
          enthusiastic students, who were eager to learn how to write a detailed and
          impressive paper.`,
        image: `https://drive.google.com/thumbnail?id=1ZVBWOoDsC3ERuDLn_5jJ-EyCekXkHmpJ&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `MUN BVEST`,
        description: `10-11 Oct 2019, Edu-Minerva in collaboration with Horizon, the MUN society of
          BVCOE organized Model United Nations 2019, a MUN conference on 10th and 11th
          October, as a part of the annual fest, BVEST 2019. An Ad-Hoc committee was
          simulated wherein 10 of the brightest minds discussed and formed solutions for the
          impending crisis of privacy in the digital age with Mr Akul Hallan as the chairperson
          of the ad-hoc committee.`,
        image: `https://drive.google.com/thumbnail?id=183h5Wwj9zmv-tJFgTmBNX-flrs6_Qbm_&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `E.D.G.E`,
        description: `EDGE- Explore, Discover, Grow, Engage on 13th September, 2019. This event was
          graced by the presence of Mr. Ankur Mishra, an engineer, writer and entrepreneur.
          Being a TEDx speaker, he interacted with the students and told them about how
          important it is to achieve your dreams, no matter what career field you are in.`,
        image: `https://drive.google.com/thumbnail?id=1zHN6WHJgqB9qEw1U463F6DJU0QXGRiG6&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    },
    {
        title: `FRESH ON CAMPUS`,
        description: `With the start of a new session, on 22nd August 2019, Edu-Minerva head started by
          organizing a myriad of fun and engaging activities for the freshers. The 'Fresh on
          Campus' Event included Arm Wrestling and Push-Ups. The showstopper however
          was the flash mob that caught everybody's attention and invited everyone to join in
          and dance their heart out.`,
        image: `https://drive.google.com/thumbnail?id=1n7YrC0p_gZbl9wkCagUjku0jtQmOvCr7&sz=w1000`,
        links: [
            { name: "Website", url: "https://example.com/event1" },
            { name: "Registration", url: "https://example.com/event1/register" },
        ],
        tags: ["education", "conference", "2022"],
    }
]
export default events;
